import './App.css';
import Login from '../src/Pages/Login/Login';
// import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from '../src/Pages/Resister/Resister';
import Items from './Pages/Items/Items';
import AddShop from './Pages/AddShop/AddShop';
import AddProduct from './Pages/AddProducts/AddProduct';
import Home from './Pages/HomePage/Home';
import ShopProduct from "./Pages/shop-product/ShopProduct"
import Cart from './Pages/Cart/Cart';
import About from './Pages/About/About';
import Recipie from './Pages/Recipie/Recipie';
import AddRecipi from './Pages/AddRecipi/AddRecipi';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='items' element={<Items />} />
        <Route path='addshop' element={<AddShop />} />
        <Route path='addproduct' element={<AddProduct />} />
        <Route path='cart' element={<Cart />} />
        <Route path='shopproduct' element={<ShopProduct />} >
          <Route path=':shopId' element={<ShopProduct />} />
        </Route>
        <Route path='about' element={<About />} />
        <Route path='recipie' element={<Recipie />} />
        <Route path="addrecipi" element={<AddRecipi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
