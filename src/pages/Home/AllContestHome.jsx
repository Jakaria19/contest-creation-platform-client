import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MdOutlineKeyboardArrowRight, MdSearch } from "react-icons/md";

const AllContestHome = () => {
  const [searchText, setSearchText] = useState("");
  const axiosPublic = useAxiosPublic();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contests");
      return res.data.filter((item) => item.status === "confirm");
    },
  });

  const filteredContests = contests.filter((contest) =>
    contest.contestName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="bg-slate-50 p-6 md:p-12 rounded-[3rem] my-10 shadow-inner">
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative group">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for your next challenge..."
            className="w-full pl-12 pr-4 py-4 rounded-full border-none shadow-lg focus:ring-2 focus:ring-primary transition-all outline-none text-lg"
          />
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl group-focus-within:text-primary" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContests.slice(0, 6).map((item) => (
            <div
              key={item._id}
              className="card bg-white shadow-xl hover:shadow-2xl transition-all border border-gray-100 group"
            >
              <figure className="h-52 relative overflow-hidden">
                <img
                  src={item.contestImage}
                  alt={item.contestName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 badge badge-primary p-3 font-bold">
                  New
                </div>
              </figure>
              <div className="card-body">
                <h2 className="card-title font-black text-neutral">
                  {item.contestName}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                  {item.contestDescription}
                </p>
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase mb-4">
                  <span>👥 {item.participantCount} Joined</span>
                  <span>📅 {item.contestDeadLine}</span>
                </div>
                <div className="card-actions">
                  <Link className="w-full" to={`/contestDetails/${item._id}`}>
                    <button className="btn btn-primary w-full text-white rounded-xl gap-2 shadow-md shadow-primary/20">
                      View Details{" "}
                      <MdOutlineKeyboardArrowRight className="text-xl" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link to="/allContest">
          <button className="btn btn-outline btn-primary px-10 rounded-full hover:shadow-lg transition-all">
            Explore All Contests
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AllContestHome;
