define(['jquery', 'jqSlide'], function($, jqSlide) {
  return {
    run: function($) {
      var imgs = ['http://r4.ykimg.com/050C0000564141E667BC3D26F20CC29E',
        'http://r3.ykimg.com/050C0000564009F167BC3D711A0A1192',
        'http://r4.ykimg.com/050C000056407D2767BC3D196B0E1716'
      ];
      var slide_ui = new jqSlide($('.container'), imgs);
      // slide_ui.init();
    }
  }
});
