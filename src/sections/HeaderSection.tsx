import { useState, NextLink, useRouter, clsx } from '@site/utilities/deps';
import { Dialog, Popover } from '@headlessui/react';
import { useCart } from '@shopify/hydrogen-react';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import useMediaQuery from '@mui/material/useMediaQuery'


const mainMenuItems: { text: string; href: string }[] = [
  {
    text: 'Products',
    href: '/products',
  },
];

export function HeaderSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { totalQuantity } = useCart();
  const logoBreak = useMediaQuery('(min-width:1200px)');
  const logoBreak2 = useMediaQuery('(max-width:500px)');

  let logoCheck;
  if(logoBreak || logoBreak2){
    logoCheck=true;
  }else logoCheck=false;

  function isMenuItemActive(href: string) {
    const { pathname } = new URL('https://x' + href);

    return router.pathname.startsWith(pathname);
  }
  return (
    <header className={`${router.pathname === '/products/[handle]' ? ' fixed top-0 z-[13] w-[100%]' : ''}`}>
      <div className="relative ml-[15px] mt-[15px] flex w-lil bg-white sm:ml-[30px] sm:mt-[30px] sm:w-main">
      <ul className="grid w-full grid-cols-small md:grid-cols-main xl:grid-cols-big">
        <NextLink href='/' className='col-span-full md:col-span-1'><li className="h-full p-[5px] outline outline-2 outline-offset-[-1px] lilLogo:p-[15px]">{logoCheck ? <img src='/images/logo.svg' className="w-[200px] p-[10px]"/> : <img src='/images/logoSmall.svg' className="h-[35px] "/>}</li></NextLink>
        <NextLink href='/' className="hover:bg-black outline-offset-[-1px] font-sans ${surt.variable}"><li className="h-full p-[15px] outline outline-2 outline-offset-[-1px] hover:text-white hover:outline-black">About</li></NextLink>
        <NextLink href='/products' className="hover:bg-black outline-offset-[-1px] font-sans ${surt.variable}"><li className={`h-full p-[15px] outline outline-2 outline-offset-[-1px] hover:text-white hover:outline-black ${router.pathname === '/products'  ? 'bg-[#000] text-white outline-black' : ''} ${router.pathname === '/products/[handle]'  ? 'bg-[#000] text-white outline-black' : ''}`}>Products</li></NextLink>
        <NextLink href='/process' className="hover:bg-black outline-offset-[-1px] font-sans ${surt.variable}"><li className={`h-full p-[15px] outline outline-2 outline-offset-[-1px] hover:text-white hover:outline-black ${router.pathname === '/process' ? 'bg-[#000] text-white outline-black' : ''}`}>Process</li></NextLink>
       <NextLink href='/cart'><div className='absolute bottom-[54px] right-0 top-[0] w-[30px] bg-white outline outline-2 outline-offset-[-1px] hover:bg-black md:bottom-0 lilLogo:w-[50px]'>
        <div className='relative flex h-full justify-center align-middle hover:outline-black'><img src='/images/cart.svg' className='w-[20px] fill-white hover:stroke-white lilLogo:w-[30px]'/><div className={`absolute right-[-15px] top-[-15px] ${totalQuantity > 0 ? '' : 'hidden'} flex h-[30px] w-[30px] justify-center rounded-full bg-black align-middle font-Eurostile font-extrabold text-white`}>{totalQuantity}</div></div>
      </div></NextLink>
      </ul>
     
      </div>
    </header>
  );
}
