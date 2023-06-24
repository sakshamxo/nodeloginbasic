const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')
mongoose.connect('mongodb://localhost/test');

var userSchema = mongoose.Schema({
  username:String,
  name:String,
  password:String
})

userSchema.plugin(plm);
module.exports = mongoose.model('user',userSchema);
