import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `Size`.
 */
export type SizeProps = SliceComponentProps<Content.SizeSlice>;

/**
 * Component for "Size" Slices.
 */
const Size = ({ slice }: SizeProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for size (variation: {slice.variation}) Slices
    </section>
  );
};

export default Size;
