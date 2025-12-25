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
              ? "text-indigo-600 font-bold bg-transparent"
              : "hover:text-indigo-600 transition-colors"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allContest"
          className={({ isActive }) => (isActive ? "text-indigo-600" : "")}
        >
          Arena
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/sectors"
          className={({ isActive }) => (isActive ? "text-indigo-600" : "")}
        >
          Categories
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) => (isActive ? "text-indigo-600" : "")}
        >
          Solutions
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white/90 backdrop-blur-lg sticky top-0 z-50 px-4 md:px-12 py-3 border-b border-indigo-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden text-2xl text-indigo-600"
          >
            <HiMenuAlt1 />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-4 shadow-2xl bg-base-100 rounded-3xl w-64 space-y-2 border border-indigo-50"
          >
            {navLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-200">
            W
          </div>
          <span className="hidden sm:block">
            WIN<span className="text-indigo-600">SPHERE</span>
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-8 font-bold text-gray-500 uppercase text-[11px] tracking-[0.15em]">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-4">
        <div className="flex items-center gap-2 mr-2">
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === "dark"}
            className="toggle toggle-indigo toggle-sm"
          />
        </div>

        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar ring-2 ring-indigo-600 ring-offset-2"
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
              className="menu dropdown-content mt-4 z-50 p-5 shadow-2xl bg-base-100 rounded-[2rem] w-64 border border-indigo-50"
            >
              <div className="px-2 pb-4 mb-2 border-b border-slate-100">
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                  Active Profile
                </p>
                <p className="font-bold text-neutral truncate">
                  {user?.displayName}
                </p>
              </div>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:bg-indigo-50 hover:text-indigo-600 font-bold py-3 rounded-xl"
                >
                  My Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logOut()}
                  className="text-red-500 font-bold py-3 mt-2 hover:bg-red-50 rounded-xl"
                >
                  Logout Account
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-bold text-gray-600 hover:text-indigo-600 hidden sm:block"
            >
              Login
            </Link>
            <Link
              to="/signUp"
              className="btn bg-indigo-600 hover:bg-indigo-700 btn-sm px-6 rounded-xl text-white border-none shadow-lg shadow-indigo-100"
            >
              Join Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
