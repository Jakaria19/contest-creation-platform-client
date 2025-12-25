import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const ContestSubmitted = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["submitted-contests", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${user.email}`);

      return res.data.filter((item) => item.status === "confirm");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-neutral uppercase tracking-tight">
          Manage <span className="text-primary">Submissions</span>
        </h2>
        <p className="text-gray-500">
          View and declare winners for your approved contests.
        </p>
      </div>

      <div className="overflow-x-auto shadow-sm border border-gray-100 rounded-2xl">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-gray-50 text-neutral">
            <tr>
              <th className="py-4">#</th>
              <th>Contest Name</th>
              <th>Prize Money</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {contests.length > 0 ? (
              contests.map((contest, index) => (
                <tr
                  key={contest._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <th className="font-medium text-gray-400">{index + 1}</th>
                  <td>
                    <div className="font-bold text-neutral">
                      {contest.contestName}
                    </div>
                    <div className="text-xs opacity-50">
                      {contest.contestType}
                    </div>
                  </td>
                  <td>
                    <span className="font-semibold text-success">
                      ${contest.priceMoney}
                    </span>
                  </td>
                  <td>
                    <div className="badge badge-success badge-outline badge-sm uppercase font-bold text-[10px]">
                      {contest.status}
                    </div>
                  </td>
                  <td className="text-center">
                    {/* dynamic path matching for Dashboard nested routing */}
                    <Link to={`/dashboard/showSubmission/${contest._id}`}>
                      <button className="btn btn-sm btn-primary text-white rounded-lg shadow-md shadow-primary/20">
                        View Submissions
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  No confirmed contests found. Wait for admin approval.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestSubmitted;
