import { vi, describe, it, expect, beforeEach } from 'vitest';
import { fetchBatches, createBatch, deleteBatch } from '../utils/batchApi';
import { Recipe } from '../types';

// reset mocks before each test
beforeEach(() => {
  vi.restoreAllMocks();
});

describe('batchApi utilities', () => {
  it('fetchBatches() should fetch batches successfully', async () => {
    const mockBatches = [
      { batchName: 'Test Batch', recipes: [] }
    ];

    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBatches),
      })
    ) as any);

    const result = await fetchBatches();
    expect(result).toEqual(mockBatches);
  });

  it('fetchBatches() should throw error if request fails', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: false })
    ) as any);

    await expect(fetchBatches()).rejects.toThrow('Failed to fetch batches');
  });

});
