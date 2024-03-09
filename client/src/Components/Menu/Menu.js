import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./Menu.css"

function Menu({ sideBurger }) {

    const [shopIdPresent, setShopIdPresent] = useState(null)

    useEffect(() => {
        let check = localStorage.getItem("shopId")

        if (check === "undefined") { setShopIdPresent(true) }
        else { setShopIdPresent(false) }
    }, [])


    return (
        <div className='menu' style={(sideBurger) ? { right: "-17rem" } : { right: "0rem" }}>
            <ul>
                <li><NavLink to='/home'>Home</NavLink></li>
                <li><NavLink to='/recipie'>Chef's Special</NavLink></li>
                {(shopIdPresent) ? <li><NavLink to='/addshop'>Add Shop</NavLink></li> : <li><NavLink to='/addproduct'>Add Product</NavLink></li>}
                <li><NavLink to='/cart'>Cart</NavLink></li>
                <li><NavLink to='/About'>About us</NavLink></li>
                <li><NavLink to='/'>LogOut</NavLink></li>
            </ul>
        </div>
    )
}

export default Menu