const { verifyToken } = require("./auth.js");
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");

exports.passport_http_bearer = passport.use(
  new BearerStrategy({ passReqToCallback: true }, function(
    req,
    access_token,
    done
  ) {
    process.nextTick(function() {
      //pulling access token from request
      access_token =
        access_token ||
        req.cookies.access_token ||
        req.body.access_token ||
        req.query.access_token;
      verifyToken(access_token, (err, userDetails) => {
        if (err) {
          return done(null, false);
        }
        return done(null, userDetails);
      });
    });
  })
);

exports.passport_google_oauth20 = passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);

// Client ID 998902085437-l1e405ggc4bsfan9fges3neka9esdvm4.apps.googleusercontent.com
// Client Secret hNhkbNL1q-D8_ZyMEO6cvODI
