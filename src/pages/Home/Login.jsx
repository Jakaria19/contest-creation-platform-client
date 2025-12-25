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
          title: "Welcome Back!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleJwtAndNavigate(data.email, from);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid credentials",
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row border border-gray-100">
        <div className="md:w-1/2 bg-gradient-to-br from-primary to-blue-700 flex flex-col justify-center items-center p-12 text-white">
          <h2 className="text-5xl font-black mb-6">Welcome!</h2>
          <p className="text-center text-blue-100 text-lg leading-relaxed opacity-90">
            Login to your dashboard to manage contests, track rewards and
            explore new opportunities.
          </p>
        </div>
        <div className="md:w-1/2 p-10 md:p-16">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-black text-neutral">Sign In</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="form-control">
              <label className="label-text font-bold text-gray-600 mb-2">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered focus:input-primary bg-slate-50 border-none h-14"
                placeholder="name@company.com"
              />
            </div>
            <div className="form-control">
              <label className="label-text font-bold text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="input input-bordered focus:input-primary bg-slate-50 border-none h-14"
                placeholder="••••••••"
              />
            </div>
            <button className="btn btn-primary btn-block text-white h-14 rounded-2xl shadow-lg shadow-primary/30">
              Sign In Now
            </button>
          </form>
          <div className="divider my-10 text-gray-300 font-bold text-xs uppercase">
            Or Continue With
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-block h-14 rounded-2xl gap-3 border-gray-200"
          >
            <FaGoogle className="text-red-500 text-xl" /> Google Account
          </button>
          <p className="text-center mt-10 text-gray-500">
            New here?{" "}
            <Link
              to="/signUp"
              className="text-primary font-black hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
