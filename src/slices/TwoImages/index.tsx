import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next'
import styled from 'styled-components'

const Piccy=styled.div`
display: flex;
img{
display: block;
width: 50%;
height: inherit;
@media(max-width: 750px){
  width: 100%;
  height: inherit !important;
  object-fit: cover;
  align-self: center;
}}
`
/**
 * Props for `TwoImages`.
 */
export type TwoImagesProps = SliceComponentProps<Content.TwoImagesSlice>;

/**
 * Component for "TwoImages" Slices.
 */
const TwoImages = ({ slice }: TwoImagesProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Piccy className='flex-wrap lilLogo:flex-nowrap'>
          <PrismicNextImage field={slice.primary.image_1} alt=''/>
          <PrismicNextImage field={slice.primary.image_2} alt='' />
      </Piccy>
    </section>
  );
};

export default TwoImages;
