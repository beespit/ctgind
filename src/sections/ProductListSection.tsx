import { storefront } from '@site/utilities/storefront';
import {  NextLink, useState, useAsyncFn, DataProps } from '@site/utilities/deps';
import { Button } from '@site/snippets';
import { Money } from '@shopify/hydrogen-react';

export async function fetchProductListSection(cursor?: string) {
  try {
    const { products } = await storefront.query({
    products: [
      { first: 24, after: cursor, reverse: true || null },
      {
        pageInfo: {
          hasNextPage: true,
        },
        edges: {
          cursor: true,
          node: {
            handle: true,
            title: true,
            productType: true,
            images: [
              { first: 250 },
              {
                nodes: {
                  id: true,
                  url: [
                    {
                      transform: {
                        maxHeight: 600,
                      },
                    },
                    true,
                  ],
                  altText: true,
                  width: true,
                  height: true,
                },
              },
            ],
            priceRange: {
              minVariantPrice: {
                amount: true,
                currencyCode: true,
              },
            },
            featuredImage: {
              url: [{ transform: { maxWidth: 500 } }, true],
              altText: true,
              width: true,
              height: true,
            },
          },
        },
      },
    ],
  });

  return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // Return empty products structure for graceful fallback
    return {
      pageInfo: { hasNextPage: false },
      edges: []
    };
  }
}

export function ProductListSection(props: DataProps<typeof fetchProductListSection>) {
  const [pages, setPages] = useState([props.data]);
  const lastPage = pages[pages.length - 1];
  const lastCursor = lastPage.edges[lastPage.edges.length - 1].cursor;
  const hasNextPage = lastPage.pageInfo.hasNextPage;
  const [checkHovered, setHover] = useState('');
  const [loader, load] = useAsyncFn(async () => {
    const productList = await fetchProductListSection(lastCursor);
    setPages([...pages, productList]);
  }, [lastCursor]);

  return (
    <section>
      <div className="m-main grid w-lil grid-cols-main sm:w-main xl:grid-cols-big">
        <div className="hidden flex-col lg:flex">
        {pages
        .flatMap(({edges}) => edges)
        .map(({node}) => (
          <NextLink key={node.handle} href={`/products/${node.handle}`} className={`group pr-[10px] font-EuroExtended font-black leading-[18px] outline outline-2 outline-offset-[-1px] ${checkHovered == node.handle ? 'bg-black text-white outline-black' : ''}`} onMouseEnter={() => setHover(node.handle)} onMouseLeave={() => setHover('')}><div className="flex items-center "><h3 className='mx-auto my-[30px] pl-[10px] text-[18px] xl:mx-0 xl:text-[28px]'>{node.title}</h3><p className='hidden pl-[10px] font-Eurostile text-[18px] xl:block'>{node.productType}</p></div></NextLink>
        ))
        }
        </div>
        <div className='col-start-1 col-end-5 grid lilLogo:grid-cols-2 lg:col-start-2 lg:grid-cols-3'>
        {pages
          .flatMap(({ edges }) => edges)
          .map(({ node }) => 
          {
            let imgToggle;            
            if(checkHovered === node.handle){
              imgToggle = node.images.nodes[1].url
            }else imgToggle = node.featuredImage.url
          return(
            <NextLink key={node.handle} href={`/products/${node.handle}`} className="group relative outline outline-2 outline-offset-[-1px]" onMouseEnter={() => setHover(node.handle)} onMouseLeave={() => setHover('')}>
              <div style={{backgroundImage: `url(${imgToggle})`}} className={`h-[400px] bg-cover bg-center pb-[150%]`}>
              <div className='absolute bottom-0 m-[30px] xl:hidden'>
              <div className='flex items-center'>
              <h3 className='font-EuroExtended text-[30px] font-black'>{node.title}</h3>
              <p className='font-regular ml-[10px] font-Eurostile text-[18px]'>{node.productType}</p>
              </div>
                <h4 className='font-EuroExtended font-black text-gray-500'>${node.priceRange.minVariantPrice.amount}</h4>
              </div>
              </div>
            </NextLink>
          )})}
          </div>
      </div>

      {hasNextPage && (
        <div className="text-center">
          <Button color={loader.error ? 'danger' : 'primary'} size="md" onClick={load} disabled={loader.loading}>
            {loader.loading ? 'Loading' : loader.error ? 'Try Again' : 'Load More'}
          </Button>
        </div>
      )}
    </section>
  );
}
