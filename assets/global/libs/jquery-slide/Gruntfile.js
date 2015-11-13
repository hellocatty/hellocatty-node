module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/**! <%= pkg.discription %>  \n *@version: <%= pkg.version %>-<%= grunt.template.today("yyyy/mm/dd") %>\n *@author: <%= pkg.author %>\n*/\n'
      },
      dist: {
        src: 'jqSlide.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },
    lineending: {
      dist: {                   // Target
        options: {              // Target options
          eol: 'lf'
        },
        files: {                // Files to process
          '<%= uglify.dist.dest %>': ['<%= uglify.dist.dest %>'],
          '<%= pkg.name %>.min.js': ['<%= pkg.name %>.min.js']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'jqSlide.js'],
      options: {
        //这里是覆盖JSHint默认配置的选项
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    less: {
      options: {
        compress: false
      },
      dist: {
        src: 'style.less',
        dest: 'style.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-lineending');
  grunt.loadNpmTasks('grunt-contrib-less');


  grunt.registerTask('test', ['jshint']);
  //file line ending unix
  grunt.registerTask('default', ['jshint', 'uglify', 'lineending','less']);

};
