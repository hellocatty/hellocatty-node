/**
 * User.js
 *
 * @description :: 用户model
 */

var bcrypt = require('bcryptjs');

module.exports = {

  attributes: {
    // 登录用户名
    authname: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 10
    },
    // 昵称
    nickname: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 10
    },
    // 头像图片
    avator: {
      type: 'string',
      defaultsTo: '',
      required: true
    },
    // 密码
    password: {
      type: 'string',
      required: true
    },
    // 邮箱
    email: {
      type: 'string',
      email: true,
      required: true
    },
    regDate: {
      type: 'datetime',
      required: true
    },
    // 是否有领养需求
    isWaitCat: {
      type: 'boolean',
      defaultsTo: true
    },
    // 邮箱激活码
    token_email: {
      type: 'string',
      required: false
    },
    // 激活码有效期
    token_email_exp:{
      type: "number",
      required: false
    },
    // 激活状态:0-未激活；1-已激活
    status: {
      type: 'number',
      required: true,
      defaultsTo: 0
    },
    // 是否已认证
    isCertificated: {
      type: 'boolean',
      defaultsTo: false
    },

    // 认证信息
    identyInfo: {
      type: 'json',
      defaultsTo: {
        idPic: {
          front: "",
          back: ""
        },
        name: "",
        idNumber: ""
      },
      required: false
    },

    // 是否管理员（默认为非管理员）
    isAdmin: {
      type: 'boolean',
      unique: true
        // defaultsTo: false
    }
  },

  // 创建（注册）用户前，对用户密码加密
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return cb(err);
        user.password = hash;
        // 执行用户定义回调
        cb();
      });
    });
  },
  // 创建用户后，生成邮箱激活码
  afterCreate: function(user, cb) {
    bcrypt.genSalt(10,function(err,salt){
      if(err){
        return;
      }
      bcrypt.hash(user.authname+user.password+user.regDate.toISOString(),salt,function(err,hash){
        if(err){
          return cb(err);
        }
        user.token_email = hash;
        sails.controllers['auth/auth'].sendValidEmail(user.authname,user.email,user.token_email);
        cb();
      });
    });
    cb();
  }
};
