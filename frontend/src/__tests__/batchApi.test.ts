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

  it('createBatch() should create batch successfully', async () => {
    const mockBatch = {
      batchName: 'New Batch',
      recipes: [] as Recipe[],
    };

    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBatch),
      })
    ) as any);

    const result = await createBatch('New Batch', []);
    expect(result).toEqual(mockBatch);
  });

  it('createBatch() should throw error if creation fails', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: false })
    ) as any);

    await expect(createBatch('Fail Batch', [])).rejects.toThrow('Failed to create batch');
  });

  it('deleteBatch() should delete batch successfully', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: true })
    ) as any);

    await expect(deleteBatch('BatchToDelete')).resolves.toBeUndefined();
  });

  it('deleteBatch() should throw error if deletion fails', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: false })
    ) as any);

    await expect(deleteBatch('NonexistentBatch')).rejects.toThrow('Failed to delete batch');
  });
});
