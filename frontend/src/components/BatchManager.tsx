import { useState, useEffect } from 'react';
import { Batch, Recipe } from '../types';
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
      style={{ borderRadius: '8px', padding: '11px', marginRight: '15px' }}
        type="text"
        value={batchName}
        onChange={(e) => setBatchName(e.target.value)}
        placeholder="Batch name"
      />
      <button onClick={handleCreateBatch}>Create Batch</button>
 
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Existing Batches</h2>
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
            <button
            style={{
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      padding: '3px 10px',
                      borderRadius: '10px',
                      marginTop: '0.5rem',
                      marginLeft: '10px',
                    }}onClick={() => handleRemoveBatch(batch.batchName)}>Remove</button>
          </li>
        ))}
      </ul>
 
      {/* Modal Popup */}
      {selectedBatch && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <button onClick={() => setSelectedBatch(null)} style={{ float: 'right' }}>
              ✖
            </button>
            <h2 style={{fontStyle: 'Italic', fontSize: '40px', textAlign: 'center'}}>{selectedBatch.batchName}</h2>
 
            {selectedBatch.recipes.length === 0 ? (
              <p>No recipes in this batch.</p>
            ) : (
              selectedBatch.recipes.map((recipe) => (
                <div key={recipe.title} style={{ marginBottom: '1rem' }}>
                  <h3>{recipe.title}</h3>
                  <strong>Ingredients:</strong>
                  <ul>
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i}>
                        {ing.quantity} {ing.unit} {ing.name}
                      </li>
                    ))}
                  </ul>
                  <strong>Steps:</strong>
                  <ol>
                    {recipe.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
 
                  {/* Remove recipe button */}
                  <button
                    style={{
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '10px',
                      marginTop: '0.5rem',
                    }}
                    onClick={() => removeRecipeFromBatch(recipe.title)}
                  >
                    Remove Recipe
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
 
// modal overlay and content styles
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};
 
const modalContentStyle: React.CSSProperties = {
  background: 'white',
  padding: '2rem',
  borderRadius: '10px',
  width: '40%',
  maxHeight: '80vh',
  overflowY: 'auto',
  position: 'relative'
};