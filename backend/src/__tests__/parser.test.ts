import { parseRecipeText } from '../utils/parser';

describe('parseRecipeText', () => {
  it('should parse a valid single recipe', () => {
    const input = `
      TITLE: Cake
      ING: 1 cup Sugar
      STEP: Mix it well
    `;

    const result = parseRecipeText(input);

    expect(result.recipes.length).toBe(1);
    expect(result.errors.length).toBe(0);
    expect(result.recipes[0].title).toBe('Cake');
    expect(result.recipes[0].ingredients.length).toBe(1);
    expect(result.recipes[0].steps.length).toBe(1);
  });

  it('should return error if line found before TITLE', () => {
    const input = `
      ING: 1 cup Sugar
      STEP: Mix it well
    `;

    const result = parseRecipeText(input);

    expect(result.recipes.length).toBe(0);
    expect(result.errors.some(e => e.type === 'MissingTitle')).toBe(true);
  });

  it('should collect multiple errors in malformed input', () => {
    const input = `
      TITLE: BadRecipe
      ING: wrongQuantity cup Sugar
      ING: 1 
      STEP: 
      SOMETHING: wrong
    `;

    const result = parseRecipeText(input);

    expect(result.recipes.length).toBe(0); // because errors prevent valid recipe creation
    const errorTypes = result.errors.map(e => e.type);

    expect(errorTypes).toContain('InvalidQuantity');
    expect(errorTypes).toContain('MissingIngredient');
    expect(errorTypes).toContain('InvalidLineFormat');
  });

  it('should handle empty input gracefully', () => {
    const result = parseRecipeText('');

    expect(result.recipes.length).toBe(0);
    expect(result.errors.length).toBe(0);
  });
});