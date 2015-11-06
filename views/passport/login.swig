{% extends 'layout.swig' %}
{% set module = 'passport/login' %}
{% block title -%}欢迎登录{%- endblock %}
{% block form_content -%}
  <div class='container'>
    <form action="/login" method="post" >
        <div class="form-group">
          <label for="regInputNickname">用户名</label>
          <input type="text" name='nickname' class="form-control" id="regInputNickname" placeholder="用户名">
        </div>
        <div class="form-group">
          <label for="regInputPwd">密码</label>
          <input type="password" name='password' class="form-control" id="regInputPwd" placeholder="密码">
        </div>
        <button type="submit" class="btn btn-default">提交</button>
    </form>
  </div>
{%- endblock %}
