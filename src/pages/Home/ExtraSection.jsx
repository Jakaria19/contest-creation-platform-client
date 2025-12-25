const ExtraSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-primary text-white p-12 md:p-20 rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-10 shadow-2xl shadow-primary/30 relative overflow-hidden group">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>

      <div className="relative z-10 max-w-xl text-center md:text-left">
        <h3 className="text-4xl font-black mb-4 leading-tight uppercase tracking-tighter">
          Ready to launch your own contest?
        </h3>
        <p className="text-blue-100 text-lg opacity-90">
          Become a creator today and find the best talent for your project from
          our global community.
        </p>
      </div>

      <div className="relative z-10">
        <button className="btn bg-white hover:bg-yellow-400 text-primary border-none px-12 h-16 rounded-2xl font-black text-lg uppercase tracking-wider shadow-xl transition-all hover:scale-105 active:scale-95">
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default ExtraSection;
