const productModel = require("../model/productModel")
const shopModel = require("../model/shopMode")
const { uploadFile } = require("../aws");
const { isValidObjectId } = require("mongoose");



const createProduct = async (req, res) => {
    try {
        let data = req.body;
        let files = req.files;

        let { title, price, shopId, catogary } = data;

        if (!title) { return res.status(400).send({ status: false, message: "Title is mandatory !" }) }
        if (!price || typeof (price) != "string") { return res.status(400).send({ status: false, message: "price is mandatory & type must be number !" }) }

        if (!shopId) { return res.status(400).send({ status: false, message: "shopId is mandatory !" }) }
        if (!isValidObjectId(shopId)) { return res.status(400).send({ status: false, message: "shopId must be valid !" }) }

        if (!catogary) { return res.status(400).send({ status: false, message: "catogary is mandatory !" }) }

        data.image = await uploadFile(files[0])

        let result = await productModel.create(data)

        res.status(201).send({ status: true, data: result })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


const getProduct = async (req, res) => {
    try {
        let title = req.query.title


        let options = {}
        if (title) {
            options.title = { $regex: title, $options: "i" }
        }

        let result = await productModel.find(options)

        res.status(201).send({ status: true, data: result })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


const getProductbyShopId = async (req, res) => {
    try {
        let shopId = req.params.shopId
        let result = await productModel.find({ shopId: shopId })
        shopDetail = await shopModel.findById(shopId)
        let address = shopDetail.address


        res.status(201).send({ status: true, data: result, shopDetail: shopDetail, address: address })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}



const updateProuct = async (req, res) => {   //productId

    try {
        let data = req.body;
        let productId = req.params.productId

        let files = req.files;

        if (files && files.length != 0) {
            data.image = await uploadFile(files[0])
        }

        let result = await productModel.findByIdAndUpdate(productId, data, { new: true })

        res.status(200).send({ status: true, message: "product update succesfully !", data: result })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = { createProduct, getProduct, getProductbyShopId, updateProuct }