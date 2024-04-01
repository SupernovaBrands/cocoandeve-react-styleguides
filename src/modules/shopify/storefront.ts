/* global Cart tSettings */
import { getSizedImageUrl } from '@shopify/theme-images';
import {
	getId, getCartId, getLSWithExpiry, setLSWithExpiry, daysToTime, getCookie, encryptParam,
} from '@/modules/utils';
import { queryProductByHandle, queryBuyerIdentity } from '@/modules/query';
import storefrontSettings from '../../config/storefront';
import axios, { AxiosResponse } from 'axios';
import { CartData } from '@/components/cart/types';

interface StorefrontSettings {
    storeDomain: string;
    storefrontApiVersion: string;
    storefrontToken: string;
}

class StorefrontApi {
    private settings: StorefrontSettings;
    private queue: any[]; // Define the appropriate type for queue
    private processing: boolean;
    private queueResult: any; // Define the appropriate type for queueResult
    private updateTime: any; // Define the appropriate type for updateTime

    constructor() {
        const subDomain = 'dev'; // Set subDomain value
        this.settings = storefrontSettings[subDomain]; // Assuming storefrontSettings is defined somewhere
        this.queue = [];
        this.processing = false;
        this.queueResult = null;
        this.updateTime = null;
    }

    request(query: any): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
            axios.post(
                `https://${this.settings.storeDomain}/api/${this.settings.storefrontApiVersion}/graphql.json`,
                query,
                {
                    headers: {
                        'X-Shopify-Storefront-Access-Token': this.settings.storefrontToken,
                    },
                },
            )
            .then((resp) => resolve(resp))
            .catch((e) => reject(e));
        });
    }

	/*
	request function to post graphql
	*/
	async requestGraphql(requestType, queryData, directRefresh) {
		const resp = await this.request(queryData);
        // @ts-ignore
		const { errors } = resp;
		if (!errors) {
			const { data: { data } } = resp;
			if (data && data[requestType] && data[requestType].cart) {
				this.saveDataLocalStorage(data[requestType].cart, directRefresh);
				return { resolve: data[requestType].cart };
			} if (data && data[requestType] && data[requestType].userErrors) {
				return { reject: data[requestType].userErrors };
			}
			return { reject: resp.data.errors };
		}
		return { reject: errors };
	}

	/*
		get price rule data
	*/
	async getPriceRule(code: any, cartId: any) {
		const tse = new Date().getTime();
		const data = `{code:'${code}',time:${tse}}`;
		const signature = encryptParam(data);
		const store = window.location.hostname.split('.')[0] === 'www' ? 'us' : window.location.hostname.split('.')[0];

		const url = `https://s-app.cocoandeve.com/shopify/discount_codes/${code}?brand=cocoandeve_shopify_${store}&cart=${cartId}&signature=${signature}`;
		const priceRule = await axios.get(url);
		return priceRule;
	}

	/*
        queue of requests
    */
	queueProcess({ funct, args, callback }) {
		this.queue.push({ funct, args, callback });
		return new Promise((resolve) => {
			if (!this.processing) {
				this.processing = true;
				const run = () => {
					if (this.queue.length) {
						const task = this.queue.shift();
						if (task) {
							const newTask = { newCart: Cart, ...task, getCartId: Cart.getCartId };
							const parameters = [];
							if (typeof newTask.args === 'object') {
								Object.keys(newTask.args).map((key) => parameters.push(newTask.args[key]));
							}
							newTask.newCart[funct](...parameters).then((resp) => {
								if (typeof newTask.callback === 'function') {
									newTask.callback(resp);
								}
								this.queueResult = resp;
								run();
							});
						}
					} else {
						this.processing = false;
						resolve(this.queueResult);
					}
				};
				run();
			}
		});
	}

	/*
        save cart data to the cookie storage
    */
	saveDataLocalStorage(cart: any, directRefresh = true) {
		setLSWithExpiry('cartData', JSON.stringify(cart), daysToTime(7));
		if (directRefresh) {
			document.dispatchEvent(new CustomEvent('CartUpdated'));
		}
	}

	/*
		get product info for recent products list
	*/
	async getRecentProductsInfo(recentProducts) {
		const products = [];

		for (let i = 0; i < recentProducts.length; i += 1) {
			// eslint-disable-next-line no-continue
			if (!recentProducts[i]) continue;
			// eslint-disable-next-line no-await-in-loop
			const productData = await this.getProductInfo(recentProducts[i]);
			if (productData) {
				let variant = productData.variants.edges[0].node;
				let isAvailable = false;
				const sku = [];
				if (productData.variants.edges.length) {
					for (let j = 0; j < productData.variants.edges.length; j += 1) {
						if (productData.variants.edges[j].node.availableForSale && !isAvailable) {
							isAvailable = true;
							variant = productData.variants.edges[j].node;
							sku.push(variant.sku);
						}
					}
				}
				if (variant && isAvailable) {
					products.push({
						productId: getId(productData.id),
						variantId: getId(variant.id),
						title: productData.title.trim(),
						image: productData.featuredImage ? getSizedImageUrl(productData.featuredImage.url, '444x558') : '',
						price: parseFloat(variant.price.amount) * 100,
						comparePrice: variant.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) * 100 : 0,
						skus: sku.join(','),
					});
				}
			}
		}
		return products;
	}

	/*
        fetching data product info by storefront api
    */
	async getProductInfo(handle) {
		const productLocal = getLSWithExpiry(`productInfo-${handle}`);
		if (productLocal) {
			return JSON.parse(productLocal);
		}

		const queryData = {
			query: queryProductByHandle,
			variables: {
				handle,
			},
		};
		const resp = await this.request(queryData);
        // @ts-ignore
		const { errors } = resp;
		if (!errors) {
			const { data: { data: { productByHandle } } } = resp;

			// set cookie product data for 10 minutes
			setLSWithExpiry(`productInfo-${handle}`, JSON.stringify(productByHandle), 600 * 1000);
			return productByHandle;
		}
		return false;
	}

	/*
        set identify cart buyer identity country or email for signed in customers
    */
	async setBuyerIdentity() {
		const buyerIdentity = { countryCode: getCookie('_shopify_country_code') };

		const queryData = {
			query: queryBuyerIdentity,
			variables: {
				cartId: getCartId(),
				buyerIdentity,
			},
		};

		const resp = await this.request(queryData);
        //@ts-ignore
		const { errors } = resp;
		if (!errors) {
			const { data: { data: { cartBuyerIdentityUpdate } } } = resp;
			if (cartBuyerIdentityUpdate && cartBuyerIdentityUpdate.cart) {
				this.saveDataLocalStorage(cartBuyerIdentityUpdate.cart);
				return cartBuyerIdentityUpdate.cart;
			}
		}
		return false;
	}
}

export default StorefrontApi;
