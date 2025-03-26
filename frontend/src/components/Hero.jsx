import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from "motion/react";

const Hero = () => {

  const {setShowLogin} = useContext(AppContext);

  return (
    <section className="w-full py-10 md:py-24 lg:py-28">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
        {/* ----- Text -----*/}
        <div className="flex flex-col justify-center space-y-4 lg:w-[50rem]">
          <div className="space-y-2">
            <motion.h1
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-3xl font-bold sm:text-4xl md:text-5xl"
            >
              Streamline Package Management for Your Building
            </motion.h1>
            <motion.p
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            >
              The complete solution for front desk staff to track packages,
              notify tenants, and manage pickups.
            </motion.p>
          </div>
          <motion.button
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            onClick={() => setShowLogin(true)}
            href="/dashboard"
            className="border border-black py-3 px-7 w-36 rounded-md hover:bg-gray-800 transition-colors bg-black text-white cursor-pointer"
          >
            Get Started
          </motion.button>
        </div>

        {/* ---- Image -----*/}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 40 }}
        >
          <img src={assets.hero_image} alt="Package Management Dashboard" />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero