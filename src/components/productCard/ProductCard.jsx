import React,{ useState } from 'react'
import "./productCard.css"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProductCard = ({brand, gallery, category, id, inStock, name, prices}) => {

  const [showCartBtn, setShowCartBtn] = useState(false)

  const currency = useSelector(state => state.cart.currency)

  const navigate = useNavigate()

  const handleMouseOver = () => {
    setShowCartBtn(true)
  }

  const handleMouseOut = () => {
    setShowCartBtn(false)
  }

  const handleClick = () => {
    navigate(`/${category}/${id}`)
  }

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className='card'>
        <div onClick={handleClick} className='img-container'>
          {!inStock && (<div className='out-of-stock-overlay'>out of stock</div>)}
          <img src={gallery[0]} alt={name} />
        </div>
        {showCartBtn && inStock && (
          <div className='card-cart-button'>
            <img src="./images/white-cart.png" alt="cart" />
              <div className="wheels">
                <img src="./images/white-wheel.png" alt="wheel" />
                <img src="./images/white-wheel.png" alt="wheel" />
              </div>
          </div>
        )}
        <div className='title-price-container'>
          <p onClick={handleClick} className='card-title'>{brand} {name}</p>
          <p className='card-price'>{prices[currency].currency.symbol}{prices[currency].amount}</p>
        </div>
    </div>
  )
}

export default ProductCard