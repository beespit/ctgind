const { createStorefrontClient } = require('@shopify/hydrogen-react');

console.log('Environment variables:');
console.log('Store Domain:', process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
console.log('API Version:', process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION);
console.log('Token:', process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN);

const client = createStorefrontClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  storefrontApiVersion: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION,
  publicStorefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN
});

console.log('\nGenerated URLs:');
console.log('Storefront API URL:', client.getStorefrontApiUrl());
console.log('Headers:', client.getPublicTokenHeaders());