window.App = window.App || {};
window.App.Manage = window.App.Manage || {};
window.App.View = window.App.View || {};
window.App.Text = window.App.Text || {};

(function (global) {
	global.go = function () {

		//如果是第一幅ppt
		if ($('.cur').prop('id') == "overview" || Config.stepIndex.cur >= Config.stepIndex.max) {
			var steps = App.View.getNextStep();
			App.View.setStep(steps.cur, steps.prev);
			return;
		} 

		//如果本页还没有执行完
		if (Config.stepIndex.cur < Config.stepIndex.max) {
			// var steps = App.View.getNextStep();
			// App.View.setStep(steps.cur, steps.prev);
			App.Text.nextTextIndex($('.cur'), Config.stepIndex.cur);			
		}
	}
})(App.Manage)