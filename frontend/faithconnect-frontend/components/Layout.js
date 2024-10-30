import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen"> {/* Atualizando a estrutura */}
    <Navbar />
    <main className="flex-1">{children}</main> {/* Fazendo o main ocupar todo o espaço disponível */}
    <Footer />
  </div>
);

export default Layout;
