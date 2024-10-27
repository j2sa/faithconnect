import Layout from '../components/Layout';
import '../src/styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
