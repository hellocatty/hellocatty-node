/**
* 验证逻辑控制器
* */
var passport = require('passport'),
swig = require('swig');
module.exports = {
    // 跳转登陆页
    toLogin: function(req, res){
      var view = swig.renderFile('./views/passport/login.swig');
      res.send(view);
    },
    // 跳转注册页
    toRegister: function(req, res){
      var view = swig.renderFile('./views/passport/register.swig');
      res.send(view);
    },
    // 处理注册逻辑
    processRegister: function(req,res){
        // 由请求参数构造待创建User对象
        if(req.param('password') !== req.param('password_valid')){
          return res.view('passport/register',{
            err:{
              code: 001,
              msg: '两次输入密码不相同'
            }
          });
        }else{
          var _user = {
            nickname: req.param('nickname'),
            password: req.param('password')
          };
        }
        User.findOne({nickname:_user.nickname},function(err,user) {
          if(err){
            return res.view('passport/register',{
              err:{
                code: 002,
                msg: '数据库错误'
              }
            });
          }
          if(user){
            return res.view('passport/register',{
              err:{
                code: 003,
                msg: '用户名已存在'
              }
            });
          }
          User.create(_user).exec(function(err, created){
              if(err){
                 // 如果有误，返回错误
                  res.view('passport/register',{
                    err:{
                      code: 002,
                      msg: '数据库错误'
                    }
                  });
              }else{
                  // 否则，将新创建的用户登录
                  req.login(created, function(err) {
                      if (err) {
                        return  res.view('passport/register',{
                          err:{
                            code: 002,
                            msg: '数据库错误'
                          }
                        });
                      }
                      return res.redirect('/');
                  });
              }
          });
        });
    },
    // 处理登陆逻辑
    processLogin: function(req,res){
        // 使用本地验证策略对登录进行验证
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                if(info.code === 100){
                  return res.redirect('/');
                }else{
                  res.send({
                    msg: info.msg
                  });
                }
            });

        })(req, res);
    },
    // 处理登出逻辑
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};
