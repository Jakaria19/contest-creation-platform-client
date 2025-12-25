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
  FaShieldAlt,
} from "react-icons/fa";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();
  const [authorInfo, setAuthorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/role/${user.email}`)
        .then((response) => {
          setAuthorInfo(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [axiosSecure, user?.email]);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const address = form.address.value;

    const userInfo = { name, photo, address };

    try {
      await updateUserProfile(name, photo);
      const res = await axiosSecure.patch(`/users/${user.email}`, userInfo);

      if (res.data.modifiedCount > 0 || res.status === 200) {
        setAuthorInfo({ ...authorInfo, ...userInfo });
        Swal.fire({
          icon: "success",
          title: "WinSphere Profile Updated!",
          showConfirmButton: false,
          timer: 1500,
          confirmButtonColor: "#4f46e5",
        });
      }
    } catch (error) {
      Swal.fire("Error", "Could not update profile", "error");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20">
        <span className="loading loading-bars loading-lg text-indigo-600"></span>
      </div>
    );

  return (
    <div className="p-2 md:p-6 animate__animated animate__fadeIn">
      {/* Header Banner Section */}
      <div className="bg-white rounded-[3rem] shadow-xl border border-indigo-50 overflow-hidden mb-10">
        <div className="bg-neutral h-32 w-full relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute top-4 right-8 flex items-center gap-2 text-indigo-400 font-black text-[10px] tracking-widest uppercase">
            <FaShieldAlt /> Verified Athlete
          </div>
        </div>
        <div className="px-8 pb-10 flex flex-col md:flex-row items-center gap-8 -mt-16">
          <img
            src={
              authorInfo?.photo ||
              user?.photoURL ||
              "https://i.ibb.co/p3d9pYn/user.png"
            }
            className="w-40 h-40 rounded-[2.5rem] object-cover border-8 border-white shadow-2xl relative z-10"
            alt="Profile"
          />
          <div className="text-center md:text-left pt-16 flex-1">
            <h2 className="text-4xl font-black text-neutral flex items-center justify-center md:justify-start gap-3 tracking-tighter">
              {authorInfo?.name || user?.displayName}
              <div className="badge badge-indigo bg-indigo-50 text-indigo-600 border-none font-black text-[10px] py-3">
                PRO
              </div>
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-2 text-gray-400 font-bold text-sm">
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-indigo-600" /> {user?.email}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-400" />
                {authorInfo?.address || "Set location in profile"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="max-w-2xl mx-auto bg-white p-8 md:p-14 rounded-[3rem] border border-indigo-50 shadow-sm">
        <div className="flex items-center gap-4 mb-10 justify-center">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 text-xl">
            <FaEdit />
          </div>
          <h2 className="text-2xl font-black text-neutral uppercase tracking-tighter">
            Edit <span className="text-indigo-600">Identity</span>
          </h2>
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="form-control">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2 mb-2">
              Full Display Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={authorInfo?.name || user?.displayName}
              className="input bg-slate-50 border-none rounded-2xl h-14 focus:ring-2 ring-indigo-500"
              required
            />
          </div>
          <div className="form-control">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2 mb-2">
              Avatar Source URL
            </label>
            <input
              type="text"
              name="photo"
              defaultValue={authorInfo?.photo || user?.photoURL}
              className="input bg-slate-50 border-none rounded-2xl h-14 focus:ring-2 ring-indigo-500"
              required
            />
          </div>
          <div className="form-control">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2 mb-2">
              Physical Address
            </label>
            <input
              type="text"
              name="address"
              defaultValue={authorInfo?.address}
              className="input bg-slate-50 border-none rounded-2xl h-14 focus:ring-2 ring-indigo-500"
              placeholder="e.g. Dhaka, Bangladesh"
              required
            />
          </div>
          <button
            type="submit"
            className="btn bg-indigo-600 hover:bg-indigo-700 w-full text-white rounded-2xl h-14 border-none shadow-xl shadow-indigo-100 font-black uppercase tracking-widest mt-4"
          >
            Apply Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
