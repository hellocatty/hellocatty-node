{# 有领养需求的蓝星人 #}
<div class="hc_box hc_box_people">
  <div class="hc_box_head">
    <div class="hc_box_head_title">
      <span class="title_label"></span>
      <span class="title_txt">这些蓝星人正在等待主人调教</span>
    </div>
    <div class="hc_box_head_expand">
      <a href="javascript:void(0);" class="expand_link"><i class="hc_icon hc_icon_refresh"></i>换一换</a>
    </div>
  </div>

  <div class="hc_box_body">
    <ul class="people_list">
      {% for key,val in people %}
        <li class="people_item">
          {% include "./part/people.swig" with val %}
        </li>
      {% endfor %}
    </ul>
  </div>
</div>
