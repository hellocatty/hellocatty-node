<div class="cat">
  {# 图片展示区域 #}
  <div class="cat_thumb">
    <div class="cover"></div>
    <div class="thumb">
      <img class="thumb_img" src="{{ val.pic }}" alt="{{ val.name }}" />
    </div>
    <ul class="action_list">
      <li class="action_item action_item_care">
        <i class="hc_icon hc_icon_like_white item_icon"></i>
        <span class="item_txt">关注</span>
      </li>
      <li class="action_item action_item_detail">
        <i class="hc_icon hc_icon_identy_white item_icon"></i>
        <span class="item_txt">查看详情</span>
      </li>
    </ul>
  </div>
  {# 信息介绍区域 #}
  <div class="cat_info">
    <div class="info_title">
      <span class="title">{{ val.name }}</span>
      {% if val.location %}
      <div class="location">
        <i class="hc_icon hc_icon_location"></i>
        {{ val.location }}
      </div>
      {% endif %}
    </div>
    <div class="info_story">
      {% if val.story %}
        {{ val.story | truncate(50) }}
      {% else %}
        {{ val.finder }}在{{ val.location }}发现一只{{ val.name }}
      {% endif %}
    </div>
  </div>

</div>
