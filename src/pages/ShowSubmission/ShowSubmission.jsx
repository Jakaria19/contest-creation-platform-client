import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const ShowSubmission = () => {
  const loadedSubmissions = useLoaderData();
  const [submissions, setSubmissions] = useState(loadedSubmissions);
  const axiosSecure = useAxiosSecure();

  const handleWinner = async (contest) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to declare this participant as the winner!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Declare Winner!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updateWinner = { winner: "winner" };
        const res = await axiosSecure.patch(
          `/paymentsWinner/${contest._id}`,
          updateWinner
        );

        if (res.data.modifiedCount > 0) {
          const updatedData = submissions.map((item) =>
            item._id === contest._id ? { ...item, winner: "winner" } : item
          );
          setSubmissions(updatedData);

          Swal.fire(
            "Congratulations!",
            "Winner has been successfully declared.",
            "success"
          );
        }
      }
    });
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-neutral">
          Total Submissions: {submissions.length}
        </h2>
        <div className="badge badge-primary p-4 font-bold">Review Mode</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {submissions.map((submit) => (
          <div
            key={submit._id}
            className="card bg-white shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="bg-neutral p-2">
              <iframe
                src={submit.link}
                className="w-full h-48 rounded-lg"
                title="submission-preview"
              ></iframe>
            </div>
            <div className="card-body">
              <h2 className="card-title text-xl font-black">
                {submit.contestName}
              </h2>
              <p className="text-gray-400 text-xs truncate">
                Participant: {submit.contestParticipateMail}
              </p>

              <div className="card-actions mt-6">
                {submit.winner ? (
                  <div className="w-full py-3 bg-green-100 text-green-700 font-black text-center rounded-xl border-2 border-green-200 flex items-center justify-center gap-2">
                    🏆 Winner Declared
                  </div>
                ) : (
                  <button
                    onClick={() => handleWinner(submit)}
                    className="btn btn-primary w-full text-white font-bold rounded-xl shadow-lg shadow-primary/20"
                  >
                    Select as Winner
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSubmission;
