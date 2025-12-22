import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: contests = [] } = useQuery({
    queryKey: ["contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${user.email}`);
      return res.data;
    },
  });

  return [contests, refetch];
};

export default useContest;
