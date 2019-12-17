const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (passport) => {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/auth/facebook/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({ facebookId: profile.id }, (err, user) => {
            if (err) { return done(err); }
            done(null, user);
        });
    }))
};
