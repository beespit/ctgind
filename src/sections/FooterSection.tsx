import { createClient } from "@site/prismicio";
import { useEffect, useState } from "react"
import styled from 'styled-components'
import { PrismicRichText } from '@prismicio/react'
import { NextLink, useRouter } from "@site/utilities/deps";
import { MailchimpSectionTemp } from "./MailchimpSectionTemp";


export function FooterSection() {
  const [footer, setData] = useState<any | null>(null);
  const router = useRouter();
  const [popUp, togglePop] = useState('false')

  const popToggle = () => {
    togglePop('true');
  }

  useEffect(() => {
    const client = createClient();

    const callData = async () => {
    const footer = await client.getSingle('footer');
    setData(footer);
  }
  callData();
  }, []
  );


  const components = {
    heading1: ({ children }) => <h1>${children}</h1>,
  heading2: ({ children }) => <h2>{children}</h2>,
  heading3: ({ children }) => <h3 className="w-full">{children}</h3>,
  heading4: ({ children }) => <h4>{children}</h4>,
  heading5: ({ children }) => <h5>{children}</h5>,
  heading6: ({ children }) => <h6>{children}</h6>,
  listItem: ({ children }) => <li className="mr-[15px]">{children}</li>,
  list: ({ children }) => <ul className="flex w-full font-Eurostile text-[14px] md:block">{children}</ul>,
  paragraph: ({ children }) => <p>{children}</p>,
    hyperlink: ({ node, children }) => {
        console.log(node)
        if(node.data.link_type === 'Web'){
        return(        
        <a href={`${node.data.url}`} target="_blank">{children}</a>
    )}else return <NextLink href={`/fineprint/${node.data.uid}`}>{children}</NextLink>
    },
  }

  function isMenuItemActive(href: string) {
    const { pathname } = new URL('https://x');
    return router.pathname.startsWith(pathname);
  }

  if(footer != null){
  return (
    <div className={`${router.pathname === '/' ? 'absolute bottom-0 left-[30px] ' : 'relative'} out-ctg z-[14] mx-auto mb-[30px] grid w-lil bg-white sm:w-main lilLogo:grid-cols-4`}>
        {footer.data.section.map((block, i) => (
            <div key={i} className="out-ctg flex flex-wrap p-[20px] md:flex-nowrap">
                <h3 className="w-full">{block.category}</h3>
                
                    <PrismicRichText field={block.links} components={components}/>
            
            </div>
        ))}
                <div className="out-ctg flex flex-wrap p-[20px] md:flex-nowrap">
                <h3 className="w-full">Newsletter</h3>
                <ul className="w-full font-Eurostile text-[14px]">
                    <button onClick={() => togglePop('true')}>subscribe to our newsletter</button>
                </ul>
            </div>
            {popUp === 'true' && <MailchimpSectionTemp tempToggler={() => togglePop('false')} toggler={() => togglePop('false')}/>}
    </div>
);
}else return null
}


