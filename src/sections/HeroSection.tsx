import { NextLink } from '@site/utilities/deps';
import { createClient } from "@site/prismicio";
import { useEffect, useState } from "react"
import { PrismicNextImage } from '@prismicio/next'
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

const NavHold = styled.div`
position: absolute;
width: 100%;
display: flex;
`

export function HeroSection() {
  const [home, setData] = useState('');

  const client = createClient();

  useEffect(() => {
    const callData = async () => {
    const home = await client.getSingle('homepage');
    setData(home);
  }
  callData();
  }, []
  );
  console.log(home)
if(home != ''){
  return (
    <Container className='relative z-[-1] mt-[-148px] md:mt-[-116px]'>
    <SliceZone slices={home.data.slices} components={components} />
    </Container>
);
}else return null
  
}


