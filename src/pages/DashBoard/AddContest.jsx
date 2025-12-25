import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaRegCalendarAlt } from "react-icons/fa";

const AddContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const newContest = {
      contestName: data.contestName,
      contestImage: data.contestImage,
      contestPrice: parseInt(data.contestPrice),
      priceMoney: parseInt(data.priceMoney),
      taskInstruction: data.taskInstruction,
      contestType: data.contestType,
      contestDescription: data.contestDescription,
      contestDeadLine: startDate.toLocaleDateString(),
      creatorName: user?.displayName,
      creatorEmail: user?.email,
      creatorImage: user?.photoURL,
      participantCount: 0,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/contests", newContest);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Contest Added! Waiting for Admin approval.",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        setStartDate(new Date());
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-[3rem] shadow-sm border border-gray-50">
      <h2 className="text-3xl font-black text-center uppercase mb-10">
        Launch New <span className="text-primary">Contest</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label font-bold">Contest Name</label>
            <input
              {...register("contestName", { required: true })}
              className="input input-bordered rounded-2xl"
              placeholder="Master Logo Design"
            />
          </div>

          <div className="form-control">
            <label className="label font-bold">Contest Image URL</label>
            <input
              {...register("contestImage", { required: true })}
              className="input input-bordered rounded-2xl"
              placeholder="https://..."
            />
          </div>

          <div className="form-control">
            <label className="label font-bold">Entry Fee ($)</label>
            <input
              type="number"
              {...register("contestPrice", { required: true })}
              className="input input-bordered rounded-2xl"
            />
          </div>

          <div className="form-control">
            <label className="label font-bold">Prize Money ($)</label>
            <input
              type="number"
              {...register("priceMoney", { required: true })}
              className="input input-bordered rounded-2xl"
            />
          </div>

          <div className="form-control">
            <label className="label font-bold">Category</label>
            <select
              {...register("contestType", { required: true })}
              className="select select-bordered rounded-2xl"
            >
              <option value="Article Writing">Article Writing</option>
              <option value="Gaming Review">Gaming Review</option>
              <option value="Business Idea">Business Idea</option>
              <option value="Image Design">Image Design</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label font-bold">Deadline</label>
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="input input-bordered w-full rounded-2xl"
                minDate={new Date()}
              />
              <FaRegCalendarAlt className="absolute right-4 top-4 opacity-30" />
            </div>
          </div>
        </div>

        <div className="form-control">
          <label className="label font-bold">Submission Instruction</label>
          <textarea
            {...register("taskInstruction", { required: true })}
            className="textarea textarea-bordered rounded-2xl h-24"
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label font-bold">Contest Description</label>
          <textarea
            {...register("contestDescription", { required: true })}
            className="textarea textarea-bordered rounded-2xl h-24"
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full rounded-2xl text-white font-bold text-lg"
        >
          CREATE CONTEST
        </button>
      </form>
    </div>
  );
};

export default AddContest;
