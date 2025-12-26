import { PageProps, NextSeo, fetchServerSideProps } from '@site/utilities/deps';
import { StoreLayout } from '@site/layouts/StoreLayout';
import { ProcessSection } from '@site/sections/ProcessSection';

export default function Page() {
  return (
    <StoreLayout>
      <NextSeo title="Process" description="Our Process" />
      <ProcessSection/>
    </StoreLayout>
  );
}
