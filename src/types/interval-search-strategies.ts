import { Interval } from './interval-strategies';

export interface SearchOverlappingIntervalsStrategy<T> {
  findOverlaps(
    a: Interval<T>[],
    b: Interval<T>[],
    exclusive: boolean
  ): [Interval<T>[], Interval<T>[], Interval<T>[], boolean];
}
