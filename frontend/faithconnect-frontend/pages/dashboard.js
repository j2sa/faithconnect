import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import auth from '../src/utils/auth';
import LayoutAuth from '../components/LayoutAuth';

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
    <>
      <h1 className="text-3xl font-bold mb-6">Bem-vindo ao FaithConnect!</h1>
      <p className="text-lg">Estamos felizes em tê-lo de volta. Explore as funcionalidades da plataforma usando o menu de navegação.</p>
    </>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default Dashboard;
