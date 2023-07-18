import { createClient } from "@site/prismicio";
import { useEffect, useState } from "react"
import { SliceZone } from '@prismicio/react'
import { components } from '../slices'
import styled from 'styled-components'

//styled components
const Container = styled.div`
display: flex;
flex-wrap: wrap;
position: relative;
img{
display: block;
}
`

export function HeroSection() {
  const [home, setData] = useState<any | null>(null);


  useEffect(() => {
    const client = createClient();

    const callData = async () => {
    const home = await client.getSingle('homepage');
    setData(home);
  }
  callData();
  }, []
  );
if(home != null){
  return (
    <Container className='relative z-[-1] mt-[-148px] md:mt-[-116px]'>
    <SliceZone slices={home.data.slices} components={components} />
    </Container>
);
}else return null
  
}


