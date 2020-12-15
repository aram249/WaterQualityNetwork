const express = require('express');
const { getWells, addWell } = require('../controllers/wells');

const router = express.Router();

router 
    .route('/')
    .get(getWells)
    .post(addWell)

module.exports = router;