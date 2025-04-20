import React, { useRef, useEffect } from 'react'
import { motion } from "motion/react";

const Demo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Check if video is loaded before playing
          if (videoRef.current.readyState >= 2) {
            videoRef.current.play().catch(error => {
              console.error("Error playing video:", error);
            });
          }
        } else {
          videoRef.current.pause();
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);

      // Add event listeners for debugging
      videoRef.current.addEventListener('error', (e) => {
        console.error('Video error:', e);
      });

      videoRef.current.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
      });
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <section id="demo" className="w-full py-10 md:py-24 lg:py-24 items-center">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <div className="space-y-2">
          <motion.h3
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-semibold"
          >
            Check our Demo
          </motion.h3>
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-3xl font-bold tracking-tighter md:text-4xl"
          >
            User friendly interface and sleek professional design
          </motion.h2>
        </div>
      </div>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 40 }}
        className="lg:w-1/2 h-auto m-auto items-center rounded-2xl overflow-hidden bg-white shadow-xl"
      >
        <video
          ref={videoRef}
          className="w-full h-auto object-contain"
          controls
          playsInline
          muted
          loop
          preload="auto"
        >
          <source src="demo.mov" type="video/quicktime" />
          <source src="demo.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </section>
  );
}

export default Demo