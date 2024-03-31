export type CartAttributes = {
    key: string;
    value: string;
}

export type Product = {
    handle: string;
    options: ProductOptions[];
    // Add other properties of the product if needed
}

export type ProductOptions = {
    id: string;
    name: string;
    values: any[];
}

export type Merchandise = {
    id: string;
    product: Product;
    availableForSale: boolean;
}

export type Item = {
    attributes: CartAttributes[];
    merchandise: Merchandise;
    comparePrice: number;
    quantity: number;
    originalPrice: number;
    isManualGwp: boolean;
    diffPriceBundle: number;
    discountAllocations: any[];
    node: any;
    // Add other properties of the item if needed
}

export type CartItemProps = {
    item: Item;
    discountAllocations: any[];
    merchandise: Merchandise;
}

export type CartData = {
    id: string;
    items: CartItemProps[];
    lines: { edges: any[] };
    discountAllocations: any[];
    discountCodes: any[];
    buyerIdentity: any;
    subtotalPrice: number;
    discountBundleAmount: number;
    discountLine: number;
    discountCombineLine: number;
    totalAmount: number;
    checkoutUrl: string;
	code: string;
    attributes: any[];
    discountData: any;
    shippingMeter: any;
    discountMeter: any;
    shippingData: any;
    totalQuantity: number;
}