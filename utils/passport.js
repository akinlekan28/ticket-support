const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models").User;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRETKEY;

module.exports = passport => {
  passport.use(
    new JwtStrategy(jwtOptions, (jwt_payload, done) => {
      User.findOne({ id: jwt_payload.id })
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return null, false;
        })
        .catch(err => console.log(err));
    })
  );
};
