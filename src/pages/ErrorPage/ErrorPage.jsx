import { Link, useRouteError } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-5">
      <div className="text-center space-y-6 max-w-md animate__animated animate__fadeIn">
        <div className="flex justify-center">
          <div className="bg-red-100 p-6 rounded-full">
            <FaExclamationTriangle className="text-red-500 text-7xl" />
          </div>
        </div>

        <h2 className="font-black text-6xl text-neutral">Oops!</h2>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-gray-700">
            {error.status === 404 ? "Page Not Found" : "Something went wrong"}
          </p>
          <p className="text-gray-500 italic">
            "{error.statusText || error.message}"
          </p>
        </div>

        <Link to="/">
          <button className="btn btn-primary rounded-full px-8 text-white shadow-lg shadow-primary/20 gap-2 mt-4">
            <FaHome /> Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
