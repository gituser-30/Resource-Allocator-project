import React from 'react'
import Advertise from '../components/advertise'
import ProSlider from '../components/ProSlider'
import Popular from '../components/Popular'
import ThingsWeShare from '../components/Thingsshare'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Fotter'

const Home = () => {
  return (
    <main className="home-page">
      <Advertise />
      <ProSlider />
      <Popular />
      <ThingsWeShare />
      <Testimonials />
      <Footer />
    </main>
  )
}

export default Home