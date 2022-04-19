const passport = require('passport');

const LocalStrategy = require('./strategies/Local.strategy')
const jwtStrategy = require('./strategies/Jwt.strategy')

passport.use(LocalStrategy);
passport.use(jwtStrategy);  