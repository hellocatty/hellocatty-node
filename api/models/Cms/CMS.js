/**
 * Cms/CMS.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    adoptedCatsId: {
      type: 'json',
      defaultsTo: {
        no1: '',
        no2: '',
        no3: '',
        no4: '',
        no5: '',
        no6: '',
        no7: ''
      }
    }
  }
};
