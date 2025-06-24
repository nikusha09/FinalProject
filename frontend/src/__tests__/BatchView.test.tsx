import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BatchView from '../components/BatchView';
import { Batch } from '../types';

describe('BatchView', () => {
  const mockBatch: Batch = {
    batchName: 'Test Batch',
    recipes: [
      {
        title: 'Pancakes',
        ingredients: [{ quantity: 1, unit: 'cup', name: 'Flour' }],
        steps: ['Mix ingredients', 'Cook on skillet'],
      },
    ],
  };

  it('renders batch name and recipes', () => {
    render(
      <BatchView batch={mockBatch} onClose={() => {}} onRemoveRecipe={() => {}} />
    );
    expect(screen.getByText('Test Batch')).toBeInTheDocument();
    expect(screen.getByText('Pancakes')).toBeInTheDocument();
  });

  it('calls onClose when Close button is clicked', () => {
    const mockClose = vi.fn();
    render(
      <BatchView batch={mockBatch} onClose={mockClose} onRemoveRecipe={() => {}} />
    );
    fireEvent.click(screen.getByText('Close'));
    expect(mockClose).toHaveBeenCalled();
  });
});
