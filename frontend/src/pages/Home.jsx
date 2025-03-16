import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Feature from '../components/Feature'
import About from '../components/About'
import Accordion from '../components/Accordion'
import Demo from '../components/Demo'
import Chatbot from '../components/Chatbot'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Feature/>
      <About/>
      <Demo/>
      <Accordion />
      <Chatbot />
    </div>
  )
}

export default Home