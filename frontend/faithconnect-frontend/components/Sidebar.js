import Link from 'next/link';
import Image from 'next/image';
import churchHubLogo from '../public/images/logo.png';

const Sidebar = () => (
  <div className="sidebar text-white w-64 h-screen px-4 py-8">
    <Image className="mb-8" src={churchHubLogo} layout="fixed" height={45}/>
    <ul className="space-y-4">
      <li>
        <Link href="/home" className="text-gray-300 hover:text-white">Home</Link>
      </li>
      <li>
        <Link href="/profile" className="text-gray-300 hover:text-white">Profile</Link>
      </li>
      <li>
        <Link href="/settings" className="text-gray-300 hover:text-white">Settings</Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
