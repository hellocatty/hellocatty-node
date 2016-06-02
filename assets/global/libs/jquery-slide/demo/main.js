// 第三方模块声明
require.config({
  baseUrl: '../',
  paths: {
    jquery: 'bower_components/jquery/jquery.min',
    requirejs: 'bower_components/requirejs/require',
    jqSlide: 'jqSlide'
  },
  shim: {
    'jqSlide': {
      deps: ['jquery'],
      exports: 'jqSlide'
    }
  }
});

// 加载app，并运行
require(['jquery', 'app.js', 'jqSlide'], function($, app) {
  app.run($);
});
