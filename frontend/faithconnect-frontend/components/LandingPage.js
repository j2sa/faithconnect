import { useState } from 'react';
import api from '../src/utils/api';
import { useRouter } from 'next/router';
import Image from 'next/image';
import churchHubLogo from '../public/images/logo.png';

const LandingPage = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    cargo: '',
    igreja: {
      nome: '',
      endereco: '',
      cnpj: ''
    },
    senha: '',
    confirmarSenha: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleIgrejaChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      igreja: {
        ...userData.igreja,
        [name]: value
      }
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.senha !== userData.confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      const response = await api.post('/register', userData);
      setSuccess('Registro bem-sucedido!');
      setError('');
      console.log('Registration successful:', response.data);
      // Redirecionar para a página de login ou home, se necessário
      router.push('/login');
    } catch (error) {
      setError('O registro falhou. Por favor, tente novamente.');
      setSuccess('');
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div className="container mx-auto py-40 flex">
      <div className="w-full md:w-7/12 p-8">
        <div className="flex items-center mb-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-3">Bem vindo ao </h1>
          <Image src={churchHubLogo} height={80}/>
        </div>
        <p className="text-lg text-gray-600 mb-8">
          A plataforma para gerenciar membros da igreja, visualizar relatórios e muito mais. Com o ChurchHub, você pode facilmente administrar suas atividades e fortalecer a comunidade da igreja.
        </p>
      </div>      
      <div className="w-full md:w-5/12 p-8 bg-white rounded-lg shadow-md" style={{ height: '320px' }}>
        <p className="text-center mb-4">Inscreva-se para começar sua avaliação gratuita.</p>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          {step === 1 && (
            <div className="step">
              <input type="text" name="nome" placeholder="Nome" value={userData.nome} onChange={handleChange} required className="input" autoComplete="name" />
              <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} required className="input" />
              <input type="text" name="cargo" placeholder="Cargo na Igreja" value={userData.cargo} onChange={handleChange} required className="input" />
              <div className="flex justify-end">
                <button type="button" onClick={nextStep} className="button bg-blue-600">Avançar</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step">
              <input type="text" name="nome" placeholder="Nome da Igreja" value={userData.igreja.nome} onChange={handleIgrejaChange} required className="input" />
              <input type="text" name="endereco" placeholder="Endereço" value={userData.igreja.endereco} onChange={handleIgrejaChange} required className="input" />
              <input type="text" name="cnpj" placeholder="CNPJ" value={userData.igreja.cnpj} onChange={handleIgrejaChange} required className="input" />
              <div className="flex justify-between">
                <button type="button" onClick={prevStep} className="button bg-gray-600">Voltar</button>
                <button type="button" onClick={nextStep} className="button bg-blue-600">Avançar</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step">
              <input type="password" name="senha" placeholder="Senha" value={userData.senha} onChange={handleChange} required className="input" />
              <input type="password" name="confirmarSenha" placeholder="Confirmar Senha" value={userData.confirmarSenha} onChange={handleChange} required className="input" />
              <div className="flex justify-between">
                <button type="button" onClick={prevStep} className="button bg-gray-600">Voltar</button>
                <button type="submit" className="button bg-green-600">Cadastrar</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
