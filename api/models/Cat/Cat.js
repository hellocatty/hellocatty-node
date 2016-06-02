/**
 * Cat/Cat.js
 *
 * @description :: cat model
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    // 名称
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    // 年龄
    age: {
      type: 'float',
      required: false
    },
    // 图片
    pic: {
      type: 'string',
      required: true,
      defaultsTo: ''
    },
    // 品种
    breed: {
      type: 'string',
      required: true,
      defaultsTo: '中华田园猫'
    },
    // 毛色
    color: {
      type: 'string',
      required: false
    },
    // 是否已被领养
    adopted: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    // 发现者
    finder: {
      type: 'string',
      required: true
    },
    // 地点
    location: {
      type: 'string',
      required: true
    },
    // 发现的故事
    story: {
      type: 'string',
      required: false
    }
  }
};
