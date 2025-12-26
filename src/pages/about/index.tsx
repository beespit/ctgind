import { PageProps, NextSeo, fetchServerSideProps } from '@site/utilities/deps';
import { StoreLayout } from '@site/layouts/StoreLayout';
import { AboutSection } from '@site/sections/AboutSection';

export default function Page() {
  return (
    <StoreLayout>
      <NextSeo title="About" description="About Cottage Industry" />
      <AboutSection/>
    </StoreLayout>
  );
}
