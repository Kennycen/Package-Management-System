import React from 'react'
import { assets } from '../assets/assets';
import { motion } from "motion/react";

const About = () => {
  return (
    <section id="about" className="w-auto py-12 md:py-16 lg:py-20 items-center">
      <div className="flex flex-col mb-6 lg:mb-14 items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <motion.h3
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Who are we?
          </motion.h3>
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-3xl font-bold tracking-tighter md:text-4xl"
          >
            Your solution for package management system
          </motion.h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
        {/* ---- Image -----*/}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <img src={assets.about_image} alt="Package Management Dashboard" />
        </motion.div>

        {/* ----- Text -----*/}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col justify-center space-y-4 lg:w-[50rem] lg:pl-4"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-8">
              What our team is trying to provide you
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We're revolutionizing package management for modern residential and commercial properties. Our system streamlines the entire package handling process, from arrival to pickup, ensuring secure and efficient delivery management.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About