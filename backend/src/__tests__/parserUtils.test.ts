import { splitAndGroupRecipes } from '../utils/parserUtils';

describe('splitAndGroupRecipes', () => {
  it('should split lines and group by TITLE lines', () => {
    const input = `
      TITLE: Recipe One
      ING: 1 cup Sugar
      STEP: Mix it well
      TITLE: Recipe Two
      ING: 2 cup Flour
      STEP: Bake it
    `;

    const result = splitAndGroupRecipes(input).recipes;

    expect(result.length).toBe(2);
    expect(result[0].titleLine).toBe('TITLE: Recipe One');
    expect(result[0].lines).toEqual(['ING: 1 cup Sugar', 'STEP: Mix it well']);
    expect(result[1].titleLine).toBe('TITLE: Recipe Two');
    expect(result[1].lines).toEqual(['ING: 2 cup Flour', 'STEP: Bake it']);
  });

  it('should return an empty array for empty input', () => {
    const result = splitAndGroupRecipes('').recipes;
    expect(result).toEqual([]);
  });

  it('should skip lines before any TITLE line', () => {
    const input = `
      ING: 1 cup Sugar
      STEP: Mix it well
      TITLE: Recipe One
      ING: 2 cup Flour
      STEP: Bake it
    `;

    const result = splitAndGroupRecipes(input).recipes;

    expect(result.length).toBe(1);
    expect(result[0].titleLine).toBe('TITLE: Recipe One');
    expect(result[0].lines).toEqual(['ING: 2 cup Flour', 'STEP: Bake it']);
  });
});
