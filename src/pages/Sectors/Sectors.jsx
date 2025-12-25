const Sectors = () => {
  const sectorData = [
    {
      title: "MARKETING",
      img: "https://static.drimify.com/wp-content/uploads/2020/09/marketing-games-scaled-800x500.jpg",
      desc: "Create engagement and convert customers using gamification in your marketing strategy.",
    },
    {
      title: "EVENTS",
      img: "https://static.drimify.com/wp-content/uploads/2020/09/connect-event-e1600951815886-800x500.jpg",
      desc: "Engage your audience by adding gamification to your events and create memorable experiences.",
    },
    {
      title: "ENTERTAINMENT",
      img: "https://static.drimify.com/wp-content/uploads/2020/09/entertainment-games-scaled-800x500.jpg",
      desc: "Engage, qualify, and reward your audience. Use gamified entertainment to stand out.",
    },
    {
      title: "TRAINING",
      img: "https://static.drimify.com/wp-content/uploads/2023/01/shutterstock2136489279-scaled-e1674488959898-800x500.jpg",
      desc: "Boost learning retention and engagement with gamified corporate training modules.",
    },
    {
      title: "HUMAN RESOURCES",
      img: "https://static.drimify.com/wp-content/uploads/2020/09/human-resources-games-scaled-800x500.jpg",
      desc: "Employ gamification across HR for engaging team building and recruitment processes.",
    },
    {
      title: "NONPROFIT",
      img: "https://static.drimify.com/wp-content/uploads/2020/09/non-profit-games-scaled-800x500.jpg",
      desc: "Raise awareness and action change using gamification for social and charitable causes.",
    },
  ];

  return (
    <section className="bg-slate-50 py-20 px-5">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-neutral uppercase tracking-tighter mb-4">
          Sectors
        </h2>
        <h4 className="text-xl md:text-2xl font-bold text-[#1bc5bd]">
          Gamification to change the world for every sector
        </h4>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sectorData.map((sector, index) => (
          <div
            key={index}
            className="group card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-[2rem] overflow-hidden border border-gray-100"
          >
            <figure className="overflow-hidden">
              <img
                src={sector.img}
                alt={sector.title}
                className="group-hover:scale-110 transition-transform duration-500 h-60 w-full object-cover"
              />
            </figure>
            <div className="card-body p-8">
              <h2 className="card-title font-black text-neutral mb-2">
                {sector.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                {sector.desc}
              </p>
              <div className="card-actions mt-6">
                <button className="text-[#1bc5bd] font-bold text-sm uppercase tracking-widest hover:underline transition-all">
                  Discover the sectors →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sectors;
