import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { FaRegCalendarAlt, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import "react-datepicker/dist/react-datepicker.css";

const Update = () => {
  const contest = useLoaderData();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [startDate, setStartDate] = useState(
    contest?.contestDeadLine ? new Date(contest.contestDeadLine) : new Date()
  );

  const handleUpdateContest = async (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedContest = {
      contestName: form.contestName.value,
      contestImage: form.contestImage.value,
      contestPrice: parseInt(form.contestPrice.value),
      priceMoney: parseInt(form.priceMoney.value),
      taskInstruction: form.taskInstruction.value,
      contestType: form.contestType.value,
      contestDescription: form.contestDescription.value,
      contestDeadLine: startDate.toISOString(),
    };

    try {
      const res = await axiosSecure.patch(
        `/contest/${contest._id}`,
        updatedContest
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Update Successful",
          text: `${updatedContest.contestName} has been updated.`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/my-contests");
      } else {
        Swal.fire("No Changes", "You didn't change any information.", "info");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong while updating.", "error");
    }
  };

  return (
    <div className="p-2 md:p-6 animate__animated animate__fadeIn">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <FaEdit size={24} />
          </div>
          <h2 className="text-3xl font-black text-neutral uppercase tracking-tight">
            Update <span className="text-primary">Contest</span>
          </h2>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-neutral/5 border border-gray-100 overflow-hidden">
          <form
            onSubmit={handleUpdateContest}
            className="p-8 md:p-12 space-y-6"
          >
            {/* row 1: Name & Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-widest text-gray-400">
                  Contest Name
                </label>
                <input
                  name="contestName"
                  defaultValue={contest?.contestName}
                  type="text"
                  className="input input-bordered rounded-2xl focus:input-primary"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-widest text-gray-400">
                  Contest Image-URL
                </label>
                <input
                  name="contestImage"
                  defaultValue={contest?.contestImage}
                  type="text"
                  className="input input-bordered rounded-2xl focus:input-primary"
                  required
                />
              </div>
            </div>

            {/* row 2: Prices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-widest text-gray-400">
                  Contest Fee ($)
                </label>
                <input
                  name="contestPrice"
                  defaultValue={contest?.contestPrice}
                  type="number"
                  className="input input-bordered rounded-2xl focus:input-primary"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-widest text-gray-400">
                  Prize Money ($)
                </label>
                <input
                  name="priceMoney"
                  defaultValue={contest?.priceMoney}
                  type="number"
                  className="input input-bordered rounded-2xl focus:input-primary"
                  required
                />
              </div>
            </div>

            {/* row 3: Instruction & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-widest text-gray-400">
                  Task Instruction
                </label>
                <input
                  name="taskInstruction"
                  defaultValue={contest?.taskInstruction}
                  type="text"
                  className="input input-bordered rounded-2xl focus:input-primary"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-widest text-gray-400">
                  Contest Type
                </label>
                <select
                  name="contestType"
                  defaultValue={contest?.contestType}
                  className="select select-bordered rounded-2xl focus:select-primary font-medium"
                  required
                >
                  <option value="Article Writing">Article Writing</option>
                  <option value="Gaming Review">Gaming Review</option>
                  <option value="Book Review">Book Review</option>
                  <option value="Business Idea Concerts">
                    Business Idea Concerts
                  </option>
                  <option value="Movie Review">Movie Review</option>
                </select>
              </div>
            </div>

            {/* row 4: Description & Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-widest text-gray-400">
                  Description
                </label>
                <textarea
                  name="contestDescription"
                  defaultValue={contest?.contestDescription}
                  className="textarea textarea-bordered rounded-2xl focus:textarea-primary h-12"
                  required
                ></textarea>
              </div>
              <div className="form-control">
                <label className="label font-bold text-xs uppercase tracking-widest text-gray-400">
                  Deadline
                </label>
                <div className="relative">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="input input-bordered w-full rounded-2xl focus:input-primary pl-10"
                    dateFormat="dd/MM/yyyy"
                    required
                  />
                  <FaRegCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="btn btn-primary w-full text-white rounded-2xl shadow-lg shadow-primary/20 h-14"
              >
                SAVE UPDATED CONTEST
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
