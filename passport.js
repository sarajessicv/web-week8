const passport    = require('passport');
const passportJWT = require("passport-jwt");
const Users = require("./models/Users");

const ExtractJWT = passportJWT.ExtractJwt;


const JWTStrategy   = passportJWT.Strategy;



passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.SECRET,
},
function (jwtPayload, cb) {


    return Users.findOne({email: jwtPayload.email})
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));