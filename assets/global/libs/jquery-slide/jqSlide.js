(function(_$, window) {

  var global = window,
    $ = _$;

  // 默认配置参数
  var default_opt = {
    type: 'normal',
    width: '100%',
    height: '100%',
    // 动画切换时间
    switchStep: 600,
    pager_bottom: true,
    pager_side: false,
    autoSwitch: true
  };

  /**
   * jqSlide构造函数
   * @param $container: [jquery object]slide ui容器节点
   * @param imgs: [Array]图片资源url数组
   * @param options: 配置选项
   */
  var jqSlide = function($container, imgs, options) {
    if (!$container || $container.length === 0 || $container[0].nodeType !==
      1 || !imgs || imgs.length === 0) {
      jqSlide.Util_log('错误的配置参数', 'red');
      return;
    }
    this.$container = $container;
    this.arr_imgs = imgs;
    this.opt = $.extend({}, options, default_opt);
    this.arr_links = this.opt.links || null;
    this.generate();
  };

  // log静态函数
  jqSlide.Util_log = function(msg, type) {
    if (!console) {
      return;
    }
    var _type = type || 'normal';
    switch (_type) {
      case 'normal':
        console.log(msg);
        break;
      case 'error':
        console.error(msg);
        break;
      case 'warn':
        console.warn(msg);
        break;
      case 'red':
        console.log('%c ' + msg, 'color:red;');
        break;
      default:
        console.log(msg);
        break;
    }
  };

  // 构建
  jqSlide.prototype.generate = function() {
    this.bind();
    var $dom = $(this.getDom());
    this.$container.append($dom);
    this.$slides = this.$container.find('.jqSlide_item');
    this.$pager_dots = this.$container.find('.jqSlide_pager_bottom_dot');
  };

  // dom生成
  jqSlide.prototype.getDom = function() {
    var _this = this;
    var count = _this.arr_imgs.length,
      i = 0;
    var html = "";
    html += '<div class=\'jqSlide_box\'>';
    // 图片&链接list
    html += '<ul class=\'jqSlide_list\'>';
    if (_this.arr_links) {
      $.each(_this.arr_imgs, function(i, v) {
        if (i === 0) {
          html +=
            '<li class=\'jqSlide_item jqSlide_item-current\' range=\'' +
            i + '\'>';
        } else {
          html +=
            '<li class=\'jqSlide_item jqSlide_item-next\' range=\'' + i +
            '\'>';
        }
        html += '<a class=\'jqSlide_link\' target=\'_blank\' href=\'' +
          _this.arr_links[i] + '\'>';
        html += '<img class=\'jqSlide_img\' src=\'' + _this.arr_imgs[i] +
          '\'>';
        html += '</a>';
        html += '</li>';
      });
    } else {
      $.each(_this.arr_imgs, function(i, v) {
        if (i === 0) {
          html +=
            '<li class=\'jqSlide_item jqSlide_item-current\' range=\'' +
            i + '\'>';
        } else {
          html +=
            '<li class=\'jqSlide_item jqSlide_item-next\' range=\'' + i +
            '\'>';
        }
        html += '<img class=\'jqSlide_img\' src=\'' + _this.arr_imgs[i] +
          '\'>';
        html += '</li>';
      });
    }
    html += '</ul>';
    // 底部指示圆点
    if (_this.opt.pager_bottom && count !== 0) {
      html += '<ul class=\'jqSlide_pager_bottom\'>';
      for (i = 0; i < count; i++) {
        html += '<li class=\'jqSlide_pager_bottom_dot ' + (i === 0 ?
            'jqSlide_pager_bottom_dot-current' : '') + '\' range=\'' + i +
          '\'>';
        html += '</li>';
      }
      html += '</ul>';
    }
    // 左右翻页箭头
    if (_this.opt.pager_side && count !== 0) {
      html +=
        '<div class=\'jqSlide_pager_side jqSlide_pager_side-left\'><i class=\'jqSlide_pager_side_arrow\'></i></div>';
      html +=
        '<div class=\'jqSlide_pager_side jqSlide_pager_side-right\'><i class=\'jqSlide_pager_side_arrow\'></i></div>';
    }

    html += '</div>';

    return html;
  };

  // 绑定事件
  jqSlide.prototype.bind = function() {
    var _this = this;
    this.$container.on('click', '.jqSlide_pager_bottom_dot', function(e) {
        var ev = e || window.event;
        _this.switchSlideByPagerBottom.call(_this, ev);
      })
      .on('click', '.jqSlide_pager_side', function(e) {
        var ev = e || window.event;
        _this.switchSlideByPagerSide.call(_this, ev);
      });
    _this.activeAutoSwitch();
  };

  jqSlide.prototype.activeAutoSwitch = function() {
    var _this = this;
    if (_this.opt.autoSwitch) {
      _this.timer_autoSwitch = setInterval(function() {
        var _range = parseInt(_this.$container.find(
          '.jqSlide_item-current').attr(
          'range'));
        _range++;
        if (_range === _this.arr_imgs.length) {
          _range = 0;
        }
        _this.showSlideByRange(_range.toString(), 'auto');
      }, 2000);
    }
  };

  jqSlide.prototype.pauseAutoSwitch = function() {
    var _this = this;
    if (_this.opt.autoSwitch && _this.timer_autoSwitch) {
      clearInterval(_this.timer_autoSwitch);
    }
  };

  // 底部指示圆点点击切换
  jqSlide.prototype.switchSlideByPagerBottom = function(e) {
    // _this为jqSlide实例
    var _this = this;
    var $target = $((e || window.evnet).target);
    var _range = $target.attr('range');
    // 手动点击dot暂停自动切换
    _this.pauseAutoSwitch();
    _this.showSlideByRange(_range, 'dot');
  };

  // 左右翻页点击切换
  jqSlide.prototype.switchSlideByPagerSide = function() {};

  // 切换至指定序号的slide
  jqSlide.prototype.showSlideByRange = function(range, type) {
    var _this = this;
    var _type = type || 'dot';
    var _range = range;
    var $cur_slide = _this.$container.find('.jqSlide_item-current');
    var cur_range = $cur_slide.attr('range');
    if (_range === cur_range) {
      // 重启自动切换
      if (_type !== 'auto') {
        _this.activeAutoSwitch();
      }
      return;
    }

    var $toShow = _this.$container.find('.jqSlide_item[range=\'' + _range +
      '\']');

    if (_range - cur_range > 0 || (_type === 'auto' && _range === '0')) {
      $cur_slide.animate({
        left: '-100%'
      }, _this.opt.switchStep, function() {
        $(this).removeClass('jqSlide_item-current jqSlide_item-next')
          .addClass(
            'jqSlide_item-prev');
      });

      $toShow.css({
        left: '100%'
      });
    } else {
      $cur_slide.animate({
        left: '100%'
      }, _this.opt.switchStep, function() {
        $(this).removeClass('jqSlide_item-current jqSlide_item-prev')
          .addClass(
            'jqSlide_item-next');
      });

      $toShow.css({
        left: '-100%'
      });
    }

    $toShow.animate({
      left: '0'
    }, _this.opt.switchStep, function() {
      $(this).removeClass('jqSlide_item-prev jqSlide_item-next').addClass(
        'jqSlide_item-current');
      _this.$pager_dots.removeClass('jqSlide_pager_bottom_dot-current');
      _this.$container.find('.jqSlide_pager_bottom_dot[range=\'' +
        _range + '\']').addClass('jqSlide_pager_bottom_dot-current');
      // 重启自动切换
      if (_type !== 'auto') {
        _this.activeAutoSwitch();
      }
    });
  };

  // export模块的兼容写法
  if (typeof define === "function" && define.amd) {
    define(function() {
      return jqSlide;
    });
  } else if (typeof module === "object" && module && typeof module.exports ===
    "object" && module.exports) {
    module.exports = jqSlide;
  } else {
    window.jqSlide = jqSlide;
  }
})(jQuery || window.jQuery, window);
