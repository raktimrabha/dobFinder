import React from 'react';
import { AgeInput } from '../../types';

interface DateInputsProps {
  referenceDate: string;
  setReferenceDate: (date: string) => void;
  age: AgeInput;
  handleAgeChange: (field: keyof AgeInput, value: string) => void;
  handleNormalizeAge: () => void;
  error?: string;
}

export const DateInputs: React.FC<DateInputsProps> = ({
  referenceDate,
  setReferenceDate,
  age,
  handleAgeChange,
  handleNormalizeAge,
  error,
}) => (
  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
      Enter Reference Date and Age
    </h2>
    
    {error && (
      <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border-l-4 border-red-500">
        <p className="font-medium">Error</p>
        <p className="text-sm">{error}</p>
      </div>
    )}

    <div className="space-y-6">
      <div>
        <label 
          htmlFor="reference-date"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Reference Date
        </label>
        <div className="relative">
          <input
            id="reference-date"
            type="date"
            value={referenceDate}
            onChange={(e) => setReferenceDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            aria-required="true"
            aria-label="Select reference date"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Age at Reference Date
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Enter the person's age at the reference date
        </p>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label 
              htmlFor="years"
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              Years
            </label>
            <input
              id="years"
              type="number"
              min="0"
              value={age.years}
              onChange={(e) => handleAgeChange('years', e.target.value)}
              onBlur={handleNormalizeAge}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-center text-lg font-semibold"
              placeholder="0"
              aria-label="Years"
            />
          </div>
          <div>
            <label 
              htmlFor="months"
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              Months
            </label>
            <input
              id="months"
              type="number"
              min="0"
              value={age.months}
              onChange={(e) => handleAgeChange('months', e.target.value)}
              onBlur={handleNormalizeAge}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-center text-lg font-semibold"
              placeholder="0"
              aria-label="Months"
            />
          </div>
          <div>
            <label 
              htmlFor="days"
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              Days
            </label>
            <input
              id="days"
              type="number"
              min="0"
              value={age.days}
              onChange={(e) => handleAgeChange('days', e.target.value)}
              onBlur={handleNormalizeAge}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-center text-lg font-semibold"
              placeholder="0"
              aria-label="Days"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
        <h3 className="font-medium text-blue-900 mb-1">Tip</h3>
        <p className="text-sm text-blue-800">
          You can enter values greater than the maximum for months or days, and they will be automatically adjusted.
        </p>
      </div>
    </div>
  </div>
);

DateInputs.displayName = 'DateInputs';
