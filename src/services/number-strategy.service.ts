import { IntervalComparisonStrategy, Interval } from '../types';

const isValidNumber = (n?: number): boolean => n !== undefined && n !== null && !Number.isNaN(n);

export class NumberIntervalComparisonStrategy implements IntervalComparisonStrategy<number> {
  isOverlapping(a: Interval<number>, b: Interval<number>, exclusive: boolean): boolean {
    const [from1, to1, from2, to2] = [a.start, a.end, b.start, b.end];

    if (exclusive) {
      return (
        (isValidNumber(to2) ? from1 < (to2 as number) : true) &&
        (isValidNumber(to1) ? (to1 as number) > from2 : true)
      );
    }
    return (
      (isValidNumber(to2) ? from1 <= (to2 as number) : true) &&
      (isValidNumber(to1) ? (to1 as number) >= from2 : true)
    );
  }
}

export const NumberStrategy = new NumberIntervalComparisonStrategy();
