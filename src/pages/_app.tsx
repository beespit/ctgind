
import '@site/assets/style.css';
import ProgressBar from 'nextjs-progressbar';
import { NextAppProps, DefaultSeo } from '@site/utilities/deps';
import { ShopifyProvider, CartProvider } from '@shopify/hydrogen-react';
import '@site/assets/style.css'
import localFont from '@next/font/local'

import { storeDomain, publicStorefrontToken, storefrontApiVersion } from '@site/utilities/storefront';


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
    >
      <DefaultSeo
        defaultTitle="Next Shopify Storefront"
        titleTemplate="%s • Next Shopify Storefront"
        description="🛍 A Shopping Cart built with TypeScript, Tailwind CSS, Headless UI, Next.js, React.js, Shopify Hydrogen React,... and Shopify Storefront GraphQL API."
      />
      <CartProvider>
        <ProgressBar color="black" />
        <Component {...pageProps} />
      </CartProvider>
    </ShopifyProvider>
  );
}
