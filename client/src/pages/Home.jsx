import React from 'react'
import Advertise from '../components/advertise'
import Browse from '../components/Browse'
import Popular from '../components/Popular'
import ThingsWeShare from '../components/Thingsshare'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Fotter'

const Home = () => {
  return (
    <main className="home-page">
      <Advertise />
      <Browse />
      <Popular />
      <ThingsWeShare />
      <Testimonials />
      <Footer />
    </main>
  )
}

export default Home