import HeroSection, {
  FeaturedCoursesSection,
  WhyChooseSection,
  CategoriesSection,
  TestimonialsSection,
  ContactCTASection,
} from '../components/home/HomeSections';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCoursesSection />
      <WhyChooseSection />
      <CategoriesSection />
      <TestimonialsSection />
      <ContactCTASection />
    </>
  );
}
