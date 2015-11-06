// 第三方模块声明
require.config({
  baseUrl: '/global/libs/',
  paths: {
    jquery: 'jquery/jquery.min',
    requirejs: 'requirejs/require'
  },
  packages: [

  ],
  shim: {

  }
});

// 加载app，并运行
require(['/global/js/common/app.js'],function(app){
    app.init();
});
