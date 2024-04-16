import {
    queryCartCreate, queryAddItem, queryRemoveItem, queryGetCart,
    queryChangeQuantity, queryCartAttributesUpdate,
} from '~/modules/query';

import { CartData, Item } from '~/components/cart/types';
import StorefrontApi from './storefront';
import Shipping from './shipping';
import Discounts from './discounts';
import AutoGwp from './autogwp';

export const setLSWithExpiry = (key, value, ttl = 60 * 60 * 1000) => {
    const now = new Date();
    const item = {
        value,
        expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export const getLSWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) { return null; }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
};

export const removeLS = (key) => {
    localStorage.removeItem(key);
};

export const getCartId = () => {
    if (getLSWithExpiry('cartData')) {
        const { id } = JSON.parse(getLSWithExpiry('cartData'));
        return id;
    }
    return null;
};

const calculateSubTotal = (items: Item[]) => {
    let subTotal = 0;
    items.forEach((item) => {
        subTotal += item.comparePrice ? item.comparePrice * item.quantity : item.originalPrice * item.quantity;
    });
    return subTotal;
}

const calculateManualGwpDiscount = (items: Item[]) => {
    let gwpDiscount = 0;
    items.forEach((item) => {
        if (item.isManualGwp) gwpDiscount += item.comparePrice ? item.comparePrice : item.originalPrice;
    });
    return gwpDiscount;
}

const calculateBundleDiscount = (items: Item[]) => {
    let bundleDiscount = 0;
    items.forEach((item) => {
        if (!item.isManualGwp) { bundleDiscount += (item.diffPriceBundle * item.quantity); }
    });
    return bundleDiscount;
}


const getVariantOptions = (item: Item) => {
    const { merchandise: { product: { options } } } = item;
    const swatches = options.filter((opt) => opt.name.toLowerCase().includes('color')
        || opt.name.toLowerCase().includes('style')
        || opt.name.toLowerCase().includes('scent')).map((opt) => {
        let { name } = opt;
        if (name.toLowerCase().includes('drops') || name.toLowerCase().includes('foam') || name.toLowerCase().includes('color')) {
            name = 'Shade';
        } else if (name.toLowerCase().includes('style')) {
            name = 'Style';
        } else if (name.toLowerCase().includes('scent')) {
            name = 'Scent';
        }
        return { ...opt, name };
    });

    return swatches;
}

const calculateDiscount = (cart: CartData) => {
    let discountAmount = 0;

    cart.discountAllocations.forEach((alloc) => {
        const amount = parseFloat(alloc.discountedAmount.amount) * 100;
        discountAmount += amount;
    });

    cart.items.forEach((item) => (
        item.discountAllocations.forEach((alloc) => {
            const amount = parseFloat(alloc.discountedAmount.amount) * 100;
            discountAmount += amount;
        })
    ));
    return discountAmount;
}

export const cartModel = (cart: CartData) => {
    const shipping = new Shipping();
    const discount = new Discounts();
    const autogwp = new AutoGwp();
    // let cartData = { ...cart };
    let cartData = { ...global.config.cart };
    if (cartData && cartData.lines && cartData.lines.edges) {
        let currentTotal = 0;
        // eslint-disable-next-line no-return-assign
        cartData.lines.edges.forEach((item: Item) => currentTotal += item.node.quantity);

        cartData.items = cartData.lines.edges.map((item:any) => {
            const { node } = item;
            node.isManualGwp = false;
            const checkAttributes = node.attributes.find((i) => i.key === '_campaign_type' && i.value === 'manual_gwp');
            if (checkAttributes) {
                node.isManualGwp = true;
                if (currentTotal === cartData.totalQuantity) { cartData.totalQuantity -= node.quantity; }
            }
            node.diffPriceBundle = 0;
            node.comparePrice = 0;
            node.originalPrice = parseFloat(node.cost.amountPerQuantity.amount) * 100;
            if (node.cost && node.cost.compareAtAmountPerQuantity) {
                node.comparePrice = parseFloat(node.cost.compareAtAmountPerQuantity.amount) * 100;
                node.diffPriceBundle = node.comparePrice - node.originalPrice;
            }
            node.isFreeItem = node.cost.totalAmount.amount === '0.0';
            node.swatches = getVariantOptions(node);
            node.variants = node.merchandise.product.variants.edges.map((variant) => variant.node);
            node.selectedSwatch = node.merchandise.selectedOptions.filter((opt) => opt.name.toLowerCase() !== 'size').map((opt) => opt.value);
            return node;
        });
        cartData.items = cartData.items.reverse();
    }

    if (cartData.items) {
        cartData.subtotalPrice = calculateSubTotal(cartData.items);
        cartData.discountBundleAmount = calculateBundleDiscount(cartData.items);
        cartData.discountManualGwp = calculateManualGwpDiscount(cartData.items);
        cartData.discountAmount = calculateDiscount(cartData);
        cartData.discountLine = cartData.discountAmount + cartData.discountManualGwp;
        cartData.discountCombineLine = cartData.discountLine + cartData.discountBundleAmount;
        cartData.totalAmount = cartData.subtotalPrice - cartData.discountCombineLine;
        cartData.totalBeforeShipping = cartData.subtotalPrice - cartData.discountCombineLine;

        const { shippingData, shippingMeter } = shipping.getShippingData(cartData.totalAmount, false);

        cartData.shippingData = shippingData;
        cartData.shippingMeter = shippingMeter;

        if (cartData.shippingData && cartData.shippingData.amount) {
            cartData.totalAmount += cartData.shippingData.amount;
        }

        cartData.discountMeter = {}
    }

    if (cart && cart.id) {
        cartData.discountData = discount.getDiscountData(cartData);
    }

    cartData = autogwp.processAutoGwp(cartData);
    return cartData;
}

export const getCart = (cartId = null, loadPage = false) => {
    const selectCartId = cartId || getCartId();
    const _ = this;
    const sfApi = new StorefrontApi();
    const discounts = new Discounts();

    return new Promise((resolve, reject) => {
        const query = {
            query: queryGetCart,
            variables: {
                cartId: selectCartId,
            },
        };

        sfApi.request(query).then((resp) => {
            if (resp && resp.data && resp.data.data && resp.data.data.cart) {
                const { data: { data: { cart } } } = resp;
                if (loadPage && cart.discountCodes.length) {
                    const { 0: discountCode } = cart.discountCodes;
                    if (discountCode && !discountCode.applicable && discountCode.code) {
                        discounts.removeDiscountCode(cart, cart.id, false);
                    }
                }

                resolve(cartModel(cart));
            } else {
                removeLS('cartData');
                const dataQuery = {
                    query: queryCartCreate,
                    variables: {
                        input: {},
                    },
                };

                sfApi.request(dataQuery).then((res) => {
                    const { data: { data: { cartCreate: { cart: crt } } } } = res;
                    console.log(crt, 'testing testing', res);
                    sfApi.saveDataLocalStorage(crt);
                    resolve(cartModel(crt));
                }).catch((error) => reject(error));
            }
        }).catch((error) => reject(error));
    });
}