const Sectors = () => {
  const sectorData = [
    {
      title: "MARKETING",
      img: "https://i.ibb.co.com/R4HdTTBB/corporate-management-strategy-solution-branding-concept.jpg",
      desc: "Create engagement and convert customers using gamification in your marketing strategy.",
    },
    {
      title: "EVENTS",
      img: "https://i.ibb.co.com/8g0JLqhm/lee-blanchflower-1d-W1v-EJLl-CQ-unsplash.jpg",
      desc: "Engage your audience by adding gamification to your events and create memorable experiences.",
    },
    {
      title: "ENTERTAINMENT",
      img: "https://i.ibb.co.com/0y1thWhq/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space.jpg",
      desc: "Engage, qualify, and reward your audience. Use gamified entertainment to stand out.",
    },
    {
      title: "TRAINING",
      img: "https://i.ibb.co.com/TxSjj4Rm/charlesdeluvio-Lks7vei-e-Ag-unsplash.jpg",
      desc: "Boost learning retention and engagement with gamified corporate training modules.",
    },
    {
      title: "HUMAN RESOURCES",
      img: "https://i.ibb.co.com/rRFZDQjt/scott-graham-5f-Nm-Wej4t-AA-unsplash.jpg",
      desc: "Employ gamification across HR for engaging team building and recruitment processes.",
    },
    {
      title: "MEDIA",
      img: "https://i.ibb.co.com/5WF85fCw/sam-mcghee-Kie-CLNz-Ko-Bo-unsplash.jpg",
      desc: "Raise awareness and action change using gamification for social and charitable causes.",
    },
  ];

  return (
    <section className="bg-white py-24 px-5">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="text-5xl font-black text-neutral uppercase tracking-tighter mb-4">
          Industries
        </h2>
        <h4 className="text-xl font-bold text-indigo-600 italic">
          Breaking boundaries across every professional domain
        </h4>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {sectorData.map((sector, index) => (
          <div
            key={index}
            className="group relative bg-slate-50 rounded-[2.5rem] overflow-hidden border border-transparent hover:border-indigo-100 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="h-64 overflow-hidden">
              <img
                src={sector.img}
                alt={sector.title}
                className="group-hover:scale-110 transition-transform duration-700 w-full h-full object-cover grayscale group-hover:grayscale-0"
              />
            </div>
            <div className="p-10">
              <h2 className="text-2xl font-black text-neutral mb-3">
                {sector.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {sector.desc}
              </p>
              <button className="group-hover:text-indigo-600 font-extrabold text-xs uppercase tracking-[0.2em] transition-colors flex items-center gap-2">
                Learn More{" "}
                <span className="group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sectors;
