define(['jquery', 'jqSlidejs', '/components/header/js/main.js',
  '/components/home/js/main.js'
], function($, jqSlide, header, home) {

  return {
    run: function() {
      var CLASS_TAB_CURRENT = 'search_tab_item-current';
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

      $('.hc_search').on('click', '.tab_item_title', function() {
        var $item = $(this).parents('.search_tab_item');
        if ($item.hasClass(CLASS_TAB_CURRENT)) {
          return;
        }
        $item.siblings('.search_tab_item').removeClass(
          CLASS_TAB_CURRENT);
        $item.addClass(CLASS_TAB_CURRENT);
      });
    }
  };
});
