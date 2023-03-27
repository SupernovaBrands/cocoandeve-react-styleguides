/*
  variables for each query or mutation type on storefront APi graphql
*/

const cartAllocationFragment = `  __typename
... on CartCodeDiscountAllocation {
  code
  discountedAmount {
    amount
    currencyCode
  }
}
... on CartAutomaticDiscountAllocation {
  title
  discountedAmount {
    amount
    currencyCode
  }
}
... on CartCustomDiscountAllocation {
  title
  discountedAmount {
    amount
    currencyCode
  }
}`;

const variantFragment = `id
title
quantityAvailable
currentlyNotInStock
availableForSale
sku
price {
  amount
}
compareAtPrice {
  amount
}
selectedOptions {
  name
  value
}
image {
  url
  id
  altText
  height
  width
}`;

const productFragment = `id
handle
title
options(first: 20) {
  id
  name
  values
}
featuredImage {
  url
  id
  altText
  height
  width
}
onlineStoreUrl
productType
requiresSellingPlan
tags
totalInventory
vendor
availableForSale
variants(first: 20) {
  edges {
    node {
      ${variantFragment}
    }
  }
}`;

const cartFragment = `checkoutUrl
discountCodes {
    applicable
    code
}
discountAllocations {
  ${cartAllocationFragment}
}
buyerIdentity {
    countryCode
    email
    phone
}
attributes {
  key
  value
}
id
totalQuantity
createdAt
updatedAt
deliveryGroups(first: 2) {
  edges {
    node {
      id
      deliveryAddress {
        address1
        address2
        city
        company
        country
        countryCodeV2
        firstName
        lastName
        province
        provinceCode
        zip
      }
      deliveryOptions {
        deliveryMethodType
        description
        estimatedCost {
          amount
        }
        title
      }
    }
  }
}
lines(first: 50) {
  edges {
    node {
      id
      attributes {
        key
        value
      }
      merchandise {
        ... on ProductVariant {
          ${variantFragment}
          product {
            ${productFragment}
          }
        }
      }
      quantity
      discountAllocations {
        ${cartAllocationFragment}
      }
      sellingPlanAllocation {
        checkoutChargeAmount {
          amount
        }
        priceAdjustments {
          compareAtPrice {
            amount
          }
          perDeliveryPrice {
            amount
          }
          price {
            amount
          }
          unitPrice {
            amount
          }
        }
        remainingBalanceChargeAmount {
          amount
        }
        sellingPlan {
          id
          name
          description
          recurringDeliveries
          options {
            name
            value
          }
        }
      }
      cost {
        amountPerQuantity {
          amount
        }
        compareAtAmountPerQuantity {
          amount
        }
        subtotalAmount {
          amount
        }
        totalAmount {
          amount
        }
      }
    }
  }
}
attributes {
  key
  value
}
cost {
  totalAmount {
    amount
    currencyCode
  }
  subtotalAmount {
    amount
    currencyCode
  }
  totalTaxAmount {
    amount
    currencyCode
  }
  totalDutyAmount {
    amount
    currencyCode
  }
  checkoutChargeAmount {
    amount
  }
  subtotalAmountEstimated
  totalAmountEstimated
  totalDutyAmountEstimated
  totalTaxAmountEstimated
}`;

export const queryCartCreate = `mutation cartCreate($input: CartInput!){
    cartCreate(input: $input){
      cart {
        ${cartFragment}
      }
    }
  }`;

export const queryApplyCode = `mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        ${cartFragment}
      }
      userErrors {
        field
        message
      }
    }
  }`;

export const queryBuyerIdentity = `mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
  cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
    cart {
      ${cartFragment}
    }
    userErrors {
      field
      message
    }
  }
}`;

export const queryGetCart = `query($cartId: ID!) {
    cart(id: $cartId) {
      ${cartFragment}
    }
  }`;

export const queryAddItem = `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      ${cartFragment}
    }
    userErrors {
      field
      message
    }
  }
}`;

export const queryChangeQuantity = `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      ${cartFragment}
    }
    userErrors {
      field
      message
    }
  }
}`;

export const queryRemoveItem = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      ${cartFragment}
    }
    userErrors {
      field
      message
    }
  }
}`;

export const queryProductByHandle = `query($handle: String!) {
  productByHandle(handle: $handle) {
    ${productFragment}
  }
}`;

export const queryCartAttributesUpdate = `mutation cartAttributesUpdate($attributes: [AttributeInput!]!, $cartId: ID!) {
  cartAttributesUpdate(attributes: $attributes, cartId: $cartId) {
    cart {
      ${cartFragment}
    }
    userErrors {
      field
      message
    }
  }
}`;
