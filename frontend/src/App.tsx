import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { useState } from 'react';
import RecipeInput from './components/RecipeInput';
import RecipeDisplay from './components/RecipeDisplay';
import BatchManager from './components/BatchManager';
import { Recipe, Batch } from './types';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [inputText, setInputText] = useState<string>('');

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/recipe"
        element={
            <div id="main">
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
        }
      />
    </Routes>
    </>
  );
}

export default App;
