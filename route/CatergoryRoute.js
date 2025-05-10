const express = require('express');
const CartController = require('../controller/CartController');

const router = express.Router();

router.post('/create-cart', CartController.createCartRecord);
router.put('/update-cart/:id', CartController.updateCartRecord);
router.delete('/delete-cart/:id', CartController.deleteCartRecord);
router.get('/find-cart/:id', CartController.findCartRecordById);
router.get('/find-all-cart', CartController.findAllCartRecords);

module.exports = router 