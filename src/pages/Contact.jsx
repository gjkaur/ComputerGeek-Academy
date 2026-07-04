import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { contactInfo } from '../data/siteContent';
import { useApp } from '../context/AppProvider';

export default function Contact() {
  const { getPublishedCourses } = useApp();
  const publishedCourses = getPublishedCourses();
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get('course') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: preselectedCourse,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const courseOptions = [
    ...publishedCourses.map((c) => c.title),
    'Other / General Enquiry',
  ];

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Get in Touch"
          subtitle="Enroll in a course or ask a question. We will respond within 1–2 business days."
        />

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-8">
              <h3 className="mb-6 text-xl font-bold text-navy-900">Contact Information</h3>
              <ul className="space-y-6">
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-start gap-4 transition-colors hover:text-brand-500"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-500">Email</p>
                      <p className="font-semibold text-navy-900">{contactInfo.email}</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    className="flex items-start gap-4 transition-colors hover:text-brand-500"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-500">Phone</p>
                      <p className="font-semibold text-navy-900">{contactInfo.phone}</p>
                    </div>
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-500">Location</p>
                    <p className="font-semibold text-navy-900">{contactInfo.location}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-12 text-center">
                <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
                <h3 className="mb-2 text-2xl font-bold text-navy-900">Thank You!</h3>
                <p className="mb-6 text-navy-600">
                  Your enquiry has been received. We will get back to you within 1–2 business days.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  Submit Another Enquiry
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-navy-100 bg-white p-8 shadow-lg"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2 sm:grid-cols-1">
                    <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-navy-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-navy-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-navy-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="course" className="mb-2 block text-sm font-medium text-navy-700">
                      Course Interested In <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="course"
                      name="course"
                      required
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      <option value="">Select a course</option>
                      {courseOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-navy-700">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full resize-none rounded-xl border border-navy-200 px-4 py-3 text-navy-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      placeholder="Tell us about your training needs, team size, preferred schedule, or any questions..."
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Submit Enquiry
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
