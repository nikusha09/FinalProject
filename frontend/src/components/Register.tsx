import { useState } from 'react';
import { register } from '../utils/authApi';
import { useNavigate } from 'react-router-dom';
import '../assets/Auth.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(email, password);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
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
      <button className="auth-button" onClick={handleRegister}>Register</button>
    </div>
  );
}
