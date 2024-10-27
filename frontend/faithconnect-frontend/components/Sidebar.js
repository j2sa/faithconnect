import Link from 'next/link';

const Sidebar = () => (
  <div className="bg-gray-800 text-white w-64 h-screen px-4 py-8">
    <h2 className="text-2xl font-bold mb-8">FaithConnect</h2>
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
