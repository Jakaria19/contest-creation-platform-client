const Service = () => {
  const packs = [
    {
      title: "Strategy Pack",
      subtitle: "Your strategic planning service",
      img: "https://static.drimify.com/wp-content/uploads/2020/09/strategy-800x400.jpg?220823",
      desc: "Chart your course to audience engagement by giving the DrimTeam expertise a seat at mission control.",
    },
    {
      title: "Assistance Pack",
      subtitle: "Your partners in gamification",
      img: "https://static.drimify.com/wp-content/uploads/2020/09/assistance-800x400.jpg?220823",
      desc: "Work hand in glove with the DrimTeam for added peace of mind from the creation stage to launch.",
    },
    {
      title: "Creation Pack",
      subtitle: "Your turn-key creation service",
      img: "https://static.drimify.com/wp-content/uploads/2020/09/creation-800x400.jpg?220823",
      desc: "If you want a turn-key gamification solution put together and optimised by experts.",
    },
    {
      title: "Innovation Pack",
      subtitle: "Tailored to unique needs",
      img: "https://static.drimify.com/wp-content/uploads/2020/09/custom-800x400.jpg?220823",
      desc: "For highly ambitious and groundbreaking projects, this is whatever you need it to be.",
    },
  ];

  return (
    <div className="pb-20">
      <div className="text-center py-16 bg-gradient-to-b from-slate-50 to-white px-4">
        <h2 className="text-5xl font-black text-neutral mb-4 uppercase tracking-tighter">
          Services
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        <h4 className="text-lg text-gray-500 max-w-2xl mx-auto uppercase font-bold tracking-widest">
          OUR SUPPORT PACKS
        </h4>
        <p className="text-gray-400 mt-2 italic">
          Contest Lab is designed to make game creation participatory.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {packs.map((pack, index) => (
          <div
            key={index}
            className="card bg-white shadow-xl hover:shadow-2xl transition-all border border-gray-100 group"
          >
            <figure className="relative overflow-hidden">
              <img
                src={pack.img}
                alt={pack.title}
                className="group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </figure>
            <div className="card-body">
              <h2 className="card-title font-black text-neutral">
                {pack.title}
              </h2>
              <h3 className="font-bold text-sm text-primary uppercase">
                {pack.subtitle}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {pack.desc}
              </p>
              <div className="card-actions mt-4 border-t pt-4">
                <button className="text-primary font-bold text-xs uppercase hover:tracking-widest transition-all">
                  Discover Now →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
