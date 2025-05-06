import React from "react";
import { useRouter } from "next/navigation";

const Hero: React.FC = () => {
  const router = useRouter();

  return (
    <div className="relative w-full  bg-black overflow-hidden bg-cover bg-center border-b-[1px] border-b-gray ">
      <div className="relative flex flex-col items-center justify-center min-h-[500px] mt-20 text-center px-4">
        <h1 className="lg:text-7xl md:text-6xl text-5xl font-bold text-white">Decentralized</h1>
        <h1 className="lg:text-7xl md:text-6xl text-5xl font-extrabold text-amber-400 mt-2">
          Project Funding Platform
        </h1>

        <p className="text-xl md:text-2xl text-white mt-6">
          Fund innovative blockchain projects or get your ideas funded through
        </p>
        <p className="text-xl md:text-2xl text-white">our decentralized platform</p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4" onClick={() => router.push("/projects")}>
          <button className=" text-lg px-6 py-3 rounded-md text-black bg-white hover:opacity-90 transition cursor-pointer hover:bg-amber-400">
            Join now
          </button>
          <button onClick={() => router.push('/projects')} className="text-white text-lg px-6 py-3 rounded-md border border-white hover:bg-white hover:text-black transition">
            Explore Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
