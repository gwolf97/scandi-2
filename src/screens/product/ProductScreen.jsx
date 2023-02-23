import React, {useState, useEffect} from 'react'
import "./product.css"
import { useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import GET_PRODUCT_BY_ID from "./productQueries"
import { ImgGallery } from '../../components'
import { useDispatch, useSelector} from "react-redux"
import { addToCart } from '../../actions/cartActions'


const ProductScreen = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currency = useSelector(state => state.cart.currency)

  const [selectedImg, setSelectedImg] = useState("")
  const [gallery, setGallery] = useState([])
  const [price, setPrice] = useState({
    amount:"",
    symbol:""
  })
  const [selectedAttributes, setSelectedAttributes] = useState({})
  const [loaded, setLoaded] = useState(false)

  const { data, loading } = useQuery(GET_PRODUCT_BY_ID, { variables: { productId: `${params.id}` }, fetchPolicy: "network-only"});

  const {attributes, name, brand, description, inStock, prices, category, gallery:galleryData} = !loading && data.product

  console.log(data, params.id)

  useEffect(() => {
    setSelectedAttributes({})
    setLoaded(false)
    if(!loading){
      setSelectedImg(galleryData[0])
      setGallery(galleryData)
      setPrice({
        amount:prices[currency].amount,
        symbol:prices[currency].currency.symbol
      })
      const attributesData = !loading && attributes.reduce((acc, attribute) => {
        acc[attribute.name] = attribute.items[0];
        return acc;
    }, {});
      setSelectedAttributes(attributesData);
      setLoaded(true)
    }
  },[loading, navigate, attributes, currency, galleryData, prices, params.id ])

  const handleSelect = (value, id, displayValue, name) => {
    const updateSelected = {
      ...selectedAttributes, 
      [name]:{
        displayValue: displayValue,
        value: value,
        id: id
      }}

      setSelectedAttributes(updateSelected)
  }

  const handleAddToCart = () => {
    const item = {
      selectedAttributes: selectedAttributes,
      attributes:attributes,
      name:name,
      brand:brand,
      gallery:gallery,
      prices:prices,
      id: params.id,
      category: category,
      qty: 1,
    }

    dispatch(addToCart(item))
    
  }

  return (
    <section>
{!loaded && loading ? (<div>loading...</div>) : (
      <div className='grid-container'>
        <div className='img-gallery'>
          <ImgGallery setSelectedImg={setSelectedImg} gallery={gallery}/>
        </div>
        <div className='lg-gallery-img'>
          <img src={selectedImg} alt="product" />
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
                          onClick={() => handleSelect(item.value, item.id, item.displayValue, attribute.name)}
                          key={item.id}
                          style={attribute.id.toLowerCase() === "color" && item.displayValue === selectedAttributes["Color"]?.displayValue
                          ? {
                            color: item.value, 
                            backgroundColor: item.value,
                            width:"32px",
                            height:"32px",
                            fontSize:"0",
                            border:"none",
                            boxShadow: "0 0 0 1px white, 0 0 0 3px #5ECE7B",                 
                          } 
                          : attribute.id.toLocaleLowerCase() === "color"
                          ?{
                            color: item.value, 
                            backgroundColor: item.value,
                            width:"32px",
                            height:"32px",
                            fontSize:"0",
                            border:"none"
                          }
                          : {
                              color:
                              selectedAttributes[attribute.name]?.value === item.value 
                              ? "white" : "black", 
                              border:
                              selectedAttributes[attribute.name]?.value === item.value 
                              ? "5px solid black" : "1px solid black", 
                              backgroundColor: 
                              selectedAttributes[attribute.name]?.value === item.value 
                              ? "black" : "white"}} 
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
          <div 
            className='pdp-add-to-cart-btn'
            onClick={() => handleAddToCart()} 
            style={!inStock 
              ? {background:"lightgray", color:"gray", cursor:"not-allowed"} 
              : {display:"flex"}}
          >
            {inStock ? "ADD TO CART" : "OUT OF STOCK"}
          </div>
          <div className='description'>
            {`${description}`}
          </div>
        </div>
      </div>)}
    </section>
  )
}

export default ProductScreen