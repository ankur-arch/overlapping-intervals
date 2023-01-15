import { IntervalComparisonStrategy, Interval } from '../types';

export class DateIntervalComparisonStrategy implements IntervalComparisonStrategy<Date> {
  isOverlapping(a: Interval<Date>, b: Interval<Date>, exclusive: boolean): boolean {
    const [from1, to1, from2, to2] = [a.start, a.end, b.start, b.end];

    if (exclusive) {
      return (!to2 || from1 < to2) && (!to1 || to1 > from2);
    }

    return (!to2 || from1 <= to2) && (!to1 || to1 >= from2);
  }
}

export const DateStrategy = new DateIntervalComparisonStrategy();
