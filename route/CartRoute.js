const express = require('express');
const CategoryController = require('../controller/CatergoryController');

const router = express.Router();

router.post('/create-category', CategoryController.createCategory);
router.put('/update-category/:id', CategoryController.updateCategory);
router.delete('/delete-category/:id', CategoryController.deleteCategory);
router.get('/find-category/:id', CategoryController.findCategoryById);
router.get('/find-all-categories', CategoryController.findAllCategory);

module.exports = router 