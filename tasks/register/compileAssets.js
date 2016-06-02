module.exports = function(grunt) {
	grunt.registerTask('compileAssets', [
		'babel:dev',
		'jshint',
		'clean:dev',
		'jst:dev',
		'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
