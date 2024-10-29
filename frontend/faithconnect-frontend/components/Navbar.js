import Link from 'next/link';
import Image from 'next/image';
import churchHubLogo from '../public/images/logo.png';

const Navbar = () => (
  <nav className="navbar border-b border-gray-200 px-4 py-2 fixed w-full top-0 z-10">
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-gray-700"><Image src={churchHubLogo} layout="fixed" height={45}/></Link>
      <ul className="flex space-x-2">
        <li>
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1">Login</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
