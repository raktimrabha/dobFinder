import React, { useState, useEffect } from 'react';
import { useDateCalculations } from '../hooks/useDateCalculations';
import { Header } from './calculator/Header';
import { DateInputs } from './calculator/DateInputs';
import { ResultsDisplay } from './calculator/ResultsDisplay';
import { Features } from './calculator/Features';

const DateCalculator: React.FC = () => {
  const [showSteps, setShowSteps] = useState(false);
  
  const {
    referenceDate,
    setReferenceDate,
    age,
    dateOfBirth,
    calculationSteps,
    error,
    handleAgeChange,
    handleNormalizeAge,
    formatDate,
  } = useDateCalculations();

  // Set initial reference date to today when component mounts
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setReferenceDate(today);
  }, [setReferenceDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Header 
          title="DOB Finder"
          description="Calculate someone's date of birth by entering a reference date and their age at that time"
        />
        
        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input Form */}
          <div>
            <DateInputs
              referenceDate={referenceDate}
              setReferenceDate={setReferenceDate}
              age={age}
              handleAgeChange={handleAgeChange}
              handleNormalizeAge={handleNormalizeAge}
              error={error}
            />
          </div>
          
          {/* Right Column - Results */}
          <div className="lg:order-2">
            <ResultsDisplay
              dateOfBirth={dateOfBirth}
              calculationSteps={calculationSteps}
              showSteps={showSteps}
              setShowSteps={setShowSteps}
              formatDate={formatDate}
            />
          </div>
        </div>
        
        {/* Footer */}
        <Features />
      </div>
    </div>
  );
};

export default DateCalculator;