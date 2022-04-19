const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const jwt = require("jsonwebtoken")
const GOOGLE_CLIENT_ID = "540051645175-sbuak0uu5auodj9ipes8lklhgeg39kfo.apps.googleusercontent.com"
const GOOGLE_SECRET_ID = "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"

passport.use(new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_SECRET_ID,
    callbackURL: "http://www.example.com/auth/google/callback" //TODO: CAMBIAR A LA RUTA VERDADERA DEL FRONT

},
( accessToken, refreshToken, profile, done ) => {
try {
    
    const asd = jwt.verify(accessToken, GOOGLE_SECRET_ID)
    console.log(asd)
    done(null,profile)
} catch (error) {
    done(null,profile)
}


}))