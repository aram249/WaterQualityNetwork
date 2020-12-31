const Well = require('../models/Well');

// @desc  Get all wells
// @route GET /api/v1/wells
// @access Public
exports.getWells = async (req, res, next) => {
  try {
    const wells = await Well.find(); 
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

// @desc  Create a well
// @route POST /api/v1/wells
// @access Public
// exports.addWell = async (req, res, next) => {
//     try {
//       const well = await Well.create(req.body);

//       // saving the well to the database
//       return res.status(201).json({
//           success: true,
//           data: well
//       });
  
//     } catch (err) {
//       console.error(err);
//       if(err.code === 11000){
//         return res.status(400).json({ error: 'This well already exists' });
//       }
//       res.status(500).json({ error: 'Server error' });
//     }
//   };
  
