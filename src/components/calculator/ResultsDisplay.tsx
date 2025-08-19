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

  const handleCopy = () => {
    if (dateOfBirth) {
      navigator.clipboard.writeText(formatDate(dateOfBirth));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!dateOfBirth) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Date of Birth
      </h2>

      <div className="bg-green-50 rounded-lg p-6 mb-6 border border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-800 mb-1">
              Calculated Date of Birth
            </p>
            <p className="text-2xl font-bold text-green-900">
              {formatDate(dateOfBirth)}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg text-sm font-medium transition-colors"
            aria-label="Copy date to clipboard"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {calculationSteps.length > 0 && (
        <div>
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-4"
            aria-expanded={showSteps}
            aria-controls="calculation-steps"
          >
            <Clock className="w-4 h-4 mr-2" />
            {showSteps ? 'Hide calculation steps' : 'Show calculation steps'}
          </button>

          {showSteps && (
            <div id="calculation-steps" className="space-y-4">
              <h3 className="font-medium text-gray-900">
                How we calculated this:
              </h3>
              <div className="space-y-3">
                {calculationSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium mr-3 mt-0.5">
                      {step.step}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {step.date}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center text-gray-500 text-sm mt-4">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Final date of birth: {formatDate(dateOfBirth)}
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
