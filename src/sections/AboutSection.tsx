import { createClient } from "@site/prismicio";
import { useEffect, useState } from "react"
import styled from 'styled-components'
import { PrismicRichText } from '@prismicio/react'
import { NextImage } from "@site/utilities/deps";

//styled components
const Container = styled.div`
display: flex;
flex-wrap: wrap;
position: relative;
img{
display: block;
}
`

export function AboutSection() {
  const [about, setData] = useState<any | null>(null);


  useEffect(() => {
    const client = createClient();

    const callData = async () => {
    const about = await client.getSingle('about');
    setData(about);
  }
  callData();
  }, []
  );
  console.log(about)
if(about != null){
  return (
    <Container className='out-ctg relative mx-auto w-lil sm:w-main'>
    <div className="grid w-full grid-cols-4 font-Eurostile md:grid-cols-main xl:grid-cols-4">
    <div className="out-ctg col-span-4 p-[20px] md:col-span-2 md:max-h-[500px] md:overflow-y-auto xl:col-span-1 xl:max-h-[1000px] [&>h2]:text-[24px] [&>h2]:font-extrabold [&>h2]:uppercase [&>h3]:mb-[5px] [&>p]:mb-[20px]">
    <PrismicRichText field={about.data.about} />
    </div>  
    
    <div className="out-ctg col-span-4 p-[20px] md:col-span-2 md:max-h-[500px] md:overflow-y-auto xl:col-span-1 xl:max-h-[1000px] [&>h2]:text-[24px] [&>h2]:font-extrabold [&>h2]:uppercase [&>h3]:mb-[5px] [&>p]:mb-[20px]">
    <PrismicRichText field={about.data.priorities} />
    </div> 
    <div className="out-ctg col-span-4 xl:col-span-2">
    <NextImage src={about.data.image.url} width={500} height={500} className={`out-ctg min-h-full w-full object-cover object-top`}></NextImage>
    </div>
    </div>
    </Container>
);
}else return null
  
}


