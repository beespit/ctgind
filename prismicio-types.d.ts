// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client';

type Simplify<T> = {
  [KeyType in keyof T]: T[KeyType];
};
/** Content for about documents */
interface AboutDocumentData {
  /**
   * about field in *about*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: about.about
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  about: prismic.RichTextField;
  /**
   * priorities field in *about*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: about.priorities
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  priorities: prismic.RichTextField;
  /**
   * image field in *about*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: about.image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  image: prismic.ImageField<never>;
  /**
   * Meta Description field in *about*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: about.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_description: prismic.KeyTextField;
  /**
   * Meta Image field in *about*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: about.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  meta_image: prismic.ImageField<never>;
  /**
   * Meta Title field in *about*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: about.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_title: prismic.KeyTextField;
}
/**
 * about document from Prismic
 *
 * - **API ID**: `about`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AboutDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
  Simplify<AboutDocumentData>,
  'about',
  Lang
>;
/** Content for email signup documents */
interface EmailSignupDocumentData {
  /**
   * title field in *email signup*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: email_signup.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  title: prismic.KeyTextField;
  /**
   * default_text field in *email signup*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: email_signup.default_text
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  default_text: prismic.RichTextField;
  /**
   * success_text field in *email signup*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: email_signup.success_text
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  success_text: prismic.RichTextField;
  /**
   * email_field field in *email signup*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: email_signup.email_field
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  email_field: prismic.KeyTextField;
  /**
   * submit_text field in *email signup*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: email_signup.submit_text
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  submit_text: prismic.KeyTextField;
  /**
   * Meta Description field in *email signup*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: email_signup.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_description: prismic.KeyTextField;
  /**
   * Meta Image field in *email signup*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: email_signup.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  meta_image: prismic.ImageField<never>;
  /**
   * Meta Title field in *email signup*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: email_signup.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_title: prismic.KeyTextField;
}
/**
 * email signup document from Prismic
 *
 * - **API ID**: `email_signup`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type EmailSignupDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
  Simplify<EmailSignupDocumentData>,
  'email_signup',
  Lang
>;
/** Content for footer documents */
interface FooterDocumentData {
  /**
   * section field in *footer*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.section[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/group
   *
   */
  section: prismic.GroupField<Simplify<FooterDocumentDataSectionItem>>;
  /**
   * Meta Description field in *footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: footer.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_description: prismic.KeyTextField;
  /**
   * Meta Image field in *footer*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  meta_image: prismic.ImageField<never>;
  /**
   * Meta Title field in *footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: footer.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_title: prismic.KeyTextField;
}
/**
 * Item in footer → section
 *
 */
export interface FooterDocumentDataSectionItem {
  /**
   * category field in *footer → section*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.section[].category
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  category: prismic.KeyTextField;
  /**
   * links field in *footer → section*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.section[].links
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  links: prismic.RichTextField;
}
/**
 * footer document from Prismic
 *
 * - **API ID**: `footer`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FooterDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
  Simplify<FooterDocumentData>,
  'footer',
  Lang
>;
/** Content for granular documents */
interface GranularDocumentData {
  /**
   * Slice Zone field in *granular*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: granular.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/slices
   *
   */
  slices: prismic.SliceZone<GranularDocumentDataSlicesSlice>;
  /**
   * Meta Description field in *granular*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: granular.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_description: prismic.KeyTextField;
  /**
   * Meta Image field in *granular*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: granular.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  meta_image: prismic.ImageField<never>;
  /**
   * Meta Title field in *granular*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: granular.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_title: prismic.KeyTextField;
}
/**
 * Slice for *granular → Slice Zone*
 *
 */
type GranularDocumentDataSlicesSlice = never;
/**
 * granular document from Prismic
 *
 * - **API ID**: `granular`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type GranularDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
  Simplify<GranularDocumentData>,
  'granular',
  Lang
>;
/** Content for homepage documents */
interface HomepageDocumentData {
  /**
   * test field in *homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.test
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  test: prismic.KeyTextField;
  /**
   * body field in *homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.body
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  body: prismic.KeyTextField;
  /**
   * Slice Zone field in *homepage*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/slices
   *
   */
  slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice>;
  /**
   * Meta Description field in *homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: homepage.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_description: prismic.KeyTextField;
  /**
   * Meta Image field in *homepage*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  meta_image: prismic.ImageField<never>;
  /**
   * Meta Title field in *homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: homepage.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_title: prismic.KeyTextField;
}
/**
 * Slice for *homepage → Slice Zone*
 *
 */
type HomepageDocumentDataSlicesSlice = FullWidthImageSlice | TwoImagesSlice;
/**
 * homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
  Simplify<HomepageDocumentData>,
  'homepage',
  Lang
>;
/** Content for process documents */
interface ProcessDocumentData {
  /**
   * Slice Zone field in *process*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: process.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/slices
   *
   */
  slices: prismic.SliceZone<ProcessDocumentDataSlicesSlice>;
  /**
   * Meta Description field in *process*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: process.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_description: prismic.KeyTextField;
  /**
   * Meta Image field in *process*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: process.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  meta_image: prismic.ImageField<never>;
  /**
   * Meta Title field in *process*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: process.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_title: prismic.KeyTextField;
}
/**
 * Slice for *process → Slice Zone*
 *
 */
type ProcessDocumentDataSlicesSlice = VideoSlice;
/**
 * process document from Prismic
 *
 * - **API ID**: `process`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ProcessDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
  Simplify<ProcessDocumentData>,
  'process',
  Lang
>;
/** Content for product diagram documents */
interface ProductDiagramDocumentData {
  /**
   * image field in *product diagram*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: product_diagram.image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  image: prismic.ImageField<never>;
  /**
   * model field in *product diagram*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: product_diagram.model
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  model: prismic.KeyTextField;
  /**
   * model placeholder field in *product diagram*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: product_diagram.model_placeholder
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  model_placeholder: prismic.KeyTextField;
  /**
   * Slice Zone field in *product diagram*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: product_diagram.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/slices
   *
   */
  slices: prismic.SliceZone<ProductDiagramDocumentDataSlicesSlice>;
  /**
   * Meta Description field in *product diagram*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: product_diagram.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_description: prismic.KeyTextField;
  /**
   * Meta Image field in *product diagram*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: product_diagram.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  meta_image: prismic.ImageField<never>;
  /**
   * Meta Title field in *product diagram*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: product_diagram.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_title: prismic.KeyTextField;
}
/**
 * Slice for *product diagram → Slice Zone*
 *
 */
type ProductDiagramDocumentDataSlicesSlice = SizeSlice;
/**
 * product diagram document from Prismic
 *
 * - **API ID**: `product_diagram`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ProductDiagramDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
  Simplify<ProductDiagramDocumentData>,
  'product_diagram',
  Lang
>;
export type AllDocumentTypes =
  | AboutDocument
  | EmailSignupDocument
  | FooterDocument
  | GranularDocument
  | HomepageDocument
  | ProcessDocument
  | ProductDiagramDocument;
/**
 * Primary content in FullWidthImage → Primary
 *
 */
interface FullWidthImageSliceDefaultPrimary {
  /**
   * image field in *FullWidthImage → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: full_width_image.primary.image
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  image: prismic.ImageField<never>;
}
/**
 * Default variation for FullWidthImage Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Default`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type FullWidthImageSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<FullWidthImageSliceDefaultPrimary>,
  never
>;
/**
 * Slice variation for *FullWidthImage*
 *
 */
type FullWidthImageSliceVariation = FullWidthImageSliceDefault;
/**
 * FullWidthImage Shared Slice
 *
 * - **API ID**: `full_width_image`
 * - **Description**: `FullWidthImage`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type FullWidthImageSlice = prismic.SharedSlice<'full_width_image', FullWidthImageSliceVariation>;
/**
 * Primary content in ImageOne → Primary
 *
 */
interface ImageOneSliceDefaultPrimary {
  /**
   * image field in *ImageOne → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: image_one.primary.image
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  image: prismic.ImageField<never>;
}
/**
 * Default variation for ImageOne Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Default`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ImageOneSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ImageOneSliceDefaultPrimary>,
  never
>;
/**
 * Slice variation for *ImageOne*
 *
 */
type ImageOneSliceVariation = ImageOneSliceDefault;
/**
 * ImageOne Shared Slice
 *
 * - **API ID**: `image_one`
 * - **Description**: `ImageOne`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ImageOneSlice = prismic.SharedSlice<'image_one', ImageOneSliceVariation>;
/**
 * Primary content in Size → Primary
 *
 */
interface SizeSliceDefaultPrimary {
  /**
   * size field in *Size → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: size.primary.size
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  size: prismic.KeyTextField;
}
/**
 * Item in Size → Items
 *
 */
export interface SizeSliceDefaultItem {
  /**
   * measurement field in *Size → Items*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: size.items[].measurement
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  measurement: prismic.KeyTextField;
  /**
   * size inches field in *Size → Items*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: size.items[].size_in
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  size_in: prismic.KeyTextField;
  /**
   * size cm field in *Size → Items*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: size.items[].size_cm
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  size_cm: prismic.KeyTextField;
}
/**
 * Default variation for Size Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Default`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type SizeSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<SizeSliceDefaultPrimary>,
  Simplify<SizeSliceDefaultItem>
>;
/**
 * Slice variation for *Size*
 *
 */
type SizeSliceVariation = SizeSliceDefault;
/**
 * Size Shared Slice
 *
 * - **API ID**: `size`
 * - **Description**: `Size`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type SizeSlice = prismic.SharedSlice<'size', SizeSliceVariation>;
/**
 * Primary content in TwoImages → Primary
 *
 */
interface TwoImagesSliceDefaultPrimary {
  /**
   * image 1 field in *TwoImages → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: two_images.primary.image_1
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  image_1: prismic.ImageField<never>;
  /**
   * image 2 field in *TwoImages → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: two_images.primary.image_2
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  image_2: prismic.ImageField<never>;
}
/**
 * Default variation for TwoImages Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Default`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TwoImagesSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<TwoImagesSliceDefaultPrimary>,
  never
>;
/**
 * Slice variation for *TwoImages*
 *
 */
type TwoImagesSliceVariation = TwoImagesSliceDefault;
/**
 * TwoImages Shared Slice
 *
 * - **API ID**: `two_images`
 * - **Description**: `TwoImages`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TwoImagesSlice = prismic.SharedSlice<'two_images', TwoImagesSliceVariation>;
/**
 * Primary content in Video → Primary
 *
 */
interface VideoSliceDefaultPrimary {
  /**
   * text field in *Video → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: video.primary.text
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  text: prismic.RichTextField;
  /**
   * video link field in *Video → Primary*
   *
   * - **Field Type**: Embed
   * - **Placeholder**: *None*
   * - **API ID Path**: video.primary.video_link
   * - **Documentation**: https://prismic.io/docs/core-concepts/embed
   *
   */
  video_link: prismic.EmbedField;
  /**
   * placeholder image field in *Video → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: video.primary.placeholder_image
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  placeholder_image: prismic.ImageField<never>;
}
/**
 * Default variation for Video Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Default`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type VideoSliceDefault = prismic.SharedSliceVariation<'default', Simplify<VideoSliceDefaultPrimary>, never>;
/**
 * Slice variation for *Video*
 *
 */
type VideoSliceVariation = VideoSliceDefault;
/**
 * Video Shared Slice
 *
 * - **API ID**: `video`
 * - **Description**: `Video`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type VideoSlice = prismic.SharedSlice<'video', VideoSliceVariation>;
declare module '@prismicio/client' {
  interface CreateClient {
    (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
  }
  namespace Content {
    export type {
      AboutDocumentData,
      AboutDocument,
      EmailSignupDocumentData,
      EmailSignupDocument,
      FooterDocumentData,
      FooterDocumentDataSectionItem,
      FooterDocument,
      GranularDocumentData,
      GranularDocumentDataSlicesSlice,
      GranularDocument,
      HomepageDocumentData,
      HomepageDocumentDataSlicesSlice,
      HomepageDocument,
      ProcessDocumentData,
      ProcessDocumentDataSlicesSlice,
      ProcessDocument,
      ProductDiagramDocumentData,
      ProductDiagramDocumentDataSlicesSlice,
      ProductDiagramDocument,
      AllDocumentTypes,
      FullWidthImageSliceDefaultPrimary,
      FullWidthImageSliceDefault,
      FullWidthImageSliceVariation,
      FullWidthImageSlice,
      ImageOneSliceDefaultPrimary,
      ImageOneSliceDefault,
      ImageOneSliceVariation,
      ImageOneSlice,
      SizeSliceDefaultPrimary,
      SizeSliceDefaultItem,
      SizeSliceDefault,
      SizeSliceVariation,
      SizeSlice,
      TwoImagesSliceDefaultPrimary,
      TwoImagesSliceDefault,
      TwoImagesSliceVariation,
      TwoImagesSlice,
      VideoSliceDefaultPrimary,
      VideoSliceDefault,
      VideoSliceVariation,
      VideoSlice,
    };
  }
}
