import React, { useState }  from 'react'
import "./nav.css"
import { Link } from "react-router-dom"
import {useSelector} from "react-redux"


const Nav = () => {

    const [selectedLink, setSelectedLink] = useState({
        all:{},
        tech:{},
        clothes:{}
    })

    const handleClick = (e) => {
        setSelectedLink({all:{},tech:{},clothes:{}})
        setSelectedLink({[e.target.id]:{color:"#5ece7b"}})
    }

    const {cartItems} = useSelector(state => state.cart)

    const cartQty = cartItems.reduce((total, item) => total + item.qty, 0)

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
        <div className="nav-controls">
                <div
                    className="nav-currency-selector"
                > 
                    $ 
                    <img src="../images/arrow.png" className="arrow" alt="" />
                </div>
                <div className="full-cart" >
                    <div className="cart">
                        <img src="../images/Vector.png" alt=""/>
                    </div> 
                    <div className="cart-amount">
                        <p>{cartQty}</p>
                    </div>
                    <div className="nav-wheels">
                        <img src="../images/wheel.png" alt="" />
                        <img src="../images/wheel.png" alt="" />
                    </div>
                </div>
        </div>
    </nav>
  )
}

export default Nav