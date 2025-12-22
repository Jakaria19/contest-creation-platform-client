import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useContest from "../../hooks/useContest";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CreateContest = () => {
  const axiosSecure = useAxiosSecure();

  const [contests, refetch] = useContest();
  console.log(contests);

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

  return (
    <div>
      <h2 className="  font-extrabold mt-7 text-3xl text-center w-full ">
        My Created Contest
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra mt-7">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Contest Name</th>
              <th>Comment</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.contestName}</td>
                <td>
                  {item.adminComment &&
                  typeof item.adminComment === "string" ? (
                    <span>{item.adminComment.slice(0, 15)}...</span>
                  ) : (
                    <p>-</p>
                  )}
                </td>

                <td>
                  {item.status === "confirm" ? (
                    <p className="text-green-500 font-bold">confirmed</p>
                  ) : (
                    item.status
                  )}
                </td>

                <td>
                  {item.status === "pending" ? (
                    <Link to={`update/${item._id}`}>
                      <button className="btn btn-accent btn-md">
                        <FaEdit />
                      </button>
                    </Link>
                  ) : (
                    <Link>
                      <button disabled className="btn btn-accent btn-md">
                        <FaEdit />
                      </button>
                    </Link>
                  )}
                </td>
                <td>
                  {item.status === "pending" ? (
                    <button
                      onClick={() => handleDeleteContest(item)}
                      className="btn btn-error btn-md"
                    >
                      <FaTrashAlt />
                    </button>
                  ) : (
                    <button
                      disabled
                      onClick={() => handleDeleteContest(item)}
                      className="btn btn-error btn-md"
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateContest;
