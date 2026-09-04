import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { contactInfo, BOOTCAMP_PRICE_LABEL } from '../../data/siteContent';

export default function Footer() {
  const logoSrc = `${import.meta.env.BASE_URL}logo.png`;

  return (
    <footer className="border-t border-navy-100 bg-navy-900 text-navy-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <div className="mb-4 inline-block rounded-xl bg-white p-2">
                <img src={logoSrc} alt="ComputerGeek Academy" className="h-12 w-auto" />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-navy-200">
              ComputerGeek Academy — Python Software Engineer Bootcamp. Beginner-friendly,
              enterprise-depth training with a free Visual Code Lab. Tuition {BOOTCAMP_PRICE_LABEL} CAD.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Program
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/courses/python-software-engineer-bootcamp"
                  className="text-sm text-navy-200 transition-colors hover:text-brand-300"
                >
                  Python Bootcamp
                </Link>
              </li>
              <li>
                <Link
                  to="/labs/python"
                  className="text-sm text-navy-200 transition-colors hover:text-brand-300"
                >
                  Free Code Lab
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-sm text-navy-200 transition-colors hover:text-brand-300">
                  Pricing ({BOOTCAMP_PRICE_LABEL})
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-navy-200 transition-colors hover:text-brand-300">
                  About Instructor
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-navy-200 transition-colors hover:text-brand-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-navy-200 transition-colors hover:text-brand-300">
                  Student Sign In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 text-sm text-navy-200 transition-colors hover:text-brand-300"
                >
                  <Mail className="h-4 w-4" />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-2 text-sm text-navy-200 transition-colors hover:text-brand-300"
                >
                  <Phone className="h-4 w-4" />
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-navy-200">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {contactInfo.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-navy-700 pt-8 text-center text-sm text-navy-400">
          © {new Date().getFullYear()} ComputerGeek Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
