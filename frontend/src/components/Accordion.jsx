import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion } from "motion/react";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="border-b border-purple-100 bg-white rounded-lg p-4 mb-4 shadow-md hover:shadow-lg transition-all duration-300"
    >
      <button
        className="flex w-full items-center justify-between py-4 text-left cursor-pointer"
        onClick={onClick}
      >
        <span className="font-medium text-gray-800">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-red-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-red-600" />
        )}
      </button>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="pb-4 text-gray-600"
        >
          {answer}
        </motion.div>
      )}
    </motion.div>
  )
}

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How does the package notification system work?",
      answer: "When a package arrives, our system allows staff to log it immediately. Residents receive automatic notifications through their preferred method (email, SMS), informing them about their package arrival."
    },
    {
      question: "What types of packages can be managed through the system?",
      answer: "Our system can handle all types of packages, from standard deliveries to special items like perishables, oversized packages, and sensitive materials. Each package can be tagged with specific handling instructions, meaning tenants can be prepared when they are picking up their package."
    },
    {
      question: "Is the system secure?",
      answer: "Yes, our system implements enterprise-grade security measures. All data is encrypted, access is role-based, and we maintain detailed audit trails of all package handling activities to ensure complete accountability."
    },
    {
      question: "Can residents track their package status?",
      answer: "No, residents are notified by the system when their package arrived at the building complex and the staff successfully received it. Tenants will be notified by email or SMS and pick up their package at their convenience."
    },
    {
      question: "What happens if a package isn't picked up?",
      answer: "Our system includes automated reminders for packages that haven't been picked up. Staff can set custom reminder schedules and escalation procedures for packages that remain unclaimed after a specified period."
    }
  ]

  return (
    <section className="w-auto py-12 md:py-16 lg:py-20 items-center">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="px-4 md:px-6"
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl ">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Common questions about our package management system
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => setOpenIndex(index === openIndex ? null : index)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Accordion 