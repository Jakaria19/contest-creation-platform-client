import Banner from "./Banner";
import PopularContests from "./PopularContests";
import WinnerAdvertisement from "./WinnerAdvertisement";
import ExtraSection from "./ExtraSection";
import Sectors from "../Sectors/Sectors";
import Solution from "./Solution";

const Home = () => {
  return (
    <div className="space-y-24 mb-20 overflow-hidden">
      <Banner />

      <div className="max-w-7xl mx-auto px-4">
        <PopularContests />
      </div>

      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <Sectors />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <Solution />
      </div>

      <div className="bg-base-200 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <WinnerAdvertisement />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <ExtraSection />
      </div>
    </div>
  );
};

export default Home;
