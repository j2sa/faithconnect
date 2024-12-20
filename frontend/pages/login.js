import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../src/utils/api';
import auth from '../src/utils/auth';
import Image from 'next/image';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, senha });
      // Store the token in sessionStorage
      auth.setToken(response.data.accessToken);
      auth.setRefreshToken(response.data.refreshToken);
      auth.setChurchId(response.data.churchId);
      setError('');
      console.log('Login successful');
      console.log('Redirecting to /home'); // Adding console log to verify redirection
      router.push('/home'); // Redirect to home after successful login
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-leftColumn">
        <div className="p-8 bg-white rounded-lg shadow-md" style={{ height: '320px' }}>
          <p className="mb-4">Preencha com seus dados de acesso.</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="input"
              autoComplete="email"
            />
            <input
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              required
              className="input"
              autoComplete="current-password"
            />
            <div className="flex justify-between">
              <p> </p>
              <button type="submit" className="button bg-green-600">Entrar</button>
            </div>
          </form>
        </div>
      </div>
      <div className="login-rightColumn">
        <Image
          src="https://i.giphy.com/YOZ2qMCwb9qec0Pkpj.webp"
          alt="Imagem ou Propaganda"
          width={500}
          height={500}
          unoptimized
        />
      </div>
    </div>
  );
};

export default Login;
