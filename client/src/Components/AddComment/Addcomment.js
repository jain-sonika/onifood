import React from 'react'
import './Comment.css'
import axios from 'axios'
import { useState } from 'react';


function Addcomment({shopId}) {

    const [comment,setComment]=useState("")
    let userData = JSON.parse(localStorage.getItem("user"))

    let options = {}
    options.name = userData.userId.name
    options.comments = comment


   function addcom(shopId){
    axios.post(`http://localhost:3001/comment/${shopId}`,options)
    .then((res)=> {
        alert("Thanks for your review")
        window.location.reload(false)}
   
    )
    .catch((err) => alert(err.response.data.message) )
   }



  return (
    <div className='comment-input'>
        <input type="text"  className='comment-input-area inputGroup' value={comment} onChange={(e) => setComment(e.target.value)} />
        <button className='add-butn btn'  onClick={()=>{addcom(shopId)}}>Add</button>
      
    </div>
  )
}

export default Addcomment
