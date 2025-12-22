import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const AllContestHome = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredQueries, setFilteredQueries] = useState([]);

  const axiosPublic = useAxiosPublic();
  const { data: contests = [] } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contests");
      const status = res.data;
      const confirm = status.filter(
        (confirmStatus) => confirmStatus.status === "confirm"
      );
      console.log(confirm);
      return confirm;
    },
  });

  useEffect(() => {
    const filtered = contests.filter((contest) =>
      contest.contestName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredQueries(filtered);
  }, [contests, searchText]);

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.elements.searchInput.value;
    setSearchText(text);
  };

  return (
    <div className="bg-slate-100 p-5 rounded-lg">
      <form onSubmit={handleSearch}>
        <label className="input input-bordered rounded-3xl flex items-center my-8 gap-2 w-4/5 md:w-1/2 mx-auto">
          <input
            type="text"
            name="searchInput"
            className="grow"
            placeholder="Search Here"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </form>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 md:px-5">
          {filteredQueries.slice(0, 5).map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  className="h-64 w-72 p-4"
                  src={item.contestImage}
                  alt={item.contestName}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.contestName}</h2>
                <div className="flex justify-between">
                  <p>Participation Count: {item.participantCount}</p>
                  <p>Deadline: {item.contestDeadLine}</p>
                </div>
                <div>
                  <p>Description: {item.contestDescription}</p>
                </div>
                <div className="card-actions">
                  <Link className="w-full" to={`/contestDetails/${item._id}`}>
                    <button className="btn w-full bg-[#118acb] text-white">
                      View Details
                      <span className="text-xl">
                        <MdOutlineKeyboardArrowRight />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center my-6">
        <Link to="/allContest">
          <button className="btn text-white bg-[#118acb]">Show All</button>
        </Link>
      </div>
    </div>
  );
};

export default AllContestHome;
