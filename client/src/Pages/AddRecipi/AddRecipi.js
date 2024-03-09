import React, { useState } from 'react'
import axios from "axios"
import Navbar from '../../Components/Navbar/Navbar'
import "./AddRecipi.css"
import Chat from '../../Components/Chat/Chat'

function AddRecipi() {

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [video, setVideo] = useState("")

    const createRecipi = (e) => {
        e.preventDefault()

        const formData = new FormData();

        formData.append("file", image)
        formData.append("fileName", image.name)

        formData.append("file", video)
        formData.append("fileName", video.name)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
        };

        let options = {}
        options.title = title
        options.userId = JSON.parse(localStorage.getItem("user")).userId._id
        options.image = image
        options.video = video

        console.log(options)

        axios.post("http://localhost:3001/recipi", options, config)
            .then(() => {
                alert("Recipie added successfully")
                window.location.replace("/recipie")
            }).catch((err) => {
                alert(err.response.data.message) 
            })
    }

    const displayImage = (e) => {
        e.preventDefault()
        setImage(e.target.files[0])
    }

    const displayVideo = (e) => {
        e.preventDefault()
        setVideo(e.target.files[0])
    }


    return (
        <div id='addrecipibigbix'>
            <Navbar />
            <div className='classname'>
            <div id='recipiBox'>
                <span id='title'>Add your Recipie</span>
                <input type="text" className='input12' placeholder='Title...' value={title} onChange={(e) => setTitle(e.target.value)} />
                <div className='input12' ><span>Image :</span><input type="file"  accept="image/*" onChange={(e) => displayImage(e)} /></div>
                <div className='input12' ><span>Video :</span><input type="file" accept="video/*" onChange={(e) => displayVideo(e)} /></div>
                <button className="btn btn-outline-success" id='btnAddShop' onClick={createRecipi} type="submit">Add</button>
            </div>
            </div>
            <Chat />
        </div>
    )
}

export default AddRecipi
