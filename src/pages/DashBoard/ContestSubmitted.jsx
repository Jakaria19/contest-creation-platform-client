import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FaEye, FaTasks } from "react-icons/fa";

const ContestSubmitted = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["submitted-contests", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-contests/${user.email}`);
      return res.data.filter((item) => item.status === "confirm");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 animate__animated animate__fadeIn bg-slate-50 min-h-screen">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-neutral uppercase tracking-tighter">
            Manage <span className="text-primary">Submissions</span>
          </h2>
          <p className="text-gray-500 mt-1 font-medium">
            Review participant entries and declare winners for your approved
            contests.
          </p>
        </div>
        <div className="stats shadow-sm border border-gray-100 hidden md:flex">
          <div className="stat">
            <div className="stat-title text-xs uppercase font-bold">
              Total Active
            </div>
            <div className="stat-value text-primary text-2xl">
              {contests.length}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-neutral">
              <tr className="text-xs uppercase tracking-widest">
                <th className="py-6 pl-8">#</th>
                <th>Contest Details</th>
                <th>Prize Pool</th>
                <th>Status</th>
                <th className="text-center pr-8">Submissions</th>
              </tr>
            </thead>
            <tbody>
              {contests.length > 0 ? (
                contests.map((contest, index) => (
                  <tr
                    key={contest._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-50"
                  >
                    <td className="pl-8 text-gray-400 font-bold">
                      {index + 1}
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar mask mask-squircle w-12 h-12">
                          <img
                            src={
                              contest.contestImage ||
                              "https://i.ibb.co/mJR7z9Y/user.png"
                            }
                            alt={contest.contestName}
                          />
                        </div>
                        <div>
                          <div className="font-black text-neutral text-sm uppercase">
                            {contest.contestName}
                          </div>
                          <div className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold mt-1 uppercase">
                            {contest.contestType}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold text-success">
                        $ {contest.priceMoney}
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-success badge-sm gap-1 font-black text-[10px] uppercase py-3">
                        {contest.status}
                      </div>
                    </td>
                    <td className="text-center pr-8">
                      <Link to={`/dashboard/showSubmission/${contest._id}`}>
                        <button className="btn btn-sm btn-primary text-white rounded-xl shadow-lg gap-2 normal-case font-bold px-5">
                          <FaEye /> View Entries
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-24 italic text-gray-400"
                  >
                    No confirmed contests found.
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

export default ContestSubmitted;
