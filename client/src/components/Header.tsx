import * as React from "react";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-16">
          <h1
            className="
              text-xl md:text-3xl font-semibold tracking-tight
              bg-linear-to-r from-purple-400 via-indigo-400 to-blue-400
              bg-clip-text text-transparent
              drop-shadow-[0_0_12px_rgba(99,102,241,0.45)]
            "
          >
            LinkForge
          </h1>
        </nav>
      </div>
    </header>
  );
};

export default Header;
