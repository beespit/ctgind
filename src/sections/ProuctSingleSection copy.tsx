import { storefront } from '@site/utilities/storefront';
import { ProductPrice, AddToCartButton, ProductProvider } from '@shopify/hydrogen-react';
import { NextImage, DataProps, invariant, useVariantSelector, formatTitle,  NextLink, useState } from '@site/utilities/deps';
import { createClient } from "@site/prismicio";

export async function fetchProductSingleSection(handle: string) {
  const { productByHandle, products } = await storefront.query({
    products: [
      { first: 24, reverse: true || null },
      {
        edges: {
          node: {
            handle: true,
            title: true,
            productType: true,
          }
        }
      }
    ],
    productByHandle: [
      { handle },
      {
        title: true,
        description: [{truncateAt: 15000},true],
        productType: true,
        seo: {
          title: true,
          description: true,
        },
        priceRange: {
          minVariantPrice: {
            amount: true,
            currencyCode: true,
          },
        },
        images: [
          { first: 250 },
          {
            nodes: {
              id: true,
              url: [
                {
                  transform: {
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
        options: [
          { first: 250 },
          {
            id: true,
            name: true,
            values: true,
          },
        ],
        variants: [
          { first: 250 },
          {
            nodes: {
              id: true,
              availableForSale: true,
              quantityAvailable: true,
              priceV2: {
                amount: true,
                currencyCode: true,
              },
              selectedOptions: {
                name: true,
                value: true,
              },
              image: {
                id: true,
              },
            },
          },
        ],
      },
    ],
  });
  

  invariant(productByHandle, `Product not found: ${handle}`);

  const { seo, title, description } = productByHandle;

  return {
    ...productByHandle,
    ...products,
    seo: {
      title: formatTitle(seo.title || title),
    },
  };
}

export function ProductSingleSection(props: DataProps<typeof fetchProductSingleSection>) {
  const { variantId, options, selectOption } = useVariantSelector(props.data);
  const [checkHovered, setHover] = useState('');
  const [checkQuantity, setQuantity] = useState(null);
  
  const [activeDiagram, setActiveDiagram] = useState(0);
  const [units, unitSwitch] = useState(true)

  const [diagramToggle, setDiagramToggle] = useState(false);

  const shirtSizes = [
    {size: 'small', A: '19in', B: '22in', Acm: '48cm', Bcm: '56cm'},
    {size: 'medium', A: '21in', B: '23in', Acm: '53cm', Bcm: '58.5cm'},
    {size: 'large', A: '22in', B: '24in', Acm: '56cm', Bcm: '60cm'},
  ]

  const shortsSizes = [
    {size: 'small', A: '30in', B: '7.5in', Acm: '76cm', Bcm: '19cm'},
    {size: 'medium', A: '33in', B: '7.5in', Acm: '53cm', Bcm: '19cm'},
    {size: 'large', A: '35in', B: '7.5in', Acm: '56cm', Bcm: '19cm'},
  ]



  function createMarkup() {
    return {__html: props.data.description};
  }
  return (
    <ProductProvider data={props.data}>
      <section>
        <div className="relative mx-auto  mt-[148px] grid w-lil grid-cols-main sm:w-main md:mt-[83px] lilLogo:mt-[95px] xl:mt-[112px] xl:grid-cols-4">
        <div className=' fixed left-0 top-0 z-[2] h-[50px] w-[100%] bg-white'/>
         
          <div className='fixed hidden w-[120px] flex-col md:col-span-1 lilLogo:flex xl:w-[calc((100%-60px)/4)]'>
          {props.data.edges.map((node) => 
          
          (
           <>
          <a key={node.node.handle} href={`/products/${node.node.handle}`} className={`group w-full pr-[10px] font-EuroExtended font-black leading-[18px] outline outline-2 outline-offset-[-1px] ${checkHovered == node.node.handle ? 'bg-black text-white outline-black' : ''}`} onMouseEnter={() => setHover(node.node.handle)} onMouseLeave={() => setHover('')}><div className="flex items-center "><h3 className='mx-auto my-[30px] pl-[10px] text-[18px] xl:mx-0 xl:text-[28px]'>{node.node.title}</h3><p className='hidden pl-[10px] font-Eurostile text-[18px] xl:block'>{node.node.productType}</p></div></a>
            </>
          ))}
          </div>

          <div className="col-span-4 md:col-span-2  lilLogo:col-start-2">
            <div className="col-span-2">
              {props.data.images.nodes.map((pic) => 

              <div key={pic.url} className="outline outline-2 outline-offset-[-1px]">
              <img
                src={pic.url}
                alt={pic.altText || ''}
                className="w-[100%] outline outline-2 outline-offset-[-1px]"
              />
              </div>
              )}
            </div>
          </div>

          <div className="sticky top-[112px] col-span-4 h-fit md:col-span-2 lilLogo:col-span-1">
              
              <div className="outline outline-2 outline-offset-[-1px]">
              <div className='p-[20px]'>
              <h1 className="font-EuroExtended text-[22px] font-extrabold">{props.data.title}</h1>
              <h2 className='font-Eurostile'>{props.data.productType}</h2>
              </div>
              <div
                className='p-[20px] font-Eurostile outline outline-2 outline-offset-[-1px]' 
                dangerouslySetInnerHTML={createMarkup()} 
              />

              {props.data.title === "TS_01" ?       
              <div>
              <div className='flex w-full justify-between font-Eurostile outline outline-2 outline-offset-[-1px]'>
                <h3 className='p-[7px] px-[20px]'>sizing guide</h3>
                <button className={`w-[34px] px-[8px] outline outline-2 outline-offset-[-1px] ${diagramToggle ? 'bg-black' : ''}`} onClick={() => setDiagramToggle(!diagramToggle)}><NextImage alt='' width={500} height={500} src='/images/arrow.svg' className={`${diagramToggle ? 'invert' : 'rotate-180'}`}/></button>
              </div>
              <div className={`${diagramToggle ? '' : 'hidden'}`}>
            <div className={`flex w-full justify-between font-Eurostile`}>
              {shirtSizes.map((size, index) =>
              <button key={index} onClick={() => setActiveDiagram(index)} className={`w-full p-[5px] outline outline-2 outline-offset-[-1px] ${activeDiagram === index ? 'bg-black text-white outline-black' : ''}`}>{size.size}</button>
              )}
            </div>
            <div className='relative outline outline-2 outline-offset-[-1px]'>
              <div className='absolute right-0 top-0 flex font-EuroExtended text-[12px] font-extrabold'>
                <button className={`p-[5px] ${units ? '' : 'text-gray-300'}`} onClick={() => unitSwitch(true)}>in.</button>
                <button className={`p-[5px] ${units ? 'text-gray-300' : ''}`} onClick={() => unitSwitch(false)}>cm.</button>
              </div>
              <NextImage width={500} height={500} src='/images/shirtdiagram.avif' alt=''/></div>
            <div className='flex w-full justify-between font-Eurostile'>
              <h3 className='w-full p-[5px] text-center outline outline-2 outline-offset-[-1px]'>A.{units ? shirtSizes[activeDiagram].A : shirtSizes[activeDiagram].Acm}</h3>
              <h3 className='w-full p-[5px] text-center outline outline-2 outline-offset-[-1px]'>B.{units ? shirtSizes[activeDiagram].B : shirtSizes[activeDiagram].Bcm}</h3>
            </div>
            </div>
            </div>
              :
              null
            }

              {props.data.title === "SH_01" ?       
              <div>
              <div className='flex w-full justify-between font-Eurostile outline outline-2 outline-offset-[-1px]'>
                <h3 className='p-[7px] px-[20px]'>sizing guide</h3>
                <button className={`w-[34px] px-[8px] outline outline-2 outline-offset-[-1px] ${diagramToggle ? 'bg-black' : ''}`} onClick={() => setDiagramToggle(!diagramToggle)}><NextImage alt='' width={500} height={500} src='/images/arrow.svg' className={`${diagramToggle ? 'invert' : 'rotate-180'}`}/></button>
              </div>
              <div className={`${diagramToggle ? '' : 'hidden'}`}>
            <div className={`flex w-full justify-between font-Eurostile`}>
              {shortsSizes.map((size, index) =>
              <button key={index} onClick={() => setActiveDiagram(index)} className={`w-full p-[5px] outline outline-2 outline-offset-[-1px] ${activeDiagram === index ? 'bg-black text-white outline-black' : ''}`}>{size.size}</button>
              )}
            </div>
            <div className='relative outline outline-2 outline-offset-[-1px]'>
              <div className='absolute right-0 top-0 flex font-EuroExtended text-[12px] font-extrabold'>
                <button className={`p-[5px] ${units ? '' : 'text-gray-300'}`} onClick={() => unitSwitch(true)}>in.</button>
                <button className={`p-[5px] ${units ? 'text-gray-300' : ''}`} onClick={() => unitSwitch(false)}>cm.</button>
              </div>
              <NextImage alt='' width={500} height={500} src='/images/shortsdiagram.avif' /></div>
            <div className='flex w-full justify-between font-Eurostile'>
              <h3 className='w-full p-[5px] text-center outline outline-2 outline-offset-[-1px]'>A.{units ? shortsSizes[activeDiagram].A : shortsSizes[activeDiagram].Acm} max</h3>
              <h3 className='w-full p-[5px] text-center outline outline-2 outline-offset-[-1px]'>B.{units ? shortsSizes[activeDiagram].B : shortsSizes[activeDiagram].Bcm} max</h3>
            </div>
            </div>
            </div>
              :
              null
            }
                
              

              <div className="m-0 mb-5 p-[20px] pb-0 font-Eurostile text-[22px] font-extrabold tracking-tight">
                <ProductPrice data={props.data}></ProductPrice>
              </div>
              <div className="mb-2">
          
              {options.map(({ name, values }) =>
              
              { 
                return(
                 <div key={name} className='mb-[20px]'>   
                 {values.map(({ value, selected, disabled }, index) => {
                  const inStock = props.data.variants.nodes[index].quantityAvailable;
                  console.log(props.data.variants)
                   return (
                  <>
                 
                     <button
                      className={`w-[100%] p-[10px] font-Eurostile outline outline-2 outline-offset-[-1px] ${inStock > 0 ? ` ${selected ? 'bg-black text-white outline-black' : ''}` : '!text-gray-300 outline-black'}`}
                       key={value}
                       disabled={disabled}
                       onClick={() => {selectOption(name, value); setQuantity(inStock)}}
                     >
                       {value} {inStock > 0 ? null : '-out of stock'}
                       
                     </button>
                     </>
                   );
                 })}
               </div>
                )})}
              </div>
                 <div className='p-[20px]'>
              <AddToCartButton
                variantId={variantId}
                className="w-full p-[10px] font-Eurostile outline outline-2 outline-black disabled:text-gray-300"
              >
                {checkQuantity === null ? 'select option' : checkQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </AddToCartButton>
              <NextLink href='/cart'><div className='mt-[20px] w-full p-[10px] text-center font-Eurostile outline outline-2'>View Cart</div></NextLink>

              </div>
            </div>

          </div>

        </div>
      </section>
    </ProductProvider>
  );
}
