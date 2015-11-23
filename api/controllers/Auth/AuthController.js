/**
 * @module AuthContoller
 * @desc 验证(登录/注册)逻辑控制器
 */
var passport = require('passport'),
  swig = require('swig');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: '163',
  auth: {
    user: 'ihellocatty@163.com',
    pass: 'b06060321'
  }
});
module.exports = {
  /** @lends AuthContoller */
  /**
   * @desc 登录、注册的统一入口，由前端Backbone的hash路由判断展示表单
   */
  toAuth: function(req, res) {
    var view = swig.renderFile('./views/passport/main.swig');
    res.send(view);
  },
  // 处理注册逻辑
  processRegister: function(req, res) {
    // 由请求参数构造待创建User对象
    if (!req.param('authname')) {
      res.send({
        err: '001',
        msg: "invalid authname"
      });
    }
    if (!req.param('email')) {
      res.send({
        err: '002',
        msg: "invalid email address"
      });
    }
    if (!req.param('password')) {
      res.send({
        err: '003',
        msg: "invalid password"
      });
    }
    var _date = new Date();
    var _user = {
      authname: req.param('authname'),
      nickname: req.param('authname'),
      password: req.param('password'),
      regDate: _date
    };
    User.findOne({
      authname: _user.authname
    }, function(err, user) {
      if (err) {
        return res.view('passport/register', {
          code: '006',
          msg: '数据库错误'
        });
      }
      if (user) {
        return res.view('passport/register', {
          code: '007',
          msg: '用户名已存在'
        });
      }
      User.create(_user).exec(function(err, created) {
        if (err) {
          // 如果有误，返回错误
          res.view('passport/register', {
            code: '006',
            msg: '数据库错误'
          });
        } else {
          // 否则，将新创建的用户登录
          req.login(created, function(err) {
            if (err) {
              return res.view('passport/register', {
                code: '006',
                msg: '数据库错误'
              });
            }
            return res.redirect('/');
          });
        }
      });
    });
  },
  // 处理登陆逻辑
  processLogin: function(req, res) {
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
        if (info.code === 100) {
          return res.redirect('/');
        } else {
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
  },
  // 发送账号激活邮件
  sendValidEmail: function(authname, mailto, token) {
    var mailOptions = {
      from: 'HelloCatty<hellocatty@hellocatty.com>',
      to: mailto,
      subject: '请激活您的账号',
      text: '点击以下链接激活您的账号',
      html: '<div><a href=\'http://www.hellocatty.com/u?user=' + authname +
        '&verify=' + token + '\' title=\'激活账号\'></a></div>'
    };

    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        return console.log('send mail error:' + err);
      }
      console.log('send mail success:' + info.response);
    });
  }
};
