import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://contest-creation-platform-server-steel.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
