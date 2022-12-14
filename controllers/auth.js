const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');
const Watchlist = require('../models/Watchlist');

exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }

  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      return res.send(validationErrors);
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        return res.send([{msg: "Invalid credentials"}])
      }
      req.logIn(user, (err) => {
        if (err) { 
          return next(err) 
        }
        res.send([])
      })
    })(req, res, next)
  }

  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
    if (validationErrors.length) {
      return res.send(validationErrors)
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
    
    User.findOne({$or: [
      {email: req.body.email},
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        return  res.send([{msg: 'Account with that email address already exists.'}])
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          Watchlist.create({ user: user, title: 'watchlist'});
          res.send([])
        })
      })
    })
  }