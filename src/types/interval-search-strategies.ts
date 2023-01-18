import { Interval } from './interval-strategies';

export interface SearchOverlappingIntervalsStrategy<T> {
  findOverlaps: (
    a: Array<Interval<T>>,
    b: Array<Interval<T>>,
    exclusive: boolean
  ) => [Array<Interval<T>>, Array<Interval<T>>, Array<Interval<T>>, boolean];
}
