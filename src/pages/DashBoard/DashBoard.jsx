import { BsPostcardHeart } from "react-icons/bs";
import { FaBook, FaHome, FaPortrait, FaUsers } from "react-icons/fa";
import { MdOutlinePendingActions, MdOutlinePostAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";
import { FaChalkboardUser } from "react-icons/fa6";
import { GiPodiumWinner } from "react-icons/gi";

const DashBoard = () => {
  const [role, isRoleLoading] = useRole();

  const linkStyles = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm tracking-tight ${
      isActive
        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-900/50 scale-105"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`;

  if (isRoleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral">
        <span className="loading loading-bars loading-lg text-indigo-500"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {/* Dashboard Side Bar */}
      <div className="w-full md:w-80 bg-neutral text-white p-8 shadow-2xl z-20">
        <div className="mb-12 text-left">
          <h2 className="text-3xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-base">
              W
            </div>
            WIN<span className="text-indigo-600">SPHERE</span>
          </h2>
          <div className="mt-4 inline-block px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            <p className="text-[9px] uppercase tracking-[3px] font-black text-indigo-400">
              {role === "admin"
                ? "Systems Administrator"
                : role === "creator"
                ? "Content Creator"
                : "Arena Participant"}
            </p>
          </div>
        </div>

        <ul className="menu space-y-3 p-0">
          {/* --- ADMIN ROUTES --- */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/manageUser" className={linkStyles}>
                  <FaUsers size={18} /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageContest" className={linkStyles}>
                  <FaBook size={18} /> Manage Contests
                </NavLink>
              </li>
            </>
          )}

          {/* --- CREATOR ROUTES --- */}
          {role === "creator" && (
            <>
              <li>
                <NavLink to="/dashboard/addContest" className={linkStyles}>
                  <MdOutlinePostAdd size={20} /> Launch Contest
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/createdContest" className={linkStyles}>
                  <MdOutlinePendingActions size={20} /> Active Creations
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/contestSubmitted"
                  className={linkStyles}
                >
                  <BsPostcardHeart size={18} /> Submissions
                </NavLink>
              </li>
            </>
          )}

          {/* --- USER ROUTES --- */}
          {role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/myProfile" className={linkStyles}>
                  <FaPortrait size={18} /> Athlete Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/participatedContest"
                  className={linkStyles}
                >
                  <FaChalkboardUser size={18} /> History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/winningContest" className={linkStyles}>
                  <GiPodiumWinner size={18} /> Hall of Fame
                </NavLink>
              </li>
            </>
          )}

          <div className="divider before:bg-white/5 after:bg-white/5 my-10 opacity-20"></div>

          <li>
            <NavLink to="/" className={linkStyles}>
              <FaHome size={18} /> Exit to Arena
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard Content Area */}
      <div className="flex-1 p-4 md:p-10 lg:p-16 h-screen overflow-y-auto">
        <div className="bg-white rounded-[3.5rem] min-h-full shadow-2xl shadow-indigo-100/50 p-8 md:p-12 border border-indigo-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
