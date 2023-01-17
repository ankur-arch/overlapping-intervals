import { Interval } from '../types';
import { NumberStrategy } from './number-strategy.service';
import { LineSweepOverlapStrategy } from './search-overlaps.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Comparator = (a: Interval<number>, b: Interval<number>) => number;

/**
 *
 * @param {keyof Interval<number>} p - either property of Interval
 * @returns {Comparator} - a function which can be used as the comparator function for sorting or comparing ends
 */
export const numberIntervalComparison =
  (p: keyof Interval<number>) =>
  (a: Interval<number>, b: Interval<number>): number => {
    return +(a?.[p] ?? 0) - +(b?.[p] ?? 0);
  };

export const OverlappingNumbersSearch = new LineSweepOverlapStrategy(
  NumberStrategy,
  numberIntervalComparison('end'),
  numberIntervalComparison('start')
);
