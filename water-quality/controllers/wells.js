const Wells = require('../models/Wells');

// @desc  Get all wells
// @route GET /api/v1/wells
// @access Public
exports.getWells = async (req, res, next) => {
  try {
    const wells = await Wells.find();

    return res.status(200).json({
      success: true,
      count: wells.length,
      data: wells
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};