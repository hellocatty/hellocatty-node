var passport = require('passport'),
LocalStragegy = require('passport-local').Strategy;

passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(id,done){
  User.findOne({ id: id},function (err,user) {
    done(err,user);
  });
});

passport.use(new LocalStragegy({
  usernameField: 'email',
  passportField: 'password'
},
function(email,passport,done){
  User.findOne({email: email},function(err,user){
    if(err){
      return done(err);
    }
    if(!user){
      return done(null,false,{message: 'Incorrect email.'});
    }
    bcrypt.compare(password, user.password, function(err,res){
      if(!res){
        return done(null,false,{
          message: 'Invalid password'
        });
      }

      var returnUser = {
        email: user.email,
        createdAt: user.createdAt,
        id: user.id
      };

      return done(null,returnUser, {
        message: 'Logged In Successfully'
      });
    });
  });
}
));
