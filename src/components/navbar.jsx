import { Link } from "react-router-dom";

function Navbar({ register = true, login = true, home = false, logout = false }) {
  return (
    <nav className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4 py-2 text-xl">
      {/* Logo */}
      <div className="h-20 w-60 mb-2 lg:mb-0">
        <img
          src="/logo.png"
          alt="VibeTube Logo"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Links */}
      <ul className="flex flex-wrap justify-center lg:justify-end items-center gap-x-4 gap-y-2 text-center">
        {home && (
          <li>
            <Link
              to="/"
              className="hover:text-[#A0E7E5] transition-colors duration-200"
            >
              Home
            </Link>
          </li>
        )}
        {logout && (
          <li>
            <Link
              to="/"
              className="hover:text-[#A0E7E5] transition-colors duration-200"
            >
              Logout
            </Link>
          </li>
        )}
        {register && (
          <li>
            <Link
              to="/register"
              className="hover:text-[#A0E7E5] transition-colors duration-200"
            >
              Start Vibin’! Register
            </Link>
          </li>
        )}
        {login && (
          <li>
            <Link
              to="/login"
              className="hover:text-[#A0E7E5] transition-colors duration-200"
            >
              Already vibin’? Log in
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/contact-us"
            className="hover:text-[#A0E7E5] transition-colors duration-200"
          >
            Contact us!
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
