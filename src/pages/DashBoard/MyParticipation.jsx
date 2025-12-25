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
        .get(`/my-participations/${user.email}`)
        .then((res) => {
          setParticipates(res.data);
          setIsDataLoading(false);
        })
        .catch(() => setIsDataLoading(false));
    }
  }, [user?.email, axiosSecure]);

  if (loading || isDataLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-4 bg-slate-50 min-h-screen">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-neutral uppercase tracking-tight">
          My <span className="text-primary">Participation</span>
        </h2>
        <p className="text-gray-500 mt-1 font-medium">
          You have joined in{" "}
          <span className="font-bold text-neutral">{participates.length}</span>{" "}
          contests.
        </p>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-neutral">
              <tr className="text-xs uppercase tracking-widest">
                <th className="py-5 pl-8">#</th>
                <th>Contest Name</th>
                <th>Status</th>
                <th className="text-center pr-8">Action</th>
              </tr>
            </thead>
            <tbody>
              {participates.length > 0 ? (
                participates.map((participate, index) => (
                  <tr
                    key={participate._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="pl-8 text-gray-400 font-medium">
                      {index + 1}
                    </td>
                    <td>
                      <div className="font-bold text-neutral text-sm uppercase">
                        {participate.contestName}
                      </div>
                      <div className="text-[10px] opacity-50">
                        TXID: {participate.transactionId || "N/A"}
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-success badge-outline gap-1 font-bold text-[10px] uppercase">
                        Paid
                      </div>
                    </td>
                    <td className="text-center pr-8">
                      {participate.winner === true || participate.link ? (
                        <div className="flex items-center justify-center gap-2 text-success font-black text-xs uppercase tracking-widest">
                          <FaCheckCircle className="text-lg" />
                          <span>Submitted</span>
                        </div>
                      ) : (
                        <Link to={`/dashboard/submit/${participate._id}`}>
                          <button className="btn btn-sm bg-[#1bc5bd] hover:bg-[#18b1aa] border-none text-white rounded-xl shadow-lg gap-2">
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
                  <td
                    colSpan="4"
                    className="text-center py-20 italic text-gray-400"
                  >
                    No participations found. Explore our contests to join!
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
