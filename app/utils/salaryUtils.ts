export interface MonthlySalary {
  bedrag: number;
  maandloon: number;
  vakantiegeld: number;
}

/**
 * 
 * @param uren 
 * @param uurloon 
 * @returns 
 */
export const calculateMonthlySalary = (uren: number, uurloon: number): MonthlySalary => {
  const bedrag = uren * uurloon; 
  const maandloon = bedrag * 1.08; 
  const vakantiegeld = maandloon * 0.08; 
  return { bedrag, maandloon, vakantiegeld };
};
