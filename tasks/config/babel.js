/**
 * @desc grunt-babel configuration
 */
var glob = require('glob');
module.exports = function(grunt) {
  var _dest = '',
    _src = '',
    _cwd = '',
    _conf = {};
  var arr_files = [{
    expand: true,
    cwd: './assets/global/js/dev/',
    src: ['*.es'],
    dest: './assets/global/js/prod/',
    ext: '.js'
  }];
  // 读取components目录中的组件数据
  var _files = glob.sync('assets/components/*');
  // 生成对应的components线上目录
  if (_files) {
    for (var i = 0, len = _files.length; i < len; i++) {
      _cwd = './assets/' + _files[i].split('assets/')[1] + '/js/dev';
      _dest = './assets/' + _files[i].split('assets/')[1] +
        '/js/prod/';
      _src = '*.es';
      _conf = {
        expand: true,
        cwd: _cwd,
        src: _src,
        dest: _dest,
        ext: '.js'
      };
      arr_files.push(_conf);
      // 清空临时配置项
      _conf = {};
    }
  }
  grunt.config.set('babel', {
    dev: {
      files: arr_files,
      options: {
        presets: ["es2015"],
        sourceMap: true
      }
    }
  });
  grunt.loadNpmTasks('grunt-babel');
};
