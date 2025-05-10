const express = require('express');
const DiscountController = require('../controller/DiscountController');

const router = express.Router();

router.post('/create-discount', DiscountController.createDiscount);
router.put('/update-discount/:id', DiscountController.updateDiscount);
router.delete('/delete-discount/:id', DiscountController.deleteDiscount);
router.get('/find-discount/:id', DiscountController.findDiscountById);
router.get('/find-all-discount', DiscountController.findAllDiscount);

module.exports = router 