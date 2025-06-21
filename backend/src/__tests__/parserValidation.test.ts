import { validateAndParseRecipes } from '../utils/parserValidation';
import { RawRecipeBlock } from '../utils/parserUtils';

describe('validateAndParseRecipes', () => {
  it('should parse valid recipe blocks successfully', () => {
    const blocks: RawRecipeBlock[] = [
      {
        titleLine: 'TITLE: Test Recipe',
        lines: ['ING: 1 cup Sugar', 'STEP: Mix ingredients'],
      },
    ];

    const result = validateAndParseRecipes(blocks);

    expect(result.recipes.length).toBe(1);
    expect(result.errors.length).toBe(0);
    expect(result.recipes[0].title).toBe('Test Recipe');
  });

  it('should record error for invalid quantity', () => {
    const blocks: RawRecipeBlock[] = [
      {
        titleLine: 'TITLE: Faulty Recipe',
        lines: ['ING: abc cup Sugar', 'STEP: Mix'],
      },
    ];

    const result = validateAndParseRecipes(blocks);
    expect(result.recipes.length).toBe(0);
    expect(result.errors[0].type).toBe('InvalidQuantity');
  });

  it('should record error for missing steps', () => {
    const blocks: RawRecipeBlock[] = [
      {
        titleLine: 'TITLE: No Steps Recipe',
        lines: ['ING: 1 cup Sugar'],
      },
    ];

    const result = validateAndParseRecipes(blocks);
    expect(result.errors.some(e => e.type === 'MissingStep')).toBe(true);
  });
});
