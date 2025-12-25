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
            navigate("/");
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
      axiosPublic.post("/users", userInfo).then(() => navigate("/"));
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
            Create an account today and join thousands of creators worldwide in
            epic challenges.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm text-sm">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
              🏆 500+ Contests
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
              💰 Big Prizes
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
              🤝 Expert Jury
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
              🛡️ Secure Payments
            </div>
          </div>
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
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered bg-slate-50 border-none"
                />
              </div>
              <div className="form-control">
                <label className="label-text font-bold text-gray-600 mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: "Photo is required" })}
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
                {...register("email", { required: "Email is required" })}
                className="input input-bordered bg-slate-50 border-none"
              />
            </div>
            <div className="form-control">
              <label className="label-text font-bold text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 chars" },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                    message: "Must include Uppercase and Special char",
                  },
                })}
                className="input input-bordered bg-slate-50 border-none"
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 font-bold">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button className="btn btn-primary btn-block text-white h-14 mt-4 rounded-2xl">
              Create Account
            </button>
          </form>

          <div className="divider my-8 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em]">
            Quick Access
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-block h-14 rounded-2xl gap-3 border-gray-200"
          >
            <FaGoogle className="text-red-500" /> Sign up with Google
          </button>
          <p className="text-center mt-8 text-gray-500">
            Already a member?{" "}
            <Link to="/login" className="text-primary font-black">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
