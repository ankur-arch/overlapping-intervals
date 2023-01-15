import { IntervalComparisonStrategy, Interval } from '../types';

/**
 * @param {Interval<Date>} a - interval A
 * @param {Interval<Date>} b - interval B
 * @param {boolean} exclusive - whether start of time1 is allowed to overlap with end of time2 or vice versa
 * @param {IntervalComparisonStrategy<T>} comparisonStrategy - can be extended to support for other types or different comparison algorithms
 * @example - where T is of type Date =>
 * inclusive
 *      DateRange1: |-----------|
 *                   Start      End
 *
 *      DateRange2:             |-----------|
 *                              Start      End
 *
 *  In the above example, the date range one and date range two are in conflict and would be considered as an overlap in inclusive date range.
 *
 * @example
 *
 * @example - exclusive
 *      DateRange1: |-----|
 *                  Start End
 *
 *      DateRange2:            |---------|
 *                             Start    End
 *
 *  In the above example, the date range one and date range two are not in conflict and would not be considered as an overlap in exclusive date range.
 * @returns {boolean} - whether it's overlapping or not
 */
export function isOverlapping<T>(
  a: Interval<T>,
  b: Interval<T>,
  exclusive: boolean,
  comparisonStrategy: IntervalComparisonStrategy<T>
): boolean {
  return comparisonStrategy.isOverlapping(a, b, exclusive);
}
