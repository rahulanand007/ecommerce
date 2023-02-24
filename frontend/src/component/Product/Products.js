import React, { Fragment ,useEffect , useState} from 'react'
import "./Products.css"
import {useSelector, useDispatch} from "react-redux"
import { clearErrors, getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import { useParams } from 'react-router-dom'
import ProductCard from '../Home/ProductCard'
import { useAlert } from 'react-alert'
import Pagination from "react-js-pagination"
import { Slider, Typography } from '@mui/material'
import MetaData from '../layout/Header/MetaData'

const categories = [
    "laptop",
    "Footwear",
    "phone",
    "Attire",
    "Tops",
    "Camera"
]


const Products = () => {
    const params = useParams()
    const keyword = params.keyword

    const alert = useAlert()
    const dispatch = useDispatch()
    
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0,100000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState()


    const priceHandler = (event, newPrice)=>{
        event.preventDefault()
        setPrice(newPrice)
    }

    const ratingsHandler=(e,newRating)=>{
        setRatings(newRating)
    }

    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }

    
    const {loading, error, products, productsCount, resultPerPage, filteredProductsCount}= useSelector(state=> state.products)

    useEffect(() => {
        dispatch(getProduct(keyword,currentPage,price,category,ratings))
     if(error){
        alert.error(error)
        dispatch(clearErrors())
     }
     
    }, [dispatch,alert,error,keyword,currentPage,price,category,ratings])
    
    let count = filteredProductsCount

  return (
    <Fragment>
        {loading?<Loader/>:(
            <Fragment>
                <MetaData title="Products"/>
                <h2 className='productsHeading'>Products</h2>
                <div className='products'>
                    {products&& products.map((product)=>(
                        <ProductCard key={product._id} product={product}/>
                    ))}
                </div>

                <div className='filterBox'>
                        <Typography>Price</Typography>
                        <Slider
                          value={price}
                          onChange={priceHandler}
                          valueLabelDisplay="auto"
                          aria-labelledby='range-slider'
                          min={0}
                          max={100000}
                        />

                        <Typography>Categories</Typography>
                        <ul className='categoryBox'>
                            {categories.map((category)=>(
                                <li
                                className='category-link'
                                key={category}
                                onClick={()=>setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset className='legend'>
                            <Typography>Ratings Above</Typography>
                            <Slider
                            value={ratings}
                            onChange={ratingsHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby='continous-slider'
                            min={0}
                            max={5}
                            />

                        </fieldset>
                </div>

                {count<=resultPerPage? "":(
                    <div className='paginationBox'>
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass='page-item'
                      linkClass='page-link'
                      activeClass='pageItemActive'
                      activeLinkClass='pageLinkActive'
                    />
                </div>
                )}
            </Fragment>
        )}
    </Fragment>
  )
}

export default Products