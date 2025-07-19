import { Link } from "react-router-dom";
import Threads from "./threads";
import Navbar from "./navbar";
import ImageReel from "./imageReel";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-x-hidden hide-scrollbar">
      <Navbar />

      <div className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-0">
        {/* Threads Background */}
        <div className="absolute top-0 left-0 w-full h-[300px] lg:h-[400px] overflow-hidden z-0 -mt-[6%] lg:mt-[-2%]">
          <Threads amplitude={1.5} distance={0} enableMouseInteraction={true} />
        </div>

        {/* Main Content */}
        <div className="relative z-10 mt-24 lg:mt-28 sm:mt-36 max-w-full lg:max-w-5xl w-full font-Manrope">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl text-[#1A1A44] font-extrabold text-center lg:text-left leading-tight">
            vibeTUBE
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-center lg:text-left w-full max-w-[700px] mx-auto lg:mx-0 px-2 sm:px-4">
            Your cozy corner of the internet—a place to upload, watch, and vibe
            with videos that match your mood. From funny clips to heartfelt
            moments, it's all about real content and real connection. No
            pressure to perform, no cluttered feed — just a relaxed space to
            discover creators, express yourself freely, and enjoy content that
            feels you. Sit back, press play, and let the good vibes roll.
          </p>

          <div className="mt-6 sm:mt-8">
            <ImageReel />
          </div>
        </div>
      </div>

      {/* Background Circle Image */}
      <div className="relative top-16 sm:top-24 lg:top-[10vh] w-full">
        <div className="absolute w-full">
          <img
            src="circle.png"
            alt=""
            className="w-full h-auto object-contain lg:object-fill"
          />
        </div>
      </div>
    </div>
  );
}
