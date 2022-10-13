//const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const mongoose = require('mongoose');
const User = require('../models/User');
const Watchlist = require('../models/Watchlist');
require('dotenv').config({path: '/.env'});


module.exports = function (passport) {

  passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        userName: profile.email.slice(0, profile.email.indexOf('@')),
        email: profile.email,
        thirdPartyId: profile.id,
      }

      try{
        let user = await User.findOne( { email: profile.email });
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          await Watchlist.create({ user: user, title: 'watchlist'});
          done(null, user);
        }
      } catch(err) {
         console.log(err);
      }
    }));






  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
