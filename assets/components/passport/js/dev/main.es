/**
 * @module Passport
 * @desc 通行证模块，包括登录、注册逻辑控制和部分总体样式控制
 */
define(['backbone', 'jqValidate'], function(Backbone) {
  return {
    /**
     * @lends Passport
     */
    run: function() {
      /**
       * @desc canvas动画背景以及添加resize事件
       */
      function initCanvas() {
        let img = new Image();
        img.onload = function() {
          // 浏览器viewport的尺寸
          let winWidth, winHeight;
          // 图片的尺寸信息，如果不支持此API需人工写入尺寸
          let imgW = img.width || 145,
            imgH = img.height || 74,
            imgW_min = imgW * 0.65 || 93,
            imgH_min = imgH * 0.65 || 48;
          // 页面主体的最小宽度，可修改
          let bodyMinwidth = 970;
          // 每个图片的位置坐标
          let locate_1, locate_2, locate_3;

          let $body = $('.hc_pwd_container');
          let bodyHeight = $body.height();
          $body.css({
            marginTop: -bodyHeight / 2
          }).animate({
            opacity: 1
          }, 500);

          let canvas = $('#canvas_bak .canvas')[0];
          let ctx = canvas.getContext('2d');
          // 逐帧绘制canvas
          function draw() {
            ctx.clearRect(0, 0, winWidth, winHeight);
            let grad = ctx.createLinearGradient(0, 0, 0, winHeight);
            grad.addColorStop(0, '#2196F3');
            grad.addColorStop(1, '#99ccff');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, winWidth, winHeight);
            ctx.drawImage(img, locate_1.x, locate_1.y, imgW, imgH);
            ctx.drawImage(img, locate_2.x, locate_2.y, imgW_min,
              imgH_min);
            ctx.drawImage(img, locate_3.x, locate_3.y, imgW, imgH);

            locate_1.x = locate_1.x >= winWidth ? -imgW : ++locate_1.x;
            locate_2.x = locate_2.x >= winWidth ? -imgW_min : ++
              locate_2.x;
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
        let $formBox = $('.box_form_container'),
          $navitems = $('.box_nav_item'),
          $nav_item_signup = $('.box_nav_item_signup'),
          $nav_item_login = $('.box_nav_item_login');
        let pwdRouter = Backbone.Router.extend({
          routes: {
            'login': 'login',
            'signup': 'signup'
          },
          login: function() {
            $formBox.removeClass('box_form_container_signup').addClass(
              'box_form_container_login');
            $navitems.removeClass('box_nav_item-current');
            $nav_item_login.addClass('box_nav_item-current');
          },
          signup: function() {
            $formBox.removeClass('box_form_container_login').addClass(
              'box_form_container_signup');
            $navitems.removeClass('box_nav_item-current');
            $nav_item_signup.addClass('box_nav_item-current');
          }
        });
        let router = new pwdRouter();
        Backbone.history.start();
      }

      function initValidate() {
        // 修改错误提示文案
        $.extend($.validator.messages, {
          required: "不能为空",
          email: "邮箱格式不正确",
          minlength: $.validator.format('不能少于{0}个字符串'),
          maxlength: $.validator.format('不能超过{0}个字符串'),
        });
        // 添加用户名+邮箱的双重验证规则
        $.validator.addMethod('signname', function(value, element) {
          let reg_isemail = /[@]/,
            reg_email =
            /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
          return !reg_isemail.test(value) || (reg_isemail.test(value) &&
            reg_email.test(value));
        }, '请输入正确的用户名或邮箱');
        // 注册表单添加验证规则
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
          },
          errorPlacement: function(error, element) {
            let container = element.parent().find('.form_error');
            error.appendTo(container);
            container.show();
          },
          submitHandler: function(form) {
            var $form = $(form);
            let _action = $form.attr('action');
            $form.attr('action', '');
            $.ajax({
              type: 'post',
              url: _action,
              data: $form.serialize(),
              dataType: 'json'
            }).done(function(res) {
              console.log('done');
              if (res.code !== '100') {
                alert(res.message);
              }
            }).fail(function(res) {
              console.log('fail');
            }).always(function() {
              $form.attr('action', _action);
            });
          }
        });
        // 登录表单添加验证规则
        $('.login_form').validate({
          rules: {
            signname: {
              required: true,
              signname: true
            },
            password: {
              required: true
            }
          },
          errorPlacement: function(error, element) {
            let container = element.parent().find('.form_error');
            error.appendTo(container);
            container.show();
          },
          submitHandler: function(form) {
            var $form = $(form);
            let _action = $form.attr('action');
            $form.attr('action', '');
            $.ajax({
              type: 'post',
              url: _action,
              data: $form.serialize(),
              dataType: 'json'
            }).done(function(res) {
              console.log('done');
              if (res.code !== '100') {
                alert(res.message);
              } else {
                alert('注册成功');
              }
            }).fail(function(res) {
              console.log('fail');
            }).always(function() {
              $form.attr('action', _action);
            });
          }
        });
      }

      initRouter();
      initValidate();
      initCanvas();
    }
  }
});
