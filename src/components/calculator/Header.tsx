import React from 'react';
import { Calendar } from 'lucide-react';

interface HeaderProps {
  title: string;
  description: string;
}

export const Header: React.FC<HeaderProps> = ({ title, description }) => (
  <div className="text-center mb-12">
    <div 
      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4"
      aria-hidden="true"
    >
      <Calendar className="w-8 h-8 text-white" />
    </div>
    <h1 className="text-4xl font-bold text-gray-900 mb-2">
      {title}
    </h1>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      {description}
    </p>
  </div>
);

Header.displayName = 'Header';
