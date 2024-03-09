import React from "react";
import "./Cart.css";
import axios from "axios";
import Chat from "../../Components/Chat/Chat";
import Navbar from "../../Components/Navbar/Navbar";
import { useState, useEffect } from "react";
import CartItem from "../../Components/Cart/CartItemCard";

function Cart() {
  let userData = JSON.parse(localStorage.getItem("user"));

  const [Cart, setCart] = useState({});
  const [item, setItem] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${userData.userId._id}/cart`)
      .then((responce) => {
        if(responce.data.Items.length<1){
          alert("Your Cart is empty 🥹!")
          window.location.replace("/home")
        }
        setCart(responce.data.data);
        setItem(responce.data.Items);
      })
      .catch((err) => alert(err.message));
  }, []);

  //order item

  function order(cartId, userId) {
    let object = {
      cartId: cartId,
    };
    axios
      .post(`http://localhost:3001/users/${userId}/orders`, object)
      .then(() => {
        alert("Order placed 😍");
        window.location.replace("home");
      })
      .catch((err) => alert(err.response.data.message) );
  }

  return (
    <div>
      <Navbar />
      <Chat />

      <div className="cart-de">
        <CartItem item={item} cartId={Cart._id} />

        <div className="dont">
          <h2> Items--{Cart.totalItems}</h2>
        </div>

        <div className="dont">
          <h2> Subtotal--{Cart.totalPrice} </h2>
        </div>


        <button
          className="btn buy-btn"
          id="buy-btn"
          type="submit"
          onClick={() => order(Cart._id, userData.userId._id)}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default Cart;
