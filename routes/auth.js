const express = require('express')
const passport = require('passport')
const router = express.Router()
const authController = require('../controllers/auth');


router.get('/google', passport.authenticate('google',{ scope:
    [ 'email', 'profile' ] }))

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/');
  });

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/');
});

router.post('/login', authController.postLogin)
router.post('/signup', authController.postSignup)

module.exports = router
