import { useEffect, useState } from 'react';
import { fetchBatches, rateBatch, submitBatchRating } from '../utils/batchApi';
import { Batch, Recipe } from '../types';

export default function Dashboard() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [ratingInputs, setRatingInputs] = useState<{ [key: number]: number }>({});

const handleRateBatch = async (batchId: number) => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please log in first.');
    return;
  }

  const ratingValue = ratingInputs[batchId];
  if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
    alert('Please enter a rating between 1 and 5.');
    return;
  }

  try {
    await submitBatchRating(batchId, ratingValue, token);
    alert('Rating submitted!');
    const updatedBatches = await fetchBatches();
    setBatches(updatedBatches);
    setRatingInputs((prev) => ({ ...prev, [batchId]: 0 }));
  } catch (err) {
    console.error(err);
    alert('Failed to submit rating.');
  }
};



  useEffect(() => {
    const loadBatches = async () => {
      try {
        const data = await fetchBatches();
        setBatches(data);
      } catch (err) {
        console.error('Failed to load batches:', err);
      }
    };
    loadBatches();
  }, []);

  const handleRatingChange = (batchId: number, value: number) => {
    setRatingInputs((prev) => ({
      ...prev,
      [batchId]: value
    }));
  };

  const submitRating = async (batchId: number) => {
    const ratingValue = ratingInputs[batchId];
    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      alert('Please enter a rating between 1 and 5.');
      return;
    }

    try {
      await rateBatch(batchId, ratingValue);
      alert('Thanks for your rating!');
      const updatedBatches = await fetchBatches();
      setBatches(updatedBatches);
      setRatingInputs((prev) => ({ ...prev, [batchId]: 0 }));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '40px', paddingBottom: '50px' }}>Dashboard</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginLeft: '25px' }}>
        {batches.map((batch) => (
          <div
              key={batch.id}
              onClick={() => setSelectedBatch(batch)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '1rem',
                width: '230px',
                cursor: 'pointer',
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
                backgroundColor: 'lightblue',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget.style.transform = 'scale(1.03)'), (e.currentTarget.style.boxShadow = '4px 4px 12px rgba(0,0,0,0.2)'))
              }
              onMouseLeave={(e) =>
                ((e.currentTarget.style.transform = 'scale(1)'), (e.currentTarget.style.boxShadow = '2px 2px 8px rgba(0,0,0,0.1)'))
              }
            >
              <h3>{batch.batchName}</h3>
              <p>{batch.recipes.length} recipes</p>

              <div
                onClick={(e) => e.stopPropagation()} // prevent opening modal on input/button click
              >
                <label>Rate this batch (1-5):</label>
                <br />
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={ratingInputs[batch.id] || ''}
                  onChange={(e) => handleRatingChange(batch.id, Number(e.target.value))}
                  style={{ width: '80px', marginLeft: '5px' }}
                />
                <button
                  onClick={() => handleRateBatch(batch.id)}
                  style={{ marginLeft: '15px', padding: '8px', borderRadius: '15px'}}
                >
                  Submit
                </button>
              </div>
          </div>

        ))}
      </div>

      {/* Modal */}
      {selectedBatch && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '10px',
            width: '30%',
            maxHeight: '80vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <button onClick={() => setSelectedBatch(null)} style={{ float: 'right' }}>✖</button>
            <h2>{selectedBatch.batchName}</h2>
            {selectedBatch.recipes.length === 0 ? (
              <p>No recipes in this batch.</p>
            ) : (
              selectedBatch.recipes.map((recipe: Recipe, idx: number) => (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <h4>{recipe.title}</h4>
                  <strong>Ingredients:</strong>
                  <ul>
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i}>{ing.quantity} {ing.unit} {ing.name}</li>
                    ))}
                  </ul>
                  <strong>Steps:</strong>
                  <ol>
                    {recipe.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
