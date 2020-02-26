let router = require('express').Router()

var orderController = require('./controllers/order-controller')

router.get('/', (req, res) => {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

router.route('/order').get(orderController.index).post(orderController.new)
router.route('/order/:order_id').get(orderController.view)

module.exports = router;