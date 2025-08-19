import React, { useState, useEffect } from 'react';
import { AgeInput } from '../../types';

// Assuming AgeInput is defined in your types file, e.g.:
// export interface AgeInput {
//   years: string;
//   months: string;
//   days: string;
// }

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
  const [dateParts, setDateParts] = useState({
    day: '',
    month: '',
    year: ''
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Toggle date picker visibility
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Handle date selection from the calendar
  const handleCalendarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      setReferenceDate(selectedDate);
    }
  };

  // **FIXED**: Simplified useEffect to sync state from the referenceDate prop.
  // The referenceDate string ("YYYY-MM-DD") already has the correctly formatted parts.
  useEffect(() => {
    if (referenceDate) {
      const [year, month, day] = referenceDate.split('-');
      if (year && month && day) {
        setDateParts({ day, month, year });
      }
    }
  }, [referenceDate]);

  // Handle changes to date part inputs
  const handleDatePartChange = (part: 'day' | 'month' | 'year', value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;
    
    // Apply max length limits
    if (part === 'day' && value.length > 2) return;
    if (part === 'month' && value.length > 2) return;
    if (part === 'year' && value.length > 4) return;

    // Update the specific part in local state for immediate UI feedback
    const newDateParts = {
      ...dateParts,
      [part]: value
    };
    setDateParts(newDateParts);
    
    // Attempt to form a full date and update the parent state
    if (newDateParts.day && newDateParts.month && newDateParts.year && newDateParts.year.length === 4) {
      const day = parseInt(newDateParts.day, 10);
      const month = parseInt(newDateParts.month, 10);
      const year = parseInt(newDateParts.year, 10);
      
      // Basic validation
      if (day > 0 && day <= 31 && month > 0 && month <= 12 && year > 1900 && year < 2100) {
        // Get the last day of the month to handle clamping (e.g., Feb 31 -> Feb 29)
        const daysInMonth = new Date(year, month, 0).getDate();
        const validDay = Math.min(day, daysInMonth);
        
        // **FIX**: Use Date.UTC() to create a date in UTC. This prevents the user's
        // local timezone from causing a date shift when converting to an ISO string.
        const newDate = new Date(Date.UTC(year, month - 1, validDay));
        
        // Ensure the constructed date is valid
        if (!isNaN(newDate.getTime())) {
          // Format to "YYYY-MM-DD"
          const formattedDate = newDate.toISOString().split('T')[0];
          setReferenceDate(formattedDate);
        }
      }
    }
  };

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
          <div className="flex justify-between items-center mb-2">
            <label className="block text-lg font-medium text-gray-700">
              Reference Date
            </label>
            <button
              type="button"
              onClick={toggleDatePicker}
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              {showDatePicker ? 'Enter Manually' : 'Use Calendar'}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </button>
          </div>
          
          {showDatePicker ? (
            <div className="mb-4">
              <input
                type="date"
                value={referenceDate}
                onChange={handleCalendarChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Day
                </label>
                <input
                  type="text"
                  value={dateParts.day}
                  onChange={(e) => handleDatePartChange('day', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-center text-lg font-semibold"
                  placeholder="DD"
                  maxLength={2}
                  inputMode="numeric"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Month
                </label>
                <input
                  type="text"
                  value={dateParts.month}
                  onChange={(e) => handleDatePartChange('month', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-center text-lg font-semibold"
                  placeholder="MM"
                  maxLength={2}
                  inputMode="numeric"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={dateParts.year}
                  onChange={(e) => handleDatePartChange('year', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-center text-lg font-semibold"
                  placeholder="YYYY"
                  maxLength={4}
                  inputMode="numeric"
                />
              </div>
            </div>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {showDatePicker ? 'Select a date' : 'Format: DD MM YYYY'}
          </p>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
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
