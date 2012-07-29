window.app = window.app || {};
app.init = function () {

}

$(function(){	
	$(document).keyup(function (e) {
		app.configModel.distribute(e.keyCode);
        // app.portView.portView3dOn();
	})
});

