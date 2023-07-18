import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'

import React, { useContext, useState } from 'react'

import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice>;

/**
 * Component for "Video" Slices.
 */
const Video = ({ slice }: VideoProps): JSX.Element => {
  console.log(slice)

  const [playin, clickplay] = React.useState(true);
  const [show, toggleShow] = React.useState(false);

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className='w-[100%] '>
    <div className='grid w-[100%] grid-cols-2 md:grid-cols-main lilLogo:min-h-[420px] xl:grid-cols-4'>
    <div className='col-span-4 h-fit p-[15px] font-Eurostile outline outline-2 outline-offset-[-1px] md:p-[30px] lilLogo:col-span-2 lilLogo:h-[100%] xl:col-span-1 [&>h3]:pb-[10px] [&>h3]:text-[24px] [&>h3]:font-extrabold'><PrismicRichText field={slice.primary.text} /></div>
    <div className={`relative ${show ? 'pb-[56.25%]' : ''} col-span-4 h-[250px]  outline outline-2 outline-offset-[-1px] lilLogo:col-span-2 lilLogo:h-[100%] xl:col-span-3`}>
    <ReactPlayer
    url={slice.primary.video_link.embed_url}
    width='100%'
    height='100%'
    onPlay={() => toggleShow(true)}
    playing={playin}
    className='absolute outline outline-2 outline-offset-[-1px]'
    controls='true'
    light={slice.primary.placeholder_image.url}
    config={{
  youtube: {
    playerVars: { modestbranding: 1, controls: 0, }
  },
  vimeo: {
        playerOptions:{
          width: 2000,
          autoplay: 'true',
        }
      }

}}/></div>
    </div>

    </section>
  );
};

export default Video;
