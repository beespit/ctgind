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

export function ProcessSection() {
  const [process, setData] = useState('');

  const client = createClient();

  useEffect(() => {
    const callData = async () => {
    const process = await client.getSingle('process');
    setData(process);
  }
  callData();
  }, []
  );
  console.log(process)
if(process != ''){
  return (
    <Container className='relative mx-auto w-lil outline outline-2 outline-offset-[-1px] sm:w-main'>
    <SliceZone slices={process.data.slices} components={components} />
    </Container>
);
}else return null
  
}


