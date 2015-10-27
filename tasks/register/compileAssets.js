module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'jshint',
		'clean:dev',
		'jst:dev',
		'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
