import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/Header/MetaData";
import {clearErrors, getProduct} from "../../actions/productAction"
import {useSelector, useDispatch} from "react-redux"
import Loader from "../layout/Loader/Loader";
import { useAlert} from "react-alert";



// const product = { 
//     name:"Blue Tshirt",
//     images: [{url: "https://i.ibb.co/DRST11n/1.webp"}],
//     price: "Rs3000",
//     _id: "Rahul"
// }

const Home = () => {
  
  const alert = useAlert()

  const dispatch = useDispatch()
  const {loading,error, products}= useSelector(state=> state.products)

  useEffect(() => {
    dispatch(getProduct())
    if(error){
       alert.error(error)
       dispatch(clearErrors()) 
    } 
  }, [dispatch,error,alert])
   

  return (
    <Fragment> 
      { loading? <Loader/> : (
            <Fragment>

            <MetaData title="Ecommerce"/>

              <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
    
                <a href="#container">
                  <button>
                    Scroll <CgMouse />
                  </button>
                </a>
              </div>
              <h2 className="homeHeading">Featured Products</h2>
    
              <div className="container" id="container">

                {products && products.map(product=>(
                  <ProductCard key={product._id} product={product}/>  
                ))}
              </div>
            </Fragment>
      )}

    </Fragment>
  );
};

export default Home;