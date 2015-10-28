// 第三方模块声明
require.config({
  baseUrl: '/bower_components/',
  paths: {
  	jquery: 'jquery/dist/jquery.min',
  	requirejs: 'requirejs/require',
  	react: 'react/react.min'
  }
});

// 加载app，并运行
require(['/js/common/app.js'],function(app){
    app.init();
});