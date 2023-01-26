import React, { useState }  from 'react'
import "./nav.css"
import { Link } from "react-router-dom"


const Nav = () => {

    const [selectedLink, setSelectedLink] = useState({
        all:{color:"53ce7b"},
        tech:{},
        clothes:{}
    })

    const handleClick = (e) => {
        setSelectedLink({all:{},tech:{},clothes:{}})
        setSelectedLink({[e.target.id]:{color:"#5ece7b"}})
    }

  return (
    <nav>
        <div className='links'>
            <Link className='link' style={selectedLink.all} id="all" onClick={(e) => handleClick(e)} to="/all">ALL</Link>
            <Link className='link' style={selectedLink.tech} id="tech" onClick={(e) => handleClick(e)} to="/tech">TECH</Link>
            <Link className='link' style={selectedLink.clothes} id="clothes" onClick={(e) => handleClick(e)} to="/clothes">CLOTHES</Link>
        </div>
        <div className="logo">
            <img src="./images/svg3.png" className="logo-box" alt="" />
            <img src="./images/svg19.png" className="logo-arrow" alt="" />
            <img src="./images/svg 21.png" className="logo-point" alt="" />
        </div>
        <div className='dropdowns'>
            <p>$</p>
            <p>Cart</p>
        </div>
    </nav>
  )
}

export default Nav