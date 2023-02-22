import React, { useState }  from 'react'
import "./nav.css"
import { Link } from "react-router-dom"
import { useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CurrencySelector, MiniCart } from '../index' 


const Nav = () => {

    const [isSelectorOpen, setIsSelectorOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [selectedLink, setSelectedLink] = useState({
        all:{},
        tech:{},
        clothes:{}
    })

    const handleClick = (e) => {
        setSelectedLink({all:{},tech:{},clothes:{}})
        setSelectedLink({[e.target.id]:{color:"#5ece7b"}})
        setIsCartOpen(false)
        setIsSelectorOpen(false)
    }

    const {cartItems} = useSelector(state => state.cart)

    const cartQty = cartItems.reduce((total, item) => total + item.qty, 0)

    useEffect(() => {
        if(window.location.pathname === "/cart"){
            setSelectedLink({all:{},tech:{},clothes:{}})
        }
    },[window.location.pathname])


  return (
    <nav>
        <div className='nav'>
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
                    <div onClick={() => {setIsSelectorOpen(!isSelectorOpen) ; setIsCartOpen(false)}} className="nav-currency-selector"> 
                        <p>$</p> 
                        <img style={isSelectorOpen ? {transform: "rotate(180deg)"} : {display:""}} src="../images/arrow.png" className="arrow" alt="" />
                        {isSelectorOpen && <CurrencySelector/>}
                    </div>
                    <div  >
                        <div className="full-cart" onClick={() => {setIsCartOpen(!isCartOpen) ; setIsSelectorOpen(false)}}>
                            <div className="cart">
                                <img src="../images/Vector.png" alt=""/>
                            </div> 
                            <div style={cartQty === 0 ? {display:"none"} : {display:"flex"}} className="cart-amount">
                                <p>{cartQty}</p>
                            </div>
                            <div className="nav-wheels">
                                <img src="../images/wheel.png" alt="" />
                                <img src="../images/wheel.png" alt="" />
                            </div>
                        </div>
                        {isCartOpen && <MiniCart setSelectedLink={setSelectedLink} setIsCartOpen={setIsCartOpen}/>}
                    </div>
            </div>
        </div>
        {isCartOpen && <div onClick={() => setIsCartOpen(false)} className='overlay'></div>}
    </nav>
  )
}

export default Nav