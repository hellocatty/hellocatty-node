/**
 * Home/HomeController
 *
 * @description :: Server-side logic for managing Home/homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var swig = require('swig');
var extras = require('swig-extras');
var http = require('http');
module.exports = {
	render: function(req, res) {
		var _header, _main;
		var _newslist = [],
			_unAdoptedCats = [],
			_adoptedCats = [],
			_peoplelist = [];

		extras.useFilter(swig, 'truncate');

		// header组件
		_header = sails.controllers['header/header'].render(req);

		// 待领养的喵咪信息，用于头部新闻和待领养猫咪展示区域
		_unAdoptedCats = sails.controllers['cat/cat'].searchByOpt({
			info: {
				adopted: false
			}
		}) || [];
		// 有领养需求的用户信息
		_peoplelist = sails.controllers['user/user'].searchByOpt({
			info: {
				isWaitCat: true
			}
		}) || [];

		// 已被领养的猫咪
		var _adoptedCatsId = sails.controllers['cms/cms'].searchByOpt(
			'adoptedCatsId') || [];
		if (_adoptedCatsId !== 0) {
			for (var i in _adoptedCatsId) {
				_adoptedCats.push({
					range: i,
					cat: sails.controllers['cat/cat'].searchByOpt({
						info: {
							_id: _adoptedCatsId[i]
						}
					})
				});
			}
		}

		// debug数据
		if (_unAdoptedCats.length === 0) {
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
		if (_peoplelist.length === 0) {
			_peoplelist = [{
				nickname: '周先生',
				avator: 'res/img/global/slide2.jpg'
			}, {
				nickname: '周先生',
				avator: 'res/img/global/slide3.jpg'
			}, {
				nickname: '周先生',
				avator: 'res/img/global/slide2.jpg'
			}, {
				nickname: '周先生',
				avator: 'res/img/global/slide3.jpg'
			}, {
				nickname: '周先生',
				avator: 'res/img/global/slide3.jpg'
			}, {
				nickname: '周先生',
				avator: 'res/img/global/slide3.jpg'
			}, {
				nickname: '周先生',
				avator: 'res/img/global/slide3.jpg'
			}, {
				nickname: '周先生',
				avator: 'res/img/global/slide3.jpg'
			}];
		}
		if (_adoptedCats.length === 0) {
			_adoptedCats = [{
				range: 1,
				cat: {
					name: '三花',
					pic: '/res/img/adopted/1.jpg'
				}
			}, {
				range: 2,
				cat: {
					name: '三花',
					pic: '/res/img/adopted/2.jpg'
				}
			}, {
				range: 3,
				cat: {
					name: '三花',
					pic: '/res/img/adopted/3.jpg'
				}
			}, {
				range: 4,
				cat: {
					name: '三花',
					pic: '/res/img/adopted/4.jpg'
				}
			}, {
				range: 5,
				cat: {
					name: '三花',
					pic: '/res/img/adopted/5.jpg'
				}
			}, {
				range: 6,
				cat: {
					name: '三花',
					pic: '/res/img/adopted/6.jpg'
				}
			}, {
				range: 7,
				cat: {
					name: '三花',
					pic: '/res/img/adopted/7.jpg'
				}
			}];
		}
		// 绘制待新闻展示区
		if (_unAdoptedCats) {
			for (var i = 0, len = _unAdoptedCats.length; i < len; i++) {
				_newslist.push({
					news: '' + _unAdoptedCats[i].finder + '在' + _unAdoptedCats[i].location +
						'发现一只喵',
					link: ''
				});
			}
		}

		// 拼合页面主体部分
		_main = swig.renderFile('./views/home/main.swig', {
			newslist: _newslist,
			unAdoptedCats: _unAdoptedCats,
			people: _peoplelist,
			adoptedCats: _adoptedCats
		});

		// 将各组件以数据的形式传入index模板
		var view = swig.renderFile('./views/index.swig', {
			modules: {
				header: _header,
				main: _main
			}
		});
		res.send(view);
	}
};
