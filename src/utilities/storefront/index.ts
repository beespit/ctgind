import { createStorefrontClient } from '@shopify/hydrogen-react';

export const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN as string;
export const publicStorefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN as string;
export const storefrontApiVersion = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION as string;

const { getStorefrontApiUrl, getPublicTokenHeaders } = createStorefrontClient({
  storeDomain,
  storefrontApiVersion,
  publicStorefrontToken,
});

// Create a simple GraphQL client that uses the correct Shopify endpoint
const graphqlClient = async (query: string, variables: any = {}) => {
  // Construct the correct URL manually since getStorefrontApiUrl() is returning malformed URL
  const url = `https://${storeDomain}/api/${storefrontApiVersion}/graphql`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getPublicTokenHeaders(),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`);
  }

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  return result.data;
};

// For now, let's create a simple wrapper that mimics the Zeus interface
export const storefront = {
  query: (queryObject: any) => {
    // Handle different query types
    if (queryObject.products && queryObject.productByHandle) {
      // This is a query with both products and productByHandle
      const query = `
        query getProductsAndProductByHandle($handle: String!, $first: Int, $reverse: Boolean) {
          products(first: $first, reverse: $reverse) {
            edges {
              node {
                handle
                title
                productType
              }
            }
          }
          productByHandle(handle: $handle) {
            title
            description(truncateAt: 15000)
            descriptionHtml
            productType
            seo {
              title
              description
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 250) {
              nodes {
                id
                url
                altText
                width
                height
              }
            }
            options(first: 250) {
              id
              name
              values
            }
            variants(first: 250) {
              nodes {
                id
                availableForSale
                quantityAvailable
                priceV2: price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                image {
                  id
                }
              }
            }
          }
        }
      `;
      
      const variables = {
        handle: queryObject.productByHandle[0].handle,
        first: queryObject.products[0].first,
        reverse: queryObject.products[0].reverse,
      };
      
      return graphqlClient(query, variables);
    } else if (queryObject.products) {
      // This is just a products query
      const query = `
        query getProducts($first: Int, $after: String, $reverse: Boolean) {
          products(first: $first, after: $after, reverse: $reverse) {
            pageInfo {
              hasNextPage
            }
            edges {
              cursor
              node {
                handle
                title
                productType
                images(first: 250) {
                  nodes {
                    id
                    url(transform: { maxHeight: 600 })
                    altText
                    width
                    height
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                featuredImage {
                  url(transform: { maxWidth: 500 })
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      `;
      
      const variables = {
        first: queryObject.products[0].first,
        after: queryObject.products[0].after,
        reverse: queryObject.products[0].reverse,
      };
      
      return graphqlClient(query, variables);
    }
    
    throw new Error('Unsupported query format');
  },
  mutation: (mutationObject: any) => {
    // Similar wrapper for mutations if needed
    throw new Error('Mutations not implemented yet');
  },
};
