import { invariant, fetchStaticProps, fetchServerSideProps, fetchStaticPaths, PageProps, NextSeo, useEffect } from '@site/utilities/deps';
import { StoreLayout } from '@site/layouts/StoreLayout';
import { ProductSingleSection, fetchProductSingleSection } from '@site/sections/ProuctSingleSection';
import { ProductListSection, fetchProductListSection } from '@site/sections/ProductListSection';

export const getStaticProps2 = fetchServerSideProps(async () => {
  return {
    props: {
      data: {
        productListSection: await fetchProductListSection(),
      },
    },
  };
});

export const getStaticPaths = fetchStaticPaths(async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
});

export const getStaticProps = fetchStaticProps(async ({ params }) => {
  invariant(typeof params?.handle === 'string', `params.handle is required`);

  return {
    props: {
      data: {
        productSingleSection: await fetchProductSingleSection(params?.handle),
      },
    },
    revalidate: 60,
  };
});


export default function Page(props: PageProps<typeof getStaticProps>) {
  const { seo } = props.data.productSingleSection;

  return (
    <StoreLayout>
      <ProductSingleSection data={props.data.productSingleSection} />
    </StoreLayout>
  );
}
