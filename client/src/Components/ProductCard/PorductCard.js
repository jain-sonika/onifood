import React from "react";
import Card from "react-bootstrap/Card";
import "../ShopCard/ShopCard.css";
import axios from "axios";

function ProductCard({ product }) {


//item added to cart
  function addcart(proId, userId) {
    let object = {
      productId: proId,
    };

    axios
      .post(`http://localhost:3001/users/${userId}/cart`, object)
      .then((res) => {
        alert("Item added successfully");
      })
      .catch((err) => alert(err.response.data.message) );
  }

  let userData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="main">
      {product.map((element, k) => {
        return (
          <>
            <Card
              style={{ width: "22rem", border: "none" }}
              className="hove mb-4"
            >
              <Card.Img className="img" src={element.image} />

              <div className="card_body">
                <div className="writey price">
                  <h4 className="mt-2">
                    {element.title ? element.title : "Jungle Safari"}
                  </h4>
                  <span className="s">{4}&nbsp;★</span>
                </div>
                <div className="writey  price" id="addCardBtn">
                  <button
                    className="btn"
                    id="addTocardBtn"
                    onClick={() => addcart(element._id, userData.userId._id)}
                  >
                    Add to cart
                  </button>
                </div>

                <div className="writey  price">
                  <span className="p">₹: {element.price}</span>
                  <span className="p">{element.catogary}</span>
                </div>
              </div>

              <p className="line"></p>

              <div className="last_data d-flex justify-content-between align-items-center">
                <img
                  src="https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp"
                  className="sef"
                  alt=""
                />

                <p>
                  {" "}
                  {Math.ceil(Math.random() * 1000) + 2000} + order placed from
                  here recently
                </p>
                <img
                  src="https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp"
                  className="grap"
                  alt=""
                />
              </div>
            </Card>
          </>
        );
      })}
    </div>
  );
}

export default ProductCard;
