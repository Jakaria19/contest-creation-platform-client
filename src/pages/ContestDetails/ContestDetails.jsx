import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ContestDetails = () => {
  const contest = useLoaderData();
  const [winnerInfo, setWinnerInfo] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    // Winner check using axios
    axiosPublic
      .get(`/paymentSubmit/${contest._id}`)
      .then((res) => {
        if (res.data[0]?.winner) {
          setWinnerInfo(res.data[0]);
        }
      })
      .catch((err) => console.error("Error fetching winner:", err));
  }, [contest._id, axiosPublic]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-error font-bold italic">Contest Ended</span>;
    }
    return (
      <span className="text-primary font-mono font-bold text-lg">
        {days}d : {hours}h : {minutes}m : {seconds}s
      </span>
    );
  };

  const isExpired = new Date(contest.contestDeadLine) < new Date();

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 min-h-screen">
      <div className="bg-white shadow-2xl rounded-[2rem] overflow-hidden border border-gray-100">
        <div className="flex flex-col lg:row">
          {/* Image Section */}
          <div className="lg:w-1/2 relative group">
            <img
              src={contest.contestImage}
              className="w-full h-full object-cover min-h-[450px] transition-transform duration-700 group-hover:scale-105"
              alt={contest.contestName}
            />
            <div className="absolute top-6 left-6">
              <span className="badge badge-primary p-5 font-black uppercase tracking-wider shadow-lg">
                {contest.contestType}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-8 md:p-14 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-neutral mb-3 leading-tight">
                {contest.contestName}
              </h2>
              <div className="flex items-center gap-2 text-gray-500">
                <span className="text-sm uppercase tracking-widest font-bold">
                  Created By
                </span>
                <span className="badge badge-ghost font-bold">
                  {contest.name}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 py-8 border-y border-gray-100">
              <div className="space-y-1">
                <p className="text-xs text-gray-400 uppercase font-black tracking-widest">
                  Prize Pool
                </p>
                <p className="text-3xl font-black text-success">
                  ${contest.priceMoney}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400 uppercase font-black tracking-widest">
                  Entry Fee
                </p>
                <p className="text-3xl font-black text-neutral">
                  ${contest.contestPrice}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase mb-1">
                  Participants
                </span>
                <span className="text-xl font-black text-neutral">
                  {contest.participantCount} Joined
                </span>
              </div>

              <div className="flex flex-col bg-primary/5 p-5 rounded-2xl border border-primary/10">
                <span className="text-xs font-bold text-primary uppercase mb-1">
                  Time Left
                </span>
                <Countdown
                  date={new Date(contest.contestDeadLine)}
                  renderer={renderer}
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-black text-neutral text-xl">
                Task Requirement
              </h4>
              <p className="text-gray-600 leading-relaxed italic border-l-4 border-primary pl-4">
                "{contest.contestDescription}"
              </p>
            </div>

            {/* Winner Section */}
            {winnerInfo && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 p-6 rounded-[1.5rem] flex items-center gap-5 shadow-inner">
                <div className="avatar">
                  <div className="w-16 rounded-full ring-4 ring-yellow-400 ring-offset-2">
                    <img
                      src={
                        winnerInfo.winnerImage ||
                        "https://i.ibb.co/p3d9pYn/user.png"
                      }
                      alt="Winner"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black text-orange-600 uppercase tracking-tighter">
                    🏆 Champion Declared
                  </p>
                  <p className="text-2xl font-black text-neutral tracking-tight">
                    {winnerInfo.winnerName}
                  </p>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4">
              {winnerInfo || isExpired ? (
                <div className="alert alert-error rounded-2xl font-bold text-white shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    {winnerInfo
                      ? "Registration Closed: Winner Selected"
                      : "Registration Closed: Deadline Passed"}
                  </span>
                </div>
              ) : (
                <Link to={`/payment/${contest._id}`}>
                  <button className="btn btn-primary btn-lg btn-block text-white rounded-2xl shadow-xl shadow-primary/30 transform transition hover:-translate-y-1">
                    Register Now & Compete
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
