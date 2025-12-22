import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SubmitContests = () => {
  const navigate = useNavigate();
  const participate = useLoaderData();
  const axiosSecure = useAxiosSecure();
  console.log(participate);

  const handleSubmitContest = async (event) => {
    event.preventDefault();

    const form = event.target;
    const link = form.link.value;

    console.log(link);

    const finalLink = { link };

    const update = await axiosSecure.patch(
      `/paymentsSubmit/${participate._id}`,
      finalLink
    );
    if (update.data.modifiedCount > 0) {
      console.log("Contest Submit successfully");
      // reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/participatedContest");
    }
    console.log(update.data);
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold my-6">
        Contest Name: {participate.contestName}
      </h2>

      <form onSubmit={handleSubmitContest}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Submit Link</span>
          </label>
          <input
            type="text"
            name="link"
            placeholder="Submit Your Doc/PDF Link"
            className="input input-bordered"
            required
          />
        </div>
        <div>
          <input
            className="btn text-white bg-[#1bc5bd] mt-4"
            type="submit"
            value="SUBMIT"
          />
        </div>
      </form>
    </div>
  );
};

export default SubmitContests;
