import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const MyParticipation = () => {
  const { user } = useAuth();
  console.log(user);
  const [participates, setParticipates] = useState();
  console.log("my contest", participates);

  useEffect(() => {
    fetch(`https://contest-lab-server.vercel.app/payments/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setParticipates(data));
  }, [user]);

  return (
    <div>
      {/* TODO :  pdf route e jabo pay korar pore tarpor link submit korbo */}
      <h2>My Participation {participates?.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Paid Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {participates?.map((participate, index) => (
              <tr key={participate._id}>
                <th>{index + 1}</th>
                <td>{participate.contestName}</td>
                <td>{participate.paidStatus}</td>
                <td>
                  {/* Show message or button */}
                  {participate.link ? (
                    <span className="text-green-500 font-bold ml-6">
                      Submitted
                    </span>
                  ) : (
                    <Link to={`submit/${participate._id}`}>
                      <button className="btn btn-sm bg-[#1bc5bd] text-white">
                        Upload Contest
                      </button>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParticipation;
