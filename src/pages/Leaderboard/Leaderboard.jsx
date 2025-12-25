import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Leaderboard = () => {
  const axiosPublic = useAxiosPublic();
  const { data: leaders = [], isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axiosPublic.get("/leaderboard");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-20">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto my-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">
          The <span className="text-indigo-600">Hall of Fame</span>
        </h2>
        <p className="text-gray-500 font-medium">
          Top performing athletes ranked by their total contest wins.
        </p>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-50">
        <table className="table w-full border-separate border-spacing-y-3 px-6">
          <thead className="bg-gray-50 text-indigo-600">
            <tr className="border-none uppercase text-xs tracking-widest">
              <th className="py-6 pl-10">Rank</th>
              <th>User Profile</th>
              <th>Total Wins</th>
              <th className="pr-10 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, index) => (
              <tr
                key={leader._id}
                className="shadow-sm group hover:scale-[1.01] transition-transform"
              >
                <td className="pl-10">
                  <span
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-black ${
                      index === 0
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12 ring ring-indigo-50 ring-offset-2">
                        <img src={leader.image} alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="font-black text-neutral uppercase text-sm">
                        {leader.name}
                      </div>
                      <div className="text-[10px] text-gray-400 font-bold">
                        {leader.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-indigo-600">
                      {leader.winCount || 0}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Victories
                    </span>
                  </div>
                </td>
                <td className="pr-10 text-right">
                  <div className="badge badge-outline badge-success font-bold text-[10px] uppercase p-3">
                    Elite Member
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
