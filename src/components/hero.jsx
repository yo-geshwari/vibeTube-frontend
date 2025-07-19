import { Link } from "react-router-dom";
import Threads from "./threads";
import Navbar from "./navbar";
import ImageReel from "./imageReel";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-x-hidden hide-scrollbar">
      <Navbar />
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-[400px] overflow-hidden z-0 mt-[-2%]">
            <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
          </div>
        <div className="relative z-10 top-32 max-w-5xl font-Manrope">
          <h1 className="text-9xl text-[#1A1A44] font-extrabold sm:text-7xl">
            vibeTUBE
          </h1>
          <p className="my-4 font-medium">
            Your cozy corner of the internet—a place to upload, watch, and vibe
            with videos that match your mood. From funny clips to heartfelt
            moments, it's all about real content and real connection. No
            pressure to perform, no cluttered feed — just a relaxed space to
            discover creators, express yourself freely, and enjoy content that
            feels you. Sit back, press play, and let the good vibes roll.
          </p>
          <div>
            <ImageReel/>
          </div>
        </div>
      </div>
      <div className="relative   top-[10vh] max-w-full sm:top-0 ">
        <div className="absolute w-full object-contain">
          <img src="circle.png" alt="" className="relative  object-fill" />
        </div>
      </div>
    </div>
  );
}
