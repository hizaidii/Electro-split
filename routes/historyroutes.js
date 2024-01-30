const path = require('path');
const express = require('express');
const router = express.Router();

const appController = require('../controller/appcontroller');


router.get('/', appController.getHistory);
// router.get('/child', appController.getNestedHistory);


module.exports = router;