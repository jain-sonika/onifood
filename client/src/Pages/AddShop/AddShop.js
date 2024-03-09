import React, { useState } from 'react'
import "./AddShop.css"
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'





function AddShop() {

    const navigation = useNavigate()

    const [image, setImage] = useState("https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg")

    const [shopImage, setShopImage] = useState("")
    const [number, setNumber] = useState("")
    const [name, setName] = useState("")
    const [rating, setRating] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [pincode, setPincode] = useState("")


    const createShop = (e) => {
        e.preventDefault()

        //validations
        if (String(number).length !== 10) { return alert("Please enter valid Number !") }
        if (String(pincode).length !== 6) { return alert("Please enter valid Pincode !") }
        if (rating < 1 || rating > 5) { return alert("Please enter valid rating") }

        let options = {}
        options.name = name
        options.email = JSON.parse(localStorage.getItem("user")).userId.email
        options.contactNo = number
        options.pic = shopImage
        options.rating = rating
        options.address = {
            street, city, pincode
        }
    

        let config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post("http://localhost:3001/shop", options, config)
            .then((res) => {
                localStorage.setItem("shopId", res.data.data._id);
                alert("Shop created Succesfully !")
                navigation("/home", { replace: true })                          //can redirect to add products
            }).catch((err) => {
                alert(err.response.data.message) 
                navigation("/home", { replace: true })
            })
    }

    const displayImage = (e) => {
        e.preventDefault()
        setShopImage(e.target.files[0])

        let imgFile = e.target.files[0]
        var reader = new FileReader();

        var imgtag = document.getElementById("showImage");
        imgtag.title = imgFile.name;

        reader.onload = function (e) {
            setImage(e.target.result);
        };
        reader.readAsDataURL(imgFile);
    }


    return (
        <div id='AddShop'>
            <Navbar />
            <form id='addsShopForm'>
                <input type="file" id='shopImage' style={{ display: "none" }} onChange={(e) => displayImage(e)} />
                <label htmlFor='shopImage'>
                    <img id='showImage' src={image} alt="Error" />
                </label>
                <input className='inputGroup' type="text" placeholder='Shop name...' value={name} onChange={(e) => setName(e.target.value)} />
                <input className='inputGroup' type="tel" placeholder='Mobile number...' value={number} onChange={(e) => setNumber(e.target.value)} />
                <input className='inputGroup' type="number" placeholder='Rating...' value={rating} onChange={(e) => setRating(e.target.value)} />
                <div id="addressBox" >
                    <input className='addressGroup' type="text" placeholder='Street...' value={street} onChange={(e) => setStreet(e.target.value)} />
                    <input className='addressGroup' type="text" placeholder='City...' value={city} onChange={(e) => setCity(e.target.value)} />
                    <input className='addressGroup' type="number" placeholder='Pincode...' value={pincode} onChange={(e) => setPincode(e.target.value)} />
                </div>
                <button className="btn btn-outline-success" id='btnAddShop' onClick={createShop} type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddShop
