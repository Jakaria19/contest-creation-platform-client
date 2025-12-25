import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GiTrophyCup, GiMedal } from "react-icons/gi";
import { FaCrown } from "react-icons/fa";

const WinningContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: winningContests = [], isLoading } = useQuery({
    queryKey: ["winning-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);

      return res.data.filter((item) => item.winner === "winner");
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-neutral uppercase tracking-tighter">
          Winning <span className="text-primary">Glory</span>
        </h2>
        <p className="text-gray-500 mt-2 italic">
          Success is the result of hard work and persistence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {winningContests.length > 0 ? (
          winningContests.map((contest) => (
            <div
              key={contest._id}
              className="card bg-white shadow-2xl shadow-primary/5 border border-primary/10 overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Top Banner with Trophy */}
              <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 py-6 flex justify-center items-center gap-4 text-white">
                <GiTrophyCup className="text-4xl animate-bounce" />
                <h2 className="text-2xl font-black uppercase tracking-widest">
                  Champion
                </h2>
                <GiTrophyCup className="text-4xl animate-bounce" />
              </div>

              <div className="card-body p-8">
                <div className="flex items-start gap-6">
                  {/* User Avatar with Crown */}
                  <div className="relative">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co/mJR7z9Y/user.png"
                      }
                      alt="Winner"
                      className="w-20 h-20 rounded-2xl object-cover ring-4 ring-yellow-100 shadow-lg"
                    />
                    <div className="absolute -top-3 -right-3 bg-white p-1.5 rounded-full shadow-md text-yellow-500">
                      <FaCrown size={20} />
                    </div>
                  </div>

                  {/* Contest Details */}
                  <div className="space-y-2">
                    <div className="badge badge-primary badge-sm font-bold uppercase tracking-tighter">
                      Confirmed Winner
                    </div>
                    <h3 className="text-xl font-black text-neutral leading-tight">
                      {contest.contestName}
                    </h3>
                    <div className="flex items-center gap-2 text-success font-bold text-lg">
                      <GiMedal className="text-2xl" />
                      <span>
                        Prize: {contest.prizeMoney || contest.prize || "$0.00"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-dashed border-gray-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Transaction Verified
                  </span>
                  <div className="badge badge-ghost text-[10px] font-mono">
                    {contest.transactionId?.slice(0, 15)}...
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <div className="max-w-md mx-auto space-y-4">
              <GiTrophyCup size={60} className="mx-auto text-gray-200" />
              <h3 className="text-2xl font-black text-gray-400 italic">
                No Trophies Yet!
              </h3>
              <p className="text-gray-400 px-6">
                Don't give up! Every contest is a chance to learn and grow. Keep
                participating and your name will shine here soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WinningContest;
