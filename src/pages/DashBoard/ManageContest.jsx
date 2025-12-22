import { useQuery } from "@tanstack/react-query";
import { FaRegCommentDots, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const ManageContest = () => {
  const axiosSecure = useAxiosSecure();
  const { data: contests = [], refetch } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  const [selectedContest, setSelectedContest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleComment = async (event) => {
    event.preventDefault();
    if (!selectedContest) return;

    const form = event.target;
    const adminComment = form.adminComment.value;
    const newComment = { adminComment };

    try {
      const menuRes = await axiosSecure.patch(
        `/adminComment/${selectedContest._id}`,
        newComment
      );
      if (menuRes.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Contest Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      console.error("Failed to update contest:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to update contest",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleConfirm = async (contest) => {
    const status = "confirm";
    const newStatus = { status };

    try {
      const menuRes = await axiosSecure.patch(
        `/status/${contest._id}`,
        newStatus
      );
      if (menuRes.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Contest confirmed Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      console.error("Failed to update contest:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to update contest",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDeleteContest = (contest) => {
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
        axiosSecure.delete(`/contests/${contest._id}`).then((res) => {
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

  // Pagination logic
  const [filteredContests, setFilteredContests] = useState([]);
  useEffect(() => {
    setFilteredContests(contests);
  }, [contests]);

  const totalPages = Math.ceil(filteredContests.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContests = filteredContests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`btn ${currentPage === i ? "btn-active" : ""}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <h2 className="text-4xl font-extrabold my-2">
        Manage Contest {contests.length}
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Contest Name</th>
                <th>Type</th>
                <th>Comment</th>
                <th>Confirm</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentContests.map((contest, index) => (
                <tr key={contest._id}>
                  <th>{indexOfFirstItem + index + 1}</th>
                  <td>{contest.contestName}</td>
                  <td>{contest.contestType}</td>
                  <td>
                    <button
                      className="btn btn-accent"
                      onClick={() => {
                        setSelectedContest(contest);
                        document.getElementById("my_modal_5").showModal();
                      }}
                    >
                      <FaRegCommentDots className="text-xl" />
                    </button>
                    <dialog
                      id="my_modal_5"
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Comment Here</h3>
                        <form onSubmit={handleComment}>
                          <input
                            className="input input-bordered mt-2 w-full"
                            placeholder="Type Here"
                            type="text"
                            name="adminComment"
                            required
                          />
                          <input
                            className="btn mt-2 btn-accent text-white"
                            type="submit"
                            value="Submit"
                          />
                        </form>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </td>

                  <td>
                    {contest.status === "confirm" ? (
                      <span className="text-green-500 font-bold ml-3">
                        Confirm
                      </span>
                    ) : (
                      <button
                        className="btn btn-sm bg-orange-500 text-white"
                        onClick={() => handleConfirm(contest)}
                      >
                        pending
                      </button>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => handleDeleteContest(contest)}
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
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`btn ${currentPage === 1 ? "btn-disabled" : ""}`}
            >
              &lt;
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`btn ${
                currentPage === totalPages ? "btn-disabled" : ""
              }`}
            >
              &gt;
            </button>
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

export default ManageContest;
