import React from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

const CartPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();


  //totla price
  const totalPrice = () => {
    try {
      let total =  0
      cart?.map((item) => {
        total = total + item.price
      } )
      return total.toLocaleString("en-US", {
        style:"currency",
        currency:"USD",
      })
    } catch (error) {
      console.log(error)
    }
  }

//delte item 
const removeCartItem = (pid) => {
  try {
    let myCart = [...cart]
    let index = myCart.findIndex((item) => item._id === pid)
    myCart.splice(index, 1)
    setCart(myCart)
    localStorage.setItem("cart",JSON.stringify(myCart))
  } catch (error) {
    console.log(error)
  }
}
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length  
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="co-md-8">
                  <h6>{p.name}</h6>
                  <p>
                  {p.description.substring(0,30)}
                  </p>
                  <p> Price : {p.price}</p>
                  <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center ">
            <h2>Cart Summary</h2>
            <p> 
              Checkout | Payment
              </p>
              <hr />
              <h4>Total : {totalPrice()}</h4>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
