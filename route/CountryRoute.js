const express = require('express');
const CountryController = require('../controller/CountryController');

const router = express.Router();

router.post('/create-country', CountryController.createCountry);
router.put('/update-country/:id', CountryController.updateCountry);
router.delete('/delete-country/:id', CountryController.deleteCountry);
router.get('/find-country/:id', CountryController.findCountryById);
router.get('/find-all-countries', CountryController.findAllCountry);

module.exports = router