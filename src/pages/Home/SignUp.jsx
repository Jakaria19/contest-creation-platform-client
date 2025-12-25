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
              title: "Welcome to WinSphere",
              text: "Your account has been created successfully!",
            });
            handleJwtAndNavigate(data.email);
          });
        });
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: err.message,
        })
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
    <div className="min-h-screen flex items-center justify-center bg-indigo-50/30 py-20 px-4">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row-reverse">
        <div className="md:w-1/2 bg-indigo-600 p-12 text-white flex flex-col justify-center items-center text-center">
          <h2 className="text-5xl font-black mb-6">
            Join the <br />
            Arena
          </h2>
          <p className="text-indigo-100 text-lg opacity-80 leading-relaxed">
            Create your profile today and start competing in global challenges
            that matter.
          </p>
        </div>
        <div className="md:w-1/2 p-10 md:p-20">
          <h3 className="text-3xl font-black text-neutral mb-8 tracking-tight">
            Create Identity
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input bg-slate-50 border-none h-12 rounded-xl"
                  placeholder="John Doe"
                />
              </div>
              <div className="form-control">
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1">
                  Avatar URL
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  className="input bg-slate-50 border-none h-12 rounded-xl"
                  placeholder="Link to photo"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="text-[10px] font-black uppercase text-gray-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input bg-slate-50 border-none h-12 rounded-xl"
                placeholder="email@winsphere.com"
              />
            </div>
            <div className="form-control">
              <label className="text-[10px] font-black uppercase text-gray-400 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input bg-slate-50 border-none h-12 rounded-xl"
                placeholder="Min 6 characters"
              />
            </div>
            <button className="btn bg-neutral hover:bg-indigo-600 text-white border-none w-full h-14 mt-6 rounded-xl font-black uppercase tracking-widest transition-all shadow-xl">
              Register Account
            </button>
          </form>
          <div className="divider my-8 uppercase text-[10px] font-black text-gray-300 tracking-widest">
            Instant Access
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-block h-12 rounded-xl gap-3 border-slate-200"
          >
            <FaGoogle className="text-red-500" /> Sign up with Google
          </button>
          <p className="text-center mt-8 text-gray-500 text-sm font-medium">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-black hover:underline"
            >
              Sign In Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
