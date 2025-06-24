const API_BASE_URL = 'http://localhost:3000/api';

export async function parseRecipeText(text: string) {
  const response = await fetch(`${API_BASE_URL}/parse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to parse recipe.');
  }

  return response.json();
}