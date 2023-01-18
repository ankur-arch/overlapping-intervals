import { DateStrategy, isOverlapping } from '../src/index';

describe('Testing overlapping interval detection using DateStrategy', () => {
  it('should return true for overlapping inclusive intervals', () => {
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1) },
        { start: new Date(2019, 11, 31) },
        false,
        DateStrategy
      )
    ).toBe(true);
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1), end: new Date(2020, 0, 3) },
        { start: new Date(2020, 0, 2) },
        false,
        DateStrategy
      )
    ).toBe(true);
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1), end: new Date(2020, 0, 3) },
        { start: new Date(2020, 0, 2), end: new Date(2020, 0, 4) },
        false,
        DateStrategy
      )
    ).toBe(true);
  });

  it('should return true for overlapping exclusive intervals', () => {
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1) },
        { start: new Date(2020, 0, 2) },
        true,
        DateStrategy
      )
    ).toBe(true);

    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1), end: new Date(2020, 0, 4) },
        { start: new Date(2020, 0, 3) },
        true,
        DateStrategy
      )
    ).toBe(true);

    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1), end: new Date(2020, 0, 3) },
        { start: new Date(2019, 0, 4) },
        true,
        DateStrategy
      )
    ).toBe(true);
  });

  it('should return false for non-overlapping inclusive intervals', () => {
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1), end: new Date(2020, 0, 3) },
        { start: new Date(2020, 0, 4) },
        false,
        DateStrategy
      )
    ).toBe(false);
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 4) },
        { start: new Date(2020, 0, 1), end: new Date(2020, 0, 2) },
        false,
        DateStrategy
      )
    ).toBe(false);
  });

  it('should return false for non-overlapping exclusive intervals', () => {
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1), end: new Date(2020, 0, 3) },
        { start: new Date(2020, 0, 4) },
        true,
        DateStrategy
      )
    ).toBe(false);

    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1), end: new Date(2020, 0, 2) },
        { start: new Date(2020, 0, 2) },
        false,
        DateStrategy
      )
    ).toBe(false);
  });

  it('should return true when inclusive interval has no end', () => {
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1) },
        { start: new Date(2020, 0, 2) },
        false,
        DateStrategy
      )
    ).toBe(true);
  });

  it('should return true when exclusive interval has no end', () => {
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1) },
        { start: new Date(2020, 0, 2) },
        true,
        DateStrategy
      )
    ).toBe(true);
  });

  it('should return true when both intervals have no end', () => {
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1) },
        { start: new Date(2019, 11, 31) },
        false,
        DateStrategy
      )
    ).toBe(true);
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1) },
        { start: new Date(2019, 11, 31) },
        true,
        DateStrategy
      )
    ).toBe(true);
  });

  it('should return true when both inclusive intervals start at the same time', () => {
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1) },
        { start: new Date(2020, 0, 1) },
        false,
        DateStrategy
      )
    ).toBe(true);
  });

  it('should return false when both exclusive intervals start at the same time', () => {
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1) },
        { start: new Date(2020, 0, 1) },
        true,
        DateStrategy
      )
    ).toBe(true);
  });

  it('should return true when both inclusive intervals end at the same time', () => {
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 4), end: new Date(2020, 0, 5) },
        { start: new Date(2020, 0, 2), end: new Date(2020, 0, 5) },
        false,
        DateStrategy
      )
    ).toBe(true);
  });

  it('should return true when both exclusive intervals end at the same time', () => {
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 4), end: new Date(2020, 0, 5) },
        { start: new Date(2020, 0, 2), end: new Date(2020, 0, 5) },
        true,
        DateStrategy
      )
    ).toBe(true);
  });

  it('should return true when both inclusive intervals are the same', () => {
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1), end: new Date(2020, 0, 2) },
        { start: new Date(2020, 0, 1), end: new Date(2020, 0, 2) },
        false,
        DateStrategy
      )
    ).toBe(true);
  });

  it('should return true when both exclusive intervals are the same', () => {
    expect(
      isOverlapping(
        { start: new Date(2020, 0, 1), end: new Date(2020, 0, 2) },
        { start: new Date(2020, 0, 1), end: new Date(2020, 0, 2) },
        true,
        DateStrategy
      )
    ).toBe(true);
  });
});
