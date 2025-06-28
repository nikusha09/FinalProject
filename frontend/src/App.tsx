import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { useState } from 'react';
import RecipeInput from './components/RecipeInput';
import RecipeDisplay from './components/RecipeDisplay';
import BatchManager from './components/BatchManager';
import { Recipe, Batch } from './types';
import HomeButton from './components/HomeButton';
 
function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [inputText, setInputText] = useState<string>('');
 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe" element={
        <div id="main">
          <HomeButton />
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
      } />
    </Routes>
  );
}
 
export default App;