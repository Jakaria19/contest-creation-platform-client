import "animate.css";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaEdit,
} from "react-icons/fa";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();
  const [authorInfo, setAuthorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/usersUser/${user.email}`)
        .then((response) => {
          setAuthorInfo(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [axiosSecure, user]);

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const address = form.address.value;

    const userInfo = { name, photo, address };

    updateUserProfile(name, photo)
      .then(() => {
        axiosSecure.patch(`/usersUser/${user.email}`, userInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            setAuthorInfo({ ...authorInfo, ...userInfo });
            Swal.fire({
              icon: "success",
              title: "Profile Updated Successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      })
      .catch((error) => {
        Swal.fire("Error", "Could not update profile", "error");
        console.log(error);
      });
  };

  if (loading)
    return (
      <div className="text-center py-20">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-2 md:p-6 animate__animated animate__fadeIn">
      {/* Profile Card */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-neutral/5 border border-gray-100 overflow-hidden mb-10">
        <div className="bg-gradient-to-r from-sky-400 to-blue-500 h-32 w-full"></div>
        <div className="px-8 pb-8 flex flex-col md:flex-row items-center gap-6 -mt-12">
          <div className="relative">
            <img
              src={authorInfo?.photo || "https://i.ibb.co/mJR7z9Y/user.png"}
              className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover border-4 border-white shadow-lg"
              alt="Profile"
            />
          </div>
          <div className="text-center md:text-left pt-12 md:pt-14 space-y-1 flex-1">
            <h2 className="text-3xl font-black text-neutral flex items-center justify-center md:justify-start gap-2">
              {authorInfo?.name}{" "}
              <FaUserCircle className="text-primary text-xl" />
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 font-medium">
              <p className="flex items-center gap-1.5">
                <FaEnvelope className="text-sky-500" /> {authorInfo?.email}
              </p>
              <p className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-red-400" />{" "}
                {authorInfo?.address || "No address set"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Update Form */}
      <div className="max-w-2xl mx-auto bg-base-100 p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <FaEdit className="text-2xl text-primary" />
          <h2 className="text-2xl font-black text-neutral uppercase tracking-tighter">
            Update <span className="text-primary">Profile</span>
          </h2>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-5">
          <div className="form-control">
            <label className="label font-bold text-xs uppercase tracking-widest text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={authorInfo?.name}
              className="input input-bordered rounded-2xl focus:input-primary transition-all"
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-bold text-xs uppercase tracking-widest text-gray-400">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              defaultValue={authorInfo?.photo}
              className="input input-bordered rounded-2xl focus:input-primary transition-all"
              placeholder="https://image-link.com"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-bold text-xs uppercase tracking-widest text-gray-400">
              Home Address
            </label>
            <input
              type="text"
              name="address"
              defaultValue={authorInfo?.address}
              placeholder="Street, City, Country"
              className="input input-bordered rounded-2xl focus:input-primary transition-all"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="btn btn-primary w-full text-white rounded-2xl shadow-lg shadow-primary/20"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
