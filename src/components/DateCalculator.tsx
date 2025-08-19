import React, { useState, useEffect } from 'react';
import { useDateCalculations } from '../hooks/useDateCalculations';
import { Header } from './calculator/Header';
import { DateInputs } from './calculator/DateInputs';
import { ResultsDisplay } from './calculator/ResultsDisplay';
import Footer from './calculator/Footer';

const DateCalculator: React.FC = () => {
  const [showResults, setShowResults] = useState(false);
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
    // Get current date in local timezone and format as YYYY-MM-DD
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - (offset * 60 * 1000));
    const today = localDate.toISOString().split('T')[0];
    setReferenceDate(today);
  }, [setReferenceDate]);

  const handleCalculate = () => {
    setShowResults(true);
    // Use setTimeout to ensure the results are rendered before scrolling
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto">
          <Header 
            title="DOB Finder"
            description="Find someone's date of birth by entering a reference date and their age at that time"
            className="text-center mb-8"
          />
          
          {/* Results Section - Only show when showResults is true and dateOfBirth exists */}
          {showResults && dateOfBirth && (
            <div id="results-section" className="mb-8">
              <ResultsDisplay
                dateOfBirth={dateOfBirth}
                calculationSteps={calculationSteps}
                showSteps={showSteps}
                setShowSteps={setShowSteps}
                formatDate={formatDate}
              />
            </div>
          )}

          {/* Calculator Inputs */}
            <DateInputs
              referenceDate={referenceDate}
              setReferenceDate={setReferenceDate}
              age={age}
              handleAgeChange={handleAgeChange}
              handleNormalizeAge={handleNormalizeAge}
              error={error}
              onCalculate={handleCalculate}
            />
          
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DateCalculator;