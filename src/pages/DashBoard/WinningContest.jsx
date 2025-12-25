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
        <span className="loading loading-bars loading-lg text-indigo-600"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="text-center mb-14">
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 font-black text-[10px] tracking-[0.2em] uppercase mb-4 shadow-sm">
          Hall of Fame
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-neutral tracking-tighter uppercase">
          Victorious <span className="text-indigo-600">Moments</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-lg mx-auto font-medium">
          Your hard work has paid off. Relive your success and prepare for your
          next challenge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {winningContests.length > 0 ? (
          winningContests.map((contest) => (
            <div
              key={contest._id}
              className="group bg-white rounded-[3rem] border border-indigo-50 shadow-2xl shadow-indigo-100/40 overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              {/* Trophy Header */}
              <div className="bg-neutral py-8 flex justify-center items-center gap-6 text-white relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <GiTrophyCup className="text-4xl text-yellow-400 animate-pulse" />
                <h2 className="text-xl font-black uppercase tracking-[0.3em] z-10">
                  CHAMPION
                </h2>
                <GiTrophyCup className="text-4xl text-yellow-400 animate-pulse" />
              </div>

              <div className="p-10 relative">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  {/* Avatar with Crown */}
                  <div className="relative">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co/p3d9pYn/user.png"
                      }
                      className="w-24 h-24 rounded-3xl object-cover ring-4 ring-indigo-50 shadow-2xl"
                      alt="Winner"
                    />
                    <div className="absolute -top-4 -right-4 bg-white p-2 rounded-2xl shadow-xl text-yellow-500 border border-yellow-100 rotate-12">
                      <FaCrown size={24} />
                    </div>
                  </div>

                  {/* Contest Stats */}
                  <div className="text-center sm:text-left space-y-3 flex-1">
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">
                      Win Verified
                    </span>
                    <h3 className="text-2xl font-black text-neutral leading-tight tracking-tight">
                      {contest.contestName}
                    </h3>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-green-600 font-black text-xl">
                      <GiMedal size={28} />
                      <span>
                        {contest.prizeMoney || contest.prize || "$0.00"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    ID: {contest.transactionId?.slice(0, 12)}...
                  </div>
                  <div className="badge badge-indigo py-3 px-5 bg-indigo-600 text-white border-none font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100">
                    Official Winner
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-24 bg-slate-50 rounded-[4rem] border-4 border-dashed border-indigo-50">
            <GiTrophyCup size={80} className="mx-auto text-indigo-100 mb-6" />
            <h3 className="text-3xl font-black text-neutral uppercase tracking-tighter mb-4 italic">
              Awaiting First Glory
            </h3>
            <p className="text-gray-400 max-w-sm mx-auto font-medium">
              The path to victory is built on persistence. Your trophies will
              appear here once you conquer the arena.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WinningContest;
