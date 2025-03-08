import React from 'react'
import { assets } from '../assets/assets';

const About = () => {
  return (
    <section
      id="about"
      className="w-auto py-12 md:py-16 lg:py-20 items-center"
    >
      <div className="flex flex-col mb-6 lg:mb-14 items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h3 className="">Who are we?</h3>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Your solution for package management system
          </h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
        {/* ---- Image -----*/}
        <div className="">
          <img src={assets.about_image} alt="Package Management Dashboard" />
        </div>

        {/* ----- Text -----*/}
        <div className="flex flex-col justify-center space-y-4 lg:w-[50rem] lg:pl-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              What our team is trying to provide you
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, quo distinctio, et eaque laborum sit modi nulla reiciendis consectetur reprehenderit nesciunt ducimus accusamus aliquam itaque dolore in necessitatibus culpa quod.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About