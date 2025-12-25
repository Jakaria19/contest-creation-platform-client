import { FaFacebookF, FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content rounded-t-[4rem] p-10 md:p-20 mt-32">
      <div className="footer max-w-7xl mx-auto">
        <aside className="max-w-xs">
          <h2 className="text-3xl font-black tracking-tighter text-white mb-6">
            WIN<span className="text-indigo-500">SPHERE</span>
          </h2>
          <p className="opacity-60 leading-relaxed text-sm font-medium">
            The world's leading arena for creators. We bridge the gap between
            talent and opportunity through gamified challenges.
          </p>
          <div className="flex gap-4 mt-8">
            {[FaFacebookF, FaLinkedinIn, FaGithub, FaTwitter].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg hover:bg-indigo-600 hover:text-white transition-all transform hover:-translate-y-2"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </aside>

        <nav>
          <h6 className="footer-title opacity-100 text-indigo-400 tracking-widest mb-6">
            Explore Arena
          </h6>
          <a className="link link-hover opacity-60 hover:opacity-100 mb-3 block text-sm">
            Open Contests
          </a>
          <a className="link link-hover opacity-60 hover:opacity-100 mb-3 block text-sm">
            Hall of Fame
          </a>
          <a className="link link-hover opacity-60 hover:opacity-100 mb-3 block text-sm">
            Our Methodology
          </a>
        </nav>

        <nav>
          <h6 className="footer-title opacity-100 text-indigo-400 tracking-widest mb-6">
            Company
          </h6>
          <a className="link link-hover opacity-60 hover:opacity-100 mb-3 block text-sm">
            About WinSphere
          </a>
          <a className="link link-hover opacity-60 hover:opacity-100 mb-3 block text-sm">
            Privacy Policy
          </a>
          <a className="link link-hover opacity-60 hover:opacity-100 mb-3 block text-sm">
            Terms of Service
          </a>
        </nav>
      </div>

      <div className="footer footer-center p-8 border-t border-white/5 mt-16 max-w-7xl mx-auto opacity-40">
        <p className="text-xs uppercase tracking-[0.3em]">
          © 2025 WinSphere Global. Built for the next generation of winners.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
