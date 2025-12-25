import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const from = location.state?.from?.pathname || "/";

  const handleJwtAndNavigate = (email, destination) => {
    axiosPublic.post("/jwt", { email }).then((res) => {
      if (res.data.token) {
        localStorage.setItem("access-token", res.data.token);
        navigate(destination, { replace: true });
      }
    });
  };

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Access Granted",
          text: "Welcome back to WinSphere!",
          showConfirmButton: false,
          timer: 2000,
        });
        handleJwtAndNavigate(data.email, from);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Authentication Failed",
          text: "Check your email or password again.",
        });
      });
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
        handleJwtAndNavigate(result.user?.email, from);
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50/30 px-4 py-20">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-neutral p-12 text-white flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <h2 className="text-5xl font-black mb-6 text-center z-10">
            Welcome <br />
            <span className="text-indigo-500">Back!</span>
          </h2>
          <p className="text-center text-gray-400 text-lg leading-relaxed z-10">
            Login to access your arena, track your progress, and claim your
            rewards.
          </p>
        </div>
        <div className="md:w-1/2 p-10 md:p-20">
          <h3 className="text-3xl font-black text-neutral mb-8 tracking-tight">
            Login Account
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label className="text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input bg-slate-50 border-none h-14 rounded-2xl focus:ring-2 ring-indigo-500"
                placeholder="yourname@winsphere.com"
              />
            </div>
            <div className="form-control">
              <label className="text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">
                Secure Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="input bg-slate-50 border-none h-14 rounded-2xl focus:ring-2 ring-indigo-500"
                placeholder="••••••••"
              />
            </div>
            <button className="btn bg-indigo-600 hover:bg-indigo-700 border-none text-white h-14 rounded-2xl shadow-xl shadow-indigo-100 w-full font-black uppercase tracking-widest">
              Sign In
            </button>
          </form>
          <div className="divider my-10 text-[10px] font-black text-gray-300 uppercase">
            Social Authentication
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-block h-14 rounded-2xl gap-3 border-slate-200 hover:bg-slate-50 hover:text-neutral"
          >
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>
          <p className="text-center mt-10 text-gray-500 font-medium">
            New to WinSphere?{" "}
            <Link
              to="/signUp"
              className="text-indigo-600 font-black hover:underline"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
