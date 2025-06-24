import { useState, useEffect } from 'react';
import { Batch, Recipe } from '../types';
import BatchView from './BatchView';
import { fetchBatches, createBatch, deleteBatch } from '../utils/batchApi';

interface Props {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

export default function BatchManager({ recipes, setRecipes, setInputText }: Props) {
  const [batchName, setBatchName] = useState('');
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  useEffect(() => {
    const loadBatches = async () => {
      try {
        const data = await fetchBatches();
        setBatches(data);
      } catch (error) {
        console.error('Failed to fetch batches:', error);
      }
    };
    loadBatches();
  }, []);

  const handleCreateBatch = async () => {
    if (!batchName.trim() || recipes.length === 0) {
      alert('Provide a batch name and at least one recipe.');
      return;
    }

    try {
      await createBatch(batchName, recipes);
      setBatchName('');
      const updatedBatches = await fetchBatches();
      setBatches(updatedBatches);

      // Clear parsed recipes and text input
      setRecipes([]);
      setInputText('');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleRemoveBatch = async (name: string) => {
    try {
      await deleteBatch(name);
      setBatches(batches.filter((b) => b.batchName !== name));
      if (selectedBatch?.batchName === name) {
        setSelectedBatch(null);
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const removeRecipeFromBatch = (recipeTitle: string) => {
    if (!selectedBatch) return;

    const updatedBatch: Batch = {
      ...selectedBatch,
      recipes: selectedBatch.recipes.filter((r) => r.title !== recipeTitle),
    };

    setBatches(
      batches.map((b) =>
        b.batchName === selectedBatch.batchName ? updatedBatch : b
      )
    );
    setSelectedBatch(updatedBatch);
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center' }}>Create Batch</h2>
      <input
        type="text"
        value={batchName}
        onChange={(e) => setBatchName(e.target.value)}
        placeholder="Batch name"
      />
      <br />
      <br />
      <button onClick={handleCreateBatch}>Create Batch</button>

      <h2 style={{ textAlign: 'center' }}>Existing Batches</h2>
      {batches.length === 0 && <p style={{ textAlign: 'center' }}>No batches yet.</p>}
      <ul>
        {batches.map((batch) => (
          <li key={batch.batchName}>
            <strong
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={() => setSelectedBatch(batch)}
            >
              {batch.batchName}
            </strong>{' '}
            ({batch.recipes.length} recipes)
            <button onClick={() => handleRemoveBatch(batch.batchName)}>❌</button>
          </li>
        ))}
      </ul>

      {selectedBatch && (
        <BatchView
          batch={selectedBatch}
          onRemoveRecipe={removeRecipeFromBatch}
          onClose={() => setSelectedBatch(null)}
        />
      )}
    </div>
  );
}
