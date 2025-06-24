import { Recipe } from '../types';

interface Props {
  recipes: Recipe[];
}

export default function RecipeDisplay({ recipes }: Props) {
  return (
    <div className="container">
      <h2 style={{ textAlign: 'center' }}>Parsed Recipes</h2>
      {recipes.length === 0 && <p>No recipes to display.</p>}
      {recipes.map((recipe, i) => (
        <div key={i} className="recipe-card">
          <h3>{recipe.title}</h3>
          <strong>Ingredients:</strong>
          <ul>
            {recipe.ingredients.map((ing, j) => (
              <li key={j}>
                {ing.quantity} {ing.unit} {ing.name}
              </li>
            ))}
          </ul>
          <strong>Steps:</strong>
          <ul>
            {recipe.steps.map((step, j) => (
              <li key={j}>{step}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
