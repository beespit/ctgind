import { StoreLayout } from '@site/layouts/StoreLayout';
import { HeroSection } from '@site/sections/HeroSection';
import { MailchimpSection } from '@site/sections/MailchimpSection';

export default function Page() {
  return (
    <StoreLayout>
      <HeroSection />
      <MailchimpSection/>
    </StoreLayout>
  );
}
