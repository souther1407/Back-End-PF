var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {config} = require('../../../config/config')


passport.use(
    new GoogleStrategy(
        {
            clienteID: config.googleClient,
            clientSecret: config.googlePassword,
            callbackURL: "http://www.example.com/auth/google/callback",
        },
        function(accessToken, refreshToken, profile, done){
            User.findOrCreate({ googleId: profile.id}, function (err, user){ 
            return done(err, user);
        })
        }
    )
)
