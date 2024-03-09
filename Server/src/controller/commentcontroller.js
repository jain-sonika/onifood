const comentModel = require("../model/comment")
const axios = require('axios');


const newComment = async function (req, res) {
    try {
        let data = req.body
        data.shopId = req.params.shopId
        data.date = new Date().toISOString().split('T')[0];
        const comment = await comentModel.create(data)
        res.status(200).send({ data: comment })
    } catch (e) {
        res.status(500).send({ status: false, data: e.message })
    }
}


const getComments = async function (req, res) {
    try {
        const comments = await comentModel.find({ shopId: req.params.shopId, isDeleted: false });

        res.status(200).send({ data: comments })
    } catch (e) {
        res.status(500).send({ status: false, data: e.message })
    }
}

const deleteComment = async function (req, res) {
    try {
        await comentModel.findOneAndUpdate({ _id: req.params.commentId }, { isDeleted: true })

        res.status(200).send({ data: 'comment deleted successfully' });
    } catch (e) {
        res.status(500).send({ status: false, data: e.message })
    }
}


module.exports = { newComment, getComments, deleteComment }