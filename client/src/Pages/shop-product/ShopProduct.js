import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Chat from "../../Components/Chat/Chat";
import ProductCard from "../../Components/ProductCard/PorductCard";
import "./shop.css";
import Comment from "../../Components/CommentCard/Comment";
import Addcomment from "../../Components/AddComment/Addcomment";




function ShopProduct() {
  const { shopId } = useParams();
  const [product, SetProduct] = useState([]);
  const [shop, Setshop] = useState([]);
  const [address, Setaddress] = useState("");
  const [comment, SetComment] = useState([]);
  const [reviewBox, setRviewBox] = useState({ display: "none" });
  const [productBox, setproductBox] = useState({});

  function showproduct() {
    setRviewBox({ display: "none" });
    setproductBox({ display: "contents" });
  }

  function ShowReview() {
    setproductBox({ display: "none" });
    setRviewBox({ display: "contents" });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/product/${shopId}`)
      .then((responce) => {
        SetProduct(responce.data.data);
        Setshop(responce.data.shopDetail);
        Setaddress(responce.data.address);
      })
      .catch((err) => alert(err.response.data.message) );

  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/comment/${shopId}`)
      .then((responce) => {
        SetComment(responce.data.data);
        console.log(responce.data.data);
      })
      .catch((err) =>alert(err.response.data.message) );
  }, []);

  return (
    <div>
      <Navbar />
      <div className="big-div">
        <img className="shop-img" id="shpimg" src={shop.pic} alt="shopImg" />

        <div className="card_body">
          <div className="writey price">
            <h1 className="mt-2">{shop.name ? shop.name : "Jungle Safari"}</h1>
            <span className="s">{shop.rating}&nbsp;★</span>
          </div>

          <div>
            <h4>contact:{shop.contactNo}</h4>
            <div>
              <h4>
                <span className="p">
                  {address.street}-{address.city}
                </span>
                <span className="p">---{address.pincode}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <h5>
          <span  onClick={showproduct}>Product</span>
        </h5>
        <h5>
          <span className="nchild" onClick={ShowReview}>
            Reviews
          </span>
        </h5>
      </div>

      <p className="line"></p>

      <Chat />

      <div className="product-box" style={productBox}>
        <ProductCard product={product} />
      </div>

      <div className="review-box" style={reviewBox}>
        {" "}
        <Comment comment={comment}/>

        <Addcomment shopId={shopId} />
      </div>
    </div>
  );
}

export default ShopProduct;
