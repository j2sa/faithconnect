import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import auth from '../src/utils/auth';

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = auth.getToken();
    if (!token) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Bem-vindo ao FaithConnect!</h1>
      <p>Estamos felizes em tê-lo de volta.</p>
      <p>Explore as funcionalidades da plataforma usando o menu de navegação.</p>
    </div>
  );
};

export default Dashboard;
