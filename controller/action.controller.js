const Action = require('../models/Action');
const Message = require('../models/Message');

const getAllActions = async (req, res) => {

}
const createAction = async (req, res) => {
    try {
        const action = req.body
        action.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (action.ip == '::1')
            action.ip = '127.0.0.1'
        console.log("ip: " + action.ip)
        const newAction = new Action(action)
        await newAction.save();
        res.status(200).send({ message: "save action", newAction: newAction });
    }
    catch (error) {
        console.log("Can't save this action with error: " + error);
    }
}
const getRandomMessage = async (req, res) => {
    const messages = await Message.find()
    const random = Math.floor(Math.random() * messages.length)
    res.send(messages[random])
}
module.exports = {
    getAllActions, createAction, getRandomMessage
};