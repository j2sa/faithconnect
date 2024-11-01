import Link from 'next/link';
import Image from 'next/image';
import churchHubLogo from '../public/images/logo.png';

const Sidebar = () => (
  <div className="sidebar text-white w-64 h-screen px-4 py-8">
    <Image className="mb-8" src={churchHubLogo} alt="Church Hub" layout="fixed" height={45} />
    <ul className="space-y-4">
      <li>
        <Link href="/home" className="text-gray-300 hover:text-white">Início</Link>
      </li>
      <li>
        <Link href="/members" className="text-gray-300 hover:text-white">Membros</Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
