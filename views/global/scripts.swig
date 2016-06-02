<script>
var app = {};

{% if module %}
    app.action = '{{ module }}';
{% endif  %}
</script>

<script src="/global/libs/jquery/jquery.min.js" charset="utf-8" type="text/javascript"></script>
<script data-main="/global/js/prod/main" src="/global/libs/requirejs/require.js"></script>
