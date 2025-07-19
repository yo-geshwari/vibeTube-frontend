import { Link } from "react-router-dom";

function Navbar({ register = true, login = true, home = false }) {
  return (
    <nav className=" container relative mx-auto flex w-full items-center justify-between px-5 py-0 text-xl ">
      <div className="h-20 w-60">
        <img
          src="/logo.png"
          alt="VibeTube Logo"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex items-center justify-around">
        <ul className="mx-3 flex">
          {home && <li className="mx-3">
            <Link
              to="/"
              className="text-l hover:text-[#A0E7E5] transition-colors duration-200"
            >
              Home
            </Link>
          </li>}
          {register && <li className="mx-3">
            <Link
              to="/register"
              className="text-l hover:text-[#A0E7E5] transition-colors duration-200"
            >
              Start Vibin’! Register
            </Link>
          </li>}
          {login && <li className="mx-3">
            <Link
              to="/login"
              className="text-l hover:text-[#A0E7E5] transition-colors duration-200"
            >
              Already vibin’? Log in
            </Link>
          </li>}
          <li className="mx-3">
            <Link
              to="/contact-us"
              className="text-l hover:text-[#A0E7E5] transition-colors duration-200"
            >
              Contact us!
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
