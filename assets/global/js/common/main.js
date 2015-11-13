// 第三方模块声明
require.config({
  baseUrl: '/global/libs/',
  paths: {
    'jquery': 'jquery/jquery',
    'requirejs': 'requirejs/require',
    'jqSlidejs': 'jquery-slide/jqSlide.min'
  },
  packages: [

  ],
  shim: {
    'jqSlide': {
      deps: ['jquery'],
      exports: 'jqSlide'
    }
  }
});

// 加载app，并运行
require(['jquery', '/global/js/common/app.js'], function($, app) {
  app.init();
});
