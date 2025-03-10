import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b">
      <button
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={onClick}
      >
        <span className="font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  )
}

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How does the package notification system work?",
      answer: "When a package arrives, our system allows staff to log it immediately. Residents receive automatic notifications through their preferred method (email, SMS, or app), informing them about their package arrival and pickup location."
    },
    {
      question: "What types of packages can be managed through the system?",
      answer: "Our system can handle all types of packages, from standard deliveries to special items like perishables, oversized packages, and sensitive materials. Each package can be tagged with specific handling instructions and priority levels."
    },
    {
      question: "Is the system secure?",
      answer: "Yes, our system implements enterprise-grade security measures. All data is encrypted, access is role-based, and we maintain detailed audit trails of all package handling activities to ensure complete accountability."
    },
    {
      question: "Can residents track their package status?",
      answer: "Yes, residents can track their package status through our resident portal or mobile app. They can view when packages arrived, where they're stored, and confirm successful pickup."
    },
    {
      question: "What happens if a package isn't picked up?",
      answer: "Our system includes automated reminders for packages that haven't been picked up. Staff can set custom reminder schedules and escalation procedures for packages that remain unclaimed after a specified period."
    }
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-28">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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
      </div>
    </section>
  )
}

export default Accordion 