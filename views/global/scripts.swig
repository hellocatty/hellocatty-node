<script>
var app = {};

{% if module %}
    app.action = '{{ module }}';
{%- endif  %}
</script>

<script data-main="{{ path.script }}/common/main" src="{{ path.bower }}/requirejs/require.js"></script>
