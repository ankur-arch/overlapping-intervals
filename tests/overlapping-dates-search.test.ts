import { Interval, OverlappingDatesSearch } from '../src';

describe('Test cases for `OverlappingDatesSearch`', () => {
  const group1a: Interval<Date>[] = [
    { start: new Date('2022-01-01T00:00:00.000Z'), end: new Date('2022-01-05T00:00:00.000Z') },
    { start: new Date('2022-01-07T00:00:00.000Z'), end: new Date('2022-01-08T00:00:00.000Z') },
    { start: new Date('2022-01-09T00:00:00.000Z'), end: new Date('2022-01-18T00:00:00.000Z') },
    { start: new Date('2022-01-20T00:00:00.000Z'), end: new Date('2022-01-21T00:00:00.000Z') },
    { start: new Date('2022-01-21T00:00:00.000Z'), end: new Date('2022-01-22T00:00:00.000Z') },
  ];

  const group1b: Interval<Date>[] = [{ start: new Date('2019-02-01T00:00:00.000Z') }];

  it('inclusive dates should return true by overlapping', () => {
    const result = OverlappingDatesSearch.findOverlaps(group1a, group1b, false);
    expect(result[3]).toBe(true);
    expect(result[0].length).toBe(group1a.length);
  });

  const group2a: Interval<Date>[] = [
    { start: new Date('2022-01-01T00:00:00.000Z'), end: new Date('2022-01-05T00:00:00.000Z') },
    { start: new Date('2022-01-07T00:00:00.000Z'), end: new Date('2022-01-08T00:00:00.000Z') },
    { start: new Date('2022-01-09T00:00:00.000Z'), end: new Date('2022-01-18T00:00:00.000Z') },
    { start: new Date('2022-01-20T00:00:00.000Z'), end: new Date('2022-01-21T00:00:00.000Z') },
    { start: new Date('2022-01-21T03:00:00.000Z'), end: new Date('2022-01-22T04:00:00.000Z') },
    { start: new Date('2022-01-21T03:00:00.000Z'), end: new Date('2022-01-22T04:00:00.000Z') },
  ];

  const group2b: Interval<Date>[] = [
    { start: new Date('2022-01-21T04:00:00.000Z'), end: new Date('2022-01-22T05:00:00.000Z') },
    { start: new Date('2023-02-01T00:00:00.000Z') },
    { start: new Date('2022-02-01T00:00:00.000Z'), end: new Date('2022-02-02T00:00:00.000Z') },
    { start: new Date('2022-02-03T00:00:00.000Z'), end: new Date('2022-02-04T00:00:00.000Z') },
  ];

  it('exclusive dates should return true by overlapping', () => {
    const result = OverlappingDatesSearch.findOverlaps(group2a, group2b, true);
    expect(result[3]).toBe(true);
    expect(result[0].length).toBe(2);
  });

  it('find conflict in single array when another array in empty', () => {
    const result = OverlappingDatesSearch.findOverlaps(group2a, [], true);
    expect(result[1]?.length).toBeTruthy();
    const result2 = OverlappingDatesSearch.findOverlaps([], group2a, true);
    expect(result2[1]?.length).toBeFalsy();
    expect(result2[2]?.length).toBeTruthy();
  });

  const group3a: Interval<Date>[] = [
    { start: new Date('2022-01-22T05:00:00.000Z'), end: new Date('2022-01-22T06:00:00.000Z') },
    { start: new Date('2022-01-07T00:00:00.000Z'), end: new Date('2022-01-08T00:00:00.000Z') },
  ];

  const group3b: Interval<Date>[] = [
    { start: new Date('2022-01-21T04:00:00.000Z'), end: new Date('2022-01-22T05:00:00.000Z') },
    { start: new Date('2022-02-01T00:00:00.000Z'), end: new Date('2022-02-02T00:00:00.000Z') },
    { start: new Date('2022-02-03T00:00:00.000Z'), end: new Date('2022-02-04T00:00:00.000Z') },
  ];

  it("Overlap should be found in when the option is exclusive but not when it's inclusive", () => {
    const result = OverlappingDatesSearch.findOverlaps(group3a, group3b, false);
    expect(result[3]).toBeFalsy();
    const result2 = OverlappingDatesSearch.findOverlaps(group3a, group3b, true);
    expect(result2[3]).toBeTruthy();
  });
});
