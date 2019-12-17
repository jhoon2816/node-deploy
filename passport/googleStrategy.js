const googleStrategy = require('passport-google-oauth2').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback',
    }, (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({ googleId: profile.id }, (err, user) => {
            return done(err, user);
        });
    }));
};
