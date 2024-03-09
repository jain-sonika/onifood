import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../../Components/Menu/Menu'
import "./Navbar.css"


function Navbar() {



    //SideBurger

    const [sideBurger, SetSideBurger] = useState(true)

    const slideStart = () => {
        SetSideBurger(false)
    }
    const slideEnd = () => {
        SetSideBurger(true)
    }


    const [searchName, setSearchName] = useState("")


    const searchItems = (e) => {
        e.preventDefault()
        if (searchName === "") { return alert("Error : Search for food !") }
        window.location.replace(`/items?title=${searchName}`, { replace: true })
    }

    let userData = JSON.parse(localStorage.getItem("user"))

    return (
        <div className='navbarBigBox'>
            <nav className="navbar navbar-expand-lg">
                <a href="/home">
                    <div className="navbarIcons">
                        <img className='nav-logo' src="https://i.pinimg.com/originals/b1/fc/bb/b1fcbbfd4fb8116c714ef352bb39bbaf.jpg" alt="img" />
                        <span id='logo'>OniFood</span>

                    </div>
                </a>
                <form className="d-flex" id='navbarNav' role="search">
                    <input className="form-control me-2" type="search" placeholder={"📍"+userData.userId.address.city} aria-label="Search" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                    <button className="btn btn-outline-success" onClick={searchItems} type="submit" >Search</button>
                </form>
                <div id="navbarDP">
                    <img id="navbarProfile" src={userData.userId.profileImage} alt="Loading" />
                    <span>{userData.userId.name}</span>
                    {sideBurger ? <i className="fa-solid fa-bars barger" onClick={slideStart}></i> : <i className="fa-solid fa-xmark" onClick={slideEnd}></i>}
                </div>
            </nav>
            <Menu sideBurger={sideBurger} />
        </div>
    )
}

export default Navbar