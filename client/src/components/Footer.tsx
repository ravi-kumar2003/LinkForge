import * as React from "react";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0B0F1A]/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-6 text-center">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()}{" "}
          <span className="bg-linear-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent font-medium">
            LinkForge
          </span>{" "}
          · Crafted by{" "}
          <span className="text-slate-200 font-medium">
            Ravi Kumar
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
