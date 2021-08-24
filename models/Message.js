const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    message: {
        type: String,
    }
})
module.exports = mongoose.model('Message', messageSchema)
