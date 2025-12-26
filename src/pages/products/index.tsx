import { PageProps, NextSeo, fetchServerSideProps } from '@site/utilities/deps';

import { StoreLayout } from '@site/layouts/StoreLayout';
import { ProductListSection, fetchProductListSection } from '@site/sections/ProductListSection';

export const getStaticProps = fetchServerSideProps(async () => {
  try {
    const productListSection = await fetchProductListSection();
    return {
      props: {
        data: {
          productListSection,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty data to prevent build failure
    return {
      props: {
        data: {
          productListSection: {
            pageInfo: { hasNextPage: false },
            edges: [
              {
                cursor: '',
                node: {
                  handle: '',
                  title: 'No products available',
                  productType: '',
                  images: { nodes: [] },
                  priceRange: {
                    minVariantPrice: {
                      amount: '0',
                      currencyCode: 'USD'
                    }
                  },
                  featuredImage: null
                }
              }
            ]
          },
        },
      },
    };
  }
});

export default function Page(props: PageProps<typeof getStaticProps>) {
  return (
    <StoreLayout>
      <NextSeo title="Products" description="All Products from Next Shopify Storefront" />
      <ProductListSection data={props.data.productListSection} />
    </StoreLayout>
  );
}
