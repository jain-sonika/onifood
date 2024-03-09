import React from "react";
import Card from "react-bootstrap/Card";
import "./ShopCard.css";

function ShopCard({ resto }) {

  function prodd(a) {
    //a.preventDefault()
    // localStorage.setItem('shopid', JSON.stringify(a));
    window.location.replace(`shopproduct/${a}`)
  }

  return (
    <div className="main">
      {resto.map((element, k) => {
        return (
          <>
            <div onClick={() => prodd(element._id)}>
              <Card
                style={{ width: "22rem", border: "none" }}
                className="hove mb-4" key={k}
              >
                <Card.Img className="img" src={element.pic} />

                <div className="card_body">
                  <div className="writey price">
                    <h4 className="mt-2">
                      {element.name ? element.name : "Jungle Safari"}
                    </h4>
                    <span className="s">{element.rating}&nbsp;★</span>
                  </div>

                  <div className="writey  price">
                    <span className="p">{element.address.street}-{element.address.city}</span>
                    <span className="p">{element.address.pincode}</span>
                  </div>
                  <div>
                    contact:{element.contactNo}
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
            </div>
          </>
        );
      })}
    </div>
  );
}

export default ShopCard;
