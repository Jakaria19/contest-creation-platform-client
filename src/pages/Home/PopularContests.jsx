import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaFire } from "react-icons/fa";

const PopularContests = () => {
  const axiosPublic = useAxiosPublic();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["popularContests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contests");
      return res.data
        .filter((c) => c.status === "confirm")
        .sort((a, b) => b.participantCount - a.participantCount)
        .slice(0, 6);
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );

  return (
    <div className="py-16">
      <div className="text-center mb-16 px-4">
        <div className="flex justify-center items-center gap-2 mb-2">
          <FaFire className="text-orange-500" />
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">
            Trending Now
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-neutral mb-4">
          Trending <span className="text-indigo-600">Spotlight</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-medium">
          Step into the arena! Explore the most anticipated challenges where
          innovation meets opportunity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 max-w-7xl mx-auto">
        {contests.map((item) => (
          <div
            key={item._id}
            className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-indigo-100 border border-gray-50 transition-all duration-500"
          >
            <div className="relative overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={item.contestImage}
                alt={item.contestName}
              />
              <div className="absolute bottom-4 left-4 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                {item.participantCount} Joined
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-black text-neutral mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1">
                {item.contestName}
              </h3>
              <p className="text-gray-400 text-sm mb-6 line-clamp-2 italic font-light">
                {item.contestDescription ||
                  "Experience this exclusive challenge and push your creative boundaries to the limit."}
              </p>

              <div className="flex items-center justify-between mb-8 p-4 bg-slate-50 rounded-2xl">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                    Pool Prize
                  </span>
                  <span className="font-black text-indigo-600 text-xl">
                    ${item.priceMoney}
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-gray-200"></div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                    Category
                  </span>
                  <span className="font-bold text-neutral">
                    {item.contestType}
                  </span>
                </div>
              </div>

              <Link to={`/contestDetails/${item._id}`}>
                <button className="btn bg-neutral hover:bg-indigo-600 border-none w-full rounded-xl text-white font-bold transition-all shadow-xl shadow-gray-200">
                  Participate Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <Link to="/allContest">
          <button className="btn btn-outline border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:border-indigo-600 px-12 rounded-full font-bold">
            Explore All Challenges
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularContests;
