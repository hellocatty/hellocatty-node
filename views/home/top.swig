<div class="hc_home_top">
  {# 顶部导航区域 start #}
  <div class="hc_home_top_nav">
    <ul class="nav_list">
      <li class="nav_item">
        <a href="/regcat">
          <i class="hc_icon hc_icon_newcat"></i>新猫驾到
        </a>
      </li>
      <li class="nav_item">
        <a href="/findcat">
          <i class="hc_icon hc_icon_findcat"></i>领养猫咪
        </a>
      </li>
      <li class="nav_item">
        <a href="/verify">
          <i class="hc_icon hc_icon_verify"></i>人类验证
        </a>
      </li>
    </ul>
  </div>
  {# 顶部导航区域 end #}
  {# 搜索框 start #}
  <div class="hc_home_top_search">
      {% include "./part/search.swig" with {type: 'normal'} %}
  </div>
  {# 搜索框 end #}
</div>
