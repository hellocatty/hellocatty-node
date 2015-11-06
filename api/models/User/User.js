/**
* User.js
*
* @description :: 用户model
*/

var bcrypt = require('bcryptjs');

module.exports = {

  attributes: {

    // 站点名称
    nickname: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 10
    },

    // 邮箱
    password: {
      type: 'string',
      required: true
    },

    // 是否已认证
    isCertificated: {
      type: 'boolean',
      defaultsTo: false
    },
    
    // 是否管理员（默认为非管理员）
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    }
  },

  // 创建（注册）用户前，对用户密码加密
  beforeCreate: function (values, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(values.password, salt, function(err, hash) {
        if(err) return cb(err);
        values.password = hash;
        // 执行用户定义回调
        cb();
      });
    });
  },

  afterCreate: function(user,cb) {
    cb();
  }
};
