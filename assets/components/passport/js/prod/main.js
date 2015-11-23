'use strict';

/**
 * @module Passport
 * @desc 通行证模块，包括登录、注册逻辑控制和部分总体样式控制
 */
define(['jquery', 'backbone', 'jqValidate'], function ($, Backbone) {
  return {
    /**
     * @lends Passport
     */
    run: function run() {
      /**
       * @desc canvas动画背景以及添加resize事件
       */
      function initCanvas() {
        var img = new Image();
        img.onload = function () {
          // 浏览器viewport的尺寸
          var winWidth = undefined,
              winHeight = undefined;
          // 图片的尺寸信息，如果不支持此API需人工写入尺寸
          var imgW = img.width || 145,
              imgH = img.height || 74,
              imgW_min = imgW * 0.65 || 93,
              imgH_min = imgH * 0.65 || 48;
          // 页面主体的最小宽度，可修改
          var bodyMinwidth = 970;
          // 每个图片的位置坐标
          var locate_1 = undefined,
              locate_2 = undefined,
              locate_3 = undefined;

          var $body = $('.hc_pwd_container');
          var bodyHeight = $body.height();
          $body.css({
            marginTop: -bodyHeight / 2
          }).animate({
            opacity: 1
          }, 500);

          var canvas = $('#canvas_bak .canvas')[0];
          var ctx = canvas.getContext('2d');
          // 逐帧绘制canvas
          function draw() {
            ctx.clearRect(0, 0, winWidth, winHeight);
            var grad = ctx.createLinearGradient(0, 0, 0, winHeight);
            grad.addColorStop(0, '#2196F3');
            grad.addColorStop(1, '#99ccff');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, winWidth, winHeight);
            ctx.drawImage(img, locate_1.x, locate_1.y, imgW, imgH);
            ctx.drawImage(img, locate_2.x, locate_2.y, imgW_min, imgH_min);
            ctx.drawImage(img, locate_3.x, locate_3.y, imgW, imgH);

            locate_1.x = locate_1.x >= winWidth ? -imgW : ++locate_1.x;
            locate_2.x = locate_2.x >= winWidth ? -imgW_min : ++locate_2.x;
            locate_3.x = locate_3.x >= winWidth ? -imgW : ++locate_3.x;

            window.requestAnimationFrame(draw);
          }
          // 获取viewport尺寸以方便动画定位
          function getSize() {
            winWidth = $(window).width();
            winHeight = $(window).height();
            canvas.width = winWidth;
            canvas.height = winHeight;

            locate_1 = {
              x: (winWidth - bodyMinwidth) / 2,
              y: winHeight / 2 - imgW
            };
            locate_2 = {
              x: winWidth / 2 - 120,
              y: winHeight / 2 + 100
            };
            locate_3 = {
              x: winWidth / 2 + 120,
              y: locate_2.y - 20 - imgH
            };
          }

          getSize();
          $(window).on('resize', getSize);
          window.requestAnimationFrame(draw);
        };
        img.src = '/res/img/global/cloud.png';
      }
      /**
       * @desc backbone hash路由
       */
      function initRouter() {
        var $formBox = $('.box_form_container'),
            $navitems = $('.box_nav_item'),
            $nav_item_signup = $('.box_nav_item_signup'),
            $nav_item_login = $('.box_nav_item_login');
        var pwdRouter = Backbone.Router.extend({
          routes: {
            'login': 'login',
            'signup': 'signup'
          },
          login: function login() {
            $formBox.removeClass('box_form_container_signup').addClass('box_form_container_login');
            $navitems.removeClass('box_nav_item-current');
            $nav_item_login.addClass('box_nav_item-current');
          },
          signup: function signup() {
            $formBox.removeClass('box_form_container_login').addClass('box_form_container_signup');
            $navitems.removeClass('box_nav_item-current');
            $nav_item_signup.addClass('box_nav_item-current');
          }
        });
        var router = new pwdRouter();
        Backbone.history.start();
      }

      function initValidate() {
        $('.signup_form').validate({
          rules: {
            authname: {
              required: true,
              maxlength: 15
            },
            email: {
              required: true,
              email: true
            },
            password: {
              required: true,
              minlength: 6
            }
          }
        });
        $('.login_form').validate({
          rules: {
            authname: {
              required: true,
              maxlength: 15
            },
            password: {
              required: true,
              minlength: 6
            }
          }
        });
      }

      initRouter();
      initValidate();
      initCanvas();
    }
  };
});
//# sourceMappingURL=main.js.map
