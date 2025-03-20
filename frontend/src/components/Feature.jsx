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
            className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
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
        <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
          <div className="rounded-full bg-primary/10 p-3">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Package Tracking</h3>
          <p className="text-center text-muted-foreground">
            Log and track all incoming packages with detailed information and
            status updates.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
          <div className="rounded-full bg-primary/10 p-3">
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Tenant Notifications</h3>
          <p className="text-center text-muted-foreground">
            Automatically notify tenants when their packages arrive via email,
            SMS, or app notifications.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
          <div className="rounded-full bg-primary/10 p-3">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Pickup Management</h3>
          <p className="text-center text-muted-foreground">
            Record package pickups with digital signatures for secure chain of
            custody.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
          <div className="rounded-full bg-primary/10 p-3">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Aging Alerts</h3>
          <p className="text-center text-muted-foreground">
            Get alerts for packages that have been waiting for pickup for
            extended periods.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
          <div className="rounded-full bg-primary/10 p-3">
            <PackageCheck className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Reporting & Analytics</h3>
          <p className="text-center text-muted-foreground">
            Generate reports on package volume, pickup times, and carrier
            performance.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
          <div className="rounded-full bg-primary/10 p-3">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Secure Access</h3>
          <p className="text-center text-muted-foreground">
            Role-based access control ensures only authorized staff can manage
            packages.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default Feature