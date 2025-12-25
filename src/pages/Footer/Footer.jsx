import { FaFacebook, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content rounded-t-[3rem] p-10 mt-20">
      <div className="footer max-w-7xl mx-auto py-10">
        <aside className="max-w-xs">
          <h2 className="text-3xl font-black tracking-tighter text-white mb-4">
            CONTEST<span className="text-primary">HUB</span>
          </h2>
          <p className="opacity-70 leading-relaxed text-sm">
            Inspiring creators since 2024. Level up your skills by participating
            in global challenges and showcasing your talent.
          </p>
          <div className="flex gap-5 mt-6">
            {[FaFacebook, FaLinkedin, FaGithub, FaTwitter].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="text-2xl hover:text-primary transition-all hover:-translate-y-1"
              >
                <Icon />
              </a>
            ))}
          </div>
        </aside>

        <nav>
          <h6 className="footer-title opacity-100 text-white border-b border-primary/30 pb-2 mb-4">
            Quick Links
          </h6>
          <a className="link link-hover opacity-70 hover:opacity-100 transition-opacity mb-2 block text-sm">
            All Contests
          </a>
          <a className="link link-hover opacity-70 hover:opacity-100 transition-opacity mb-2 block text-sm">
            Success Stories
          </a>
          <a className="link link-hover opacity-70 hover:opacity-100 transition-opacity mb-2 block text-sm">
            Newsletter
          </a>
        </nav>

        <nav>
          <h6 className="footer-title opacity-100 text-white border-b border-primary/30 pb-2 mb-4">
            Legal
          </h6>
          <a className="link link-hover opacity-70 hover:opacity-100 transition-opacity mb-2 block text-sm">
            Terms of use
          </a>
          <a className="link link-hover opacity-70 hover:opacity-100 transition-opacity mb-2 block text-sm">
            Privacy policy
          </a>
          <a className="link link-hover opacity-70 hover:opacity-100 transition-opacity mb-2 block text-sm">
            Cookie policy
          </a>
        </nav>
      </div>

      <div className="footer footer-center p-6 border-t border-gray-800 mt-10 max-w-7xl mx-auto">
        <aside>
          <p className="opacity-50 text-xs">
            Copyright © 2025 - All right reserved by{" "}
            <span className="font-bold text-primary">ContestHub</span>
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
