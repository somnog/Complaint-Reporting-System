import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">SomComplaint System</h2>
          <p className="text-gray-300 text-sm">
            Bringing quality solutions and creativity together.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/Complaints" className="hover:text-white">
                Complaints
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-400">
              <Facebook />
            </Link>
            <Link href="#" className="hover:text-pink-400">
              <Instagram />
            </Link>
            <Link href="#" className="hover:text-blue-300">
              <Twitter />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} SomComplaint System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
