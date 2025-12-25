const Banner = () => {
  return (
    <div className="p-5 md:px-10 bg-gradient-to-b from-white to-slate-50">
      <h1 className="text-4xl md:text-5xl font-black text-center mt-10 mb-14 tracking-tight text-neutral">
        Unleash Your Potential with{" "}
        <span className="text-indigo-600">WinSphere</span>
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-10 my-9 max-w-7xl mx-auto">
        <div className="flex-1 p-5 space-y-6">
          <h3 className="text-3xl md:text-4xl font-black leading-tight">
            <span className="text-indigo-600 italic">
              Empower your brand through interactive
            </span>{" "}
            challenges. Engage audiences and discover global talent
            effortlessly.
          </h3>
          <p className="text-gray-500 font-medium">
            The ultimate arena for creators and participants to connect,
            compete, and conquer.
          </p>
        </div>
        <div className="flex-1 p-2">
          <img
            className="rounded-[2.5rem] shadow-2xl border-4 border-white transform hover:-rotate-2 transition-transform duration-500"
            src="https://i.ibb.co.com/tMLjxK02/26432659-competition-online-3.jpg"
            alt="WinSphere Banner"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
