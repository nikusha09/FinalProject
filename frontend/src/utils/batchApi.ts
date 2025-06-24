import { Recipe } from "../types";

const API_BASE_URL = 'http://localhost:3000/api';

export async function fetchBatches() {
  const response = await fetch(`${API_BASE_URL}/batches`);
  if (!response.ok) throw new Error('Failed to fetch batches');
  return response.json();
}

export async function fetchBatchByName(batchName: string) {
  const response = await fetch(`${API_BASE_URL}/batches/${batchName}`);
  if (!response.ok) throw new Error('Failed to fetch batch');
  return response.json();
}

export async function createBatch(batchName: string, recipes: Recipe[] = []) {
  const response = await fetch(`${API_BASE_URL}/batches`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ batchName, recipes }),
  });
  if (!response.ok) throw new Error('Failed to create batch');
  return response.json();
}

export async function deleteBatch(batchName: string) {
  const response = await fetch(`${API_BASE_URL}/batches/${batchName}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete batch');
}
