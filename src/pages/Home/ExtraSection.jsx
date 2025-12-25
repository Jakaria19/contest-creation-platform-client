const ExtraSection = () => {
  return (
    <div className="bg-neutral text-white p-12 md:p-24 rounded-[4rem] flex flex-col md:flex-row justify-between items-center gap-10 shadow-3xl relative overflow-hidden group my-20 mx-4">
      {/* Abstract Design Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]"></div>

      <div className="relative z-10 max-w-2xl text-center md:text-left">
        <h3 className="text-4xl md:text-6xl font-black mb-6 leading-none tracking-tighter">
          BECOME THE NEXT <br />{" "}
          <span className="text-indigo-400">VISIONARY CREATOR.</span>
        </h3>
        <p className="text-gray-400 text-lg font-medium max-w-lg">
          Join our global network of innovators. Host your first competition
          today and discover world-class talent in minutes.
        </p>
      </div>

      <div className="relative z-10">
        <button className="btn bg-indigo-600 hover:bg-white text-white hover:text-indigo-600 border-none px-14 h-20 rounded-[2rem] font-black text-xl uppercase tracking-tighter shadow-2xl shadow-indigo-900/40 transition-all hover:scale-105 active:scale-95">
          Launch Now
        </button>
      </div>
    </div>
  );
};

export default ExtraSection;
