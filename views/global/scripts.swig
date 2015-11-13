<script>
var app = {};

{% if module %}
    app.action = '{{ module }}';
{%- endif  %}
</script>

<script data-main="/global/js/common/main" src="/global/libs/requirejs/require.js"></script>
