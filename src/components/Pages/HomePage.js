import React from "react";
import { ChevronRight } from "lucide-react";
import heroVideo from "../../assets/hero-video.mp4";

const NAVBAR_HEIGHT = 64; // px

const HomePage = ({ onStart }) => {
  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
      >

        {/* VIDEO */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* CONTENT */}
        <div className="relative z-20 flex items-center justify-center h-full text-white px-6">
          <div className="max-w-6xl text-center animate-slide-up">
            <h1 className="text-5xl font-bold mb-4">
              Welcome to <span className="text-[#FF0000]">ABB LV Drives Pro</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Higher efficiency. Lower consumption. Simplify finding the right drive for your applications.
            </p>

            <button
              onClick={onStart}
              className="bg-[#FF0000] hover:bg-red-700 text-white px-8 py-4 rounded font-bold text-lg inline-flex items-center gap-2 transition-all shadow-lg hover:scale-105"
            >
              Start Your Selection <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-500 py-6 text-xs border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          © 2026 ABB, All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
