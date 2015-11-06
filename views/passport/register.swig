{% extends 'layout.swig' %}
{% set module='passport/register' %}
{% block title -%}注册{% endblock %}
{% block form_content -%}
  <div class='container'>
    {% if err -%}
      <div>{{ err.msg}}</div>
    {% endif %}
    <form action="/register" method="post" >
        <div class="form-group">
          <label for="regInputNickname">用户名</label>
          <input type="text" name='nickname' class="form-control" id="regInputNickname" placeholder="用户名">
        </div>
        <div class="form-group">
          <label for="regInputPwd">密码</label>
          <input type="password" name='password' class="form-control" id="regInputPwd" placeholder="密码">
        </div>
        <div class="form-group">
          <label for="regInputPwdValid">密码确认</label>
          <input type="password" name='password_valid' class="form-control" id="regInputPwdValid" placeholder="密码确认">
        </div>
        <button type="submit" class="btn btn-default">提交</button>
    </form>
  </div>
{%-endblock %}
