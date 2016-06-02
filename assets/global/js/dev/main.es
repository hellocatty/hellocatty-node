// 第三方模块声明
require.config({
  baseUrl: '/global/libs/',
  paths: {
    jquery: 'jquery/jquery.min',
    requirejs: 'requirejs/require',
    jqSlidejs: 'jquery-slide/jqSlide.min',
    backbone: 'backbone/backbone-min',
    underscore: 'underscore/underscore-min',
    jqValidate: 'jquery-validation/dist/jquery.validate.min'
  },
  packages: [],
  shim: {
    jqSlide: {
      deps: ['jquery']
    },
    jqValidate: {
      deps: ['jquery']
    }
  }
});

// 加载app，并运行
require(['jquery', 'backbone', 'underscore', '/global/js/prod/app.js'], function ($, Backbone, _, app) {
  app.init();
});
