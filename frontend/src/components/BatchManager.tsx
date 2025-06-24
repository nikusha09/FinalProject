import { useState, useEffect } from 'react';
import { Batch, Recipe } from '../types';
import { fetchBatches } from '../utils/batchApi';

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

  return (
    <div>    </div>
  );
}
