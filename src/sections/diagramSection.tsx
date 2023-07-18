import { NextLink } from '@site/utilities/deps';
import { createClient } from "@site/prismicio";
import { useEffect, useState } from "react"
import { PrismicNextImage } from '@prismicio/next'
import { SliceZone } from '@prismicio/react'
import { components } from '../slices'
import styled from 'styled-components'

export function ShirtDiagram() {
    const [diagram, setData] = useState('');
    const client = createClient();
  
    useEffect(() => {
      const callData = async () => {
        const shirtDiagram = await client.getByUID('product_diagram', 'ts_01');
        setData(shirtDiagram)
      }
      callData();
    }, []
    )
    console.log(diagram.data)
    if(ShirtDiagram != ''){
        return (
            <>
            
            </>
        )
    }else return null
}


