const router = require('express').Router();
const orderController = require('../controllers/ordersControllers')
const {verifyToken} = require('../middleware/verifyToken');

router.get('/',verifyToken, orderController.getUserOrders)

module.exports = router