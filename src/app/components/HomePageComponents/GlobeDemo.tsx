"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import sampleArcs from "./SampleArcs";
import { CompanyScroll } from "./CompanyScroll";
import { TypeAnimation } from "react-type-animation";
import { TypewriterEffectSmoothDemo } from "./homePageTypeWriteEffect";
const World = dynamic(() => import("./globe").then((m) => m.World), {
  ssr: false,
});

export function GlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
 

  return (
    <div className="flex flex-row items-center justify-center py-16 h-screen md:h-auto dark:bg-black bg-white relative w-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
      <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="space-y-8"
        >
          <div className="text-center  md:text-6xl font-bold  text-4xl  py-7 mt-5 text-white">
         Together We Build in Web3.
          <p className="text-center get-white mt-1 text-base md:text-lg font-normal  dark:text-neutral-200 max-w-2xl mx-auto text-white">
            Over <span className="font-bold text-3xl">118,057</span> <span className="font-bold">
              developers {" "}
              </span>
                are building their web3 career with FREE
            bootcamps and courses in top ecosystems, turning their skills into income.
          </p>
          <button className="font-bold text-sm  text-white px-3 bg-gradient-to-r from-[#A259FF] to-[#1B8EFF] py-1 rounded-md">Let's Rise In!</button>
          </div>
          <div className="flex justify-center">
          <CompanyScroll ></CompanyScroll>
          </div>
        </motion.div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40 " />  
        <div className="absolute w-full -bottom-48 h-72 md:h-full z-10 cursor-pointer ">
          <World  data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}
