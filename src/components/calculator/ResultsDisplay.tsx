import React, { useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { CalculationStep } from '../../types';

interface ResultsDisplayProps {
  dateOfBirth: Date | null;
  calculationSteps: CalculationStep[];
  showSteps: boolean;
  setShowSteps: (show: boolean) => void;
  formatDate: (date: Date) => string;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  dateOfBirth,
  calculationSteps,
  showSteps,
  setShowSteps,
  formatDate,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!dateOfBirth) {
    return null;
  }

  const formattedDate = formatDate(dateOfBirth);
  const numericDate = dateOfBirth.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, '-');

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Date of Birth
      </h2>

      <div className="space-y-4">
        <div className="bg-green-50 rounded-lg p-6 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800 mb-1">
                Full Date Format
              </p>
              <p className="text-2xl font-bold text-green-900">
                {formattedDate}
              </p>
            </div>
            <button
              onClick={() => handleCopy(formattedDate)}
              className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg text-sm font-medium transition-colors"
              aria-label="Copy full date format"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800 mb-1">
                Numeric Format
              </p>
              <p className="text-2xl font-bold text-blue-900">
                {numericDate}
              </p>
            </div>
            <button
              onClick={() => handleCopy(numericDate)}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-sm font-medium transition-colors"
              aria-label="Copy numeric date format"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {calculationSteps.length > 0 && (
        <div className="mt-8">
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="flex items-center py-2 px-4 -ml-2 text-indigo-600 hover:bg-indigo-50 rounded-lg text-sm font-medium mb-2 transition-colors"
            aria-expanded={showSteps}
            aria-controls="calculation-steps"
          >
            <Clock className="w-4 h-4 mr-2" />
            {showSteps ? 'Hide calculation details' : 'Show calculation details'}
          </button>

          {showSteps && (
            <div id="calculation-steps" className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                How We Calculated This
              </h3>
              <div className="space-y-4">
                {calculationSteps.map((step, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-indigo-100 text-indigo-700 text-sm font-semibold mr-4 shadow-sm group-hover:bg-indigo-50 transition-colors">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 font-medium">
                        {step.description}
                        {step.description.includes('leap year') && (
                          <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Leap Year
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 font-mono">
                        {step.date}
                      </p>
                      {step.note && (
                        <p className="text-xs text-gray-500 mt-1 italic">
                          {step.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center text-gray-700 text-sm mt-6 pt-4 border-t border-gray-200">
                  <ArrowRight className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-medium">Final date of birth:</span>
                  <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">
                    {formattedDate}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ResultsDisplay.displayName = 'ResultsDisplay';
