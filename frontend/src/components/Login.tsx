import { useState } from 'react';
import { login } from '../utils/authApi';
import { useNavigate } from 'react-router-dom';
import '../assets/Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { token } = await login(email, password);
      localStorage.setItem('token', token);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        className="auth-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="auth-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button className="auth-button" onClick={handleLogin}>Login</button>
    </div>
  );
}
