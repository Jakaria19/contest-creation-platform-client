import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ContestDetails = () => {
  const contest = useLoaderData();
  const [winnerInfo, setWinnerInfo] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get(`/paymentSubmit/${contest._id}`)
      .then((res) => {
        const foundWinner = res.data.find(
          (submission) => submission.winner === true
        );
        if (foundWinner) {
          setWinnerInfo(foundWinner);
        }
      })
      .catch((err) => console.error("Error fetching winner:", err));
  }, [contest._id, axiosPublic]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-error font-bold italic">Contest Ended</span>;
    }
    return (
      <div className="flex gap-2">
        <div className="flex flex-col items-center">
          <span className="text-primary font-black text-xl leading-none">
            {days}d
          </span>
        </div>
        <span className="text-primary font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-primary font-black text-xl leading-none">
            {hours}h
          </span>
        </div>
        <span className="text-primary font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-primary font-black text-xl leading-none">
            {minutes}m
          </span>
        </div>
        <span className="text-primary font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-primary font-black text-xl leading-none">
            {seconds}s
          </span>
        </div>
      </div>
    );
  };

  const isExpired = new Date(contest.contestDeadLine) < new Date();

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 min-h-screen">
      <div className="bg-white shadow-2xl rounded-[3rem] overflow-hidden border border-gray-100">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 relative group overflow-hidden">
            <img
              src={contest.contestImage}
              className="w-full h-full object-cover min-h-[500px] transition-transform duration-700 group-hover:scale-110"
              alt={contest.contestName}
            />
            <div className="absolute top-8 left-8">
              <span className="badge badge-primary p-6 font-black uppercase tracking-widest shadow-2xl border-none">
                {contest.contestType}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-10 md:p-16 space-y-8 bg-white">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-neutral mb-4 leading-tight tracking-tighter">
                {contest.contestName}
              </h2>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
                  {contest.name?.charAt(0)}
                </div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Hosted by <span className="text-neutral">{contest.name}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 py-8 border-y border-gray-100">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em]">
                  Prize Pool
                </p>
                <p className="text-4xl font-black text-success tracking-tight">
                  ${contest.priceMoney}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em]">
                  Entry Fee
                </p>
                <p className="text-4xl font-black text-neutral tracking-tight">
                  ${contest.contestPrice}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col bg-slate-50 p-6 rounded-[2rem] border border-gray-100">
                <span className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">
                  Participants
                </span>
                <span className="text-2xl font-black text-neutral">
                  {contest.participantCount || 0}{" "}
                  <span className="text-sm font-bold text-gray-400">
                    Enrolled
                  </span>
                </span>
              </div>

              <div className="flex flex-col bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100">
                <span className="text-[10px] font-black text-indigo-400 uppercase mb-2 tracking-widest">
                  Remaining Time
                </span>
                <Countdown
                  date={new Date(contest.contestDeadLine)}
                  renderer={renderer}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-black text-neutral text-xl uppercase tracking-tight">
                Contest Brief
              </h4>
              <p className="text-gray-500 leading-relaxed font-medium">
                {contest.contestDescription}
              </p>
            </div>

            {/* Winner Hall of Fame - Visual Component */}
            {winnerInfo && (
              <div className="relative group overflow-hidden bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 p-[2px] rounded-[2.5rem] shadow-xl shadow-orange-200">
                <div className="bg-white p-6 rounded-[2.4rem] flex items-center gap-6">
                  <div className="relative">
                    <div className="avatar">
                      <div className="w-20 rounded-2xl ring-4 ring-orange-100">
                        <img
                          src={
                            winnerInfo.userImage ||
                            "https://i.ibb.co/p3d9pYn/user.png"
                          }
                          alt="Winner"
                        />
                      </div>
                    </div>
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-white p-1.5 rounded-lg shadow-lg">
                      🏆
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">
                      Winning Athlete
                    </p>
                    <p className="text-3xl font-black text-neutral leading-none tracking-tighter">
                      {winnerInfo.userName}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Registration Action */}
            <div className="pt-6">
              {winnerInfo || isExpired ? (
                <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-black text-neutral uppercase text-sm tracking-tight">
                      Registration Locked
                    </p>
                    <p className="text-xs text-gray-400 font-bold">
                      {winnerInfo
                        ? "A winner has already been crowned for this arena."
                        : "The deadline for this contest has passed."}
                    </p>
                  </div>
                </div>
              ) : (
                <Link to={`/payment/${contest._id}`}>
                  <button className="btn btn-primary btn-lg w-full text-white font-black text-lg rounded-[2rem] shadow-2xl shadow-indigo-200 h-20 hover:scale-[1.02] active:scale-95 transition-all">
                    ENTER THE ARENA
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
