const mongoose = require("mongoose");

const ActionSchema = mongoose.Schema({
    ip: {
        type: String,
    },
    action: {
        type: String,
    },
    timeStamp: {
        type: Date,
    }
})
ActionSchema.pre('save', function (next) {
    const action = this;
    const splitIp = action.ip.split('.')
    if (splitIp.length == 4)
        splitIp.forEach((number) => {
            if (number > 255)
                throw new Error('ip address is invalid')
        })
    else
        throw new Error('ip address is invalid')
    next();
});


module.exports = mongoose.model('Action', ActionSchema)
