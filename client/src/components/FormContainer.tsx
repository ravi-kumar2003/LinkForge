import * as React from "react";
import axios from "axios";
import { serverUrl } from "../helpers/Constants";

interface IFormContainerProps {
  updateReloadState: () => void;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
  const { updateReloadState } = props;
  const [fullUrl, setFullUrl] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${serverUrl}/shorturl`, { fullUrl });
      setFullUrl("");
      updateReloadState();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative h-[85vh] overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="bg-linear-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">
            LinkForge
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-200 mb-3">
          Forge powerful short links in seconds.
        </p>

        {/* Description */}
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mb-10 leading-relaxed">
          LinkForge helps you transform long, messy URLs into clean, shareable
          links. Track clicks, manage links, and share with confidence — fast,
          simple, and free.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-3xl">
          <div className="relative">
            <input
              type="url"
              required
              value={fullUrl}
              onChange={(e) => setFullUrl(e.target.value)}
              placeholder="linkforge.app / paste your long link here"
              className="
                w-full rounded-full px-7 py-4
                text-gray-900 bg-white/90 backdrop-blur
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                shadow-lg
              "
            />

            <button
              type="submit"
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                bg-linear-to-r from-indigo-500 to-violet-600
                text-white px-7 py-2.5 rounded-full font-medium
                hover:from-indigo-600 hover:to-violet-700
                transition-all shadow-md cursor-pointer
              "
            >
              Shorten
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
