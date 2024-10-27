import Link from 'next/link';

const Navbar = () => (
  <nav className="bg-white border-b border-gray-200 px-4 py-2">
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-gray-700">FaithConnect</Link>
      <ul className="flex space-x-4">
        <li>
          <Link href="/login" className="text-gray-600 hover:text-gray-800">Login</Link>
        </li>
        <li>
          <Link href="/register" className="text-gray-600 hover:text-gray-800">Register</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
