const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const geocoder = require('../utils/geocoder');

const WellsSchema = new mongoose.Schema({
  wells: {
    type: String,
    required: true
  }
}, { timestamps: true });

// // Geocode & create location
// WellsSchema.pre('save', async function(next) {
//   const loc = await geocoder.geocode(this.address);
//   this.location = {
//     type: 'Point',
//     coordinates: [loc[0].longitude, loc[0].latitude],
//     formattedAddress: loc[0].formattedAddress
//   };

//   // Do not save address
//   this.address = undefined;
//   next();
// });

module.exports = mongoose.model('Wells', WellsSchema);
