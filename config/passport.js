//const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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
      console.log(profile.id)
      const newUser = {
        userName: profile.email.slice(0, profile.email.indexOf('@')),
        email: profile.email,
        thirdPartyID: profile.id,
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

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log("third party id", profile.id)
        const newUser = {
           userName: profile.displayName,
           thirdPartyID: profile.id,
        }
        try {
          let user = await User.findOne({ userName: profile.displayName, thirdPartyID: profile.id });
          if (user) {
            cb(null, user);
          } else {
            user = await User.create(newUser);
            await Watchlist.create({ user: user, title: 'watchlist'});
            cb(null, user);
          }
        }catch(err) {
          console.log(err)
        }
        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
      }
    ));






  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
