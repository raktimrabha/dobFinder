import React, { useState, useEffect } from 'react';
import { Calendar, Calculator, ArrowRight, Clock } from 'lucide-react';

interface AgeInput {
  years: number;
  months: number;
  days: number;
}

interface CalculationStep {
  step: string;
  date: string;
  description: string;
}

const DateCalculator: React.FC = () => {
  const [referenceDate, setReferenceDate] = useState<string>('1987-02-01');
  const [age, setAge] = useState<AgeInput>({ years: 9, months: 11, days: 2 });
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [calculationSteps, setCalculationSteps] = useState<CalculationStep[]>([]);
  const [showSteps, setShowSteps] = useState(false);
  const [error, setError] = useState<string>('');

  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const getDaysInMonth = (year: number, month: number): number => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 1 && isLeapYear(year)) { // February in leap year
      return 29;
    }
    return daysInMonth[month];
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateDateOfBirth = (refDate: string, ageInput: AgeInput): { dob: Date, steps: CalculationStep[] } => {
    const steps: CalculationStep[] = [];
    const startDate = new Date(refDate);
    let currentYear = startDate.getFullYear();
    let currentMonth = startDate.getMonth();
    let currentDay = startDate.getDate();
    
    steps.push({
      step: '1',
      date: formatDate(new Date(currentYear, currentMonth, currentDay)),
      description: 'Starting with reference date'
    });

    // Subtract years
    if (ageInput.years > 0) {
      currentYear -= ageInput.years;
      steps.push({
        step: '2',
        date: formatDate(new Date(currentYear, currentMonth, currentDay)),
        description: `Subtract ${ageInput.years} year${ageInput.years === 1 ? '' : 's'}`
      });
    }

    // Subtract months
    if (ageInput.months > 0) {
      currentMonth -= ageInput.months;
      
      while (currentMonth < 0) {
        currentMonth += 12;
        currentYear -= 1;
      }
      
      // Handle day overflow for shorter months
      const daysInNewMonth = getDaysInMonth(currentYear, currentMonth);
      currentDay = Math.min(currentDay, daysInNewMonth);
      
      steps.push({
        step: '3',
        date: formatDate(new Date(currentYear, currentMonth, currentDay)),
        description: `Subtract ${ageInput.months} month${ageInput.months === 1 ? '' : 's'}`
      });
    }

    // Subtract days
    if (ageInput.days > 0) {
      currentDay -= ageInput.days;
      
      while (currentDay <= 0) {
        currentMonth -= 1;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear -= 1;
        }
        currentDay += getDaysInMonth(currentYear, currentMonth);
      }
      
      steps.push({
        step: '4',
        date: formatDate(new Date(currentYear, currentMonth, currentDay)),
        description: `Subtract ${ageInput.days} day${ageInput.days === 1 ? '' : 's'}`
      });
    }

    return { dob: new Date(currentYear, currentMonth, currentDay), steps };
  };

  useEffect(() => {
    try {
      setError('');
      
      // Validate inputs
      if (!referenceDate) {
        setError('Please enter a reference date');
        return;
      }
      
      if (age.years < 0 || age.months < 0 || age.days < 0) {
        setError('Age values cannot be negative');
        return;
      }
      
      if (age.months >= 12) {
        setError('Months must be less than 12');
        return;
      }
      
      if (age.days >= 31) {
        setError('Days must be less than 31');
        return;
      }

      const { dob, steps } = calculateDateOfBirth(referenceDate, age);
      
      // Check if calculated DOB is in the future relative to reference date
      if (dob > new Date(referenceDate)) {
        setError('The calculated date of birth would be in the future relative to the reference date');
        return;
      }
      
      setDateOfBirth(dob);
      setCalculationSteps(steps);
    } catch (err) {
      setError('Invalid date calculation');
      setDateOfBirth(null);
      setCalculationSteps([]);
    }
  }, [referenceDate, age]);

  const handleAgeChange = (field: keyof AgeInput, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setAge(prev => ({ ...prev, [field]: numValue }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Date of Birth Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate someone's date of birth by entering a reference date and their age at that time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
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
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-center text-lg font-semibold"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Months</label>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={age.months}
                      onChange={(e) => handleAgeChange('months', e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-center text-lg font-semibold"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Days</label>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={age.days}
                      onChange={(e) => handleAgeChange('days', e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-center text-lg font-semibold"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Example */}
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-400">
                <h3 className="font-medium text-gray-900 mb-1">Example</h3>
                <p className="text-sm text-gray-600">
                  Reference: 1 Feb 1987, Age: 9 years, 11 months, 2 days → DOB: 27 February 1977
                </p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <ArrowRight className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Result</h2>
              </div>
              {calculationSteps.length > 1 && (
                <button
                  onClick={() => setShowSteps(!showSteps)}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
                >
                  {showSteps ? 'Hide Steps' : 'Show Steps'}
                </button>
              )}
            </div>

            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            ) : dateOfBirth ? (
              <div className="space-y-6">
                {/* Main Result */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="text-center">
                    <p className="text-sm font-medium text-green-700 mb-2">Date of Birth</p>
                    <p className="text-3xl font-bold text-green-800">
                      {formatDate(dateOfBirth)}
                    </p>
                  </div>
                </div>

                {/* Calculation Steps */}
                {showSteps && calculationSteps.length > 1 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <Clock className="w-4 h-4 text-gray-600 mr-2" />
                      <h3 className="font-medium text-gray-900">Calculation Steps</h3>
                    </div>
                    <div className="space-y-3">
                      {calculationSteps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{step.date}</p>
                            <p className="text-sm text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-medium text-blue-900 mb-2">How it works</h3>
                  <p className="text-sm text-blue-700">
                    We subtract the age from the reference date, carefully handling month lengths, 
                    leap years, and date boundaries to ensure accurate calculations.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Enter the details above to calculate the date of birth</p>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Leap Year Handling</h3>
              <p className="text-sm text-gray-600">
                Automatically handles leap years and February 29th dates
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calculator className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Precise Calculations</h3>
              <p className="text-sm text-gray-600">
                Accounts for varying month lengths and complex date arithmetic
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Updates</h3>
              <p className="text-sm text-gray-600">
                Instantly calculates as you type with step-by-step breakdown
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateCalculator;