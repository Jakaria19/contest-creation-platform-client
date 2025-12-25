import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddContest = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleAddContest = async (event) => {
    event.preventDefault();

    const form = event.target;
    const contestName = form.contestName.value;
    const contestImage = form.contestImage.value;
    const contestPrice = parseInt(form.contestPrice.value);
    const priceMoney = parseInt(form.priceMoney.value);
    const taskInstruction = form.taskInstruction.value;
    const contestType = form.contestType.value;
    const contestDescription = form.contestDescription.value;

    const contestDeadLine = startDate.toLocaleDateString();

    const newContest = {
      contestName,
      contestImage,
      contestPrice,
      priceMoney,
      taskInstruction,
      contestType,
      contestDescription,
      contestDeadLine,
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      participantCount: 0,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/contests", newContest);
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Contest Added Successfully! Wait for Admin approval.",
          showConfirmButton: false,
          timer: 2000,
        });
        form.reset();
        setStartDate(new Date());
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-sm">
      <h2 className="text-3xl font-black text-neutral mb-8 text-center uppercase tracking-tight">
        Add New <span className="text-primary">Contest</span>
      </h2>

      <form onSubmit={handleAddContest} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contest Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Contest Name</span>
            </label>
            <input
              name="contestName"
              type="text"
              placeholder="e.g. Logo Design Master"
              className="input input-bordered focus:border-primary"
              required
            />
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Contest Image URL</span>
            </label>
            <input
              name="contestImage"
              type="url"
              placeholder="https://image.path"
              className="input input-bordered focus:border-primary"
              required
            />
          </div>

          {/* Contest Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Registration Fee ($)</span>
            </label>
            <input
              name="contestPrice"
              type="number"
              placeholder="Entry Price"
              className="input input-bordered focus:border-primary"
              required
            />
          </div>

          {/* Prize Money */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Prize Money ($)</span>
            </label>
            <input
              name="priceMoney"
              type="number"
              placeholder="Winner's Reward"
              className="input input-bordered focus:border-primary"
              required
            />
          </div>

          {/* Contest Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Contest Category</span>
            </label>
            <select
              name="contestType"
              className="select select-bordered focus:border-primary"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Type
              </option>
              <option>Article Writing</option>
              <option>Gaming Review</option>
              <option>Book Review</option>
              <option>Business Idea</option>
              <option>Movie Review</option>
            </select>
          </div>

          {/* Deadline */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Contest Deadline</span>
            </label>
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="input input-bordered w-full focus:border-primary"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
              />
              <FaRegCalendarAlt className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Task Instruction */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Submission Instruction</span>
          </label>
          <textarea
            name="taskInstruction"
            className="textarea textarea-bordered h-24 focus:border-primary"
            placeholder="Describe what participants should submit..."
            required
          ></textarea>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Contest Description</span>
          </label>
          <textarea
            name="contestDescription"
            className="textarea textarea-bordered h-24 focus:border-primary"
            placeholder="Detailed description of the contest..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/20"
        >
          SUBMIT FOR APPROVAL
        </button>
      </form>
    </div>
  );
};

export default AddContest;
