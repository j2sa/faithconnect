import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../src/utils/api';
import auth from '../src/utils/auth';
import Image from 'next/image';
import '../src/styles/globals.css';

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
      router.push('/home');
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="login-container"> {/* Usando className diretamente */}
      <div className="login-leftColumn">
      <div className="p-8 bg-white rounded-lg shadow-md" style={{ height: '320px' }}>
        <p className="mb-4">Preencha com seus dados de acesso.</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            {/*  <label htmlFor="email">Email</label> */}
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
            {/* <label htmlFor="password">Senha</label> */}
            <input
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              required
              className="input"
            />
            <div className="flex justify-between">
              <p> </p>
              <button type="submit" className="button bg-green-600">Entrar</button>
            </div>
          </form>
        </div>
      </div>
      <div className="login-rightColumn">
        {/* <Image src="/path-to-your-image.jpg" alt="Imagem ou Propaganda" width={500} height={500} />*/}
      </div>
    </div>
  );
};

export default Login;
