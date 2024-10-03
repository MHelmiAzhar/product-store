import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import Card from '../components/Card'
const HomePage = () => {
  const { getData, products } = useProductStore()
  useEffect(() => {
    console.log('Fetching products...')
    getData()
  }, [getData])

  useEffect(() => {
    console.log('Updated products:', products)
  }, [products])

  return (
    <div>
      <p className="text-gray-300 flex justify-center w-full my-6 font-semibold text-xl">
        Current Product
      </p>
      <div className="lg:grid grid-cols-3  mx-40 gap-8 justify-center">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-gray-300 flex justify-center gap-2 ">
          No Product found{' '}
          <Link to={'/create'} className="font-bold">
            {' '}
            Create Product
          </Link>
        </div>
      )}
    </div>
  )
}

export default HomePage
