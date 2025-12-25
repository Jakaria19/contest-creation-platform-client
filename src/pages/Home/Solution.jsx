import { BsGiftFill, BsLightningChargeFill } from "react-icons/bs";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";
import { RiRocketFill } from "react-icons/ri";

const Solution = () => {
  const solutions = [
    {
      icon: <RiRocketFill />,
      title: "Launch Pad™",
      desc: "Construct sophisticated gaming workflows. Seamlessly blend interactive modules with your unique brand vision.",
    },
    {
      icon: <BsLightningChargeFill />,
      title: "Rapid Rewards",
      desc: "Engage users instantly with AI-powered quizzes, personality insights, and smart evaluation frameworks.",
    },
    {
      icon: <BsGiftFill />,
      title: "Signature Series",
      desc: "Fully white-labeled arcade experiences and cognitive games designed to skyrocket your user retention.",
    },
  ];

  return (
    <div className="py-20 px-4">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-20 text-neutral tracking-tighter uppercase">
        Integrated{" "}
        <span className="text-indigo-600 font-outline-2">Ecosystem</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {solutions.map((item, idx) => (
          <div
            key={idx}
            className="group relative p-12 bg-white rounded-[4rem] shadow-2xl shadow-indigo-50/50 hover:shadow-indigo-100 transition-all border-b-8 border-transparent hover:border-indigo-600 text-center"
          >
            <div className="text-7xl text-indigo-600 flex justify-center mb-8 transform group-hover:rotate-12 transition-transform duration-500">
              {item.icon}
            </div>
            <h3 className="text-2xl font-black mb-4 text-neutral">
              {item.title}
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm mb-8 px-2 font-medium">
              {item.desc}
            </p>
            <span className="cursor-pointer font-black uppercase text-indigo-600 text-xs tracking-widest bg-indigo-50 px-6 py-2 rounded-full">
              Explore Tech
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solution;
