import Link from 'next/link';

const Navbar = () => (
  <nav className="bg-white border-b border-gray-200 px-4 py-2 fixed w-full top-0 z-10">
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-gray-700">ChurchHub</Link>
      <ul className="flex space-x-2">
        <li>
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1">Login</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
