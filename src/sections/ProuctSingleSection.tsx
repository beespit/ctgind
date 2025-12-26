import { storefront } from '@site/utilities/storefront';
import { ProductPrice, ProductProvider, useCart } from '@shopify/hydrogen-react';
import { NextImage, DataProps, invariant, formatTitle, NextLink, useState, useEffect } from '@site/utilities/deps';
import { createClient } from "@site/prismicio";
import { values } from 'lodash';

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
        description: [{ truncateAt: 15000 }, true],
        descriptionHtml: [{ truncateAt: 15000 }, true],
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


  invariant(productByHandle, `Product not found: ${handle}. Available products: ${JSON.stringify(products?.edges?.map(e => e.node.handle))}`);

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
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: string}>({});
  const [checkHovered, setHover] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const { linesAdd, status, lines, cost, totalQuantity } = useCart();

  // Initialize selectedOptions with first available variant's options on mount
  useEffect(() => {
    if (props.data.variants.nodes.length > 0 && Object.keys(selectedOptions).length === 0) {
      // Find the first available variant
      const firstAvailableVariant = props.data.variants.nodes.find(variant =>
        variant.availableForSale && variant.quantityAvailable > 0
      );
      
      if (firstAvailableVariant) {
        const initialOptions: {[key: string]: string} = {};
        
        firstAvailableVariant.selectedOptions.forEach(option => {
          initialOptions[option.name] = option.value;
        });
        
        console.log('Initializing selectedOptions with first available variant:', initialOptions);
        setSelectedOptions(initialOptions);
      } else {
        // If no variants are available, don't auto-select anything
        console.log('No available variants found, not auto-selecting');
      }
    }
  }, [props.data.variants.nodes, selectedOptions]);

  // Debug: log cart state
  console.log('Cart state:', { status, lines, cost, totalQuantity });

  // Find the selected variant based on selected options
  const selectedVariant = props.data.variants.nodes.find(variant => {
    return variant.selectedOptions.every(option => 
      selectedOptions[option.name] === option.value
    );
  });

  const variantId = selectedVariant?.id || null;
  
  // Debug: log variant info
  console.log('Selected options:', selectedOptions);
  console.log('Selected variant:', selectedVariant);
  console.log('Variant ID:', variantId);
  
  // Create options array for the UI
  const options = props.data.options.map((option, optionIndex) => ({
    name: option.name,
    values: option.values.map(value => {
      // First option (parent) is always selectable (no stock checking)
      if (optionIndex === 0) {
        return {
          value,
          selected: selectedOptions[option.name] === value,
          disabled: false,
          outOfStock: false,
        };
      }
      
      // Subsequent options (children) are filtered based on parent selections
      // Build test selection with all previous options + this current value
      const testSelection = { ...selectedOptions, [option.name]: value };
      
      // Find if there's an available variant that matches all selected options
      const matchingVariant = props.data.variants.nodes.find(variant => {
        // Check if this variant matches all the test selection
        const matchesAllOptions = Object.entries(testSelection).every(([optName, optValue]) => {
          return variant.selectedOptions.some(variantOpt => 
            variantOpt.name === optName && variantOpt.value === optValue
          );
        });
        
        return matchesAllOptions && variant.availableForSale && variant.quantityAvailable > 0;
      });
      
      return {
        value,
        selected: selectedOptions[option.name] === value,
        disabled: !matchingVariant,
        outOfStock: !matchingVariant,
      };
    })
  }));

  const selectOption = (name: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Check if selected variant is available
  const isVariantAvailable = selectedVariant ? 
    selectedVariant.availableForSale && selectedVariant.quantityAvailable > 0 : false;
  
  // Determine button text and state
  const getButtonText = () => {
    if (!variantId) return 'Select Option';
    if (!isVariantAvailable) return 'Out of Stock';
    if (isAddingToCart) return 'Adding...';
    return 'Add to Cart';
  };

  const isButtonDisabled = !variantId || !isVariantAvailable || isAddingToCart;

  const handleAddToCart = async () => {
    if (!variantId) {
      console.log('No variant selected');
      return;
    }
    
    console.log('=== ADD TO CART STARTED ===');
    console.log('Adding to cart with variantId:', variantId);
    
    setIsAddingToCart(true);
    try {
      // Check if cart already exists
      const existingCartId = localStorage.getItem('shopify-cart-id');
      
      if (existingCartId) {
        // Add to existing cart
        console.log('Adding to existing cart:', existingCartId);
        
        const addMutation = `
          mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
              cart {
                id
                lines(first: 100) {
                  edges {
                    node {
                      id
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                          product {
                            title
                          }
                        }
                      }
                    }
                  }
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `;

        const addVariables = {
          cartId: existingCartId,
          lines: [
            {
              merchandiseId: variantId,
              quantity: 1
            }
          ]
        };

        const addResponse = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!,
          },
          body: JSON.stringify({
            query: addMutation,
            variables: addVariables
          })
        });

        const addResult = await addResponse.json();
        console.log('Cart lines add result:', addResult);

        if (addResult.errors) {
          throw new Error(addResult.errors[0].message);
        }

        if (addResult.data?.cartLinesAdd?.userErrors?.length > 0) {
          throw new Error(addResult.data.cartLinesAdd.userErrors[0].message);
        }

        console.log('Item added to existing cart successfully');
        
        // Trigger cart update event for header quantity
        window.dispatchEvent(new Event('cartUpdated'));
        
      } else {
        // Create new cart
        console.log('Creating new cart');
        
        const createMutation = `
          mutation cartCreate($cartInput: CartInput!) {
            cartCreate(input: $cartInput) {
              cart {
                id
                lines(first: 100) {
                  edges {
                    node {
                      id
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                          product {
                            title
                          }
                        }
                      }
                    }
                  }
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `;

        const createVariables = {
          cartInput: {
            lines: [
              {
                merchandiseId: variantId,
                quantity: 1
              }
            ]
          }
        };

        const createResponse = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!,
          },
          body: JSON.stringify({
            query: createMutation,
            variables: createVariables
          })
        });

        const createResult = await createResponse.json();
        console.log('Cart create result:', createResult);

        if (createResult.errors) {
          throw new Error(createResult.errors[0].message);
        }

        if (createResult.data?.cartCreate?.userErrors?.length > 0) {
          throw new Error(createResult.data.cartCreate.userErrors[0].message);
        }

        const cartId = createResult.data?.cartCreate?.cart?.id;
        if (cartId) {
          localStorage.setItem('shopify-cart-id', cartId);
          console.log('Cart created successfully with ID:', cartId);
          
          // Trigger cart update event for header quantity
          window.dispatchEvent(new Event('cartUpdated'));
        }
      }

    } catch (error) {
      console.error('Error adding to cart:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
      console.log('=== ADD TO CART FINISHED ===');
    }
  };

  const [activeDiagram, setActiveDiagram] = useState(0);
  const [units, unitSwitch] = useState(true)

  const [diagramToggle, setDiagramToggle] = useState(false);

  const shirtSizes = [
    { size: 'small', A: '19in', B: '22in', Acm: '48cm', Bcm: '56cm' },
    { size: 'medium', A: '21in', B: '23in', Acm: '53cm', Bcm: '58.5cm' },
    { size: 'large', A: '22in', B: '24in', Acm: '56cm', Bcm: '60cm' },
  ]

  const shortsSizes = [
    { size: 'small', A: '30in', B: '7.5in', Acm: '76cm', Bcm: '19cm' },
    { size: 'medium', A: '33in', B: '7.5in', Acm: '53cm', Bcm: '19cm' },
    { size: 'large', A: '35in', B: '7.5in', Acm: '56cm', Bcm: '19cm' },
  ]



  function renderDescription() {
    // Use descriptionHtml if available, fallback to plain description
    let content = props.data.descriptionHtml || props.data.description;

    // If we have HTML content, render it directly
    if (props.data.descriptionHtml) {
      return (
        <div 
          dangerouslySetInnerHTML={{ 
            __html: content 
          }}
          className="[&_a:hover]:text-blue-800 [&_a]:text-blue-600 [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5"
        />
      );
    }

    // Fallback: if only plain text description, handle URLs manually
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  }
  return (
    <ProductProvider data={props.data}>
      <section>
        <div className="relative mx-auto  mt-[148px] grid w-lil grid-cols-main sm:w-main md:mt-[83px] lilLogo:mt-[95px] xl:mt-[112px] xl:grid-cols-4">
          <div className=' fixed left-0 top-0 z-[2] h-[50px] w-[100%] bg-white' />

          <div className='fixed hidden w-[120px] flex-col md:col-span-1 lilLogo:flex xl:w-[calc((100%-60px)/4)]'>
            {props.data.edges.map((node) => (
              <a key={node.node.handle} href={`/products/${node.node.handle}`} className={`group w-full pr-[10px] font-EuroExtended font-black leading-[18px] outline outline-2 outline-offset-[-1px] ${checkHovered == node.node.handle ? 'bg-black text-white outline-black' : ''}`} onMouseEnter={() => setHover(node.node.handle)} onMouseLeave={() => setHover('')}><div className="flex items-center "><h3 className='mx-auto my-[30px] pl-[10px] text-[18px] xl:mx-0 xl:text-[28px]'>{node.node.title}</h3><p className='hidden pl-[10px] font-Eurostile text-[18px] xl:block'>{node.node.productType}</p></div></a>
            ))}
          </div>

          <div className="col-span-4 md:col-span-2  lilLogo:col-start-2">
            <div className="col-span-2">
              {props.data.images.nodes.map((pic) => (
                <div key={pic.url} className="outline outline-2 outline-offset-[-1px]">
                  <img
                    src={pic.url}
                    alt={pic.altText || ''}
                    className="w-[100%] outline outline-2 outline-offset-[-1px]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="sticky top-[112px] col-span-4 h-fit md:col-span-2 lilLogo:col-span-1">

            <div className="outline outline-2 outline-offset-[-1px]">
              <div className='p-[20px]'>
                <h1 className="font-EuroExtended text-[22px] font-extrabold">{props.data.title}</h1>
                <h2 className='font-Eurostile'>{props.data.productType}</h2>
              </div>
              <div className='p-[20px] font-Eurostile outline outline-2 outline-offset-[-1px] [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800'>
                {renderDescription()}
              </div>

              {props.data.title === "TS_01" ?
                <div>
                  <div className='flex w-full justify-between font-Eurostile outline outline-2 outline-offset-[-1px]'>
                    <h3 className='p-[7px] px-[20px]'>sizing guide</h3>
                    <button className={`w-[34px] px-[8px] outline outline-2 outline-offset-[-1px] ${diagramToggle ? 'bg-black' : ''}`} onClick={() => setDiagramToggle(!diagramToggle)}><NextImage alt='' width={500} height={500} src='/images/arrow.svg' className={`${diagramToggle ? 'invert' : 'rotate-180'}`} /></button>
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
                      <NextImage width={500} height={500} src='/images/shirtdiagram.avif' alt='' /></div>
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
                    <button className={`w-[34px] px-[8px] outline outline-2 outline-offset-[-1px] ${diagramToggle ? 'bg-black' : ''}`} onClick={() => setDiagramToggle(!diagramToggle)}><NextImage alt='' width={500} height={500} src='/images/arrow.svg' className={`${diagramToggle ? 'invert' : 'rotate-180'}`} /></button>
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
                {/* Only show options if there are meaningful variants (not just "Default Title") */}
                {props.data.options.some(option => 
                  option.name !== 'Title' && 
                  option.values.length > 1
                ) ? (
                  options.map(({ name, values }) => {
                    // Skip rendering "Title" option or single-value options
                    if (name === 'Title' || values.length <= 1) return null;
                    
                    return (
                      <div key={name} className='mb-[20px]'>
                        {values.map(({ value, selected, disabled, outOfStock }, index) => {
                          return (
                            <button
                              className={`w-[100%] p-[10px] font-Eurostile outline outline-2 outline-offset-[-1px] ${
                                selected 
                                  ? 'bg-black text-white outline-black' 
                                  : disabled || outOfStock 
                                    ? 'cursor-not-allowed text-gray-400' 
                                    : 'hover:bg-gray-50'
                              }`}
                            key={`${name}-${value}-${selected}-${outOfStock}`}
                            disabled={disabled}
                            onClick={() => !disabled && selectOption(name, value)}
                          >
                            {value}{outOfStock ? ' (Out of Stock)' : ''}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                ) : null}
              </div>
              <div className='p-[20px]'>
                <button
                  onClick={handleAddToCart}
                  disabled={isButtonDisabled}
                  className={`w-full p-[10px] font-Eurostile outline outline-2 outline-black ${
                    isButtonDisabled 
                      ? 'cursor-not-allowed text-gray-400' 
                      : 'hover:bg-black hover:text-white'
                  }`}
                >
                  {getButtonText()}
                </button>
                <NextLink href='/cart'><div className='mt-[20px] w-full p-[10px] text-center font-Eurostile outline outline-2'>View Cart</div></NextLink>

              </div>
            </div>

          </div>

        </div>
      </section>
    </ProductProvider>
  );
}
