{% extends 'part/layout.swig' %}

{# 声明本页面调用的模块 #}
{% set module = 'home/index' -%}

{% block title -%}嗨猫{%- endblock %}
{% block content -%}
    <div>
        <p>
            嗨猫
        </p>
    </div>
{%- endblock %}