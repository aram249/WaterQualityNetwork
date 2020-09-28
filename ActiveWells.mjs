import express from 'express';

var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/ActiveWaterWellsCoordinates.txt', 'utf8');

myReadStream.on('data', function(chunck){
    console.log('new chunck received: ');
    console.log(chunck); 
})