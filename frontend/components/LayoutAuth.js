import Sidebar from './Sidebar';

const LayoutAuth = ({ children }) => (
  <div className="flex h-screen">
      <Sidebar />
    <main className="flex-1 overflow-y-auto p-8">
      {children}
    </main>
  </div>
);

export default LayoutAuth;