
import '@site/assets/style.css';
import ProgressBar from 'nextjs-progressbar';
import { NextAppProps, DefaultSeo } from '@site/utilities/deps';
import { ShopifyProvider, CartProvider, createStorefrontClient } from '@shopify/hydrogen-react';
import '@site/assets/style.css'
import localFont from '@next/font/local'

import { storeDomain, publicStorefrontToken, storefrontApiVersion } from '@site/utilities/storefront';

const client = createStorefrontClient({
  storeDomain,
  storefrontApiVersion,
  publicStorefrontToken,
});

const windsor = localFont({
  src:'../../public/fonts/windsor.woff',
  variable: '--font-windsor'
})


export default function App({ Component, pageProps }: NextAppProps) {
  return (
    <ShopifyProvider
      languageIsoCode="EN"
      countryIsoCode="US"
      storeDomain={storeDomain}
      storefrontToken={publicStorefrontToken}
      storefrontApiVersion={storefrontApiVersion}
      storefrontId={undefined}
    >
      <DefaultSeo
        defaultTitle="Cottage Industry"
        titleTemplate="%s • Cottage Industry"
        description="Clothes for Earth."
      />
      <CartProvider 
        onLineAdd={() => console.log('Item added to cart!')}
        onLineRemove={() => console.log('Item removed from cart!')}
      >
        <ProgressBar color="black" />
        <Component {...pageProps} />
      </CartProvider>
    </ShopifyProvider>
  );
}
