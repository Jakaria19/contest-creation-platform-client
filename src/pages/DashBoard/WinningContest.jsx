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
      const res = await axiosSecure.get(`/my-participations/${user.email}`);
      return res.data.filter((item) => item.winner === true);
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
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
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
              className="group bg-white rounded-[3rem] border border-indigo-50 shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className="bg-neutral py-6 flex justify-center items-center gap-4 text-white">
                <GiTrophyCup className="text-3xl text-yellow-400" />
                <h2 className="text-lg font-black uppercase tracking-widest">
                  CHAMPION
                </h2>
                <GiTrophyCup className="text-3xl text-yellow-400" />
              </div>

              <div className="p-10">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co/p3d9pYn/user.png"
                      }
                      className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-50"
                      alt="Winner"
                    />
                    <div className="absolute -top-3 -right-3 bg-white p-1.5 rounded-xl shadow-lg text-yellow-500">
                      <FaCrown size={20} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">
                      Verified Win
                    </span>
                    <h3 className="text-xl font-black text-neutral">
                      {contest.contestName}
                    </h3>
                    <div className="flex items-center gap-1 text-green-600 font-black text-lg">
                      <GiMedal /> <span>Winner</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-[4rem] border-4 border-dashed border-indigo-50">
            <GiTrophyCup size={60} className="mx-auto text-indigo-100 mb-4" />
            <h3 className="text-2xl font-black text-neutral uppercase italic">
              Awaiting First Glory
            </h3>
            <p className="text-gray-400 max-w-sm mx-auto">
              Keep participating! Your victories will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WinningContest;
