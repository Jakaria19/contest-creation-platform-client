import { useQuery } from "@tanstack/react-query";
import { FaRegCommentDots, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

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
      const res = await axiosSecure.get("/admin/contests");
      return res.data;
    },
  });

  const totalPages = Math.ceil(contests.length / itemsPerPage);
  const currentContests = contests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const handleComment = async (event) => {
    event.preventDefault();
    const adminComment = event.target.adminComment.value;
    try {
      const res = await axiosSecure.patch(
        `/adminComment/${selectedContest._id}`,
        { adminComment }
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire({ icon: "success", title: "Feedback Sent", timer: 1500 });
        document.getElementById("comment_modal").close();
        event.target.reset();
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update feedback", "error");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Contest?",
      text: "This action is permanent!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#ef4444",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contests/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Contest removed.", "success");
            refetch();
          }
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="text-center py-20">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black uppercase">
          Review <span className="text-primary">Center</span>
        </h2>
        <div className="badge badge-neutral p-4 font-bold">
          Total: {contests.length}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4">#</th>
                <th>Contest Name</th>
                <th>Status</th>
                <th>Feedback</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentContests.map((contest, index) => (
                <tr key={contest._id} className="hover:bg-gray-50">
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="font-bold">{contest.contestName}</td>
                  <td>
                    {contest.status === "confirm" ? (
                      <span className="text-success font-bold flex items-center gap-1">
                        <FaCheckCircle /> Approved
                      </span>
                    ) : (
                      <button
                        onClick={() => handleConfirm(contest._id)}
                        className="btn btn-xs btn-warning rounded-lg"
                      >
                        Approve Now
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost btn-sm text-primary"
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
                      onClick={() => handleDelete(contest._id)}
                      className="text-error hover:scale-110 transition-transform"
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

      {/* Comment Modal */}
      <dialog id="comment_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-3xl p-8">
          <h3 className="font-black text-2xl mb-4">Admin Feedback</h3>
          <p className="mb-4 text-sm opacity-60">
            Providing feedback for: {selectedContest?.contestName}
          </p>
          <form onSubmit={handleComment} className="space-y-4">
            <textarea
              name="adminComment"
              className="textarea textarea-bordered w-full h-32 rounded-2xl"
              placeholder="Reason for rejection or suggestions..."
              defaultValue={selectedContest?.adminComment}
              required
            ></textarea>
            <div className="modal-action">
              <button
                type="button"
                onClick={() => document.getElementById("comment_modal").close()}
                className="btn btn-ghost rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-xl px-8 text-white"
              >
                Send Feedback
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageContest;
