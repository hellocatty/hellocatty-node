define(['jquery', '/components/' + app.action + '/js/prod/main.js'], function ($, module) {
	return {
		init: function init() {
			module.run();
		}
	};
});
