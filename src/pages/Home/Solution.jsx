import { BsGiftFill } from "react-icons/bs";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";
import { RiGameFill } from "react-icons/ri";

const Solution = () => {
  return (
    <div>
      <h2 className="text-4xl font-extrabold pt-8 text-center">
        A complete suite of solutions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 md:p-10">
        <div className="p-5">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-extrabold mx-auto flex justify-center text-sky-500">
              <HiMiniArrowPathRoundedSquare />
            </h2>
            <h2 className="font-extrabold">Dynamic Path™</h2>
            <p className="font-normal">
              Easily create your tailor-made gaming scenarios. Combine multiple
              types of games with your interactive content (videos, images and
              text). The ultimate experience.
            </p>
            <p className="font-normal text-sky-500">Find Out More</p>
          </div>
        </div>
        <div className="p-5">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-extrabold mx-auto flex justify-center text-sky-500">
              <BsGiftFill />
            </h2>
            <h2 className="font-extrabold">Instant Win Games</h2>
            <p className="font-normal">
              All forms of interactive questionnaires to create your quizzes,
              surveys, personality tests, product and service recommendation
              models, assessments…
            </p>
            <p className="font-normal text-sky-500">Find Out More</p>
          </div>
        </div>
        <div className="p-5">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-extrabold mx-auto flex justify-center text-sky-500">
              <RiGameFill />
            </h2>
            <h2 className="font-extrabold">Classic Games</h2>
            <p className="font-normal">
              100% customisable popular game concepts to easily create your
              arcade games, reflection games, competitions and other fun
              experiences.
            </p>
            <p className="font-normal text-sky-500">Find Out More</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solution;
