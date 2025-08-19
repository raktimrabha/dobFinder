export interface AgeInput {
  years: number | '';
  months: number | '';
  days: number | '';
}

export interface CalculationStep {
  step: string;
  date: string;
  description: string;
  note?: string;
}

export interface DateCalculations {
  referenceDate: string;
  setReferenceDate: (date: string) => void;
  age: AgeInput;
  dateOfBirth: Date | null;
  calculationSteps: CalculationStep[];
  error: string;
  handleAgeChange: (field: keyof AgeInput, value: string) => void;
  handleNormalizeAge: () => void;
  formatDate: (date: Date) => string;
}
