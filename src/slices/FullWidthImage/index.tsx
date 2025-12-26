import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next'
import styled from 'styled-components'

const Image =styled.div`
width: 100%;
img{
width: 100%;
position: relative;
height: inherit !important;
align-self: center;
object-fit: cover;
}
`

/**
 * Props for `FullWidthImage`.
 */
export type FullWidthImageProps = SliceComponentProps<Content.FullWidthImageSlice>;

/**
 * Component for "FullWidthImage" Slices.
 */
const FullWidthImage = ({ slice }: FullWidthImageProps): JSX.Element => {
  return (
    <Image>
    <PrismicNextImage field={slice.primary.image} />
    </Image>
  );
};

export default FullWidthImage;
