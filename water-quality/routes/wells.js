  
const express = require('express');
const { getWells} = require('../controllers/wells');

const router = express.Router();

router
  .route('/')
  .get(getWells)

module.exports = router;