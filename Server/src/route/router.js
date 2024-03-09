const express = require("express")
const router = express.Router()
const { createShop, getShop, UpdateeShop } = require('../controller/shopController')
const { createProduct, getProduct, updateProuct, getProductbyShopId } = require("../controller/productController")
const { createUser, loginUser, getUser, updateUser } = require("../controller/userController")
const { createCart, updateCart, getCart, deleteCart } = require("../controller/cartcontroller")
const { createOrder, updateOrder } = require("../controller/ordercontroller")
const { newComment, getComments, deleteComment } = require("../controller/commentcontroller")
const { createRecipi, getRecipi } = require("../controller/recipiController")
//====================== User Api =========================//

router.post("/user", createUser)

router.post("/loginUser", loginUser)

router.get("/user/:userId", getUser)

router.put("/user/:userId", updateUser)

//===================== Shop APIs ==========================//

router.post("/shop", createShop)

router.put("/shop/:shopId", UpdateeShop)

router.get("/shop", getShop)


//===================== Product APIs ==========================//

router.post("/product", createProduct)

router.put("/product/:productId", updateProuct)

router.get("/product", getProduct)

router.get("/product/:shopId", getProductbyShopId)


//===================== Card APIs ==========================//

router.post("/users/:userId/cart", createCart)

router.put("/users/:userId/cart", updateCart)

router.get("/users/:userId/cart", getCart)

router.delete("/users/:userId/cart", deleteCart)


//===================== Order APIs ==========================//

router.post("/users/:userId/orders", createOrder)

router.put("/users/:userId/orders", updateOrder)

//==================== comment =============================//

router.post("/comment/:shopId", newComment)

router.get("/comment/:shopId", getComments)

router.put("/comment/:commentId", deleteComment)


//===========================Recipi===========================//

router.post("/recipi", createRecipi)

router.get("/recipi", getRecipi)





module.exports = router;