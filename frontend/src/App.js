import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from "./component/layout/Footer/Footer"
import WebFont from "webfontloader"
import React from 'react';
import Home from './component/Home/Home.js'
import ProductDetails from './component/Product/ProductDetails';
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp';
import store from './store'
import { loadUSer } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux';
import Header1 from './component/layout/Header/Header1';
import Profile from './component/User/Profile.js';
import UpdateProfile from './component/User/UpdateProfile.js'
import UpdatePassword from './component/User/UpdatePassword.js'
import Cart from './component/Cart/Cart.js'
import Shipping from './component/Cart/Shipping.js'
import ConfirmOrder from './component/Cart/ConfirmOrder.js'
import Payment from './component/Cart/Payment.js'
import axios from 'axios';
import { useState } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess.js'
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails.js'
import Dashboard from './component/Admin/Dashboard';

function App() {

  const {user,isAuthenticated} = useSelector(state=>state.user)
  const {shippingInfo} = useSelector((state)=>state.cart)

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey(){
    const {data} = await axios.get('/api/v1/stripeapikey')

    setStripeApiKey(data.stripeApiKey)
  }


  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"]
      }
    })

    store.dispatch(loadUSer())

    getStripeApiKey()
   },[])
   
  return (
    <Router>
      <Header1/>
       {/* <Header/> */}
       {isAuthenticated ?( <UserOptions user={user}/>):<UserOptions />}
        <Routes>
            <Route exact path='/' element ={<Home/>}/>
            <Route exact path='/product/:id' element ={<ProductDetails/>}/>
            <Route exact path='/products' element ={<Products/>}/>
            <Route path='/products/:keyword' element ={<Products/>}/>
            <Route exact path='/search' element ={<Search/>}/>
            <Route exact path = "/account" element={<Profile />}/>
            <Route exact path='/me/update' element={<UpdateProfile/>}/>
            <Route exact path = 'password/update' element={<UpdatePassword/>}/>
            <Route exact path='/login' element ={<LoginSignUp/>}/>
            <Route exact path='/cart' element={<Cart/>}/>
            <Route exact path='/shipping' element={<Shipping/>}/>
            <Route exact path='/order/confirm' element={<ConfirmOrder/>}/>
            {stripeApiKey?( 
              <Route exact path='/process/payment' element={ 
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment/>
                </Elements>}
           />
            ):""}
            <Route exact path = '/success' element={<OrderSuccess/>}/>
            <Route exact path = '/orders' element={<MyOrders/>}/>
            <Route exact path = '/order/:id' element={<OrderDetails/>}/>
            <Route exact path = '/admin/dashboard' element={<Dashboard/>}/>
                       
        </Routes>
       <Footer/>
    </Router>
    
  );
}

export default App;
