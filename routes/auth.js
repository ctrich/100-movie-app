const express = require('express')
const passport = require('passport')
const router = express.Router()


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

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router
