import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaGoogle } from "react-icons/fa";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleJwtAndNavigate = (email) => {
    axiosPublic.post("/jwt", { email }).then((res) => {
      if (res.data.token) {
        localStorage.setItem("access-token", res.data.token);
        navigate("/");
      }
    });
  };

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            photo: data.photoURL,
            role: "user",
            winCount: 0,
          };
          axiosPublic.post("/users", userInfo).then(() => {
            reset();
            Swal.fire({
              icon: "success",
              title: "Registered!",
              text: "Welcome to the community",
            });
            handleJwtAndNavigate(data.email);
          });
        });
      })
      .catch((err) =>
        Swal.fire({ icon: "error", title: "Error", text: err.message })
      );
  };

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photo: result.user?.photoURL,
        role: "user",
        winCount: 0,
      };
      axiosPublic.post("/users", userInfo).then(() => {
        handleJwtAndNavigate(result.user?.email);
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-16 px-4">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row-reverse border border-gray-100">
        <div className="md:w-1/2 bg-primary p-12 text-white flex flex-col justify-center items-center">
          <h2 className="text-5xl font-black mb-6 text-center">
            Start Winning!
          </h2>
          <p className="text-center text-blue-100 text-lg opacity-80 mb-10 leading-relaxed">
            Create an account today and join thousands of creators worldwide.
          </p>
        </div>
        <div className="md:w-1/2 p-10 md:p-16">
          <h3 className="text-3xl font-black text-neutral mb-8">
            Join ContestHub
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label-text font-bold text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input input-bordered bg-slate-50 border-none"
                />
              </div>
              <div className="form-control">
                <label className="label-text font-bold text-gray-600 mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  className="input input-bordered bg-slate-50 border-none"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label-text font-bold text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered bg-slate-50 border-none"
              />
            </div>
            <div className="form-control">
              <label className="label-text font-bold text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input input-bordered bg-slate-50 border-none"
              />
            </div>
            <button className="btn btn-primary btn-block text-white h-14 mt-4 rounded-2xl">
              Create Account
            </button>
          </form>
          <div className="divider my-8 uppercase text-[10px] font-black text-gray-400">
            Quick Access
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-block h-14 rounded-2xl gap-3 border-gray-200"
          >
            <FaGoogle className="text-red-500" /> Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
