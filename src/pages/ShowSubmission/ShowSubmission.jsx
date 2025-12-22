import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ShowSubmission = () => {
  const submissionUser = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const handleWinner = async (contest) => {
    const winner = "winner";
    console.log(winner);

    const updateWinner = { winner };

    const update = await axiosSecure.patch(
      `/paymentsWinner/${contest._id}`,
      updateWinner
    );
    if (update.data.modifiedCount > 0) {
      console.log("Winner successfully");
      // reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      location.reload();
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold py-4 px-2">
        Total Submission : {submissionUser.length}
      </h2>

      <div className="gap-5 grid grid-cols-1 md:grid-cols-3 p-5 md:p-10 ">
        {submissionUser.map((submit) => (
          <div key={submit._id}>
            <div className="card card-compact bg-base-100 shadow-xl">
              <figure>
                <iframe
                  src={submit.link}
                  width="300"
                  height="150"
                  allow="autoplay"
                ></iframe>
              </figure>
              <div className="card-body">
                <h2 className="card-title">{submit.contestName}</h2>
                <p>Contest Participate: {submit.contestParticipateMail}</p>
                <div className="card-actions justify-end">
                  {submit.winner ? (
                    <p className="text-center bg-green-500 rounded-lg text-white py-3 px-2">
                      Winner Declared
                    </p>
                  ) : (
                    <button
                      onClick={() => handleWinner(submit)}
                      className="btn bg-sky-500 text-white"
                    >
                      Make Winner
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSubmission;
