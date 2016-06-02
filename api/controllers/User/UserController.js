/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	 * 根据提供的opt搜索人类信息，供服务端调用
	 * @param opt
	 */
	searchByOpt: function(opt) {
		var _result;
		var _info = opt || opt.info;
		var _num = opt.num || 10;

		if (!_info) {
			_result = null;
		} else {
			User.find({
				where: _info,
				limit: _num
			}).exec(function(err, people) {
				if (err) {
					return;
				}
				_result = people;
			});
		}
		return _result;
	},
	/**
	 * 根据request搜索人类信息，供客户端调用
	 * @param req,res
	 */
	searchByReq: function(req, res) {
		var _result;
		var _params = req.allParams();
		if (!_params) {
			_result = null;
		} else {
			var _num = _params.num || 10;
			var _page = _params.page || 1;
			var _info = eval('(' + _params.info + ')');
			if (!_info) {
				_result = null;
			} else {
				User.find(_info).paginate({
					page: _page,
					limit: _num
				}).exec(function(err, people) {
					if (err) {
						return;
					}
					_result = people;
				});
			}
		}
		if (_params.callback) {
			res.jsonp(_result);
		} else {
			res.send(_result);
		}
	}
};
