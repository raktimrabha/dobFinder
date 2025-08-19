import React, { useState, useEffect } from 'react';
import { AgeInput } from '../../types';

interface DateInputsProps {
  referenceDate: string;
  setReferenceDate: (date: string) => void;
  age: AgeInput;
  handleAgeChange: (field: keyof AgeInput, value: string) => void;
  handleNormalizeAge: () => void;
  onCalculate: () => void;
  error?: string;
}

export const DateInputs: React.FC<DateInputsProps> = ({
  referenceDate,
  setReferenceDate,
  age,
  handleAgeChange,
  handleNormalizeAge,
  onCalculate,
  error,
}) => {
  const [localDate, setLocalDate] = useState(referenceDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Format date to DD-MM-YYYY
  const formatDateForDisplay = (date: string) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    if (year && month && day) {
      return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
    }
    return date;
  };

  // Parse DD-MM-YYYY to YYYY-MM-DD for the date input
  const parseDateInput = (input: string): string => {
    const [day, month, year] = input.split('-').map(Number);
    if (day && month && year) {
      const date = new Date(year, month - 1, day);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
      }
    }
    return '';
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalDate(value);
    
    // Validate the date format (DD-MM-YYYY)
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (dateRegex.test(value)) {
      const formattedDate = parseDateInput(value);
      if (formattedDate) {
        setReferenceDate(formattedDate);
      }
    }
  };

  const handleFocus = () => {
    // Show the date picker on mobile when input is focused
    if ('max' in document.createElement('input')) {
      setShowDatePicker(false);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
    // If switching to text input and we have a valid date, format it for display
    if (showDatePicker && referenceDate) {
      setLocalDate(formatDateForDisplay(referenceDate));
    }
  };

  const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceDate(e.target.value);
  };

  // Update local date when reference date changes from outside
  useEffect(() => {
    if (referenceDate) {
      setLocalDate(formatDateForDisplay(referenceDate));
    }
  }, [referenceDate]);

  return (
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
            <div className="flex items-center">
              <input
                id="reference-date"
                type={showDatePicker ? 'date' : 'text'}
                value={showDatePicker ? referenceDate : localDate}
                onChange={showDatePicker ? handleDatePickerChange : handleDateChange}
                onFocus={handleFocus}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                aria-required="true"
                aria-label="Enter reference date (DD-MM-YYYY)"
                placeholder="DD-MM-YYYY"
                pattern="\d{2}-\d{2}-\d{4}"
              />
              <button
                type="button"
                onClick={toggleDatePicker}
                className="ml-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showDatePicker ? 'Switch to text input' : 'Open date picker'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Format: DD-MM-YYYY
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age at Reference Date
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Enter the person's age at the reference date
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
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

          <button
            onClick={onCalculate}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Calculate Date of Birth
          </button>
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
};

DateInputs.displayName = 'DateInputs';
