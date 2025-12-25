import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const AllContest = () => {
  const axiosPublic = useAxiosPublic();
  const [activeTab, setActiveTab] = useState("All");

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contests");

      return res.data.filter((item) => item.status === "confirm");
    },
  });

  const categories = [
    "All",
    "Image Design",
    "Article Writing",
    "Marketing",
    "Gaming",
  ];

  const filteredContests =
    activeTab === "All"
      ? contests
      : contests.filter((c) => c.contestType === activeTab);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 mb-20 min-h-screen">
      <div className="text-center my-12">
        <h2 className="text-4xl md:text-5xl font-black text-neutral uppercase tracking-tight">
          Explore All <span className="text-primary">Contests</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Join the best contests and showcase your talent
        </p>
      </div>

      {/* Tabs Section */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`btn btn-sm md:btn-md rounded-full px-8 transition-all duration-300 ${
              activeTab === tab
                ? "btn-primary text-white shadow-lg shadow-primary/30"
                : "btn-ghost border-gray-200 hover:border-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contest Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredContests.length > 0 ? (
          filteredContests.map((item) => (
            <div
              key={item._id}
              className="group card bg-base-100 border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
            >
              <figure className="relative overflow-hidden">
                <img
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={
                    item.contestImage ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={item.contestName}
                />
                <div className="absolute top-4 right-4">
                  <span className="badge badge-primary text-white font-bold p-3 shadow-md">
                    ${item.contestPrice}
                  </span>
                </div>
              </figure>

              <div className="card-body p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="card-title text-neutral font-bold text-xl group-hover:text-primary transition-colors">
                    {item.contestName}
                  </h2>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  {item.contestType}
                </span>

                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                  {item.contestDescription}
                </p>

                <div className="flex justify-between items-center text-xs font-bold py-3 border-t border-gray-50 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-gray-400 uppercase">
                      Participants
                    </span>
                    <span className="text-neutral text-sm">
                      {item.participantCount || 0}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-gray-400 uppercase">Deadline</span>
                    <span className="text-error text-sm">
                      {item.contestDeadLine}
                    </span>
                  </div>
                </div>

                <div className="card-actions mt-4">
                  <Link className="w-full" to={`/contestDetails/${item._id}`}>
                    <button className="btn btn-primary btn-block text-white rounded-xl">
                      Details & Join
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-500">
              No contests found!
            </h3>
            <p className="text-gray-400">
              Try searching in a different category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllContest;
