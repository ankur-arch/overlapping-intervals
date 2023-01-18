import { Interval, IntervalComparisonStrategy, SearchOverlappingIntervalsStrategy } from '../types';

export class LineSweepOverlapStrategy<T> implements SearchOverlappingIntervalsStrategy<T> {
  private readonly intervalComparisonStrategy: IntervalComparisonStrategy<T>;
  private readonly compareEnds: (a: Interval<T>, b: Interval<T>) => number;
  private readonly sortFn: (a: Interval<T>, b: Interval<T>) => number;

  /**
   *
   * @param {IntervalComparisonStrategy<T>} intervalComparisonStrategy
   * @param {(a: Interval<T>, b: Interval<T>) => number} compareEnds
   * @param {(a: Interval<T>, b: Interval<T>) => number} sortFn
   */
  constructor(
    intervalComparisonStrategy: IntervalComparisonStrategy<T>,
    compareEnds: (a: Interval<T>, b: Interval<T>) => number,
    sortFn: (a: Interval<T>, b: Interval<T>) => number
  ) {
    this.intervalComparisonStrategy = intervalComparisonStrategy;
    this.compareEnds = compareEnds;
    this.sortFn = sortFn;
  }

  private findOverlapsInArray(a: Array<Interval<T>>, exclusive: boolean): Array<Interval<T>> {
    const overlaps: Array<Interval<T>> = [];

    // Check for overlaps within the array
    for (let i = 0; i < a.length; i++) {
      if (i !== 0 && this.intervalComparisonStrategy.isOverlapping(a[i - 1], a[i], exclusive)) {
        overlaps.push(a[i - 1]);
        break;
      }
    }

    return overlaps;
  }

  /**
   * @param {Interval<T>[]} a
   * @param {Interval<T>[]} b
   * @param {boolean} exclusive
   * @returns {[Interval<T>[], Interval<T>[], Interval<T>[], boolean]} - [overlapping times in a and were there conflicts in a | b, conflicts in A, conflicts in B, isOverlapping]
   */
  findOverlaps(
    a: Array<Interval<T>>,
    b: Array<Interval<T>>,
    exclusive: boolean
  ): [Array<Interval<T>>, Array<Interval<T>>, Array<Interval<T>>, boolean] {
    a.sort(this.sortFn);
    b.sort(this.sortFn);

    let i = 0;
    let j = 0;
    const overlapping: Array<Interval<T>> = [];
    let overlapsA: Array<Interval<T>> = [];
    let overlapsB: Array<Interval<T>> = [];

    // Check for overlaps within 'a'
    overlapsA = this.findOverlapsInArray(a, exclusive);

    // Check for overlaps within 'b'
    overlapsB = this.findOverlapsInArray(b, exclusive);

    while (i < a.length && j < b.length) {
      if (this.intervalComparisonStrategy.isOverlapping(a[i], b[j], exclusive)) {
        overlapping.push(a[i]);
      }

      // b[j] greater than a[i]
      if (this.compareEnds(a[i], b[j]) < 0) {
        i++;
      } else {
        j++;
      }
    }
    return [
      overlapping,
      overlapsA,
      overlapsB,
      !(overlapping.length === 0 && overlapsA.length === 0 && overlapsB.length === 0),
    ];
  }
}
