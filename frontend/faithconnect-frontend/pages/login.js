import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../src/utils/api';
import auth from '../src/utils/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, senha });
      auth.setToken(response.data.token);
      setError('');
      console.log('Login successful');
      router.push('/dashboard'); // Redirecionar para a página principal ou dashboard
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login failed:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
