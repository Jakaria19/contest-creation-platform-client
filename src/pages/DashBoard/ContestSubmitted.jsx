import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const ContestSubmitted = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const { data: contests = [] } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${user.email}`);
      const status = res.data;
      const confirm = status.filter(
        (confirmStatus) => confirmStatus.status === "confirm"
      );
      console.log(confirm);
      return confirm;
    },
  });

  return (
    <div>
      <h2 className="font-extrabold mt-7 text-3xl text-center w-full ">
        My Submitted Contest {contests.length}
      </h2>

      <div className="overflow-x-auto mt-8">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr key={contest._id}>
                <th>{index + 1}</th>
                <td>{contest.contestName}</td>
                <td>{contest.priceMoney}</td>
                <td>
                  <Link to={`showSubmission/${contest._id}`}>
                    <button className="btn-sm bg-sky-500 text-white btn">
                      Show Submission
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestSubmitted;
