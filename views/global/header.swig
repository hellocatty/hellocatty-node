<div class='hc_header_container hc_header_container-fixed'>
  <div class="hc_header">
    <div class='hc_header_box'>
      {# logo start #}
      <div class='hc_header_logo'>
        <a class="logo_link" href="/">
          <img class='logo_img' src='{{sails.config.site.logo}}' alt='{{sails.config.site.name}}-{{sails.config.site.desc}}'/>
          <div class='logo_entry'>
            <h4 class='logo_name'>{{sails.config.site.name}}</h4>
            <p class='logo_desc'>{{sails.config.site.desc}}</p>
          </div>
        </a>
      </div>
      {# logo end #}
      {# nav start #}
      <div class='hc_header_nav'>
        <ul class='nav_list'>
            <li class="nav_item {% if locals.mod == 'home' %}nav_item-hover{% endif %}">
              <a class="item_link" href="/">首页</a>
              <div class="item_tray"></div>
            </li>
            <li class="nav_item {% if locals.mod == 'adopt' %}nav_item-hover{% endif %}">
              <a class="item_link" href="/adopt">领养</a>
              <div class="item_tray"></div>
            </li>
            <li class="nav_item {% if locals.mod == 'wiki' %}nav_item-hover{% endif %}">
              <a class="item_link" href="/wiki">WIKI</a>
              <div class="item_tray"></div>
            </li>
            <li class="nav_item {% if locals.mod == 'feedback' %}nav_item-hover{% endif %}">
              <a class="item_link" href="/feedback">返场</a>
              <div class="item_tray"></div>
            </li>
        </ul>
      </div>
      {# nav end #}
      {# user start #}
      <div class="hc_header_user">
        {% if locals.user %}
          <ul class="auth_list">
            <li class="auth_item">
              <a href='/'>{{ locals.user.nickname }}</a>
            </li>
            <li class="auth_item">
              <a href='/logout'>退出</a>
            </li>
          </ul>
        {% else %}
          <ul class="auth_list">
            <li class="auth_item">
              <a href='/login'>登录</a>
            </li>
            <li class="auth_item">
              <a href='/register'>注册</a>
            </li>
          </ul>
        {% endif %}
      </div>
      {# user end #}
    </div>
  </div>
</div>
