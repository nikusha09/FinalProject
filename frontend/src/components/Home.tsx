import { useNavigate } from 'react-router-dom';
 
export default function Home() {
  const navigate = useNavigate();
 
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '330px'}}>
      <h1>Welcome to the Recipe Parser App!</h1>
      <p>This tool lets you input raw recipe text, parse it into structured recipes, and group them into batches for easy management.</p>
      <p>To get started, click the button below.</p>
      <button onClick={() => navigate('/recipe')}>Go to Recipe Manager</button>
    </div>
  );
}