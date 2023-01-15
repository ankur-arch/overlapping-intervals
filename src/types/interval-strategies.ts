export type Interval<T> = {
  start: T;
  end?: T;
  additional?: unknown;
};

export interface IntervalComparisonStrategy<T> {
  isOverlapping(a: Interval<T>, b: Interval<T>, exclusive: boolean): boolean;
}
