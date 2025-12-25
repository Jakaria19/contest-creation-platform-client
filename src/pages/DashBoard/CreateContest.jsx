import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useContest from "../../hooks/useContest";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CreateContest = () => {
  const axiosSecure = useAxiosSecure();
  const [contests, refetch] = useContest();

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
              text: "The contest has been removed.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-2">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-neutral uppercase tracking-tight text-center">
          My Created <span className="text-primary">Contests</span>
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Manage and monitor the status of your contests
        </p>
      </div>

      <div className="overflow-x-auto shadow-sm border border-gray-100 rounded-2xl">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-gray-50 text-neutral">
            <tr>
              <th className="py-4">#</th>
              <th>Contest Name</th>
              <th>Admin Feedback</th>
              <th>Status</th>
              <th className="text-center">Update</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {contests.length > 0 ? (
              contests.map((item, index) => {
                const isPending = item.status === "pending";

                return (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <th className="text-gray-400 font-medium">{index + 1}</th>
                    <td className="font-bold text-neutral">
                      {item.contestName}
                    </td>

                    {/* Admin Comment Section */}
                    <td className="max-w-[150px]">
                      {item.adminComment ? (
                        <span className="text-xs italic text-gray-500 truncate block">
                          {item.adminComment.length > 20
                            ? `${item.adminComment.slice(0, 20)}...`
                            : item.adminComment}
                        </span>
                      ) : (
                        <span className="text-gray-300">No comments</span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td>
                      <div
                        className={`badge badge-sm uppercase font-black px-3 py-2 ${
                          item.status === "confirm"
                            ? "badge-success text-white"
                            : "badge-warning text-white"
                        }`}
                      >
                        {item.status}
                      </div>
                    </td>

                    {/* Update Button */}
                    <td className="text-center">
                      {isPending ? (
                        <Link to={`update/${item._id}`}>
                          <button className="btn btn-square btn-ghost text-accent hover:bg-accent/10">
                            <FaEdit size={18} />
                          </button>
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="btn btn-square btn-disabled opacity-30"
                        >
                          <FaEdit size={18} />
                        </button>
                      )}
                    </td>

                    {/* Delete Button */}
                    <td className="text-center">
                      <button
                        onClick={() => handleDeleteContest(item)}
                        disabled={!isPending}
                        className={`btn btn-square btn-ghost ${
                          isPending
                            ? "text-error hover:bg-error/10"
                            : "btn-disabled opacity-30"
                        }`}
                      >
                        <FaTrashAlt size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-400 font-medium italic"
                >
                  You haven't created any contests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateContest;
