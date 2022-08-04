import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/Header/MetaData";
import {getProduct} from "../../actions/productAction"
import {useSelector, useDispatch} from "react-redux"




// const product = {
//     name:"Blue Tshirt",
//     images: [{url: "https://i.ibb.co/DRST11n/1.webp"}],
//     price: "Rs3000",
//     _id: "Rahul"
// }

const Home = () => {
  
  const dispatch = useDispatch()
  const {loading,error, products,productCount}= useSelector(state=> state.products)

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch])
  

  return (
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
              <ProductCard product={product}/>
            ))}
          </div>
        </Fragment>
  );
};

export default Home;