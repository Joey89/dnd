var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://joey:Zxcv1234@ds147979.mlab.com:47979/monsters");

module.exports = mongoose.connection;