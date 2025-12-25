import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const SubmitContests = () => {
  const navigate = useNavigate();
  const participate = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSubmitContest = async (event) => {
    event.preventDefault();
    setLoading(true);

    const form = event.target;
    const link = form.link.value;
    const finalLink = { link };

    try {
      const update = await axiosSecure.patch(
        `/paymentsSubmit/${participate._id}`,
        finalLink
      );

      if (update.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Contest Submitted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/participatedContest");
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes made",
          text: "This link is already submitted or unchanged.",
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong! Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-black text-neutral mb-2 uppercase">
        Submit Your Entry
      </h2>
      <p className="text-gray-500 mb-6">
        Contest:{" "}
        <span className="font-bold text-primary">
          {participate.contestName}
        </span>
      </p>

      <form onSubmit={handleSubmitContest} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Project/Document Link
            </span>
          </label>
          <input
            type="url"
            name="link"
            placeholder="e.g., https://google.drive.com/your-doc"
            className="input input-bordered focus:border-primary w-full"
            required
          />
          <label className="label">
            <span className="label-text-alt text-gray-400 italic">
              Submit your Google Drive, Doc, or PDF link here.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn w-full text-white border-none ${
            loading ? "bg-gray-400" : "bg-[#1bc5bd] hover:bg-[#18b1aa]"
          }`}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "SUBMIT ENTRY"
          )}
        </button>
      </form>
    </div>
  );
};

export default SubmitContests;
