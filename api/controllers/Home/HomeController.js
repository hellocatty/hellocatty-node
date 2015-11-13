/**
 * Home/HomeController
 *
 * @description :: Server-side logic for managing Home/homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var swig = require('swig');
var extras = require('swig-extras');
module.exports = {
	render: function(req, res) {
		var _header, _main;
		var _newslist = [];

		extras.useFilter(swig, 'truncate');

		// header组件
		_header = sails.controllers['header/header'].render(req);

		// 待领养的喵咪信息，用于头部新闻和待领养猫咪展示区域
		var _unAdoptedCats = sails.controllers['cat/cat'].searchByOpt({
			adopted: false
		});
		// debug
		if (!_unAdoptedCats) {
			_unAdoptedCats = [{
				name: '肥婆死胖子',
				pic: '/res/img/global/slide1.jpg',
				finder: '周先生',
				location: '西三旗桥西',
				story: '一只胖的跟大肉虫似得死肥婆，已绝育，天天不是吃就是睡就是拉就是看着我们吃就是看着我们睡看着我们拉'
			}, {
				name: '三花',
				pic: '/res/img/global/slide2.jpg',
				finder: '萌萌',
				location: '西三旗桥北',
				story: '一只胖的跟大肉虫似得死肥婆，已绝育，天天不是吃就是睡就是拉就是看着我们吃就是看着我们睡看着我们拉'
			}, {
				name: '猫日天',
				pic: '/res/img/global/slide3.jpg',
				finder: '周先生',
				location: '西三旗桥东'
			}, {
				name: '小猫',
				pic: '/res/img/global/slide1.jpg',
				finder: '萌萌',
				location: '西三旗桥南',
				story: '猫日天的前任死肥婆的崽子'
			}, {
				name: '三花',
				pic: '/res/img/global/slide2.jpg',
				finder: '萌萌',
				location: '西三旗桥北'
			}, {
				name: '猫日天',
				pic: '/res/img/global/slide3.jpg',
				finder: '周先生',
				location: '西三旗桥东',
				story: '未绝育纯种英短，兴趣爱好：日母猫。逮谁日谁，不开心了就逮谁打谁。一只胖的跟大肉虫似得死肥婆，已绝育，天天不是吃就是睡就是拉就是看着我们吃就是看着我们睡看着我们拉'
			}];
		}

		if (_unAdoptedCats) {
			for (var i = 0, len = _unAdoptedCats.length; i < len; i++) {
				// _newslist['' + _unAdoptedCats[i].finder + '在' + _unAdoptedCats[i].location +
				// 	'发现一只喵'] = '/';
				_newslist.push({
					news: '' + _unAdoptedCats[i].finder + '在' + _unAdoptedCats[i].location +
						'发现一只喵',
					link: ''
				});
			}
			_main = swig.renderFile('./views/home/main.swig', {
				newslist: _newslist,
				unAdoptedCats: _unAdoptedCats
			});
		}

		// 将header组件以数据的形式传入index模板
		var view = swig.renderFile('./views/index.swig', {
			modules: {
				header: _header,
				main: _main
			}
		});
		res.send(view);
	}
};
