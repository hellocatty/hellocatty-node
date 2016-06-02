/**
jshint代码审查配置
*/
module.exports = function(grunt) {
  grunt.config.set('jshint', {
    files: ['api/*.js','assets/*.es','config/*.js','tasks/*.js'],
    options: {
      //这里是覆盖JSHint默认配置的选项
      globals: {
        jQuery: true,
        console: true,
        module: true,
        document: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
};
