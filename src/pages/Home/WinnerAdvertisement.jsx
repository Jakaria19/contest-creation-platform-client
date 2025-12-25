const WinnerAdvertisement = () => {
  return (
    <div className="py-20 px-4 max-w-4xl mx-auto text-center">
      <div className="space-y-8">
        {/* Badge */}
        <div className="inline-block bg-indigo-50 text-indigo-600 px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest shadow-sm">
          Success Stories
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-black text-neutral leading-tight tracking-tighter">
          Where Talent Meets <br />
          <span className="text-indigo-600">Legendary Status</span>
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Over <span className="font-black text-indigo-600">$50,000+</span> in
          cash and awards granted to our community this year. Join the ranks of
          global winners and showcase your true potential.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 max-w-xl mx-auto">
          <div className="bg-slate-50 p-8 rounded-[2rem] border-b-4 border-indigo-600 shadow-xl shadow-indigo-100/50 transition-transform hover:scale-105">
            <p className="text-4xl font-black text-neutral">1.2K</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">
              Champions Made
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-[2rem] border-b-4 border-violet-500 shadow-xl shadow-violet-100/50 transition-transform hover:scale-105">
            <p className="text-4xl font-black text-neutral">500+</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">
              Live Events
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerAdvertisement;
