import { ReactNode } from '@site/utilities/deps';
import { HeaderSection } from '@site/sections/HeaderSection';
import { FooterSection } from '@site/sections/FooterSection';
import { repositoryName } from '@site/prismicio';
import Head from 'next/head'

interface Props {
  children: ReactNode;
}

export function StoreLayout(props: Props) {
  return (
    <>
     <Head>
     <link rel="stylesheet" href="https://use.typekit.net/wnh5qkt.css"/>
     <link rel="icon" href="/icons/favicon.ico" sizes="any" />

      </Head>
      <HeaderSection />
      <main>{props.children}
      <div className='relative'>
      <FooterSection/>
      </div>
  </main>
    </>
  );
}
