/**
 * Cat/CatController
 *
 * @description :: Server-side logic for managing cat/cats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	 * 创建猫咪
	 * @param req
	 * @param res
	 */
	create: function(req,res){
		var _cat = req.allParams();
		if(!_cat.name){
			return res.send({
				err:{
					code: 001,
					msg: '缺少名称'
				}
			});
		}
		Cat.findOne({name: _cat.name},function(err,cat){
			if(err){
				return res.send({
					code: 002,
					msg: '数据库错误'
				});
			}

			if(cat){
				return res.send({
					code: 003,
					msg: '同名猫咪已被注册'
				});
			}

			Cat.create(_cat).exec(function(err, created){
				if(err){
					return res.send({
						code: 002,
						msg: '数据库错误'
					});
				}
				return res.send({
					code: 100,
					msg: '创建成功'
				});
			});
		});
	},
	/**
	 * 删除指定猫咪
	 * @param req
	 * @param res
	 */
	delete: function(req,res){

	},
	/**
	 * 根据条件搜索猫咪
	 * @param req
	 * @param res
	 */
	search: function(req,res){

	},
	/**
	 * 更新猫咪身份信息
	 * @param req
	 * @param res
	 */
	updateIdentifyInfo: function(req,res){

	},
	/**
	 * 更新猫咪领养信息
	 * @param req
	 * @param res
	 */
	updateAdoptInfo: function(req,res){

	}

};
