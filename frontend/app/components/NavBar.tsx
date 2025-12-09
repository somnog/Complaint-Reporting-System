import Link from "next/link";
import { ShieldAlert } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="bg-white backdrop-blur-md p-4 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <ShieldAlert size={32} className="text-blue-900" />
          <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
            SomComplaint System
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-900 font-medium hover:text-blue-900 transition"
          >
            Home
          </Link>

          <Link
            href="/Complaints"
            className="text-gray-900 font-medium hover:text-blue-900 transition"
          >
            Complaints
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-2 items-center">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-lg border border-gray-400 text-gray-900 font-semibold 
            hover:bg-gray-700 hover:text-white transition shadow-sm"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 rounded-lg bg-gray-700 text-gray-100 font-semibold 
            hover:bg-gray-800 transition shadow-sm"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
