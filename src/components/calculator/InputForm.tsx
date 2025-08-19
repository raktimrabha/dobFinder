import React from 'react';
import { Calculator } from 'lucide-react';
import { AgeInput } from '../DateCalculator';

interface InputFormProps {
  referenceDate: string;
  setReferenceDate: (date: string) => void;
  age: AgeInput;
  handleAgeChange: (field: keyof AgeInput, value: string) => void;
  handleNormalizeAge: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ 
  referenceDate, 
  setReferenceDate, 
  age, 
  handleAgeChange,
  handleNormalizeAge
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 lg:order-1">
      <div className="flex items-center mb-6">
        <Calculator className="w-6 h-6 text-indigo-600 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-900">Input Details</h2>
      </div>

      <div className="space-y-6">
        {/* Reference Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reference Date
          </label>
          <input
            type="date"
            value={referenceDate}
            onChange={(e) => setReferenceDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg"
          />
        </div>

        {/* Age Inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Age at Reference Date
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Years</label>
              <input
                type="number"
                min="0"
                value={age.years}
                onChange={(e) => handleAgeChange('years', e.target.value)}
                onBlur={handleNormalizeAge}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-center text-lg font-semibold"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Months</label>
              <input
                type="number"
                min="0"
                value={age.months}
                onChange={(e) => handleAgeChange('months', e.target.value)}
                onBlur={handleNormalizeAge}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-center text-lg font-semibold"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Days</label>
              <input
                type="number"
                min="0"
                value={age.days}
                onChange={(e) => handleAgeChange('days', e.target.value)}
                onBlur={handleNormalizeAge}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-center text-lg font-semibold"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Tip */}
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-400">
          <h3 className="font-medium text-gray-900 mb-1">Tip</h3>
          <p className="text-sm text-gray-600">
            You can enter values greater than the maximum for months or days, and they will be automatically adjusted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
