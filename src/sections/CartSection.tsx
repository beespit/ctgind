import { NextImage, NextLink } from '@site/utilities/deps';
import {
  CartCost,
  useCart,
  CartLineProvider,
  CartLineQuantityAdjustButton,
  Money,
  CartLineQuantity,
  CartCheckoutButton,
} from '@shopify/hydrogen-react';

export function CartSection() {
  const cart = useCart();
  return (
    <section className='mx-auto min-h-[calc(100vh-100px)] w-lil outline outline-2 outline-offset-[-1px] sm:w-main'>
      <ul role="list" className="">
        {cart.lines?.map((line) => (
          <li key={line?.id} className="flex outline outline-2 outline-offset-[-1px]">
            <CartLineProvider line={line!}>
              <div className="hidden h-[120px] w-[120px] shrink-0 overflow-hidden outline outline-2 outline-offset-[-1px] lilLogo:block">
                <NextImage
                  src={line?.merchandise?.image?.url!}
                  alt={line?.merchandise?.image?.altText || ''}
                  width={line?.merchandise?.image?.width!}
                  height={line?.merchandise?.image?.height!}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="flex w-full flex-wrap justify-between align-middle font-Eurostile md:flex-nowrap">
                <div className='w-full p-[20px]'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-[22px] font-extrabold'>
                      <NextLink href={'/products/' + line?.merchandise?.product?.handle}>
                        {line?.merchandise?.product?.title}
                      </NextLink>
                    </h3>
                    <Money className="h-fit w-[120px] text-center md:hidden" data={line?.cost?.totalAmount!}></Money>

                    </div>
                  
                  <p className="mt-1 text-sm text-gray-500">
                    {line?.merchandise?.selectedOptions?.map((option, index) => (
                      <span key={option?.name}>
                        {index ? ' / ' : ''}
                        {option?.value}
                      </span>
                    ))}
                  </p>

                  
                </div>
                <div className='relative flex h-[60px] w-full flex-wrap items-center md:h-auto md:w-auto'>
                <div className='mr-0 flex h-full w-full outline outline-2 outline-offset-[-1px] md:mr-[20px]  md:h-auto md:w-auto md:items-center'>
                  <CartLineQuantityAdjustButton adjust="decrease" className='h-full w-[60px] outline outline-2 outline-offset-[-1px] md:w-[30px]'>-</CartLineQuantityAdjustButton>    
                  <CartLineQuantity className='w-full items-center self-center text-center md:self-auto'></CartLineQuantity>
                  <CartLineQuantityAdjustButton adjust="increase" className='w-[60px] outline outline-2 outline-offset-[-1px] md:w-[30px]'>+</CartLineQuantityAdjustButton>    
                </div>
                  <CartLineQuantityAdjustButton adjust="remove" className='hidden w-full pr-[20px] text-center md:absolute md:bottom-[10px] md:block'>remove</CartLineQuantityAdjustButton>    
                </div>
                      
                <div className='hidden w-[120px] items-center outline outline-2 outline-offset-[-1px] md:flex'>
                <Money className="h-fit w-[120px] text-center " data={line?.cost?.totalAmount!}></Money>
                </div>
              </div>
            </CartLineProvider>
          </li>
        ))}
      </ul>

      <div className="">
        <div className="flex items-stretch justify-between font-Eurostile font-extrabold outline outline-2 outline-offset-[-1px]">
          <p className='p-[20px] font-normal'>Subtotal</p>
          <div className='flex w-[120px] items-center justify-center text-center outline outline-2 outline-offset-[-1px]'>
            <CartCost amountType="subtotal" />
          </div>
        </div>
        <p className="p-[20px] font-Eurostile">Shipping and taxes calculated at checkout.</p>
        <div className="flex">
          <CartCheckoutButton className="flex-1 border px-6 py-3 text-base font-medium outline outline-2 outline-offset-[-1px] hover:bg-black hover:text-white hover:outline-black">
            Checkout
          </CartCheckoutButton>
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
