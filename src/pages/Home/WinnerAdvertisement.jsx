const WinnerAdvertisement = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1 space-y-5">
        <h2 className="text-4xl font-bold text-neutral">
          Celebrate Our <span className="text-primary">Champions!</span>
        </h2>
        <p className="text-lg text-gray-600">
          Over <span className="font-bold text-secondary">$50,000</span> prize
          money distributed this year. Join thousands of creators and showcase
          your talent to the world.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-primary">
            <p className="text-2xl font-bold">1,200+</p>
            <p className="text-sm">Total Winners</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-secondary">
            <p className="text-2xl font-bold">500+</p>
            <p className="text-sm">Active Contests</p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <img
          src="https://img.freepik.com/free-vector/winner-background-first-place-with-golden-cup-stars_1017-31846.jpg"
          alt="Winner"
          className="rounded-3xl shadow-2xl"
        />
      </div>
    </div>
  );
};

export default WinnerAdvertisement;
