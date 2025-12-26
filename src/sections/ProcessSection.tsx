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

export function ProcessSection() {
  const [process, setData] = useState<any | null>(null);


  useEffect(() => {
    const client = createClient();

    const callData = async () => {
    const process = await client.getSingle('process');
    setData(process);
  }
  callData();
  }, []
  );
  console.log(process)
if(process != null){
  return (
    <Container className='relative mx-auto w-lil outline outline-2 outline-offset-[-1px] sm:w-main'>
    <SliceZone slices={process.data.slices} components={components} />
    </Container>
);
}else return null
  
}


