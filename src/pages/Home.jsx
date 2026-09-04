import HeroSection, {
  FeaturedCoursesSection,
  WhyChooseSection,
  CategoriesSection,
  TestimonialsSection,
  ContactCTASection,
} from '../components/home/HomeSections';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2 } from 'lucide-react';
import Button from '../components/ui/Button';

function CodeLabsPromo() {
  return (
    <section className="border-y border-navy-100 bg-white py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Code2 className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
            New: Visual Code Labs for beginners
          </h2>
          <p className="mt-3 text-navy-600">
            Starting with the <strong>Python Software Engineer Bootcamp</strong> — run
            programs online and dry-run them line by line. See every variable in memory.
            Java lab included for concept practice.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/labs/python" size="lg">
            Open Python Lab
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button to="/courses/python-software-engineer-bootcamp" variant="outline" size="lg">
            View Python Bootcamp
          </Button>
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-7xl px-4 text-sm text-navy-500 sm:px-6 lg:px-8">
        Or jump to{' '}
        <Link to="/labs/java" className="font-medium text-brand-600 hover:underline">
          Java dry-run lab
        </Link>
        .
      </p>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <CodeLabsPromo />
      <FeaturedCoursesSection />
      <WhyChooseSection />
      <CategoriesSection />
      <TestimonialsSection />
      <ContactCTASection />
    </>
  );
}

