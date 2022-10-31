//const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
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
      }
    ));

    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      console.log(email)
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) { return done(err) }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` })
        }
        if (!user.password) {
          return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) { return done(err) }
          if (isMatch) {
            return done(null, user)
          }
          return done(null, false, { msg: 'Invalid email or password.' })
        })
      })
    }));


  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
