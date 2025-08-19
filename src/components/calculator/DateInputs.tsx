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
  const [dateParts, setDateParts] = useState({
    day: '',
    month: '',
    year: ''
  });
  const [showCalendar, setShowCalendar] = useState(false);

  // Toggle between calendar and manual input
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Handle calendar date change
  const handleCalendarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (date) {
      setReferenceDate(date);
    }
  };

  // Initialize date parts when referenceDate changes
  useEffect(() => {
    if (referenceDate) {
      const [year, month, day] = referenceDate.split('-').map(Number);
      if (year && month && day) {
        setDateParts({
          day: day.toString().padStart(2, '0'),
          month: month.toString().padStart(2, '0'),
          year: year.toString()
        });
      }
    }
  }, [referenceDate]);

  // Handle changes to date part inputs
  const handleDatePartChange = (part: 'day' | 'month' | 'year', value: string) => {
    // Only allow numbers and limit length
    if (value && !/^\d*$/.test(value)) return;
    
    // Apply max length limits
    if (part === 'day' && value.length > 2) return;
    if (part === 'month' && value.length > 2) return;
    if (part === 'year' && value.length > 4) return;

    const newDateParts = {
      ...dateParts,
      [part]: value
    };
    
    setDateParts(newDateParts);
    
    // Only update the reference date if we have all parts
    if (newDateParts.day && newDateParts.month && newDateParts.year) {
      const day = parseInt(newDateParts.day, 10);
      const month = parseInt(newDateParts.month, 10);
      const year = parseInt(newDateParts.year, 10);
      
      // Basic date validation
      if (day > 0 && day <= 31 && month > 0 && month <= 12 && year > 1900 && year < 2100) {
        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
          const formattedDate = date.toISOString().split('T')[0];
          setReferenceDate(formattedDate);
          return;
        }
      }
    }
    
    // If we get here, the date is invalid or incomplete
    setReferenceDate('');
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
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Reference Date
            <button
              type="button"
              onClick={toggleCalendar}
              className="ml-2 text-sm font-normal text-indigo-600 hover:text-indigo-800 focus:outline-none"
              aria-label={showCalendar ? 'Switch to manual input' : 'Open calendar'}
            >
              {showCalendar ? 'Enter manually' : 'Use calendar'}
            </button>
          </label>
          
          {showCalendar ? (
            <div className="mb-4">
              <input
                type="date"
                value={referenceDate}
                onChange={handleCalendarChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 mb-4">
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
            Format: DD MM YYYY
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
