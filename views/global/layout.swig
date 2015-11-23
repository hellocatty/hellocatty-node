<!DOCTYPE html>
<html>
<head>
    <title>{% block title %} {{sails.config.site.name }}-{{sails.config.site.desc}} {% endblock %}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    {% include "styles.swig" %}
    {% block stylesheets %}{% endblock %}
</head>
<body>
    {# 主内容显示部分，提供给集成页面重写 #}
    <div class="hc_container">
        {% block content %}
        {% endblock %}
    </div>
    {# 引入常用脚本 #}
    {% include "scripts.swig" %}
</body>
</html>
