const shopMode = require("../model/shopMode");
const { uploadFile } = require("../aws")

const createShop = async function (req, res) {
    try {
        let data = req.body
        let files = req.files

        data.pic = await uploadFile(files[0])

        if (!data.address) { return res.status(400).send({ status: false, message: "Please enter address !" }) }

        let shopEmail = await shopMode.findOne({ email: data.email })
        if (shopEmail) { return res.status(400).send({ status: false, message: "Email alreday exits" }) }

        if (data.address) {
            let { street, city, pincode } = data.address

            if (!street || typeof (street) != "string") { return res.status(400).send({ status: false, message: "shipping street is mandatory & valid !" }) }
            if (!city || typeof (city) != "string") { return res.status(400).send({ status: false, message: "shipping city is mandatory & valid !" }) }
            if (!pincode || !/^[0-9]{6}$/.test(pincode)) { return res.status(400).send({ status: false, message: "Please enter shipping pincode & should be valid !" }) }
        }

        let restourant = await shopMode.create(data)
        res.status(201).send({ status: true, data: restourant })
    }
    catch (e) {
        res.status(500).send({ status: false, data: e.message })
    }
}

const getShop = async (req, res) => {
    try {
        let result = await shopMode.find()
        res.status(201).send({ status: true, data: result })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}



const UpdateeShop = async function (req, res) {
    try {
        let data = req.body
        console.log(data)
        let files = req.files
        let shopId = req.params.shopId

        if (files.length > 0) {
            data.pic = await uploadFile(files[0])
        }
        let restourant = await shopMode.findOneAndUpdate({ _id: shopId }, data, { new: true })
        res.status(201).send({ status: true, data: restourant })
    }
    catch (e) {
        res.status(500).send({ status: false, data: e.message })
    }
}


module.exports = { createShop, getShop, UpdateeShop }