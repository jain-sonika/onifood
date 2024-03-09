import React from "react";
import "./comment.css";
import "../ShopCard/ShopCard.css";
import axios from 'axios';

function Comment({ comment }) {

  function deletecomment(commentid, a, b) {
    console.log(a, b)

    if (a !== b) return alert("can't delete other person comment")
    axios.put(`http://localhost:3001/comment/${commentid}`)
      .then((res) => {
        alert("your comment deleted successfully")
        window.location.reload(false)
      }

      )
      .catch((err) => alert(err.response.data.message) )
  }
  let userData = JSON.parse(localStorage.getItem("user"))

  return (
    <div className="comment-div">
      {comment.map((element, x) => {
        return (
          <div className="sig-div">
            <div className="card_body">
              <div className="writey price">
                <div className="comment-user">
                  <img
                    className="comment-pic"
                    src="https://b.zmtcdn.com/web/assets/2267aec184e096c98c46a1565a5563661664945464.png?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A"
                    alt=""
                  />
                  <h4 className="mt-2">{element.name}</h4>
                </div>

                <div className="add-btn">
                  <span className="d">{element.date}</span>
                  <button className="btn btn-outline-success" type="submit">
                    <i className="fa-solid fa-comment"></i>
                  </button>
                  <button className="btn btn-outline-success dle" type="submit" onClick={() => deletecomment(element._id, element.name, userData.userId.name)}>
                    <i className="fa-solid fa-trash "></i>
                  </button>
                </div>
              </div>

              <div className="writey  price">
                <span className="p">comment:-{element.comments}</span>
              </div>
            </div>



            <p className="line"></p>
          </div>
        );
      })}
    </div>
  );
}

export default Comment;