import { Navigate } from 'react-router-dom';
import CourseCard from '../components/ui/CourseCard';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppProvider';
import { BOOTCAMP_PRICE_LABEL } from '../data/siteContent';
import { ArrowRight } from 'lucide-react';

export default function Courses() {
  const { getPublishedCourses } = useApp();
  const courses = getPublishedCourses();
  const bootcamp = courses.find((c) => c.id === 'python-software-engineer-bootcamp');

  if (courses.length === 1 && bootcamp) {
    return (
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="ComputerGeek Academy"
            title="Python Software Engineer Bootcamp"
            subtitle={`Our focus right now: one complete path from beginner Python to production engineering. Tuition ${BOOTCAMP_PRICE_LABEL} CAD.`}
          />
          <div className="mx-auto max-w-xl">
            <CourseCard course={bootcamp} showFullDescription />
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button to={`/courses/${bootcamp.id}`} size="lg">
              View full outline
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button to="/labs/python" variant="outline" size="lg">
              Free Python Code Lab
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!courses.length) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Courses" title="Available programs" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
