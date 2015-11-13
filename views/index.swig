{% extends 'global/layout.swig' %}

{# 声明本页面调用的模块 #}
{% set module = 'home' %}

{% block stylesheets %}
{% if modules.header%}
<link rel="stylesheet" href="/components/header/styles/main.css" media="screen" title="no title" charset="utf-8">
{% endif%}
{% if modules.main%}
<link rel="stylesheet" href="/components/home/styles/main.css" media="screen" title="no title" charset="utf-8">
{% endif%}
{% endblock %}

{% block content %}


{% if modules.header%}
{#  autoescape避免数据被转换成字符串，保证html的正确解析 #}
{% autoescape false %}{{modules.header}}{% endautoescape %}
{% endif%}

{% if modules.main%}
{#  autoescape避免数据被转换成字符串，保证html的正确解析 #}
{% autoescape false %}{{modules.main}}{% endautoescape %}
{% endif%}

{% endblock %}
