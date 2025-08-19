import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const features = [
  {
    title: 'Leap Year Handling',
    description: 'Automatically handles leap years and February 29th dates',
  },
  {
    title: 'Precise Calculations',
    description: 'Accounts for varying month lengths and complex date arithmetic',
  },
  {
    title: 'Real-time Updates',
    description: 'Instantly calculates as you type with step-by-step breakdown',
  },
];

const links = [
  { name: 'GitHub', href: 'https://github.com/yourusername/dob-finder', icon: <Github className="w-5 h-5" /> },
  { name: 'Twitter', href: 'https://twitter.com/yourhandle', icon: <Twitter className="w-5 h-5" /> },
  { name: 'Contact', href: 'mailto:your.email@example.com', icon: <Mail className="w-5 h-5" /> },
];

export const Features: React.FC = () => (
  <footer className="mt-12 border-t border-gray-200">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="space-y-8 xl:col-span-1">
          <h2 className="text-2xl font-bold text-gray-900">DOB Finder</h2>
          <p className="text-gray-500 text-base">
            A simple tool to calculate date of birth from a reference date and age.
          </p>
          <div className="flex space-x-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{link.name}</span>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 xl:mt-0 xl:col-span-2">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Features</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="mt-2">
                  <h4 className="text-base font-medium text-gray-900">{feature.title}</h4>
                  <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-200 pt-8">
        <p className="text-base text-gray-400 text-center">
          &copy; {new Date().getFullYear()} DOB Finder. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

Features.displayName = 'Features';
