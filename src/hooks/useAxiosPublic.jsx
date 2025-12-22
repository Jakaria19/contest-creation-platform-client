import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://contest-lab-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
