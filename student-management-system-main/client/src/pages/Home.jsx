import React from 'react'
import Hero from '../Components/Hero'
import Department from '../Components/Department'
import Message from '../Components/Message'
import Bio from '../Components/Bio'
import heroimage from '../assets/hero1.svg';
import AboutImg from '../assets/about.svg';
import Footer from '../Components/Footer'

function Home() {
  return (
<>
<Hero title={"Welcome To"} imageUrl={heroimage} dec={"Student Hub"}/>
<Bio imageUrl={AboutImg}/>
<Department />
<Message />
<Footer />a
</>
  )
}

export default Home