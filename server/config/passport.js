const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Business = require("../models/Business");
const bcrypt = require("bcrypt");

passport.use(
    new LocalStrategy(async (email, password, done) => {
        try {
            const business = await Business.findOne({ Email: email });
            const validPassword = await bcrypt.compare(password, business.Password);
            if (validPassword) {
                return done(null, user);
            } else {
                //return done(null, error, user);
                //res.flash incorrect user or password
            }
        } catch (error) {
            return done(error);
        }
    }
));