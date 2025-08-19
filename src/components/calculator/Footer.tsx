import React from 'react';
import { Github, Instagram, Mail, CalendarSearch } from 'lucide-react';

const currentYear = new Date().getFullYear();

// It's good practice to type your constant arrays for better type safety.
type SocialLink = {
  name: string;
  href: string;
  icon: JSX.Element;
};

type PageLink = {
    name: string;
    href: string;
};

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/raktimrabha',
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/raktimrabha',
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    name: 'Email',
    href: 'mailto:nidoyakico@gmail.com',
    icon: <Mail className="h-5 w-5" />,
  },
];

const pageLinks: PageLink[] = [
    { name: "About", href: "#about" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Contact", href: "#contact" },
];


const Footer: React.FC = () => (
  <footer className="w-full border-t border-gray-200 bg-gray-50 py-12 dark:border-gray-800 dark:bg-gray-900/50">
    <div className="mx-auto max-w-6xl px-6">
      {/* Top section with description and social links */}
      <div className="mb-8 flex flex-col items-start justify-between lg:flex-row lg:items-center">
        <div className="mb-6 lg:mb-0">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
            <CalendarSearch className="h-7 w-7" />
            <span>DOB Finder</span>
          </h3>
          <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400">
            Quickly and accurately find the date of birth from any age. Our simple tool makes age and date calculations effortless.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="rounded-lg bg-gray-200 p-2 text-gray-700 transition-colors hover:bg-blue-600 hover:text-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-500"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom section with copyright and page links */}
      <div className="flex flex-col items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-700 md:flex-row">
        <div className="mb-4 text-center text-sm md:mb-0 md:text-left">
            <p className="flex flex-wrap items-center justify-center gap-1 text-gray-500 dark:text-gray-400">
                &copy; {currentYear} DOB Finder. Made by
                <a 
                    href="https://www.raktimrabha.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    @raktimrabha
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>.
            </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {pageLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

Footer.displayName = 'Footer';

// Added a default export, which is what the rendering environment expects.
export default Footer;
