const mongoose = require('mongoose');
const geocoder = require('geocoder');

const WellsSchema = new mongoose.Schema({
  wellsId: {
    type: String,
    required: [true, 'Please add a well ID'],
    unique: true,
    trim: true,
    maxlength: [10, 'Well ID must be less than 10 chars']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  }
});

// Geocode & create location
WellsSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  // Do not save address
  this.address = undefined;
  next();
});

module.exports = mongoose.model('wells', WellsSchema);

