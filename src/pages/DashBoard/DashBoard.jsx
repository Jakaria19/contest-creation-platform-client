import { BsPostcardHeart } from "react-icons/bs";

import { FaBook, FaHome, FaPortrait, FaUsers } from "react-icons/fa";
import { MdOutlinePendingActions, MdOutlinePostAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useCreator from "../../hooks/useCreator";
import { FaChalkboardUser } from "react-icons/fa6";
import { GiPodiumWinner } from "react-icons/gi";

const DashBoard = () => {
  const [isAdmin] = useAdmin();
  const [isCreator] = useCreator();
  console.log(isAdmin);
  console.log(isCreator);

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-2/6 md:w-64 min-h-screen bg-[#6aa8a5]">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/manageUser">
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageContest">
                  <FaBook /> Manage Contests
                </NavLink>
              </li>
            </>
          ) : isCreator ? (
            <>
              <li>
                <NavLink to="/dashboard/addContest">
                  <MdOutlinePostAdd className="text-xl" /> Add Contest
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/createdContest">
                  <MdOutlinePendingActions className="text-xl" /> My Created
                  Contest
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/contestSubmitted">
                  <BsPostcardHeart className="text-xl" /> Contest submitted
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/myProfile">
                  <FaPortrait className="text-xl" /> My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/participatedContest">
                  <FaChalkboardUser className="text-xl" /> My Participated
                  Contest
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/winningContest">
                  <GiPodiumWinner className="text-xl" /> My Winning Contest
                </NavLink>
              </li>
            </>
          )}

          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome className="text-xl" /> Home
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
