import { createClient } from "@site/prismicio";
import { useEffect, useState } from "react"
import styled from 'styled-components'
import { PrismicRichText } from '@prismicio/react'

//styled components
const Container = styled.div`
display: flex;
flex-wrap: wrap;
position: relative;
img{
display: block;
}
`

export function DetailsSection(params) {
  const [fineprint, setData] = useState<any | null>(null);


  useEffect(() => {
    const client = createClient();

    const callData = async () => {
    const fineprint = await client.getByUID("granular", params.uid);

    setData(fineprint);
  }
  callData();
  }, []
  );


if(fineprint != null){
  return (
    <Container className='out-ctg relative mx-auto w-lil sm:w-main'>
        <div>woo</div>
    </Container>
);
}else return null
  
}


