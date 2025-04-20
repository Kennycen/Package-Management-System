import React from 'react'
import { Bell, CheckCircle2, Clock, Package, PackageCheck, Shield } from "lucide-react";
import { motion } from "motion/react";

const Feature = () => {
  return (
    <section
      id="feature"
      className="w-auto py-10 md:py-24 lg:py-28 items-center"
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <motion.h3
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-semibold"
          >
            Key Features
          </motion.h3>
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-3xl font-bold tracking-tighter md:text-4xl"
          >
            Everything You Need to Manage Packages
          </motion.h2>
          <motion.p
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          >
            Our platform provides all the tools front desk staff need to
            efficiently manage packages for residents.
          </motion.p>
        </div>
      </div>
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center space-y-2 rounded-xl border border-purple-100 p-6 shadow-lg bg-white hover:shadow-xl transition-all duration-300"
        >
          <div className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 p-3">
            <Package className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Package Tracking</h3>
          <p className="text-center text-gray-600">
            Log and track all incoming packages with detailed information and
            status updates.
          </p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center space-y-2 rounded-xl border border-purple-100 p-6 shadow-lg bg-white hover:shadow-xl transition-all duration-300"
        >
          <div className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 p-3">
            <Bell className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Tenant Notifications</h3>
          <p className="text-center text-gray-600">
            Automatically notify tenants when their packages arrive via email,
            SMS, or app notifications.
          </p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center space-y-2 rounded-xl border border-purple-100 p-6 shadow-lg bg-white hover:shadow-xl transition-all duration-300"
        >
          <div className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 p-3">
            <CheckCircle2 className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Pickup Management</h3>
          <p className="text-center text-gray-600">
            Record package pickups with digital signatures for secure chain of
            custody.
          </p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center space-y-2 rounded-xl border border-purple-100 p-6 shadow-lg bg-white hover:shadow-xl transition-all duration-300"
        >
          <div className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 p-3">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Aging Alerts</h3>
          <p className="text-center text-gray-600">
            Get alerts for packages that have been waiting for pickup for
            extended periods.
          </p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center space-y-2 rounded-xl border border-purple-100 p-6 shadow-lg bg-white hover:shadow-xl transition-all duration-300"
        >
          <div className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 p-3">
            <PackageCheck className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Reporting & Analytics</h3>
          <p className="text-center text-gray-600">
            Generate reports on package volume, pickup times, and carrier
            performance.
          </p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center space-y-2 rounded-xl border border-purple-100 p-6 shadow-lg bg-white hover:shadow-xl transition-all duration-300"
        >
          <div className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 p-3">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Secure Access</h3>
          <p className="text-center text-gray-600">
            Role-based access control ensures only authorized staff can manage
            packages.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Feature