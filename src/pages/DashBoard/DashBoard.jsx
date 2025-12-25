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
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
      isActive
        ? "bg-primary text-white shadow-lg shadow-primary/30"
        : "text-white/70 hover:bg-white/10 hover:text-white"
    }`;

  if (isRoleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-200">
      {/* Dashboard Side Bar */}
      <div className="w-full md:w-80 bg-neutral text-white p-6 shadow-2xl z-10">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black tracking-tighter text-primary">
            CONTEST<span className="text-white">HUB</span>
          </h2>
          <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <p className="text-[10px] uppercase tracking-[3px] font-bold text-primary/80">
              {role === "admin"
                ? "Admin Panel"
                : role === "creator"
                ? "Creator Panel"
                : "User Dashboard"}
            </p>
          </div>
        </div>

        <ul className="menu space-y-2 p-0">
          {/* --- ADMIN ROUTES --- */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/manageUser" className={linkStyles}>
                  <FaUsers className="text-xl" /> <span>Manage Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageContest" className={linkStyles}>
                  <FaBook className="text-xl" /> <span>Manage Contests</span>
                </NavLink>
              </li>
            </>
          )}

          {/* --- CREATOR ROUTES --- */}
          {role === "creator" && (
            <>
              <li>
                <NavLink to="/dashboard/addContest" className={linkStyles}>
                  <MdOutlinePostAdd className="text-xl" />{" "}
                  <span>Add Contest</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/createdContest" className={linkStyles}>
                  <MdOutlinePendingActions className="text-xl" />{" "}
                  <span>My Created Contests</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/contestSubmitted"
                  className={linkStyles}
                >
                  <BsPostcardHeart className="text-xl" />{" "}
                  <span>Contest Submitted</span>
                </NavLink>
              </li>
            </>
          )}

          {/* --- USER ROUTES --- */}
          {role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/myProfile" className={linkStyles}>
                  <FaPortrait className="text-xl" /> <span>My Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/participatedContest"
                  className={linkStyles}
                >
                  <FaChalkboardUser className="text-xl" />{" "}
                  <span>My Participated</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/winningContest" className={linkStyles}>
                  <GiPodiumWinner className="text-xl" />{" "}
                  <span>My Winning Contests</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Shared Nav Links */}
          <div className="divider before:bg-white/5 after:bg-white/5 my-8 opacity-50"></div>

          <li>
            <NavLink to="/" className={linkStyles}>
              <FaHome className="text-xl" /> <span>Back to Home</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard Content Area */}
      <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto h-screen">
        <div className="bg-white rounded-[2.5rem] min-h-full shadow-xl shadow-neutral/5 p-6 md:p-10 border border-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
