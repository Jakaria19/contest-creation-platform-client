import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

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
      <div className="flex justify-center my-10">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-neutral mb-3">
          Most Popular <span className="text-primary">Contests</span>
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto italic">
          Join the most trending challenges and showcase your skills to win big
          prizes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contests.map((item) => (
          <div
            key={item._id}
            className="group bg-base-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-300"
          >
            <div className="relative overflow-hidden">
              <img
                className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                src={item.contestImage}
                alt={item.contestName}
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                {item.participantCount} Participants
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-neutral mb-2 group-hover:text-primary transition-colors">
                {item.contestName}
              </h3>

              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {item.contestDescription ||
                  "Discover this amazing challenge and participate to win exciting prizes and recognition."}
              </p>

              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase">Prize</span>
                  <span className="font-bold text-success">
                    ${item.priceMoney}
                  </span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs text-gray-400 uppercase">Type</span>
                  <span className="font-semibold text-neutral">
                    {item.contestType}
                  </span>
                </div>
              </div>

              <Link to={`/contestDetails/${item._id}`}>
                <button className="btn btn-primary btn-block rounded-2xl text-white shadow-lg shadow-primary/20">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <Link to="/allContest">
          <button className="btn btn-outline btn-primary px-10 rounded-full border-2 hover:shadow-lg">
            Show All Contests
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularContests;
