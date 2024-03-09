const userModel = require("../model/userModel")
const { isValidObjectId } = require("mongoose")
const { uploadFile } = require("../aws")
const jwt = require("jsonwebtoken")
const axios = require("axios")
const { validateEmail, validPassword, isValidMobile, isValidname } = require("../validation/validation")
const shopMode = require("../model/shopMode")



//------------------- User Resister API ----------------------//

const createUser = async (req, res) => {

    try {
        let data = req.body
        data = JSON.parse(JSON.stringify(data));

        let files = req.files;

        let arrOfKeys = Object.keys(data)
        if (arrOfKeys.length == 0) { return res.status(400).send({ status: false, message: "Please enter your details !" }) }
        if (files.length == 0) { return res.status(400).send({ status: false, message: "Please upload profileImage !" }) }


        for (let i = 0; i < arrOfKeys.length; i++) {
            if (arrOfKeys[i] == "address") { continue }
            data[arrOfKeys[i]] = data[arrOfKeys[i]].trim()
        }

        let { name, email, phone, password } = data

        if (!name) { return res.status(400).send({ status: false, message: "Please enter name !" }) }

        if (!email) { return res.status(400).send({ status: false, message: "Please enter email !" }) }
        if (!validateEmail(email)) { return res.status(400).send({ status: false, message: "Please enter valid email !" }) }
        let dataByEmail = await userModel.findOne({ email: email })
        if (dataByEmail) { return res.send({ status: false, message: "Email already exits !" }) }

        if (!phone) { return res.status(400).send({ status: false, message: "Please enter phone !" }) }
        if (!isValidMobile(phone)) { return res.status(400).send({ status: false, message: "Please enter valid phone !" }) }
        let dataByPhone = await userModel.findOne({ phone: phone })
        if (dataByPhone) { return res.status(400).send({ status: false, message: "Mobile Number already exits !" }) }

        if (!password) { return res.status(400).send({ status: false, message: "Please enter password !" }) }
        if (!validPassword(password)) { return res.status(400).send({ status: false, message: "Please enter valid password !" }) }


        data.profileImage = await uploadFile(files[0])

        const result = await userModel.create(data)

        let cartData = {
            userId: result._id,
            items: [],
            totalPrice: 0,
            totalItems: 0
        }
        await CartModel.create(cartData)

        res.status(201).send({ status: true, message: "User created successfully", data: result })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


const loginUser = async (req, res) => {

    try {
        let data = req.body

        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please enter Email Address and Password to Login yourself" }) }

        let { email, phone, password } = data;

        if (!(email || phone)) { return res.status(400).send({ status: false, message: "Please enter your Email address or Mobile number" }) }

        if (!password) { return res.status(400).send({ status: false, message: "Please Enter Password" }) }

        if (email) {
            if (!validateEmail(email)) { return res.status(400).send({ status: false, message: "Provided Email Address is not in valid" }) }
        }

        if (phone) {
            if (!isValidMobile(phone)) { return res.status(400).send({ status: false, message: "Please Enter Valid Phone Number" }) }
        }

        let userExist = await userModel.findOne({ $or: [{ email: email }, { phone: phone }] })

        if (!userExist) { return res.status(404).send({ status: false, message: "User doesn't exists !" }) }

        if (userExist.password != password) { return res.status(400).send({ status: false, message: "Please enter correct password" }) }

        let token = jwt.sign({ userId: userExist._id, email: userExist.email, phone: userExist.phone }, "zomato", { expiresIn: "1096h" })

        let option = {
            userId: userExist,
            token: token,
        }

        let shopId = await shopMode.findOne({ email: email })
        if (shopId) { option.shopId = shopId._id }

        return res.status(200).send({ status: true, message: "User login successfull", data: option })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


//------------------- Get User API ----------------------//

const getUser = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "userId is not valid" }) }

        const user = await userModel.findOne({ _id: userId })
        if (!user) { return res.status(404).send({ status: false, message: "user not found" }) }
        return res.status(200).send({ status: true, message: "User profile details", data: user })

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}




//------------------- Update User API ----------------------//

const updateUser = async (req, res) => {
    try {
        let userId = req.params.userId

        if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "Please enter valid userId" }) }

        let user = await userModel.findById(userId)
        if (!user) { return res.status(404).send({ status: false, msg: "User not found !" }) }

        let data = req.body;
        let files = req.files;

        let arrOfKeys = Object.keys(data)
        if (arrOfKeys.length == 0 && !files) { return res.status(400).send({ status: false, msg: "Please enter your details !" }) }

        if (arrOfKeys.length > 0) {
            for (let i = 0; i < 1; i++) {
                data[arrOfKeys[i]] = data[arrOfKeys[i]].trim()
            }
        }

        let { name, email, phone, password } = data

        if (name || name == "") {
            if (isValidname(name)) return res.status(400).send({ status: false, message: "Name is required and should not be an empty string !" });
        }

        if (email || email == "") {
            if (!validateEmail(email)) return res.status(400).send({ status: false, message: "Enter a valid email-id" });
        }
        let checkEmail = await userModel.findOne({ email: email });
        if (checkEmail) return res.status(400).send({ status: false, message: "Email already exist" });

        if (phone || phone == "") {
            if (!isValidMobile(phone)) return res.status(400).send({ status: false, message: "Enter a valid email-id" });
        }
        let checkphone = await userModel.findOne({ phone: phone });
        if (checkphone) return res.status(400).send({ status: false, message: "Mobile number already exist" });

        if (password || password == "") {
            if (!validPassword(password)) { return res.status(400).send({ status: false, message: "Please enter valid password" }) }
        }

        let tempAddress = user.address

        if (data.address) {

            data.address = JSON.parse(data.address)

            let { street, city, pincode } = data.address

            if (street) {
                if (!street || typeof (street) != "string") { return res.status(400).send({ status: false, message: "shipping street is mandatory & valid !" }) }
                tempAddress.street = street
            }

            if (city) {
                if (!city || typeof (city) != "string") { return res.status(400).send({ status: false, message: "shipping city is mandatory & valid !" }) }
                tempAddress.city = city
            }

            if (pincode) {
                if (!pincode || typeof (pincode) != "number" || !/^[0-9]{6}$/.test(pincode)) { return res.status(400).send({ status: false, message: "Please enter shipping pincode & should be valid !" }) }
                tempAddress.pincode = pincode
            }
        }
        data.address = tempAddress;

        if (files && files.length > 0) {
            let profileImgUrl = await uploadFile(files[0]);
            data.profileImage = profileImgUrl;
        }

        let updateUser = await userModel.findOneAndUpdate({ _id: userId }, data, { new: true })
        res.status(200).send({ status: true, message: "User profile updated", data: updateUser });

    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}




module.exports = { createUser, loginUser, getUser, updateUser }