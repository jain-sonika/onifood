import React from "react";
import "./Cart.css";
import axios from "axios";

function CartItemCard({ item, cartId }) {
  //remove qty by 1
  function minusItem(proId, userid, cartid) {
    let object = {
      productId: proId,
      cartId: cartid,
      removeProduct: "-1",
    };
    axios
      .put(`http://localhost:3001/users/${userid}/cart`, object)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => alert(err.response.data.message) );
  }

  //add qty by 1

  function plusItem(proId, userid, cartid) {
    let object = {
      productId: proId,
      cartId: cartid,
      removeProduct: 1,
    };
    axios
      .put(`http://localhost:3001/users/${userid}/cart`, object)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => alert(err.response.data.message) );
  }

  //dlt item

  function dltItem(proId, userid, cartid, name) {
    let object = {
      productId: proId,
      cartId: cartid,
      removeProduct: 0,
    };
    if (window.confirm(`want to remove ${name} ?`)) {
      axios
        .put(`http://localhost:3001/users/${userid}/cart`, object)
        .then((res) => {
          window.location.reload(false);
        })
        .catch((err) => alert(err.response.data.message) );
    } else {
      window.location.reload(false);
    }
  }
  let userData = JSON.parse(localStorage.getItem("user"));

  // function noPro(){
  // alert("you have nothing in your cart")
  // window.location.replace("home")
  // }

  // if(item.length<1){
  //  <h1>No product is added into your cart</h1>
  // }

  return (
    <div className="item-cart">
      {item.map((element, k) => {
        return (
          <div>
            <div className="items-info">
              <div className="product-img">
                <img src={element.productImg} alt="tp" />
              </div>

              <div className="title-of-ele">
                <h2>{element.productId.title}</h2>
              </div>
              <div className="cart-change">
                <i
                  className="fas fa-minus minus"
                  onClick={() =>
                    minusItem(
                      element.productId._id,
                      userData.userId._id,
                      cartId
                    )
                  }
                ></i>
                <input
                  type="text"
                  className="qty"
                  placeholder={element.quantity}
                  disabled
                />
                <i
                  className="fas fa-plus add"
                  onClick={() =>
                    plusItem(element.productId._id, userData.userId._id, cartId)
                  }
                ></i>
              </div>
              <div className="price">
                <h3>₹:{element.productId.price}</h3>
              </div>
              <div className="remove-item">
                <i
                  className="fas fa-trash-alt remove"
                  onClick={() =>
                    dltItem(
                      element.productId._id,
                      userData.userId._id,
                      cartId,
                      element.productId.title
                    )
                  }
                ></i>
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default CartItemCard;
