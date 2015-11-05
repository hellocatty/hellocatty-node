<script>
var app = {};

{% if module %}
    app.action = '{{ module }}';
{%- endif  %}
</script>

<script data-main="{{ path.script }}/common/main" src="{{ path.libs }}/requirejs/require.js"></script>
