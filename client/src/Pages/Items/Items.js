import React, { useEffect, useState } from 'react'
import ProductCard from "../../Components/ProductCard/PorductCard"
import Navbar from '../../Components/Navbar/Navbar'
import axios from "axios"
import { useLocation } from 'react-router-dom'



function Items() {

    const useQuery=()=>{                                     //access query params
        return new URLSearchParams(useLocation().search)
    }
    const query = useQuery().get("title")

    const [product, setProdduct] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/product?title=${query}`)
            .then((responce) => {
                setProdduct(responce.data.data);
            })
            .catch((err) => alert(err.response.data.message) );
    }, []);

    return (
        <div>
            <Navbar />
            <ProductCard product={product} />
        </div>
    )
}

export default Items
