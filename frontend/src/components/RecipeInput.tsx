import { useState } from 'react';
import { parseRecipeText } from '../utils/api';
import { Recipe, ParsingError } from '../types';

interface Props {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  onParse: (recipes: Recipe[]) => void;
}

export default function RecipeInput({ inputText, setInputText, onParse }: Props) {
  const [errors, setErrors] = useState<ParsingError[]>([]);
  const [loading, setLoading] = useState(false);

  const handleParse = async () => {
    try {
      setLoading(true);
      const result = await parseRecipeText(inputText);
      onParse(result.recipes);
      setErrors(result.errors);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 style= {{ textAlign: 'center' }} >Enter your recipe here</h2>
      <textarea
        rows={5}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste your recipes here..."
        className="textarea"
      />
      <button onClick={handleParse} disabled={loading}>
        {loading ? 'Parsing...' : 'Parse'}
      </button>

      {errors.length > 0 && (
        <div>
          <h2>Errors:</h2>
          <ul>
            {errors.map((err, i) => (
              <li key={i}>
                Line {err.lineNumber}: {err.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
