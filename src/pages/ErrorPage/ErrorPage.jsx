import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="text-center mt-[10%] space-y-2">
      <h2 className="font-bold text-3xl text-red-600">Oops!!!</h2>
      <p>{error.statusText || error.message}</p>
      {error.status === 404 && (
        <div>
          <h3>Page not found</h3>
          <Link to="/">
            <button className="btn mt-2 text-white bg-orange-600">
              Go Back Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ErrorPage;
