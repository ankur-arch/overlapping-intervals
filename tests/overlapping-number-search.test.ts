import { Interval, OverlappingNumbersSearch } from '../src';

describe('Test cases for `OverlappingNumbersSearch`', () => {
  const group1a: Interval<number>[] = [
    { start: 100, end: 200 },
    { start: 210, end: 300 },
    { start: 310, end: 400 },
    { start: 410, end: 500 },
    { start: 510, end: 600 },
  ];

  const group1b: Interval<number>[] = [{ start: 100 }];

  it('inclusive dates should return true by overlapping', () => {
    const result = OverlappingNumbersSearch.findOverlaps(group1a, group1b, false);
    expect(result[3]).toBe(true);
    expect(result[0].length).toBe(1);
  });

  const group2a: Interval<number>[] = [
    { start: 2, end: 5 },
    { start: 6, end: 7 },
    { start: 8, end: 9 },
    { start: 8, end: 9 },
  ];

  const group2b: Interval<number>[] = [{ start: 1 }, { start: 10, end: 11 }];

  it('exclusive dates should return true by overlapping', () => {
    const result = OverlappingNumbersSearch.findOverlaps(group2a, group2b, true);
    expect(result[3]).toBe(true);
    expect(result[0].length).toBe(1);
  });

  it('find conflict in single array when another array in empty', () => {
    const result = OverlappingNumbersSearch.findOverlaps(group2a, [], true);
    expect(result[1]?.length).toBeTruthy();
    const result2 = OverlappingNumbersSearch.findOverlaps([], group2a, true);
    expect(result2[1]?.length).toBeFalsy();
    expect(result2[2]?.length).toBeTruthy();
  });

  const group3a: Interval<number>[] = [
    { start: 1, end: 2 },
    { start: 3, end: 4 },
  ];

  const group3b: Interval<number>[] = [{ start: 4, end: 5 }];

  it("Overlap should be found in when the option is exclusive but not when it's inclusive", () => {
    const result = OverlappingNumbersSearch.findOverlaps(group3a, group3b, false);
    expect(result[3]).toBeFalsy();
    const result2 = OverlappingNumbersSearch.findOverlaps(group3a, group3b, true);
    expect(result2[3]).toBeTruthy();
  });
});
