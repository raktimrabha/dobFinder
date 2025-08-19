import { useState, useCallback, useEffect } from 'react';
import { AgeInput, CalculationStep } from '../types';

export const useDateCalculations = () => {
  const [referenceDate, setReferenceDate] = useState<string>('');
  const [age, setAge] = useState<AgeInput>({ years: '', months: '', days: '' });
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [calculationSteps, setCalculationSteps] = useState<CalculationStep[]>([]);
  const [error, setError] = useState<string>('');

  const isLeapYear = useCallback((year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }, []);

  const getDaysInMonth = useCallback((year: number, month: number): number => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 1 && isLeapYear(year)) {
      return 29;
    }
    return daysInMonth[month];
  }, [isLeapYear]);

  const formatDate = useCallback((date: Date): string => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }, []);

  const calculateDateOfBirth = useCallback((refDate: string, ageInput: AgeInput): { dob: Date, steps: CalculationStep[] } => {
    const steps: CalculationStep[] = [];
    const startDate = new Date(refDate);
    let currentYear = startDate.getFullYear();
    let currentMonth = startDate.getMonth();
    let currentDay = startDate.getDate();
    
    steps.push({
      step: '1',
      date: formatDate(new Date(currentYear, currentMonth, currentDay)),
      description: 'Starting with reference date',
      note: isLeapYear(currentYear) ? 'This is a leap year' : 'This is not a leap year'
    });

    const years = ageInput.years || 0;
    const months = ageInput.months || 0;
    const days = ageInput.days || 0;

    // Subtract years
    if (years > 0) {
      currentYear -= years;
      const isLeap = isLeapYear(currentYear);
      
      steps.push({
        step: '2',
        date: formatDate(new Date(currentYear, currentMonth, currentDay)),
        description: `Subtracted ${years} year${years === 1 ? '' : 's'}`,
        note: isLeap ? `${currentYear} is a leap year (February has 29 days)` : `${currentYear} is not a leap year`
      });
    }

    // Subtract months
    if (months > 0) {
      currentMonth -= months;
      
      while (currentMonth < 0) {
        currentMonth += 12;
        currentYear -= 1;
      }
      
      // Handle day overflow for shorter months
      const daysInNewMonth = getDaysInMonth(currentYear, currentMonth);
      const monthName = new Date(2000, currentMonth, 1).toLocaleString('default', { month: 'long' });
      const isLeap = isLeapYear(currentYear);
      
      if (currentDay > daysInNewMonth) {
        steps.push({
          step: '3',
          date: formatDate(new Date(currentYear, currentMonth, daysInNewMonth)),
          description: `Adjusted day to ${daysInNewMonth} (${monthName} has ${daysInNewMonth} days${isLeap && currentMonth === 1 ? ' in a leap year' : ''})`
        });
      }
      
      currentDay = Math.min(currentDay, daysInNewMonth);
      
      steps.push({
        step: '4',
        date: formatDate(new Date(currentYear, currentMonth, currentDay)),
        description: `Subtracted ${months} month${months === 1 ? '' : 's'} to ${monthName}`,
        note: isLeap ? `${currentYear} is a leap year` : ''
      });
    }

    // Subtract days
    if (days > 0) {
      const startDate = new Date(currentYear, currentMonth, currentDay);
      currentDay -= days;
      
      while (currentDay <= 0) {
        const prevMonth = currentMonth - 1;
        const daysInPrevMonth = getDaysInMonth(
          prevMonth < 0 ? currentYear - 1 : currentYear,
          prevMonth < 0 ? 11 : prevMonth
        );
        
        currentDay += daysInPrevMonth;
        currentMonth = prevMonth < 0 ? 11 : prevMonth;
        if (prevMonth < 0) {
          currentYear -= 1;
        }
      }
      
      const endDate = new Date(currentYear, currentMonth, currentDay);
      const daysSubtracted = Math.round((startDate.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24));
      const isLeap = isLeapYear(currentYear);
      
      steps.push({
        step: '5',
        date: formatDate(endDate),
        description: `Subtracted ${daysSubtracted} day${daysSubtracted === 1 ? '' : 's'}`,
        note: isLeap ? `${currentYear} is a leap year (February has 29 days)` : ''
      });
    }

    return { dob: new Date(currentYear, currentMonth, currentDay), steps };
  }, [formatDate, getDaysInMonth, isLeapYear]);

  const handleAgeChange = useCallback((field: keyof AgeInput, value: string) => {
    const numValue = value === '' ? '' : Math.max(0, parseInt(value, 10));
    setAge(prev => ({ ...prev, [field]: numValue }));
  }, []);

  const handleNormalizeAge = useCallback(() => {
    let years = typeof age.years === 'number' ? age.years : 0;
    let months = typeof age.months === 'number' ? age.months : 0;
    let days = typeof age.days === 'number' ? age.days : 0;

    // Normalize days to months and years
    if (days >= 30.44) {
      const additionalMonths = Math.floor(days / 30.44);
      months += additionalMonths;
      days = Math.round(days % 30.44);
    }

    // Normalize months to years
    if (months >= 12) {
      const additionalYears = Math.floor(months / 12);
      years += additionalYears;
      months %= 12;
    }

    setAge({ years, months, days });
  }, [age]);

  // Effect to recalculate date of birth when inputs change
  useEffect(() => {
    try {
      setError('');
      
      // Don't calculate if reference date or age is not set
      if (!referenceDate || (!age.years && !age.months && !age.days)) {
        setDateOfBirth(null);
        setCalculationSteps([]);
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
  }, [referenceDate, age, calculateDateOfBirth]);

  return {
    referenceDate,
    setReferenceDate,
    age,
    dateOfBirth,
    calculationSteps,
    error,
    handleAgeChange,
    handleNormalizeAge,
    formatDate,
  };
};

export default useDateCalculations;
