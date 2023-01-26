import React from 'react'
import { Link } from "react-router-dom"


const Nav = () => {
  return (
    <nav>
      <Link to="/all">All</Link>
      <Link to="/tech">Tech</Link>
      <Link to="/clothes">Clothes</Link>
    </nav>
  )
}

export default Nav