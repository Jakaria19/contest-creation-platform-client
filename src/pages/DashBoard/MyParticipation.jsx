import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCloudUploadAlt, FaCheckCircle } from "react-icons/fa";

const MyParticipation = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [participates, setParticipates] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments/${user.email}`)
        .then((res) => {
          setParticipates(res.data);
          setIsDataLoading(false);
        })
        .catch(() => setIsDataLoading(false));
    }
  }, [user, axiosSecure]);

  if (loading || isDataLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-4">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-neutral uppercase tracking-tight">
          My <span className="text-primary">Participation</span>
        </h2>
        <p className="text-gray-500 mt-1">
          You have joined in{" "}
          <span className="font-bold text-neutral">{participates.length}</span>{" "}
          contests.
        </p>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-neutral/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-2">
            <thead className="bg-gray-50 text-neutral">
              <tr className="border-none text-xs uppercase tracking-widest">
                <th className="py-5 pl-8">#</th>
                <th>Contest Name</th>
                <th>Payment Status</th>
                <th className="text-center pr-8">Action</th>
              </tr>
            </thead>
            <tbody>
              {participates.length > 0 ? (
                participates.map((participate, index) => (
                  <tr
                    key={participate._id}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="pl-8 text-gray-400 font-medium">
                      {index + 1}
                    </td>
                    <td>
                      <div className="font-bold text-neutral uppercase text-sm">
                        {participate.contestName}
                      </div>
                      <div className="text-[10px] opacity-50 tracking-wider">
                        TXID: {participate.transactionId || "N/A"}
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-success badge-outline gap-1 font-bold text-[10px] uppercase">
                        {participate.paidStatus || "Paid"}
                      </div>
                    </td>
                    <td className="text-center pr-8">
                      {participate.link ? (
                        <div className="flex items-center justify-center gap-2 text-success font-black text-xs uppercase tracking-widest">
                          <FaCheckCircle className="text-lg" />
                          <span>Submitted</span>
                        </div>
                      ) : (
                        <Link to={`submit/${participate._id}`}>
                          <button className="btn btn-sm bg-[#1bc5bd] hover:bg-[#18b1aa] border-none text-white rounded-xl shadow-lg shadow-[#1bc5bd]/20 gap-2">
                            <FaCloudUploadAlt className="text-lg" />
                            Upload Task
                          </button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-20">
                    <div className="flex flex-col items-center gap-3">
                      <p className="text-gray-400 italic">
                        You haven't participated in any contest yet.
                      </p>
                      <Link
                        to="/"
                        className="btn btn-primary btn-sm rounded-full px-6"
                      >
                        Explore Contests
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyParticipation;
