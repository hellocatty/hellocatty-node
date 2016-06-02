<div class="hc_box hc_box_unadoptedcasts">
  <div class="hc_box_head">
    <div class="hc_box_head_title">
      <span class="title_label"></span>
      <span class="title_txt">这些猫咪正在等待蓝星人驯服</span>
    </div>
    <div class="hc_box_head_expand">
      <a href="" class="expand_link">查看更多</a>
    </div>
  </div>

  <div class="hc_box_body">
    <ul class="cats_list">
      {% for key,val in unAdoptedCats %}
        <li class="cats_item">
          {% include "./part/unAdoptedCat.swig" with val %}
        </li>
      {% endfor %}
      <div class="clearfloat"></div>
    </ul>
  </div>
</div>
