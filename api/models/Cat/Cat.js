/**
* Cat/Cat.js
*
* @description :: cat model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    age: {
      type: 'float',
      required: false
    },
    pic: {
      type: 'string',
      required: true,
      defaultsTo: ''
    },
    breed: {
      type: 'string',
      required: true,
      defaultsTo: '中华田园猫'
    },
    color: {
      type: 'string',
      required: false
    },
    adopted: {
      type: 'boolean',
      required: false,
      defaultsTo: false
    }
  },

  // 查询是否已被领养
  isAdopted: function(){
    return this.adopted;
  }
};
