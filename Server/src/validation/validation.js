const mongoose = require("mongoose")



function validateEmail(email) {
    let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    return ( typeof(email) !="string" || regex.test(email)) ? true :false
}

function validPassword(password) {
    let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    return regex.test(password);
}

function isValidMobile(phone){
    let regex = /^[6-9][0-9]{9}$/
    return regex.test(phone)
}

function isValidname(firstname){
    let result = (typeof(firstname) == "string" && /^[a-zA-Z][ ]+$/.test(firstname))?true:false
    return result
}

const isValidStatus = (size) => {
    let status = ["pending", "completed", "canceled"];
        if (status.includes(size)) {
          return true
        } else {
          return false
        }
      }
      const isValidObjectId = (objectId) => {
        return mongoose.Types.ObjectId.isValid(objectId)
    }
module.exports = {validateEmail, validPassword,isValidMobile, isValidname ,isValidStatus,isValidObjectId}