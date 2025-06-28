import { useNavigate } from 'react-router-dom';
 
export default function HomeButton() {
  const navigate = useNavigate();
 
  return (
    <button
      onClick={() => navigate('/')}
      style={{
        backgroundColor: 'cyan',
        position: 'absolute',
        top: '10px',
        left: '10px',
        padding: '8px 12px',
        cursor: 'pointer',
        borderRadius: '30px',
        border: '1px solid gray'
      }}
    >
      <span style={{ fontSize: '30px' }}>🏠</span>
    </button>
  );
}