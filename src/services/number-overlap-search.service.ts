import { Interval } from '../types';
import { NumberStrategy } from './number-strategy.service';
import { LineSweepOverlapStrategy } from './search-overlaps.service';

export const numberEndTimesComparison = (a: Interval<number>, b: Interval<number>): number => {
  return (a?.end ?? 0) - (b?.end ?? 0);
};

export const OverlappingNumbersSearch = new LineSweepOverlapStrategy(
  NumberStrategy,
  numberEndTimesComparison,
  numberEndTimesComparison
);
