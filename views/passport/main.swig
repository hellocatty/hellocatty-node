{% extends '../global/layout.swig' %}
{% set module = 'passport' %}
{% block title %}{{ sails.config.site.name}}-{{ sails.config.site.desc }}{% endblock %}
{% block stylesheets %}
<link rel="stylesheet" href="/components/passport/styles/main.css" media="screen" title="no title" charset="utf-8">
{% endblock %}
{% block content %}
  <div class="hc_pwd_container">
    {# banner #}
    <div class="hc_pwd_banner">
      <div class="banner_thumb">
          <img class="banner_img" src="/res/img/global/logo_l.png" alt="{{ sails.config.site.name}}-{{ sails.config.site.desc }}" />
      </div>
      <div class="banner_entry">
        <p class="banner_p banner_p_name">{{ sails.config.site.name }}</p>
        <p class="banner_p banner_p_desc">{{ sails.config.site.desc }}</p>
      </div>
    </div>
    {# box #}
    <div class="hc_pwd_box">
      {# nav #}
      <ul class="box_nav_list">
        <li class="box_nav_item box_nav_item_signup box_nav_item-current">
          <a class="item_link" href="#signup">注册</a>
          <div class="item_tray"></div>
        </li>
        <li class="box_nav_item box_nav_item_login">
          <a class="item_link" href="#login">登录</a>
          <div class="item_tray"></div>
        </li>
      </ul>
      {# form #}
      <div class="box_form_container box_form_container_signup">
        {# login form #}
        <form action="/login" method="post" class="login_form">
            <div class="form_item form_item_input">
              <input type="text" name='authname' class="form_input hc_input hc_input_grey hc_input_borderdash" placeholder="用户名或邮箱">
              <span class="form_input_placeholder"></span>
            </div>
            <div class="form_item form_item_input">
              <input type="password" name='password' class="form_input hc_input hc_input_grey hc_input_borderdash" placeholder="密码">
              <span class="form_input_placeholder"></span>
            </div>
            <div class="form_item form_item_submit">
              <button type="submit" class="hc_btn hc_btn_orange form_btn_submit">登录嗨猫</button>
            </div>
        </form>
        {# signup form #}
        <form action="/signup" method="post" class="signup_form">
            <div class="form_item form_item_input">
              <input type="text" name='authorname' class="form_input hc_input hc_input_grey hc_input_borderdash" placeholder="用户名">
              <span class="form_input_placeholder"></span>
            </div>
            <div class="form_item form_item_input">
              <input type="email" name='email' class="form_input hc_input hc_input_grey hc_input_borderdash" placeholder="邮箱">
              <span class="form_input_placeholder"></span>
            </div>
            <div class="form_item form_item_input">
              <input type="password" name='password' class="form_input hc_input hc_input_grey hc_input_borderdash" placeholder="密码（不少于6位）">
              <span class="form_input_placeholder"></span>
            </div>
            <div class="form_item form_item_submit">
              <button type="submit" class="hc_btn hc_btn_orange form_btn_submit">注册嗨猫</button>
            </div>
        </form>
      </div>
      <div class="box_thirdparty">
        <span class="thirdparty_title">社交账号登录</span>
        <ul class="thirdparty_list">
          <li class="thirdparty_item"><i class="hc_icon hc_icon_weixin"></i></li>
          <li class="thirdparty_item"><i class="hc_icon hc_icon_weibo"></i></li>
          <li class="thirdparty_item"><i class="hc_icon hc_icon_qq"></i></li>
        </ul>
      </div>
    </div>
  </div>

  <div id="canvas_bak">
      <canvas class="canvas"></canvas>
  </div>

{% endblock %}
