import React from 'react'
import "./home.css"
import GET_PRODUCTS from './homeQueries';
import { useQuery } from '@apollo/client';

const HomeScreen = () => {
  const {error, data, loading} = useQuery(GET_PRODUCTS);

  console.log(data)

  return (
    <section>
      <div>HomeScreen</div>
    </section>
  )
}

export default HomeScreen