let router = require('express').Router()

var orderController = require('./controllers/order-controller')

router.get('/', (req, res) => {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTStore crafted with love!'
    });
});

router.route('/orders').get(orderController.index).post(orderController.new)
router.route('/orders/:id').get(orderController.view).patch(orderController.patch).delete(orderController.delete)

module.exports = router;