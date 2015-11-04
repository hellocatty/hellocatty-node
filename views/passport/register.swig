{% extends 'layout.swig' -%}
{% set module='passport/register' %}
{% block title -%}注册{%- endblock %}
{% block form_content -%}
    <form class="ui form" action="/register" method="post" >
        <h1 class="ui dividing header">欢迎注册</h1>
        {% if err -%}
            <div>
                <div class="header">注册失败</div>
                <p>邮箱已被注册</p>
            </div>
        {%- endif %}

            <input id="siteName" name="nickName" type="text" placeholder="填写站点名称"/>


            <input id="email" name="email" type="email" placeholder="填写邮箱">


            <input id="password" name="password" type="password" placeholder="填写密码（不少于6个字符）"/>


            <textarea id="siteDesc" name="siteDesc" placeholder="填写站点简介"></textarea>
            <input type="submit" value="Submit">


    </form>
{%-endblock %}
