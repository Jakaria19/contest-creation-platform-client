import "animate.css";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user, updateUserProfile } = useAuth();

  const [authorInfo, setAuthorInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/usersUser/${user.email}`)
        .then((response) => {
          setAuthorInfo(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [axiosSecure, user]);

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const photo = form.photo.value;
    const address = form.address.value;

    const updateData = { name, photo, address };
    console.log(updateData);

    updateUserProfile(name, photo)
      .then(() => {
        // create user entry in the database
        const userInfo = {
          name: name,
          photo: photo,
          address: address,
        };
        axiosPublic.patch(`/usersUser/${user.email}`, userInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            console.log("user added to the database");
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
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="hero py-6 bg-base-200 rounded-xl">
        <div className="hero-content flex-col lg:flex-row">
          <img src={authorInfo?.photo} className="w-40 h-40 rounded-lg " />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Name: {authorInfo?.name}</h2>
            <p className="">Email: {authorInfo?.email}</p>
            <p className="">Address: {authorInfo?.address}</p>
          </div>
        </div>
      </div>

      <div>
        <form onSubmit={handleUpdateProfile} className="w-1/2 mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4 mt-8 text-blue-500">
            Update Your Profile
          </h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={authorInfo?.name}
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo Url</span>
            </label>
            <input
              type="text"
              name="photo"
              defaultValue={authorInfo?.photo}
              placeholder="photo"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter Your Address"
              className="input input-bordered"
              required
            />
          </div>
          <input
            type="submit"
            className="btn my-4 text-white bg-sky-500"
            value="Update Profile"
          />
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
