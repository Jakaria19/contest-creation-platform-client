import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { refetch, data: contests = [] } = useQuery({
    queryKey: ["contests", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-contests/${user.email}`);
      return res.data;
    },
  });

  return [contests, refetch];
};

export default useContest;
