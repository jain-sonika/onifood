*OniFood (Food delivery application)*

1. User can resister by giving his/her credentials (name, email. profile image, password, address, mobile number, etc.). If user account create sucessfully then user directly redirect to login page.

2. User have to enter email and password for login. After login sucessfully user directly redirect to home page.

3.Home page contain navbar from which user can search his favourite food form any restorent.  and it has a side slider which will redirect user into different pages. 

4. Home page contain two carousel and all food shop after clicking on a particular shop user redirect to shop page where user see the foods of that shop.

5.Inside shop page it has 2 option review and product user can add product into his/her cart and can also give shop review and can delete his/her own comment.

6.Form slider user can go into cat and can manupulate order quantity and buy.

7.if user have his shop he can add product from side slider otherwise can add shop it is conditional. (user see only one button add shop/add product based on condition)

8.this application also contain a video render page it is chef,s special ,three user can watch videos and also can add his own.

9.application has its own chat bot,about section contain Developers data,and logout is also integrated into the application.


=> Models

1.User Model :
```yaml
{
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    phone: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profileImage:String,
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        pincode: { type: Number, require: true, trim: true }
    }
}
```
2.Shop Model :
```yaml
{
    name: { type: String, required: true },
    email: { type: String },
    contactNo: { type: String },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        pincode: { type: Number, require: true, trim: true }
    },
    rating: { type: Number },
    pic: { type: String }
}
```
3.Cart Model : 
```yaml
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        items:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product"
                },
                quantity:Number,
                productImg:String,
                productName:String,

            }
        ],
        totalPrice:Number,
        totalItems:Number
    }
    
```

4. Order Model : 

```yaml
{
    userId: { type: ObjectId, ref: "User", require: true },
  items: [{
    productId: { type: ObjectId, ref: "Product", require: true },
    quantity: { type: Number, require: true }
  }],
  totalPrice: { type: Number, require: true },
  totalItems: { type: Number, require: true },
  totalQuantity: { type: Number, require: true },
  cancellable: { type: Boolean, default: true },
  status: { type: String, default: 'pending', enum: ["pending", "completed", "canceled"], trim: true },
  deletedAt: { type: Date },
  isDeleted: { type: Boolean, default: false }
}
```

5. Comment Model : 
```yaml
{
    name: {
        type: String,
        required: true,
    },
    shopId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    isDeleted: { type: Boolean, default: false },
    comments: {
        type: String,
        required: true
    }
}
```
6. Recipe Model : 
```yaml
{
    title: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    image: String,
    video: String
}

```
APIs :

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

