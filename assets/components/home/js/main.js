define(['jquery', 'jqSlidejs', '/components/header/js/main.js',
  '/components/home/js/main.js'
], function($, jqSlide, header, home) {

  return {
    run: function() {
      var CLASS_TAB_CURRENT = 'search_tab_item-current';
      // 用户展示区的分页标示
      var _page = 1;
      // 构建slide
      function generateSlide() {
        var imgs = ['/res/img/global/slide1.jpg',
          '/res/img/global/slide2.jpg', '/res/img/global/slide3.jpg'
        ];
        var $container = $('#jqSlide_home');
        if ($container.length !== 0) {
          var slide = new jqSlide($container, imgs);
        }
      }

      generateSlide();

      function Dom_peopelItem(data) {
        var html;
        html = ['<li class="people_item">',
          '<div class="people">',
          '<div class="cover"></div>',
          '<div class="action">',
          '<a class="action_link" href="' + data.url +
          '"><i class="hc_icon hc_icon_verify_large"></i>认识一下</a>',
          '</div>',
          '<div class="avator">',
          '<img class="avator_img" src="' + data.avator + '" alt="' +
          data.nickname + '">',
          '</div>',
          '</div>',
          '</li>'
        ].join('');
        return html;
      }
      // 搜索框事件
      $('.hc_search').on('click', '.tab_item_title', function() {
        var $item = $(this).parents('.search_tab_item');
        if ($item.hasClass(CLASS_TAB_CURRENT)) {
          return;
        }
        $item.siblings('.search_tab_item').removeClass(
          CLASS_TAB_CURRENT);
        $item.addClass(CLASS_TAB_CURRENT);
      });
      // 用户展示区事件
      $('.hc_box_people').on('click', '.expand_link', function() {
        _page++;
        $.ajax({
          url: '/getPeople',
          dataType: 'jsonp',
          data: {
            page: _page
          }
        }).done(function(res) {
          console.log(res);
          if (!res) {
            return;
          }
          var html = '';
          for (var i = 0, len = res.length; i < len; i++) {
            html += Dom_peopelItem(res[i]);
          }
          $('.people_list').html(html);

        }).fail(function(res) {
          console.log('error');
        }).always(function(res) {
          console.log('complete');
        });
      });
      // wiki区事件
      $('.hc_box_wiki').on('click', '.act_totop', function() {
        // $('body').scrollTop(0);
        $('body').animate({
          scrollTop: 0
        }, 1000);
      });
    }
  };
});
