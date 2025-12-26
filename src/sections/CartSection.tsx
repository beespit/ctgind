import { NextImage, NextLink, useState, useEffect } from '@site/utilities/deps';

export function CartSection() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const cartId = localStorage.getItem('shopify-cart-id');
    if (!cartId) {
      setLoading(false);
      return;
    }

    try {
      const query = `
        query getCart($cartId: ID!) {
          cart(id: $cartId) {
            id
            checkoutUrl
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
                        handle
                      }
                      title
                      image {
                        url
                        altText
                        width
                        height
                      }
                      price {
                        amount
                        currencyCode
                      }
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      `;

      const response = await fetch(`https://ctg-ind.myshopify.com/api/2023-01/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': 'f16019889621a22ba4630fba32e6eda3',
        },
        body: JSON.stringify({
          query,
          variables: { cartId }
        })
      });

      const result = await response.json();
      console.log('Cart fetch result:', result);

      if (result.data?.cart) {
        setCart(result.data.cart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    if (!cart?.checkoutUrl) {
      alert('Unable to proceed to checkout. Please try again.');
      return;
    }
    
    setCheckingOut(true);
    console.log('Redirecting to checkout:', cart.checkoutUrl);
    
    // Redirect to Shopify checkout
    window.location.href = cart.checkoutUrl;
  };

  const updateLineQuantity = async (lineId: string, quantity: number) => {
    const cartId = localStorage.getItem('shopify-cart-id');
    if (!cartId) return;

    try {
      const mutation = `
        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
              id
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const response = await fetch(`https://ctg-ind.myshopify.com/api/2023-01/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': 'f16019889621a22ba4630fba32e6eda3',
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            cartId,
            lines: [{ id: lineId, quantity }]
          }
        })
      });

      const result = await response.json();
      
      if (result.errors || result.data?.cartLinesUpdate?.userErrors?.length > 0) {
        console.error('Error updating cart:', result.errors || result.data.cartLinesUpdate.userErrors);
        return;
      }

      // Refresh cart data
      await fetchCart();
      
      // Trigger cart update event for header quantity
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const removeLineItem = async (lineId: string) => {
    const cartId = localStorage.getItem('shopify-cart-id');
    if (!cartId) return;

    try {
      const mutation = `
        mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
              id
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const response = await fetch(`https://ctg-ind.myshopify.com/api/2023-01/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': 'f16019889621a22ba4630fba32e6eda3',
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            cartId,
            lineIds: [lineId]
          }
        })
      });

      const result = await response.json();
      
      if (result.errors || result.data?.cartLinesRemove?.userErrors?.length > 0) {
        console.error('Error removing item:', result.errors || result.data.cartLinesRemove.userErrors);
        return;
      }

      // Refresh cart data
      await fetchCart();
      
      // Trigger cart update event for header quantity
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  if (loading) {
    return (
      <section className='mx-auto min-h-[calc(100vh-100px)] w-lil outline outline-2 outline-offset-[-1px] sm:w-main'>
        <div className="p-8 text-center">
          <p>Loading cart...</p>
        </div>
      </section>
    );
  }

  if (!cart || !cart.lines.edges.length) {
    return (
      <section className='mx-auto min-h-[calc(100vh-100px)] w-lil outline outline-2 outline-offset-[-1px] sm:w-main'>
        <div className="p-8 text-center">
          <p>Your cart is empty</p>
          <NextLink href="/products" className="font-medium text-indigo-600 hover:text-indigo-500">
            Continue Shopping
          </NextLink>
        </div>
      </section>
    );
  }

  return (
    <section className='mx-auto min-h-[calc(100vh-100px)] w-lil outline outline-2 outline-offset-[-1px] sm:w-main'>
      <ul role="list" className="">
        {cart.lines.edges.map(({ node: line }) => (
          <li key={line.id} className="flex outline outline-2 outline-offset-[-1px]">
            <div className="hidden h-[120px] w-[120px] shrink-0 overflow-hidden outline outline-2 outline-offset-[-1px] lilLogo:block">
              {line.merchandise.image && (
                <NextImage
                  src={line.merchandise.image.url}
                  alt={line.merchandise.image.altText || ''}
                  width={line.merchandise.image.width}
                  height={line.merchandise.image.height}
                  className="h-full w-full object-cover object-center"
                />
              )}
            </div>

            <div className="flex w-full flex-wrap justify-between align-middle font-Eurostile md:flex-nowrap">
              <div className='w-full p-[20px]'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-[22px] font-extrabold'>
                    <NextLink href={'/products/' + line.merchandise.product.handle}>
                      {line.merchandise.product.title}
                    </NextLink>
                  </h3>
                  <div className="h-fit w-[120px] text-center md:hidden">
                    ${line.cost.totalAmount.amount}
                  </div>
                </div>
                
                <p className="mt-1 text-sm text-gray-500">
                  {line.merchandise.selectedOptions?.filter(option => 
                    option.name !== 'Title' && option.value !== 'Default Title'
                  ).map((option, index, filteredArray) => (
                    <span key={option.name}>
                      {index ? ' / ' : ''}
                      {option.value}
                    </span>
                  ))}
                </p>
              </div>
              
              <div className='relative flex h-[60px] w-full flex-wrap items-center md:h-auto md:w-auto'>
                <div className='mr-0 flex h-full w-full outline outline-2 outline-offset-[-1px] md:mr-[20px] md:h-auto md:w-auto md:items-center'>
                  <button 
                    onClick={() => updateLineQuantity(line.id, Math.max(0, line.quantity - 1))}
                    className='h-full w-[60px] outline outline-2 outline-offset-[-1px] md:w-[30px] hover:bg-gray-100'
                  >
                    -
                  </button>    
                  <div className='w-full items-center self-center text-center md:self-auto'>{line.quantity}</div>
                  <button 
                    onClick={() => updateLineQuantity(line.id, line.quantity + 1)}
                    className='w-[60px] outline outline-2 outline-offset-[-1px] md:w-[30px] hover:bg-gray-100'
                  >
                    +
                  </button>    
                </div>
                <button 
                  onClick={() => removeLineItem(line.id)}
                  className='hidden w-full pr-[20px] text-center md:absolute md:bottom-[10px] md:block hover:text-red-600'
                >
                  remove
                </button>    
              </div>
                    
              <div className='hidden w-[120px] items-center outline outline-2 outline-offset-[-1px] md:flex'>
                <div className="h-fit w-[120px] text-center">${line.cost.totalAmount.amount}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="">
        <div className="flex items-stretch justify-between font-Eurostile font-extrabold outline outline-2 outline-offset-[-1px]">
          <p className='p-[20px] font-normal'>Subtotal</p>
          <div className='flex w-[120px] items-center justify-center text-center outline outline-2 outline-offset-[-1px]'>
            ${cart.cost.subtotalAmount.amount}
          </div>
        </div>
        <p className="p-[20px] font-Eurostile">Shipping and taxes calculated at checkout.</p>
        <div className="flex">
          <button 
            onClick={handleCheckout}
            disabled={checkingOut}
            className="flex-1 border px-6 py-3 text-base font-medium outline outline-2 outline-offset-[-1px] hover:bg-black hover:text-white hover:outline-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {checkingOut ? 'Redirecting...' : 'Checkout'}
          </button>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            <span>or</span>
            <span> </span>
            <NextLink href="/products" className="font-medium text-indigo-600 hover:text-indigo-500">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </NextLink>
          </p>
        </div>
      </div>
    </section>
  );
}
