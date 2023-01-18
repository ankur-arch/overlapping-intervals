import { Interval } from '../types';
import { DateStrategy } from './dates-strategy.service';
import { LineSweepOverlapStrategy } from './search-overlaps.service';

export const dateEndTimesComparison = (a: Interval<Date>, b: Interval<Date>): number => {
  if (!(a.end == null) && !(b.end == null)) {
    // both a and b  return difference in seconds
    const diffInMilliseconds = a.end.getTime() - b.end.getTime();
    return diffInMilliseconds / 1000;
  } else if (a.end == null && !(b.end == null)) {
    // a is infinity hence a is greater
    return 1;
  } else if (!(a.end == null) && b.end == null) {
    // b is infinity hence b is greater
    return -1;
  }
  return 0;
};

export const datesSortFn = (a: Interval<Date>, b: Interval<Date>): number => {
  return a.start.getTime() - b.start.getTime();
};

export const OverlappingDatesSearch = new LineSweepOverlapStrategy(
  DateStrategy,
  dateEndTimesComparison,
  datesSortFn
);
