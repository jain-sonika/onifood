const recipiModel = require("../model/recipiModel")
const { uploadFile } = require("../aws")



const createRecipi = async (req, res) => {
    try {
        let data = req.body;
        const obj = JSON.parse(JSON.stringify(data));
        let files = req.files;

        let { title, userId } = obj

        if (!title) { return res.status(400).send({ status: false, msg: "Title mandatory !" }) }
        if (!userId) { return res.status(400).send({ status: false, msg: "UserId mandatory !" }) }

        if (files.length !== 2) { return res.status.send({ status: false, msg: "you have to send only 2 files" }) }

        data.image = await uploadFile(files[0])
        data.video = await uploadFile(files[1])

        let result = await recipiModel.create(data)

        res.send({ status: true, data: result })
    } catch (err) {
        res.status(500).send({ status: false, data: err.message })
    }
}

const getRecipi = async (req, res) => {
    try {
        let result = await recipiModel.find().populate({path:"userId", select:{profileImage:1}})
        res.status(200).send({ status: true, data: result })
    } catch (err) {
        res.status(500).send({ status: false, data: err.message })
    }
}


module.exports = { createRecipi, getRecipi }