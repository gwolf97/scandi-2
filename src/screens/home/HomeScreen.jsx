import React, {useEffect, useState} from 'react'
import "./home.css"
import GET_PRODUCTS from './homeQueries';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components';

const HomeScreen = () => {
  const {error, data, loading} = useQuery(GET_PRODUCTS);
  const [category, setCategory] = useState(0)
  const params = useParams()
  const navigate = useNavigate()

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
  }, [params])
  
  return (
    <main>
      {!loading && <Header/>}
      <section>
        {loading ? "Loading..." : data.categories[category].products.map(item => (
          <div className='item' key={item.id}>
            card
          </div>
        )
        )}
      </section>
    </main>
  )
}

export default HomeScreen