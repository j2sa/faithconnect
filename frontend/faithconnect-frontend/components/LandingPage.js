import Link from 'next/link';

const LandingPage = () => (
  <div className="container mx-auto text-center py-20">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to FaithConnect</h1>
    <p className="text-lg text-gray-600 mb-8">Your tool to manage church members, view reports, and more.</p>
    <div className="flex justify-center space-x-4">
      <Link href="/login" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</Link>
      <Link href="/register" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">Register</Link>
    </div>
  </div>
);

export default LandingPage;
