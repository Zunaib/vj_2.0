const {verifyToken} = require('./auth.js');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;


exports.passport_http_bearer = passport.use(new BearerStrategy({ passReqToCallback: true, },
    function (req, access_token, done) {
        process.nextTick(function () {
            //pulling access token from request
            access_token = access_token || req.cookies.access_token || req.body.access_token || req.query.access_token;
            verifyToken(access_token, (err, userDetails) => {
                if (err) { return done(null, false); }
                return done(null, userDetails);
            })
        });
    }
));
