import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, applyMiddleware } from "redux";
import { productReducer,productDetailsReducer, newReviewReducer } from "./reducers/productReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { profileReducer, userReducer } from './reducers/userReducer';
import {cartReducer} from './reducers/cartReducer'
import {myOrdersReducer, newOrderReducer, orderDetailsReducer} from './reducers/orderReducer'


const reducer = combineReducers({
  products:productReducer,
  productDetails : productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview : newReviewReducer
});


let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},  
  }
};

const middleware = [thunk];

const store = configureStore(
  {reducer},
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store
