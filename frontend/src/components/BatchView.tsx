import { Batch, Recipe } from '../types';

interface Props {
  batch: Batch;
  onRemoveRecipe: (recipeTitle: string) => void;
  onClose: () => void;
}

export default function BatchView({ batch, onRemoveRecipe, onClose }: Props) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
      <h2>{batch.batchName}</h2>
      <button onClick={onClose}>Close</button>

      {batch.recipes.length === 0 ? (
        <p>No recipes in this batch.</p>
      ) : (
        batch.recipes.map((recipe) => (
          <div key={recipe.title} style={{ marginBottom: '1rem' }}>
            <h3>{recipe.title}</h3>
            <p><strong>Ingredients:</strong></p>
            <ul>
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>
                  {ing.quantity} {ing.unit} {ing.name}
                </li>
              ))}
            </ul>
            <p><strong>Steps:</strong></p>
            <ol>
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <button onClick={() => onRemoveRecipe(recipe.title)}>Remove Recipe</button>
          </div>
        ))
      )}
    </div>
  );
}
