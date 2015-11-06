var passport = require('passport'),
LocalStragegy = require('passport-local').Strategy,
bcrypt = require('bcryptjs');

passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(id,done){
  User.findOne({ id: id},function (err,user) {
    done(err,user);
  });
});

passport.use(new LocalStragegy({
  usernameField: 'nickname',
  passwordField: 'password'
},
function(nickname,password,done){
  User.findOne({nickname: nickname},function(err,user){
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
        nickname: user.nickname,
        createdAt: user.createdAt,
        id: user.id
      };

      return done(null,returnUser, {
        code: 100,
        msg: 'Logged In Successfully'
      });
    });
  });
}
));
