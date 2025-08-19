import React from 'react';
import { CalendarSearch } from 'lucide-react';

interface HeaderProps {
  title: string;
  description: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, description, className = '' }) => (
  <div className={`text-center mb-12 ${className}`}>
    <div className="flex items-center justify-center gap-4 mb-4">
      <div 
        className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center"
        aria-hidden="true"
      >
        <CalendarSearch className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900">
        {title}
      </h1>
    </div>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      {description}
    </p>
  </div>
);

Header.displayName = 'Header';
