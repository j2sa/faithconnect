import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
  
  const publicRoutes = ['/', '/login', '/register'];
  
  // Determine the appropriate layout
  const getLayout = (page) => {
    if (publicRoutes.includes(router.pathname)) {
      return <Layout>{page}</Layout>;
    }
    if (!publicRoutes.includes(router.pathname) && isAuthenticated) {
      return <LayoutAuth>{page}</LayoutAuth>;
    }
    // Default to Layout if not authenticated or path not found
    return <Layout>{page}</Layout>;
  };
  
  return getLayout(<Component {...pageProps} />);
};

export default MyApp;
