import { useState } from 'react';
import RecipeInput from './components/RecipeInput';
import RecipeDisplay from './components/RecipeDisplay';
import BatchManager from './components/BatchManager';
import { Recipe, Batch } from './types';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [inputText, setInputText] = useState<string>('');

  return (
    <div id="main">
      <h1 style={{ textAlign: 'center' }}>Recipe Parser</h1>
      <div className="krki">
        <RecipeInput
          inputText={inputText}
          setInputText={setInputText}
          onParse={(parsedRecipes) => setRecipes(parsedRecipes)}
        />
        <RecipeDisplay recipes={recipes} />
        <BatchManager
          recipes={recipes}
          setRecipes={setRecipes}
          setInputText={setInputText}
        />
      </div>
    </div>
  );
}

export default App;
