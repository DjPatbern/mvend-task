import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import { motion } from "framer-motion";


const Home = () => {
  return (
    <motion.div initial={{ width: 0 }}
    animate={{ width: "100%" }}
    exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}>      
       <Header />
          <div className="home-container">
        <div className="home-flex">
            <div className="details-cont">
                <h1>Hi There 👋 I am Victor Patrick</h1>
                <h3>Welcome To Mvend Posts</h3>
                <p>Where you can read articles and post your own articles</p>
                <Link to="/signup" className="repo-btn link">Login ↡</Link><Link to="/signup" className="git-btn link">Sign Up ↟</Link>
            </div>
            <div>
                <img src="https://bootstrapmade.com/demo/templates/Arsha/assets/img/hero-img.png" alt="" className="home-img" />
            </div>
        </div> 
    </div>
    </motion.div>
  )
}

export default Home
