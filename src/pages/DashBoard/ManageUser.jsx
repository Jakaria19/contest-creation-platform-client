import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const ManageUser = () => {
  const { user: currentUser } = useAuth();
  const [searchText, setSearchText] = useState("");
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

  const filteredQueries = users.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleUpdateRole = (user, newRole) => {
    if (user.email === currentUser?.email) {
      Swal.fire("Action Denied", "You cannot change your own role!", "warning");
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
            text: `${user.name} is now ${newRole}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleDeleteUser = (user) => {
    if (user.email === currentUser?.email) {
      return Swal.fire("Error", "You cannot delete yourself!", "error");
    }

    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User removed.", "success");
          }
        });
      }
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredQueries.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  return (
    <div className="p-4 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter">
          User <span className="text-primary">Management</span>
        </h2>
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by name or email..."
          className="input input-bordered w-full max-w-xs rounded-2xl shadow-sm"
        />
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
        <table className="table w-full">
          <thead className="bg-gray-50 uppercase text-xs">
            <tr>
              <th className="pl-8 py-5">User Info</th>
              <th>Current Role</th>
              <th>Change Role</th>
              <th className="text-center pr-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition-colors border-b border-gray-50"
              >
                <td className="pl-8 py-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar mask mask-squircle w-12 h-12 border-2 border-primary/10">
                      <img
                        src={user.photo || "https://i.ibb.co/mJR7z9Y/user.png"}
                        alt="user"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-neutral">{user.name}</div>
                      <div className="text-xs opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`badge font-bold p-3 ${
                      user.role === "admin"
                        ? "badge-primary"
                        : user.role === "creator"
                        ? "badge-secondary"
                        : "badge-ghost"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
                <td>
                  <select
                    value={user.role || "user"}
                    onChange={(e) => handleUpdateRole(user, e.target.value)}
                    className="select select-bordered select-sm rounded-lg focus:outline-primary"
                  >
                    <option value="user">User</option>
                    <option value="creator">Creator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="text-center pr-8">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-sm text-error hover:bg-error/10 rounded-full"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
