import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const ProductDetail = () => {
    const params =useParams()
    const [product,setProduct] = useState({})
    const [relatedProducts,setRelatedProducts] = useState([])
    const navigate = useNavigate()

    //initial details
    useEffect(() => {
        if(params?.slug) getProduct()
    },[params?.slug])
    const getProduct = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }

    //similar product
    const getSimilarProduct = async (pid,cid) => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
        <div className="row container mt-2">
            <div className="col-md-6">
            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name}
            height="300"
            width={"350px"} />

            </div>
            <div className="col-md-6">
                <h1 className='text-center'>Product Details</h1>
                <h5>Name : {product.name}</h5>
                <h5>Description : {product.description}</h5>
                <h5>Price : {product.price}</h5>
                <h5>Category : {product.category?.name}</h5>
                <button className='btn btn-secondary ms-1'> ADD TO CART</button>

            </div>
        </div>
        <hr/>
        <div className="row container">
            <h2>Similar Product</h2>
            {relatedProducts.length < 1 && <p className='text-center'>No Similar Product Found</p>}
        {relatedProducts?.map((p) => (
              
                
              <div className="card m-2"  style={{ width: "18rem" }}>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text"> {p.description.substring(0,30)}</p>
                  <p className="card-text">$ {p.price}</p>
                 <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)} >More Details</button>
                 <button className='btn btn-secondary ms-1'>Add To Cart </button>

                </div> 
                </div>

))}    
                   </div>
    </Layout>
  )
}

export default ProductDetail
