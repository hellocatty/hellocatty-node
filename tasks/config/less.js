/**
 * Compiles LESS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = function(grunt) {

	grunt.config.set('less', {
		dev: {
			options:{
				compress: true
			},
			files: [{
				expand: true,
				// compress: true,
				cwd: 'assets/global/styles/',
				src: ['main.less'],
				dest: '.tmp/public/global/styles/',
				ext: '.css'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
};
