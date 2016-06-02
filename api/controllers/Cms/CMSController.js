/**
 * Cms/CMSController
 *
 * @description :: Server-side logic for managing Cms/cms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	 * 根据opt返回信息
	 * @param: opt
	 */
	searchByOpt: function(opt) {
		var _opt = opt || null;
		var _result;
		if (!_opt) {
			_result = null;
		} else {
			CMS.findOne().exec(function(err, cms) {
				if (err) {
					return;
				}
				_result = cms[_opt];
			});
		}

		return _result;
	}
};
