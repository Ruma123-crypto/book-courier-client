
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-white text-black mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* 🔹 Brand */}
        <div>
          <h2 className="text-2xl font-bold text-primary">📚 BookCourier</h2>
          <p className="mt-2 text-sm ">
            Delivering books from library to your home easily and fast.
          </p>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/books" className="hover:text-primary">Books</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            <li><Link to="/login" className="hover:text-primary">Login</Link></li>
          </ul>
        </div>

        {/* 🔹 Contact + Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm ">Email: support@bookcourier.com</p>
          <p className="text-sm ">Phone: +880 1234-567890</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-xl">
            <a href="#" className="hover:text-primary"><FaFacebookF /></a>
            <a href="#" className="hover:text-primary"><FaGithub /></a>
            <a href="#" className="hover:text-primary"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-primary"><FaXTwitter /></a>
          </div>
        </div>
      </div>

      {/* 🔹 Bottom */}
      <div className=" text-center py-4 text-sm ">
        © {new Date().getFullYear()} BookCourier. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;