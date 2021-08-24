const router = require('express').Router();
const actionController = require('../controller/action.controller');

router.get('/randomMessage', actionController.getRandomMessage);
router.get('/', actionController.getAllActions)
router.post('/', actionController.createAction);

module.exports = router;