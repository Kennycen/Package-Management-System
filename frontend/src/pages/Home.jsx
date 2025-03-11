import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Feature from '../components/Feature'
import About from '../components/About'
import Accordion from '../components/Accordion'
import Demo from '../components/Demo'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Feature/>
      <About/>
      <Demo/>
      <Accordion />
    </div>
  )
}

export default Home