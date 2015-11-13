/**
 * Compiles LESS files into CSS
 */
var glob = require('glob');
module.exports = function(grunt) {
	var _dest = '',
		_src = '',
		_conf = {};
	var arr_files = [{
		'.tmp/public/global/styles/main.css': 'assets/global/styles/main.less'
	}];
	// 读取components目录中的组件数据
	var _files = glob.sync('assets/components/*');
	// 生成对应的components线上目录
	if (_files) {
		for (var i = 0, len = _files.length; i < len; i++) {
			_dest = '.tmp/public/' + _files[i].split('assets/')[1] +
				'/styles/main.css';
			_src = '' + _files[i] + '/styles/main.less';
			_conf[_dest] = _src;
			// [!important]不可直接push对象字面量{_dest,_src}，因为对象字面量会将_dest识别为key值，而不是将_dest的值视为key值。
			// 这项语言缺陷使用ES6可解决
			arr_files.push(_conf);
			// 清空临时配置项
			_conf = {};
		}
	}
	grunt.config.set('less', {
		dev: {
			options: {
				// paths: ['assets/*/styles/'],
				compress: false
			},
			files: arr_files

		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');

};
