import Sidebar from './Sidebar';

const LayoutAuth = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <main className="flex-1 p-8">
      {children}
    </main>
  </div>
);

export default LayoutAuth;
