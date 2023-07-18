import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `ImageOne`.
 */
export type ImageOneProps = SliceComponentProps<Content.ImageOneSlice>;

/**
 * Component for "ImageOne" Slices.
 */
const ImageOne = ({ slice }: ImageOneProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for image_one (variation: {slice.variation}) Slices
    </section>
  );
};

export default ImageOne;
