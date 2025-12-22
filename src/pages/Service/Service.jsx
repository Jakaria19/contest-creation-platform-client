const Service = () => {
  return (
    <div className="">
      <h2 className="text-4xl font-extrabold pt-8 text-center">Services</h2>
      <h4 className="text-base my-6 text-center ">
        OUR SUPPORT PACKS <br />
        While Contest Lab is designed to make game creation participate.
      </h4>

      <div className="bg-slate-100 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 md:p-10">
          <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://static.drimify.com/wp-content/uploads/2020/09/strategy-800x400.jpg?220823"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-extrabold">Strategy Pack</h2>
              <h2 className="font-bold text-lg text-[#1bc5bd]">
                Your strategic planning service
              </h2>
              <p>
                Chart your course to audience engagement by giving the DrimTeam
                expertise a seat at mission control. We’ve been evolving our...
              </p>
              <div className="card-actions justify-start mt-4">
                <p className="text-[#1bc5bd]">Discover the sectors</p>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://static.drimify.com/wp-content/uploads/2020/09/assistance-800x400.jpg?220823"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-extrabold">Assistance Pack</h2>
              <h2 className="font-bold text-lg text-[#1bc5bd]">
                Your partners in gamification
              </h2>
              <p>
                Work hand in glove with the DrimTeam for added peace of mind
                from the creation stage to the launch of your campaign. This is
                a...
              </p>
              <div className="card-actions justify-start mt-4">
                <p className="text-[#1bc5bd]">Discover the sectors</p>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://static.drimify.com/wp-content/uploads/2020/09/creation-800x400.jpg?220823"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-extrabold">Creation Pack</h2>
              <h2 className="font-bold text-lg text-[#1bc5bd]">
                Your turn-key creation service
              </h2>
              <p>
                If you want a turn-key gamification solution put together and
                optimised by the experts, the Creation Pack is a no-brainer.
                This is...
              </p>
              <div className="card-actions justify-start mt-4">
                <p className="text-[#1bc5bd]">Discover the sectors</p>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://static.drimify.com/wp-content/uploads/2020/09/custom-800x400.jpg?220823"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-extrabold">Innovation Pack</h2>
              <h2 className="font-bold text-lg text-[#1bc5bd]">
                Your service tailored to unique
              </h2>
              <p>
                For highly ambitious and groundbreaking projects, the Innovation
                Pack is whatever you need it to be. This is the the door...
              </p>
              <div className="card-actions justify-start mt-4">
                <p className="text-[#1bc5bd]">Discover the sectors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
