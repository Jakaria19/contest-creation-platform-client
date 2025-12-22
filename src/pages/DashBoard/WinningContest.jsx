import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GiTrophyCup } from "react-icons/gi";

const WinningContest = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const { data: contests = [] } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      const status = res.data;
      const confirm = status.filter(
        (confirmWinner) => confirmWinner.winner === "winner"
      );
      console.log(confirm);
      return confirm;
    },
  });

  console.log(contests);

  return (
    <div className="md:w-1/2 mx-auto mt-10">
      {contests.map((contest) => (
        <div key={contest._id} className="card bg-base-100 shadow-xl">
          <h2 className="text-3xl gap-3 items-center flex justify-center text-center font-bold py-5 px-5">
            <GiTrophyCup />
            <span className="text-blue-500">Congratulation</span>
            <GiTrophyCup />
          </h2>
          <div className="card-body">
            <div className="flex  gap-6 md:ml-6">
              <img
                src={user.photoURL}
                alt="Author"
                className="w-10 h-10 rounded-full"
              />

              <div>
                <p>
                  <span className="font-semibold card-title">Name: </span>
                  {contest.contestName}
                </p>
                <h2 className="font-semibold">
                  Winning Prize: {contest.prize}
                </h2>
                <p>
                  <span className="font-semibold">Winning Status: </span>
                  {contest.winner}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WinningContest;
