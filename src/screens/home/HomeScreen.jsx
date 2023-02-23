import React, {useEffect, useState} from 'react'
import "./home.css"
import GET_PRODUCTS from './homeQueries';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, ProductCard } from '../../components';

const HomeScreen = () => {
  const { data, loading} = useQuery(GET_PRODUCTS);
  const [category, setCategory] = useState(0)
  const params = useParams()
  const navigate = useNavigate()

  const products = loading ? null : data.categories[category].products

  useEffect(() => {
    if(!params.category){
      navigate("/all")
    }
    if(params.category === "clothes"){
      setCategory(1)
    }else if(params.category === "tech"){
      setCategory(2)
    }else{
      setCategory(0)
    }
  }, [params, navigate])
  
  return (
    <main>
      {!loading && <Header/>}
      <section>
        {loading ? "Loading..." : products.map(item => (
          <div className='item' key={item.id}>
            <ProductCard 
                brand={item.brand} 
                category={item.category} 
                gallery={item.gallery}
                id={item.id}
                inStock={item.inStock}
                name={item.name}
                prices={item.prices}
            />
          </div>
        )
        )}
      </section>
    </main>
  )
}

export default HomeScreen