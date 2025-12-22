const Banner = () => {
  return (
    <div className="p-5 md:px-10">
      <h1 className="text-4xl font-extrabold text-center mt-10 mb-14">
        Online Contests & Competitions
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-6 my-9">
        <div className="flex-1 p-5 ">
          <h3 className="text-3xl font-extrabold">
            <span className="text-[#1bc5bd]">
              Grow and reward your communities with online
            </span>{" "}
            competitions. Drive engagement, increase subscribers, build loyalty.
          </h3>
        </div>
        <div className="flex-1 p-5">
          <img
            className="rounded-lg"
            src="https://static.drimify.com/wp-content/uploads/2023/02/online-contests-1-800x500.jpg?220823"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
