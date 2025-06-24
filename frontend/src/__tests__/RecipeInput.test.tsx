import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RecipeInput from '../components/RecipeInput';
import { Recipe } from '../types';

describe('RecipeInput', () => {
  const mockSetInputText = vi.fn();

  it('renders textarea and parse button', () => {
    render(
      <RecipeInput
        inputText=""
        setInputText={mockSetInputText}
        onParse={() => {}}
      />
    );
    expect(screen.getByPlaceholderText('Paste your recipes here...')).toBeInTheDocument();
    expect(screen.getByText('Parse')).toBeInTheDocument();
  });

  it('handles parsing logic on button click', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ recipes: [], errors: [] }),
      })
    ) as any);

    const mockOnParse = vi.fn();
    render(
      <RecipeInput
        inputText="TITLE: Test"
        setInputText={mockSetInputText}
        onParse={mockOnParse}
      />
    );

    fireEvent.click(screen.getByText('Parse'));

    await new Promise(r => setTimeout(r, 100)); // await fetch

    expect(mockOnParse).toHaveBeenCalled();
  });
});
