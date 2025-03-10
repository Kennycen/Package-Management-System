import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Feature from '../components/Feature'
import Footer from '../components/Footer'
import About from '../components/About'
import Accordion from '../components/Accordion'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Feature/>
      <About/>
      <Accordion />
    </div>
  )
}

export default Home