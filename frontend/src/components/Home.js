import React from 'react'
import Navbar from '../containers/Navbar'
import {Link} from "react-router-dom"
const Home = () => {
    
    return (
        <div>
           <Navbar/>
           <div className="home-hero">
            <h1>What's Happening</h1>
            <h4>New to Warbler?</h4>
            <Link to="/signup" className="btn btn-primary">
                Sign up here
            </Link>
           </div>
        </div>
    )
}

export default Home;