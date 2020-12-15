const NodeGeocoder = require('node-geocoder');

const options = {
    provider: process.env.GEOCODE_PROVIDER,

    // optional depending on the providers 
    httpAdapter: 'https', // default 
    apiKeys: process.env.GEOCODER_API_KEY,
    formatter: null
};

const geocoder = new NodeGeocoder(options);

module.exports = gecoder;