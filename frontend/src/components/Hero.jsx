import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {

  const {setShowLogin} = useContext(AppContext);

  return (
    <section className="w-full py-10 md:py-24 lg:py-28">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
        {/* ----- Text -----*/}
        <div className="flex flex-col justify-center space-y-4 lg:w-[50rem]">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Streamline Package Management for Your Building
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The complete solution for front desk staff to track packages,
              notify tenants, and manage pickups.
            </p>
          </div>
          <button
            onClick={()=>setShowLogin(true)}
            href="/dashboard"
            className="border border-black py-3 px-7 w-36 rounded-md bg-black text-white cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* ---- Image -----*/}
        <div className="">
          <img src={assets.hero_image} alt="Package Management Dashboard" />
        </div>
      </div>
    </section>
  );
}

export default Hero