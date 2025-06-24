import { vi, describe, it, expect } from 'vitest';
import { parseRecipeText } from '../utils/api';

describe('parseRecipeText', () => {
  it('should parse recipes successfully', async () => {
    const mockResponse = {
      recipes: [{ title: 'Mock Recipe', ingredients: [], steps: [] }],
      errors: [],
    };

    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    ) as any);

    const result = await parseRecipeText('some text');
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error on bad response', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Something went wrong' }),
      })
    ) as any);

    await expect(parseRecipeText('text')).rejects.toThrow('Something went wrong');
  });
});