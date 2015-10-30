// var passport = requrie('passport'),
// LocalStragegy = requrie('passport-local').Strategy;
//
// passport.serializedUser(function(user,done){
//   done(null,user.id);
// });
//
// passport.deserializeUser(function(id,done){
//   User.findOne({ id: id},function (err,user) {
//     done(err,user);
//   });
// });
//
// passport.use(new LocalStragegy({
//   usernameField: 'email',
//   passportField: 'passport'
// },
// function(email,passport,done){
//   User.findOne({email: email},function(err,user){
//     if(err){
//       return done(err);
//     }
//     if(!user){
//       return done(null,false,{message: 'Incorrect email.'});
//     }
//
//   });
// }
// ));
