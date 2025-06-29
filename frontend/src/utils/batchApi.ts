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
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_BASE_URL}/batches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // send token here
    },
    body: JSON.stringify({ batchName, recipes }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to create batch: ${errText}`);
  }

  return response.json();
}


export async function deleteBatch(batchName: string) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found — you must be logged in.');

  const response = await fetch(`${API_BASE_URL}/batches/${batchName}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to delete batch');
}

export async function rateBatch(batchId: number, rating: number) {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_BASE_URL}/batches/${batchId}/rate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ rating }),
  });

  if (!response.ok) throw new Error('Failed to submit rating');
  return response.json();
}

export async function submitBatchRating(batchId: number, score: number, token: string) {
  const response = await fetch(`${API_BASE_URL}/batches/${batchId}/rate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ score }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to submit rating:', errorText);
    throw new Error('Failed to submit rating');
  }

  return response.json();
}
