<div class="hc_home_bottom">
  {# slide start #}
  <div class="hc_home_bottom_slide">
    <div id="jqSlide_home"></div>
  </div>
  {# slide end #}

  {# news start #}
  <div class="hc_home_bottom_news">
    <div class="news_title">世界上总会发生一些奇怪的事情</div>
    <ul class="news_list">
      {% for key,val in newslist %}
      <li class="news_item">
        <a href="{{ val.link }}">{{val.news}}</a>
      </li>
      {% endfor %}
    </ul>
  </div>
  {# news end #}
</div>
