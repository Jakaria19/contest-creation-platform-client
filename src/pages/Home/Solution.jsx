import { BsGiftFill } from "react-icons/bs";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";
import { RiGameFill } from "react-icons/ri";

const Solution = () => {
  const solutions = [
    {
      icon: <HiMiniArrowPathRoundedSquare />,
      title: "Dynamic Path™",
      desc: "Easily create your tailor-made gaming scenarios. Combine multiple types of games with your interactive content.",
    },
    {
      icon: <BsGiftFill />,
      title: "Instant Win Games",
      desc: "Interactive questionnaires to create quizzes, surveys, personality tests, and service recommendation models.",
    },
    {
      icon: <RiGameFill />,
      title: "Classic Games",
      desc: "100% customisable popular game concepts to easily create arcade games, reflection games and fun experiences.",
    },
  ];

  return (
    <div className="py-10">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-neutral tracking-tighter uppercase">
        Complete <span className="text-primary">Solutions</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {solutions.map((item, idx) => (
          <div
            key={idx}
            className="group p-10 bg-white rounded-[3rem] shadow-xl hover:shadow-primary/10 transition-all border border-transparent hover:border-primary/20 text-center"
          >
            <div className="text-6xl text-primary flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="text-2xl font-black mb-4 text-neutral">
              {item.title}
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm mb-6">
              {item.desc}
            </p>
            <button className="text-primary font-bold uppercase tracking-widest text-xs border-b-2 border-primary/20 hover:border-primary pb-1 transition-all">
              Find Out More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solution;
