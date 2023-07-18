import { ReactNode } from '@site/utilities/deps';
import { HeaderSection } from '@site/sections/HeaderSection';
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
      </Head>
      <HeaderSection />
      <main className="">{props.children}
  </main>
    </>
  );
}
