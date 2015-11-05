// 第三方模块声明
require.config({
  baseUrl: '/main/libs/',
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
require(['/main/js/common/app.js'],function(app){
    app.init();
});
