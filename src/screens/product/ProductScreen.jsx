import React, {useState, useEffect} from 'react'
import "./product.css"
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import GET_PRODUCT_BY_ID from "./productQueries"
import { ImgGallery } from '../../components'

const ProductScreen = () => {
  const params = useParams()

  const [selectedImg, setSelectedImg] = useState("")
  const [gallery, setGallery] = useState([])
  const [price, setPrice] = useState({
    amount:"",
    symbol:""
  })

  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, { variables: { productId: `${params.id}` } });

  const {attributes, name, brand, description} = !loading && data.product

  console.log(price)

  useEffect(() => {
    !loading && setSelectedImg(data.product.gallery[0])
    !loading && setGallery(data.product.gallery)
    !loading && setPrice({
      amount:data.product.prices[0].amount,
      symbol:data.product.prices[0].currency.symbol
    })
  },[loading])


  return (
    <section>
      <div className='grid-container'>
        <div className='img-gallery'>
          <ImgGallery setSelectedImg={setSelectedImg} gallery={gallery}/>
        </div>
        <div className='lg-gallery-img'>
          <img src={selectedImg} alt="product image" />
        </div>
        <div className='controls-description'>
          <div className='pdp-title'>
            <h2 className='pdp-brand'>{brand}</h2>
            <h2 className='pdp-name'>{name}</h2>
          </div>
          <div className='attributes'>
              {attributes && attributes.map(attribute => (
                  <div key={attribute.id} className='attribute'>
                    {attribute.name.toUpperCase()}
                    <div className='attribute-btns-container'>
                        {attribute.items && attribute.items.map(item => (
                          <div 
                          className='attribute-btn'
                          key={item.id} 
                          style={attribute.id === "Color" 
                          ? {color:item.value, backgroundColor:item.value} 
                          : {color:"black"}} 
                          >
                            {attribute.name === "Size"  ?  item.value : item.displayValue}
                          </div>
                        ))}
                    </div>
                  </div>
              ))}
          </div>
          <div className='pdp-price'>
                  <p>PRICE:</p>
                  {price.symbol}{price.amount}
          </div>
          <div className='pdp-add-to-cart-btn'>
                  ADD TO CART
          </div>
          <div className='description'>
                  {`${description}`}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductScreen