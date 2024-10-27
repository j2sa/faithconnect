import { useState } from 'react';
import api from '../src/utils/api';

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [igreja, setIgreja] = useState({
    nome: '',
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    pais: '',
    cep: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/register', { nome, email, senha, igreja });
      setSuccess('Registration successful!');
      setError('');
      console.log('Registration successful:', response.data);
      // Redirecionar para a página de login ou home se necessário
    } catch (error) {
      setError('Registration failed. Please try again.');
      setSuccess('');
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required />
      <input type="text" value={igreja.nome} onChange={(e) => setIgreja({ ...igreja, nome: e.target.value })} placeholder="Nome da Igreja" required />
      <input type="text" value={igreja.endereco} onChange={(e) => setIgreja({ ...igreja, endereco: e.target.value })} placeholder="Endereço da Igreja" required />
      <input type="text" value={igreja.numero} onChange={(e) => setIgreja({ ...igreja, numero: e.target.value })} placeholder="Número" required />
      <input type="text" value={igreja.complemento} onChange={(e) => setIgreja({ ...igreja, complemento: e.target.value })} placeholder="Complemento" />
      <input type="text" value={igreja.cidade} onChange={(e) => setIgreja({ ...igreja, cidade: e.target.value })} placeholder="Cidade" required />
      <input type="text" value={igreja.estado} onChange={(e) => setIgreja({ ...igreja, estado: e.target.value })} placeholder="Estado" required />
      <input type="text" value={igreja.pais} onChange={(e) => setIgreja({ ...igreja, pais: e.target.value })} placeholder="País" required />
      <input type="text" value={igreja.cep} onChange={(e) => setIgreja({ ...igreja, cep: e.target.value })} placeholder="CEP" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;