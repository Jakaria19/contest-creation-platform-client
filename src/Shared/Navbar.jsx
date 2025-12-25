import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold bg-transparent"
              : "hover:text-primary transition-colors"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allContest">All Contests</NavLink>
      </li>
      <li>
        <NavLink to="/sectors">Sectors</NavLink>
      </li>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-12 py-3 border-b border-gray-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-2xl">
            <HiMenuAlt1 />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-4 shadow-2xl bg-base-100 rounded-2xl w-64 space-y-2"
          >
            {navLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter flex items-center gap-1"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm italic">
            C
          </div>
          CONTEST<span className="text-primary">LAB</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6 font-bold text-gray-600 uppercase text-xs tracking-widest">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        <div className="flex items-center gap-2 mr-2">
          <span className="text-[10px] font-bold uppercase opacity-50 hidden sm:block">
            Theme
          </span>
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === "dark"}
            className="toggle toggle-primary toggle-sm"
          />
        </div>

        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar border-2 border-primary ring ring-primary ring-offset-2 ring-offset-base-100 ring-opacity-10"
            >
              <div className="w-10 rounded-full">
                <img
                  src={user?.photoURL || "https://i.ibb.co/p3d9pYn/user.png"}
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-50 p-4 shadow-2xl bg-base-100 rounded-2xl w-60 border border-gray-100"
            >
              <div className="px-4 py-3 mb-2 border-b">
                <p className="text-xs font-black text-primary uppercase">
                  Logged In As
                </p>
                <p className="font-bold text-neutral truncate">
                  {user?.displayName}
                </p>
              </div>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:bg-primary hover:text-white font-bold py-3"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logOut()}
                  className="text-error font-bold py-3 mt-2 hover:bg-error/10"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm hidden sm:flex">
              Login
            </Link>
            <Link
              to="/signUp"
              className="btn btn-primary btn-sm px-6 rounded-full text-white shadow-lg shadow-primary/20"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
