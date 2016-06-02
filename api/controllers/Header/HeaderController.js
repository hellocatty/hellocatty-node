/**
 * Header/HeaderController
 *
 * @description :: Server-side logic for managing Header/headers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var swig = require('swig');

module.exports = {
	render: function(req, module) {
		var _module = module || 'home'
		var _locals = {
			mod: _module,
			isLogin: false
		};
		// 通过passport.js API判断是否登录
		var _user = req.user;

		if (!!_user) {
			_locals.isLogin = true;
			_locals.user = _user;
		}
		var header = swig.renderFile('./views/global/header.swig', {
			locals: _locals
		});
		return header;
	}
};
