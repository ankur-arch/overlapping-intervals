import { NumberStrategy, isOverlapping } from '../src/index';

describe('Testing overlapping interval detection using NumberStrategy', () => {
  it('should return true for overlapping inclusive intervals', () => {
    expect(isOverlapping({ start: 430 }, { start: 530 }, false, NumberStrategy)).toBe(true);
    expect(isOverlapping({ start: 130, end: 230 }, { start: 145 }, false, NumberStrategy)).toBe(
      true
    );
    expect(isOverlapping({ start: 1, end: 4 }, { start: 3, end: 6 }, false, NumberStrategy)).toBe(
      true
    );
  });

  it('should return true for overlapping exclusive intervals', () => {
    expect(isOverlapping({ start: 1 }, { start: 2 }, true, NumberStrategy)).toBe(true);

    expect(isOverlapping({ start: 1, end: 4 }, { start: 3 }, true, NumberStrategy)).toBe(true);

    expect(isOverlapping({ start: 1, end: 5 }, { start: 4 }, true, NumberStrategy)).toBe(true);
  });

  it('should return false for non-overlapping inclusive intervals', () => {
    expect(isOverlapping({ start: 1, end: 3 }, { start: 4 }, false, NumberStrategy)).toBe(false);
    expect(isOverlapping({ start: 4 }, { start: 1, end: 2 }, false, NumberStrategy)).toBe(false);
  });

  it('should return false for non-overlapping exclusive intervals', () => {
    expect(isOverlapping({ start: 1, end: 3 }, { start: 4 }, true, NumberStrategy)).toBe(false);

    expect(isOverlapping({ start: 1, end: 2 }, { start: 3 }, true, NumberStrategy)).toBe(false);
  });

  it('should return true when inclusive interval has no end', () => {
    expect(isOverlapping({ start: 1 }, { start: 2 }, false, NumberStrategy)).toBe(true);
  });

  it('should return true when exclusive interval has no end', () => {
    expect(isOverlapping({ start: 1 }, { start: 2 }, true, NumberStrategy)).toBe(true);
  });

  it('should return true when both intervals have no end', () => {
    expect(isOverlapping({ start: 1 }, { start: 4 }, false, NumberStrategy)).toBe(true);
    expect(isOverlapping({ start: 1 }, { start: 4 }, true, NumberStrategy)).toBe(true);
  });

  it('should return true when both inclusive intervals start at the same time', () => {
    expect(isOverlapping({ start: 2 }, { start: 2 }, false, NumberStrategy)).toBe(true);
  });

  it('should return false when both exclusive intervals start at the same time', () => {
    expect(isOverlapping({ start: 1 }, { start: 1 }, true, NumberStrategy)).toBe(true);
  });

  it('should return false when both inclusive intervals end and start at the same time', () => {
    expect(
      isOverlapping({ start: 100, end: 200 }, { start: 200, end: 230 }, false, NumberStrategy)
    ).toBe(false);
  });

  it('should return true when both exclusive intervals end and start at the same time', () => {
    expect(
      isOverlapping({ start: 100, end: 200 }, { start: 200, end: 230 }, true, NumberStrategy)
    ).toBe(true);
  });

  it('should return true when both inclusive intervals are the same', () => {
    expect(isOverlapping({ start: 1, end: 2 }, { start: 1, end: 2 }, false, NumberStrategy)).toBe(
      true
    );
  });

  it('should return true when both exclusive intervals are the same', () => {
    expect(isOverlapping({ start: 1, end: 2 }, { start: 1, end: 2 }, true, NumberStrategy)).toBe(
      true
    );
  });
});
