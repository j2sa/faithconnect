import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import LayoutAuth from '../components/LayoutAuth';
import auth from '../src/utils/auth';
import '../src/styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = auth.getToken();
    setIsAuthenticated(!!token);
  }, [router]);

  const publicRoutes = ['/', '/login'];
  
  const getLayout = (page) => {
    if (publicRoutes.includes(router.pathname)) {
      return <Layout>{page}</Layout>;
    }
    if (isAuthenticated) {
      return <LayoutAuth>{page}</LayoutAuth>;
    }
    return <Layout>{page}</Layout>;
  };

  return getLayout(<Component {...pageProps} />);
};

export default MyApp;
