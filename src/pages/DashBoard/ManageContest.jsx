import { useQuery } from "@tanstack/react-query";
import { FaRegCommentDots, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const ManageContest = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedContest, setSelectedContest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: contests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-contests-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  // Pagination Logic
  const totalPages = Math.ceil(contests.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [contests.length, totalPages, currentPage]);

  const currentContests = contests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleComment = async (event) => {
    event.preventDefault();
    const adminComment = event.target.adminComment.value;

    try {
      const res = await axiosSecure.patch(
        `/adminComment/${selectedContest._id}`,
        { adminComment }
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Feedback Sent",
          text: `Comment added for ${selectedContest.contestName}`,
          timer: 1500,
        });
        document.getElementById("comment_modal").close();
        event.target.reset();
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update comment", "error");
    }
  };

  const handleConfirm = async (id) => {
    try {
      const res = await axiosSecure.patch(`/status/${id}`, {
        status: "confirm",
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Contest Approved",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Could not confirm contest", "error");
    }
  };

  const handleDeleteContest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "All participants data for this contest will be lost!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contests/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Contest has been removed.", "success");
            refetch();
          }
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <span className="loading loading-infinity loading-lg text-primary"></span>
        <p className="font-bold text-gray-400 animate-pulse">
          Loading all contests...
        </p>
      </div>
    );

  return (
    <div className="p-2 md:p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-neutral uppercase tracking-tight">
            Manage <span className="text-primary">Contests</span>
          </h2>
          <p className="text-gray-500 text-sm">
            Review, Approve or Reject contest submissions
          </p>
        </div>
        <div className="badge badge-neutral p-4 py-6 gap-2 font-bold shadow-lg">
          <span className="opacity-70 font-medium">Database Total:</span>{" "}
          {contests.length}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-neutral/5 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-neutral">
              <tr>
                <th className="py-5">#</th>
                <th>Contest Details</th>
                <th>Type</th>
                <th>Status</th>
                <th>Feedback</th>
                <th className="text-center">Manage</th>
              </tr>
            </thead>
            <tbody>
              {currentContests.length > 0 ? (
                currentContests.map((contest, index) => (
                  <tr
                    key={contest._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="text-gray-400 font-medium">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td>
                      <div className="font-bold text-neutral">
                        {contest.contestName}
                      </div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-tighter">
                        ID: {contest._id}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-ghost badge-sm font-semibold py-3 px-3">
                        {contest.contestType}
                      </span>
                    </td>
                    <td>
                      {contest.status === "confirm" ? (
                        <div className="flex items-center gap-1.5 text-success font-black text-xs uppercase tracking-wide">
                          <FaCheckCircle className="text-sm" /> Approved
                        </div>
                      ) : (
                        <button
                          onClick={() => handleConfirm(contest._id)}
                          className="btn btn-xs btn-warning rounded-lg text-white px-4 hover:scale-105 transition-transform"
                        >
                          Approve Now
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-circle btn-sm btn-ghost text-primary hover:bg-primary/10"
                        onClick={() => {
                          setSelectedContest(contest);
                          document.getElementById("comment_modal").showModal();
                        }}
                      >
                        <FaRegCommentDots size={18} />
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleDeleteContest(contest._id)}
                        className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-20 text-gray-400 italic"
                  >
                    No contests found in the records.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Container */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 mb-6">
          <div className="join bg-white shadow-md border-none overflow-hidden rounded-2xl">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="join-item btn btn-md bg-white border-none hover:bg-primary hover:text-white disabled:bg-gray-50"
            >
              PREV
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`join-item btn btn-md border-none w-12 ${
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
              onClick={() => setCurrentPage(currentPage + 1)}
              className="join-item btn btn-md bg-white border-none hover:bg-primary hover:text-white disabled:bg-gray-50"
            >
              NEXT
            </button>
          </div>
        </div>
      )}

      {/* Reusable Comment Modal */}
      <dialog id="comment_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-[2rem] p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl">
              <FaRegCommentDots size={24} />
            </div>
            <h3 className="font-black text-2xl tracking-tight">
              Admin Feedback
            </h3>
          </div>

          <p className="text-sm text-gray-500 mb-4 font-medium">
            Reviewing:{" "}
            <span className="text-neutral font-bold">
              {selectedContest?.contestName}
            </span>
          </p>

          <form onSubmit={handleComment} className="space-y-6">
            <textarea
              name="adminComment"
              className="textarea textarea-bordered w-full h-40 focus:textarea-primary rounded-2xl text-base placeholder:text-gray-300"
              placeholder="Write your feedback or reason for confirmation/rejection here..."
              defaultValue={selectedContest?.adminComment || ""}
              required
            ></textarea>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => document.getElementById("comment_modal").close()}
                className="btn btn-ghost rounded-xl px-8"
              >
                Discard
              </button>
              <button
                type="submit"
                className="btn btn-primary px-10 rounded-xl text-white shadow-lg shadow-primary/20"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageContest;
