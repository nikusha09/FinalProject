import { Link, useNavigate } from 'react-router-dom';
import '../assets/Header.css';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">Recipe Parser</div>
      <nav>
        {token ? (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/dashboard" style={{ marginLeft: '1rem', color: 'white' }}>Dashboard</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
