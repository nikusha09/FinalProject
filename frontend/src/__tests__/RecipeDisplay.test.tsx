import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecipeDisplay from '../components/RecipeDisplay';
import { Recipe } from '../types';

describe('RecipeDisplay', () => {
  const recipes: Recipe[] = [
    {
      title: 'Pasta',
      ingredients: [{ quantity: 200, unit: 'g', name: 'Pasta' }],
      steps: ['Boil water', 'Cook pasta'],
    },
  ];

  it('renders recipe titles and content', () => {
    render(<RecipeDisplay recipes={recipes} />);
    expect(screen.getByText('Pasta')).toBeInTheDocument();
    expect(screen.getByText('Boil water')).toBeInTheDocument();
  });

  it('renders message if no recipes', () => {
    render(<RecipeDisplay recipes={[]} />);
    expect(screen.getByText('No recipes to display.')).toBeInTheDocument();
  });
});
