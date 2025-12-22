import { useLoaderData } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Update = () => {
  const contest = useLoaderData();
  const [startDate, setStartDate] = useState(null);
  const axiosPublic = useAxiosPublic();
  console.log(contest);

  const handleUpdateContest = async (event) => {
    event.preventDefault();

    const form = event.target;
    const contestName = form.contestName.value;
    const contestImage = form.contestImage.value;
    const contestPrice = parseInt(form.contestPrice.value);
    const priceMoney = parseInt(form.priceMoney.value);
    const taskInstruction = form.taskInstruction.value;
    const contestType = form.contestType.value;
    const contestDescription = form.contestDescription.value;
    const contestDeadLine = form.contestDeadLine.value;

    const newContest = {
      contestName,
      contestImage,
      contestPrice,
      priceMoney,
      taskInstruction,
      contestType,
      contestDescription,
      contestDeadLine,
    };
    console.log(newContest);

    const menuRes = await axiosPublic.patch(
      `/contest/${contest._id}`,
      newContest
    );
    console.log(menuRes.data);
    if (menuRes.data.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Contest Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <h2 className="  font-bold mt-7 text-3xl text-center w-full ">
        Add Your Queries
      </h2>
      <div className="card shrink-0 w-full">
        <form onSubmit={handleUpdateContest} className="card-body">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* row 1 Contest Name and Photo URL*/}
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold">Contest Name</span>
              </label>
              <input
                name="contestName"
                defaultValue={contest.contestName}
                type="text"
                placeholder="Contest Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold">
                  Contest Image-URL
                </span>
              </label>
              <input
                name="contestImage"
                defaultValue={contest.contestImage}
                type="text"
                placeholder="Contest Image-URL"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            {/* row 2 Contest Price and Price Money */}
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold">Contest Price</span>
              </label>
              <input
                name="contestPrice"
                defaultValue={contest.contestPrice}
                type="number"
                placeholder="Contest Price"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold">Price Money</span>
              </label>
              <input
                name="priceMoney"
                defaultValue={contest.priceMoney}
                type="number"
                placeholder="Price Money"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            {/* row 3 Task Instruction & Contest Type */}
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold">
                  Task Instruction
                </span>
              </label>
              <input
                name="taskInstruction"
                defaultValue={contest.taskInstruction}
                type="text"
                placeholder="Task Instruction"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold">Contest Type</span>
              </label>
              <select
                name="contestType"
                defaultValue={contest.contestType}
                type="text"
                className="select select-bordered join-item input "
                required
              >
                <option disabled selected>
                  Contest Type
                </option>
                <option>Article Writing</option>
                <option>Gaming Review</option>
                <option>Book Review</option>
                <option>Business Idea Concerts</option>
                <option>Movie Review</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5">
            {/* row 4 Contest Description &  Contest Deadline */}
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold">
                  Contest Description
                </span>
              </label>
              <input
                name="contestDescription"
                defaultValue={contest.contestDescription}
                type="text"
                placeholder="Contest Description"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold">
                  Contest DeadLine
                </span>
              </label>
              <div className="input input-bordered relative flex items-center">
                <DatePicker
                  name="contestDeadLine"
                  defaultValue={contest.contestDeadLine}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                <span className="absolute top-4 right-2">
                  <FaRegCalendarAlt />
                </span>
              </div>
            </div>
          </div>

          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn text-white bg-[#2d3142]"
              value="UPDATE CONTEST"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
