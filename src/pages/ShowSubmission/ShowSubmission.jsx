import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaCrown, FaEnvelope, FaExternalLinkAlt } from "react-icons/fa";

const ShowSubmission = () => {
  const loadedSubmissions = useLoaderData();
  const [submissions, setSubmissions] = useState(loadedSubmissions);
  const axiosSecure = useAxiosSecure();

  const hasWinner = submissions.some((item) => item.winner === "winner");

  const handleWinner = async (submission) => {
    Swal.fire({
      title: "Confirm Champion?",
      text: `Are you sure you want to declare ${
        submission.userName || "this user"
      } as the winner? This will close the contest selection.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Declare Winner!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updateWinner = { winner: "winner" };

        try {
          const res = await axiosSecure.patch(
            `/paymentsWinner/${submission._id}`,
            updateWinner
          );

          if (res.data.modifiedCount > 0) {
            const updatedData = submissions.map((item) =>
              item._id === submission._id ? { ...item, winner: "winner" } : item
            );
            setSubmissions(updatedData);

            Swal.fire({
              title: "Congratulations!",
              text: "Winner has been successfully declared and notified.",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        } catch (error) {
          console.error("Error declaring winner:", error);
          Swal.fire(
            "Error",
            "Something went wrong while declaring winner.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-neutral uppercase tracking-tighter">
            Contest <span className="text-primary">Submissions</span>
          </h2>
          <p className="text-gray-400 font-medium">
            Total Entries: {submissions.length}
          </p>
        </div>
        {hasWinner ? (
          <div className="badge badge-success gap-2 p-5 text-white font-bold rounded-xl shadow-lg shadow-green-100">
            <FaCrown /> SELECTION COMPLETED
          </div>
        ) : (
          <div className="badge badge-ghost border-2 border-primary/20 text-primary p-5 font-bold rounded-xl animate-pulse">
            PENDING SELECTION
          </div>
        )}
      </div>

      {/* Submissions Grid */}
      {submissions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {submissions.map((submit) => (
            <div
              key={submit._id}
              className={`card bg-white shadow-xl transition-all duration-300 border-2 ${
                submit.winner === "winner"
                  ? "border-green-400 scale-[1.02]"
                  : "border-transparent hover:border-gray-200"
              }`}
            >
              {/* Preview or Icon Section */}
              <figure className="px-4 pt-4 relative">
                <div className="w-full h-40 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 group">
                  {/* Iframe preview for links */}
                  <iframe
                    src={submit.submittedLink || submit.link}
                    className="w-full h-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity"
                    title="preview"
                  ></iframe>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={submit.submittedLink || submit.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-circle btn-primary shadow-xl"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
                {submit.winner === "winner" && (
                  <div className="absolute top-6 right-6 bg-yellow-400 text-white p-2 rounded-lg shadow-lg rotate-12">
                    <FaCrown size={20} />
                  </div>
                )}
              </figure>

              <div className="card-body">
                <div className="flex items-center gap-3 mb-2">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          submit.userImage ||
                          "https://i.ibb.co/p3d9pYn/user.png"
                        }
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral leading-none">
                      {submit.userName || "Anonymous"}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">
                      <FaEnvelope />{" "}
                      {submit.userEmail || submit.contestParticipateMail}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mt-2">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                    Submission Link
                  </p>
                  <a
                    href={submit.submittedLink || submit.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary text-sm font-medium truncate block hover:underline"
                  >
                    {submit.submittedLink || submit.link}
                  </a>
                </div>

                <div className="card-actions mt-6">
                  {submit.winner === "winner" ? (
                    <div className="w-full py-4 bg-green-500 text-white font-black text-center rounded-2xl shadow-lg shadow-green-200 flex items-center justify-center gap-2 uppercase text-sm tracking-widest">
                      <FaCrown /> Champion Selected
                    </div>
                  ) : (
                    <button
                      onClick={() => handleWinner(submit)}
                      disabled={hasWinner}
                      className={`btn w-full text-white font-black rounded-2xl shadow-lg transition-all border-none h-14 ${
                        hasWinner
                          ? "btn-disabled bg-gray-200"
                          : "btn-primary shadow-primary/20 hover:scale-[1.02]"
                      }`}
                    >
                      {hasWinner ? "Selection Closed" : "SELECT AS WINNER"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96 bg-white rounded-[3rem] border border-dashed border-gray-200">
          <p className="text-gray-400 font-bold text-xl uppercase tracking-widest">
            No Submissions Yet
          </p>
          <p className="text-gray-300 text-sm">
            Wait for participants to join the arena.
          </p>
        </div>
      )}
    </div>
  );
};

export default ShowSubmission;
