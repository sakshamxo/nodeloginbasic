var express = require('express');
const passport = require('passport');
var router = express.Router();
const userModel = require('./users')


router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/register',function(req,res){
  var data = new userModel({
    username: req.body.username,
    name: req.body.name
  })
  userModel.register(data,req.body.password)
  .then(function(user){
      passport.authenticate('local')(req,res,function(){
        res.redirect('/profile')
      })
  })
  .catch(function(err){
    res.send(err)
  })
})
router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/register'
}),function(req,res){});

router.get('/logout',function(req,res){
  req.logout(function(err){
    if (err) throw err
    res.redirect('/login')
  })
});

function isloggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
}
router.get('/register',function(req,res){
  res.render('register')
})
router.get('/login',function(req,res){
  res.render('login')
})
router.get('/profile',function(req,res){
  res.render('profile')
})
router.get('/check',function(req,res){
  res.json({data:'hello'})
})
module.exports = router;
