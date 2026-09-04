import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import Button from '../ui/Button';
import CourseCard from '../ui/CourseCard';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';
import { categories, whyChooseUs, testimonials } from '../../data/siteContent';
import { useApp } from '../../context/AppProvider';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23007bff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <img
              src="/logo.png"
              alt="ComputerGeek Academy"
              className="mb-8 h-20 w-auto sm:h-24"
            />
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-navy-900 sm:text-5xl lg:text-6xl">
              Learn In-Demand Tech Skills with{' '}
              <span className="gradient-text">ComputerGeek Academy</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-navy-600 sm:text-xl">
              Self-paced recorded courses with video lectures, quizzes, assignments, and hands-on labs —
              plus instructor-led programs in AI, Machine Learning, Cloud, MLOps, Cybersecurity, and Data Science.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button to="/labs/python" size="lg">
                Try Python Lab Free
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button to="/courses" variant="outline" size="lg">
                Explore Courses
              </Button>
            </div>
            <p className="mt-4 text-sm text-navy-500">
              Dry-run Python in your browser — see memory step by step. No install.
            </p>
          </div>

          <div className="relative hidden lg:block">
            <div className="gradient-brand absolute -inset-4 rounded-3xl opacity-10 blur-2xl" />
            <div className="relative grid grid-cols-2 gap-4">
              {[
                { icon: 'Brain', label: 'AI & ML' },
                { icon: 'Cloud', label: 'Cloud' },
                { icon: 'Shield', label: 'Cybersecurity' },
                { icon: 'Code', label: 'Programming' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center rounded-2xl border border-navy-100 bg-white p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                    <Icon name={item.icon} className="h-7 w-7" />
                  </div>
                  <span className="font-semibold text-navy-800">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedCoursesSection() {
  const { getFeaturedCourses } = useApp();
  const featured = getFeaturedCourses();

  return (
    <section className="bg-navy-50/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured Programs"
          title="Popular Courses"
          subtitle="Instructor-led programs designed to build job-ready skills in today's most in-demand technologies."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button to="/courses" variant="secondary">
            View All Courses
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Choose ComputerGeek Academy"
          subtitle="Expert instruction, hands-on learning, and industry-aligned curriculum to accelerate your tech career."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-navy-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-navy-900">{item.title}</h3>
              <p className="text-navy-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategoriesSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore"
          title="Training Categories"
          subtitle="Browse courses across AI, Cloud, Security, Programming, Data Science, and more."
        />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/courses?category=${cat.id}`}
              className="group flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white transition-colors group-hover:bg-brand-500">
                <Icon name={cat.icon} className="h-6 w-6" />
              </div>
              <span className="font-semibold text-navy-800 group-hover:text-brand-600">
                {cat.name}
              </span>
              <ArrowRight className="ml-auto h-5 w-5 text-navy-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-navy-50/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Learners Say"
          subtitle="Feedback from professionals and teams who have trained with ComputerGeek Academy."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <blockquote
              key={index}
              className="rounded-2xl border border-navy-100 bg-white p-8 shadow-sm"
            >
              <Quote className="mb-4 h-8 w-8 text-brand-300" />
              <p className="mb-6 text-navy-700 leading-relaxed italic">&ldquo;{item.quote}&rdquo;</p>
              <footer>
                <cite className="not-italic">
                  <span className="block font-semibold text-navy-900">{item.author}</span>
                  <span className="text-sm text-navy-500">{item.company}</span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactCTASection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-navy-100 bg-white px-8 py-16 text-center shadow-lg sm:px-12">
          <SectionHeading
            title="Ready to Start Learning?"
            subtitle="Get in touch to enroll in a course or ask about upcoming programs."
          />
          <Button to="/contact" size="lg">
            Contact Us Today
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
