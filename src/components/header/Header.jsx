import React from 'react'
import { useParams } from 'react-router-dom'
import "./header.css"
import {capitalizeFirstLetter} from "../../utils/index"

const Header = (title, isCapital) => {
    const params = useParams()

  return (
    <div className='container'>
        <h1>
            { params.category === "all" 
            ? "All Products" 
            : window.location.pathname === "/cart" 
            ? "CART" 
            : capitalizeFirstLetter(params.category) }
        </h1>
    </div>
  )
}

export default Header