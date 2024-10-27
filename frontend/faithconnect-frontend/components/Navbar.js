import Link from 'next/link';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/login">Login</Link></li>
      <li><Link href="/register">Register</Link></li>
    </ul>
  </nav>
);

export default Navbar;
