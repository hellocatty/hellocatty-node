<div class="hc_box hc_box_adoptedcasts">
  <div class="hc_box_head">
    <div class="hc_box_head_title">
      <span class="title_label"></span>
      <span class="title_txt">这些猫咪已经过上了幸福的生活</span>
    </div>
    <div class="hc_box_head_expand">
      <a href="" class="expand_link">查看更多</a>
    </div>
  </div>

  <div class="hc_box_body">
    <ul class="cats_list">
      {% for key,val in adoptedCats %}
        <li class="cats_item cats_item_{{ val.range }}">
          {% include "./part/adoptedCat.swig" with val%}
        </li>
      {% endfor %}
      <div class="clearfloat"></div>
    </ul>
    <div class="act">
      <a class="act_link" href="">试试手气</a>
    </div>
  </div>
</div>
