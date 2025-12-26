import { PageProps, NextSeo, fetchServerSideProps } from '@site/utilities/deps';

import { StoreLayout } from '@site/layouts/StoreLayout';
import { ProductListSection, fetchProductListSection } from '@site/sections/ProductListSection';

export const getServerSideProps = fetchServerSideProps(async () => {
  return {
    props: {
      data: {
        productListSection: await fetchProductListSection(),
      },
    },
  };
});

export default function Page(props: PageProps<typeof getServerSideProps>) {
  return (
    <StoreLayout>
      <NextSeo title="Products" description="All Products from Next Shopify Storefront" />
      <ProductListSection data={props.data.productListSection} />
    </StoreLayout>
  );
}
