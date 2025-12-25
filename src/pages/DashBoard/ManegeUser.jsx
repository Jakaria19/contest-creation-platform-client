import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaShieldAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const ManageUser = () => {
  const { user: currentUser } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleUpdateRole = (user, newRole) => {
    if (user.email === currentUser?.email) {
      Swal.fire(
        "Action Denied",
        "You cannot change your own admin role!",
        "warning"
      );
      refetch();
      return;
    }

    axiosSecure
      .patch(`/users/role/${user._id}`, { role: newRole })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Role Updated!",
            text: `${user.name} is now an ${newRole}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleDeleteUser = (user) => {
    if (user.email === currentUser?.email) {
      return Swal.fire(
        "Error",
        "You cannot delete your own account from here!",
        "error"
      );
    }

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${user.name}. This is permanent!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete user!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User has been removed.", "success");
          }
        });
      }
    });
  };

  useEffect(() => {
    const filtered = users.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredQueries(filtered);
    setCurrentPage(1);
  }, [users, searchText]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredQueries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredQueries.length / itemsPerPage);

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center h-96 gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-gray-400 font-bold animate-pulse">
          Fetching user directory...
        </p>
      </div>
    );

  return (
    <div className="p-2 md:p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-neutral uppercase tracking-tighter">
            User <span className="text-primary">Management</span>
          </h2>
          <div className="badge badge-outline mt-2 opacity-70">
            Total Users: {users.length}
          </div>
        </div>

        <div className="w-full md:w-96">
          <div className="relative group">
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by name or email..."
              className="input input-bordered w-full rounded-2xl pl-12 focus:border-primary shadow-sm transition-all group-hover:shadow-md"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-4 top-3.5 text-gray-400 group-hover:text-primary transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-neutral/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-2">
            <thead className="bg-gray-50 text-neutral">
              <tr className="border-none text-xs uppercase tracking-widest">
                <th className="py-5 pl-8">Full Profile</th>
                <th>Access Level</th>
                <th>Modify Role</th>
                <th className="text-center pr-8">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr
                  key={user._id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="pl-8">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                          <img
                            src={
                              user.photo || "https://i.ibb.co/mJR7z9Y/user.png"
                            }
                            alt={user.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-black text-neutral flex items-center gap-2">
                          {user.name}
                          {user.email === currentUser?.email && (
                            <div className="badge badge-xs badge-neutral">
                              You
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className={`badge badge-md gap-2 font-bold px-4 py-3 ${
                        user.role === "admin"
                          ? "bg-error/10 text-error border-none"
                          : user.role === "creator"
                          ? "bg-primary/10 text-primary border-none"
                          : "bg-gray-100 text-gray-500 border-none"
                      }`}
                    >
                      {user.role === "admin" && <FaShieldAlt size={10} />}
                      {user.role || "user"}
                    </div>
                  </td>
                  <td>
                    <select
                      value={user.role || "user"}
                      onChange={(e) => handleUpdateRole(user, e.target.value)}
                      className="select select-bordered select-sm w-full max-w-[140px] rounded-xl focus:outline-primary border-gray-200"
                    >
                      <option value="user">User Access</option>
                      <option value="creator">Creator Access</option>
                      <option value="admin">Admin Access</option>
                    </select>
                  </td>
                  <td className="text-center pr-8">
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-ghost btn-circle btn-sm text-error hover:bg-error/10 transition-colors"
                      title="Delete User"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Container */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 mb-6">
          <div className="join bg-white shadow-lg border-none overflow-hidden rounded-2xl">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="join-item btn btn-md bg-white border-none hover:bg-primary hover:text-white disabled:bg-gray-50"
            >
              «
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`join-item btn btn-md border-none w-14 ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "bg-white hover:bg-primary/10"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="join-item btn btn-md bg-white border-none hover:bg-primary hover:text-white disabled:bg-gray-50"
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
