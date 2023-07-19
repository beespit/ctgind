import { PageProps, NextSeo, fetchServerSideProps } from '@site/utilities/deps';
import { StoreLayout } from '@site/layouts/StoreLayout';
import { createClient } from "@site/prismicio";
import { PrismicRichText } from '@prismicio/react'

export default function Page({page}) {
  return (
    <StoreLayout>
      <NextSeo title={page.uid} description="Details" />
      <div className='out-ctg mx-auto w-main font-Eurostile'>
        <div className='p-[20px] [&>h2]:mb-[20px] [&>h2]:font-EuroExtended [&>h2]:text-[42px] [&>h4]:mb-[5px] [&>h4]:text-[28px] [&>h4]:leading-[28px] [&>h6]:text-[18px] [&>p]:mb-[20px]'>
        <PrismicRichText field={page.data.text}/>
        </div>
      </div>
    </StoreLayout>
  );
}

export async function getStaticProps({ params }) {
    const client = createClient();
  
    const page = await client.getByUID("granular", params.uid);
    
    return {
      props: { page },
    };
  }

  export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}