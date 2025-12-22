import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const ManegeUser = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakeCreator = (user) => {
    axiosSecure.patch(`/users/creator/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Creator Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/usersDelete/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    const filtered = users.filter((item) =>
      item.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredQueries(filtered);
  }, [users, searchText]);

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.elements.searchInput.value;
    setSearchText(text);
  };

  // Pagination logic
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredQueries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredQueries.length / itemsPerPage);

  return (
    <div>
      <div className="flex justify-start my-2">
        <h2 className="text-4xl font-extrabold">Total Users: {users.length}</h2>
      </div>
      <div className="flex justify-end w-full mb-4">
        <form onSubmit={handleSearch}>
          <label className="input input-bordered w-full rounded-3xl flex items-center gap-2">
            <input
              type="text"
              name="searchInput"
              className="grow"
              placeholder="Search by user name"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </form>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th></th>
                <th>Make Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td></td>
                  <td>
                    {user.role === "admin" ? (
                      <span className="text-blue-500 font-bold ml-6">
                        Admin
                      </span>
                    ) : user.role === "creator" ? (
                      <span className="text-yellow-500 font-bold ml-6">
                        Creator
                      </span>
                    ) : (
                      <details className="dropdown">
                        <summary className="m-1 btn btn-sm bg-orange-500 text-white">
                          Change Role
                        </summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                          <li>
                            <a onClick={() => handleMakeAdmin(user)}>Admin</a>
                          </li>
                          <li>
                            <a onClick={() => handleMakeCreator(user)}>
                              Creator
                            </a>
                          </li>
                        </ul>
                      </details>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-error btn-md"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <div className="btn-group">
            <button
              onClick={() => handlePageChange(1)}
              className={`btn ${currentPage === 1 ? "btn-disabled" : ""}`}
            >
              &lt;&lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`btn ${currentPage === i + 1 ? "btn-active" : ""}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`btn ${
                currentPage === totalPages ? "btn-disabled" : ""
              }`}
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManegeUser;
