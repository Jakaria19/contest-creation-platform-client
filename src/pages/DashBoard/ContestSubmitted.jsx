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
      const res = await axiosSecure.get(`/contests/creator/${user.email}`);

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
    <div className="p-4 md:p-8 animate__animated animate__fadeIn">
      {/* Page Header */}
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

      {/* Table Container */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-neutral/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-0">
            {/* Table Head */}
            <thead className="bg-gray-50 text-neutral">
              <tr className="border-none text-xs uppercase tracking-widest">
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
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="pl-8 text-gray-400 font-bold">
                      {index + 1}
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={
                                contest.contestImage ||
                                "https://i.ibb.co/mJR7z9Y/user.png"
                              }
                              alt={contest.contestName}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-black text-neutral text-sm uppercase">
                            {contest.contestName}
                          </div>
                          <div className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full inline-block font-bold mt-1">
                            {contest.contestType}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold text-success flex items-center gap-1">
                        <span className="text-lg">$</span>
                        {contest.priceMoney}
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-success badge-sm gap-1 font-black text-[10px] uppercase py-3">
                        <div className="w-1 h-1 rounded-full bg-white animate-pulse"></div>
                        {contest.status}
                      </div>
                    </td>
                    <td className="text-center pr-8">
                      <Link to={`/dashboard/showSubmission/${contest._id}`}>
                        <button className="btn btn-sm btn-primary text-white rounded-xl shadow-lg shadow-primary/20 gap-2 normal-case font-bold px-5">
                          <FaEye />
                          View Entries
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-24">
                    <div className="max-w-xs mx-auto space-y-4">
                      <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-gray-300">
                        <FaTasks size={30} />
                      </div>
                      <h3 className="text-xl font-bold text-neutral">
                        No Contests Found
                      </h3>
                      <p className="text-gray-400 text-sm">
                        You don't have any confirmed contests yet. Contests will
                        appear here once admin approves them.
                      </p>
                      <Link
                        to="/dashboard/add-contest"
                        className="btn btn-outline btn-sm rounded-full"
                      >
                        Create New Contest
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

export default ContestSubmitted;
