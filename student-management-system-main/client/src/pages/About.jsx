import React from 'react'

import Hero from '../Components/Hero'
import heroimage from '../assets/hero1.svg';
import Footer from '../Components/Footer';

function About() {
  return (
    <>
<Hero title={" "} imageUrl={heroimage} dec={"About Us"}/>
    <Footer />
    </>
  )
}

export default About