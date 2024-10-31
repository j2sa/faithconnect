import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import auth from '../src/utils/auth';
import LayoutAuth from '../components/LayoutAuth';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = auth.getToken();
    console.log(token)
    if (!token) {
      router.push('/login');
    } else {
      try {
        // Verificar a validade do token
        const decodedToken = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decodedToken.exp < now) {
          // Token expirou
          router.push('/login');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Token inválido:', error);
        router.push('/login');
      }
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Bem-vindo ao ChurchHub!</h1>
      <p className="text-lg">Estamos felizes em tê-lo de volta. Explore as funcionalidades da plataforma usando o menu de navegação.</p>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default Home;
