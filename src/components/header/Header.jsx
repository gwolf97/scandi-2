import React from 'react'
import { useParams } from 'react-router-dom'
import "./header.css"

const Header = () => {
    const params = useParams()

  return (
    <div className='container'>
        <h1>
            {params.category === "all" ? "All Products" : params.category.toUpperCase()}
        </h1>
    </div>
  )
}

export default Header