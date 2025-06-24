import { render, screen, fireEvent } from '@testing-library/react';
import BatchManager from '../components/BatchManager';
import { Recipe } from '../types';
import { vi } from 'vitest';

describe('BatchManager Component', () => {
  const mockRecipes: Recipe[] = [
    {
      title: 'Test Recipe',
      ingredients: [{ quantity: 1, unit: 'cup', name: 'Sugar' }],
      steps: ['Mix ingredients'],
    },
  ];

  const mockSetRecipes = vi.fn();
  const mockSetInputText = vi.fn();

  it('renders batch name input and Create Batch button', () => {
    render(
      <BatchManager
        recipes={mockRecipes}
        setRecipes={mockSetRecipes}
        setInputText={mockSetInputText}
      />
    );

    // Check input exists
    expect(screen.getByPlaceholderText('Batch name')).toBeInTheDocument();

    // Check button exists (using role for robustness)
    expect(screen.getByRole('button', { name: /create batch/i })).toBeInTheDocument();
  });

  it('allows entering text in the batch name input', () => {
    render(
      <BatchManager
        recipes={mockRecipes}
        setRecipes={mockSetRecipes}
        setInputText={mockSetInputText}
      />
    );

    const input = screen.getByPlaceholderText('Batch name');
    fireEvent.change(input, { target: { value: 'New Batch' } });
    expect(input).toHaveValue('New Batch');
  });
});
