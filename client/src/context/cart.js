import { useState,  useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //to initially get items in cart
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart")
    if (existingCartItem) setCart(JSON.parse(existingCartItem))
  } ,[])

  //default axios

  
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };