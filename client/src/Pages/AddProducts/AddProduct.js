import React, {useState } from 'react'
import "../AddShop/AddShop.css"
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function AddProduct() {

    const navigation = useNavigate()

    const [image, setImage] = useState("https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg")

    const [shopImage, setShopImage] = useState("")
    const [number, setNumber] = useState("")
    const [name, setName] = useState("")
    const [rating, setRating] = useState("")

    const createShop = (e) => {
        e.preventDefault()

        let options = {}
        options.shopId = localStorage.getItem("shopId")
        options.title = name
        options.price = number
        options.image = shopImage
        options.catogary = rating

        let config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post("http://localhost:3001/product", options, config)
            .then(() => {
                alert("Product has added 😎")
                navigation(`/shopproduct/${options.shopId}`, { replace: true })     //window.location.replace(`/${a}`)                     //can redirect to add products
            })
            .catch((err) => { alert(err.response.data.message)  })
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
                <input className='inputGroup' type="text" placeholder='Title...' value={name} onChange={(e) => setName(e.target.value)} />
                <input className='inputGroup' type="number" placeholder='Rate in Indian Rupees...' value={number} onChange={(e) => setNumber(e.target.value)} />
                <input className='inputGroup' type="text" placeholder='Category...' value={rating} onChange={(e) => setRating(e.target.value)} />
                <button className="btn btn-outline-success" id='btnAddShop' onClick={createShop} type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddProduct
