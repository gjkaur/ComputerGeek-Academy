import { GraduationCap, BookOpen, Briefcase, Award, Microscope } from 'lucide-react';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';

const expertise = [
  { icon: GraduationCap, label: 'Artificial Intelligence' },
  { icon: Microscope, label: 'Machine Learning & MLOps' },
  { icon: BookOpen, label: 'Cloud Computing' },
  { icon: Briefcase, label: 'Cybersecurity' },
  { icon: Award, label: 'Programming & Data Science' },
];

const credentials = [
  'PhD in Computer Science',
  '11+ years in academia, research, and industry',
  'Corporate training for enterprise teams',
  'Published researcher and practitioner',
  'Instructor-led live online and on-site delivery',
];

export default function About() {
  return (
    <div>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="About"
                title="About the Instructor"
                subtitle="Meet the expert behind ComputerGeek Academy's technical training programs."
              />

              <div className="mb-8 rounded-2xl border border-navy-100 bg-navy-50/50 p-8">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-navy-900 text-white">
                  <GraduationCap className="h-12 w-12" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-navy-900">Dr. Gurinderjeet Kaur</h3>
                <p className="mb-1 font-medium text-brand-600">PhD, Computer Science</p>
                <p className="text-sm text-navy-500">Founder & Lead Instructor, ComputerGeek Academy</p>
              </div>

              <p className="mb-6 text-lg leading-relaxed text-navy-700">
                Dr. Gurinderjeet Kaur is a PhD in Computer Science with 11+ years of experience in
                academia, research, industry, and corporate training. She delivers practical
                instructor-led programs in AI, Machine Learning, MLOps, Cloud, Cybersecurity,
                Programming, and Data Science.
              </p>

              <p className="mb-8 text-navy-600 leading-relaxed">
                With a passion for making complex technical concepts accessible, Dr. Kaur combines
                rigorous academic foundations with real-world industry experience. Her training
                programs emphasize hands-on learning, practical projects, and skills that translate
                directly to professional and enterprise environments.
              </p>

              <Button to="/contact">Get in Touch</Button>
            </div>

            <div>
              <h3 className="mb-6 text-xl font-bold text-navy-900">Areas of Expertise</h3>
              <div className="mb-10 grid gap-4 sm:grid-cols-2">
                {expertise.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-navy-100 bg-white p-4 shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-navy-800">{item.label}</span>
                  </div>
                ))}
              </div>

              <h3 className="mb-6 text-xl font-bold text-navy-900">Credentials & Experience</h3>
              <ul className="space-y-3">
                {credentials.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                    <span className="text-navy-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white">Teaching Philosophy</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-navy-200">
            Every course at ComputerGeek Academy is built on the belief that the best learning
            happens through doing. Dr. Kaur designs programs that balance conceptual understanding
            with practical application — ensuring learners leave with skills they can use
            immediately in their careers and organizations.
          </p>
        </div>
      </section>
    </div>
  );
}
