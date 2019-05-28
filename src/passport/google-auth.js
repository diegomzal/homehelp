const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("../keys");
const User = require('../models/user')
 
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('google-register', new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/google/redirect"
  },
  async function(accessToken, refreshToken, profile, done) {
    var email = profile.emails[0].value
    const user = await User.findOne({ email: email });
    if (!user) {
      return done(null, false)
    }
    done(null, user);


    
    //User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //  return cb(err, user);
    //});
  }
));