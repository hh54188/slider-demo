window.ConfigModel = Backbone.Model.extend({
    defaults: {
        'scene': 'view',
 	    'enableThumb': 0,
        'index': 1,
        'total': 13
    },
    getTotalPage: function () {
        return this.get('total');
    },
    getCurPage: function () {
        return this.get('index');
    },
    
    initialize: function(){
        this.bind("change:index", function () {
            var sliderView = new SliderView();
            sliderView.turnCurIndex(this.get('index'), this.get('total'));
        });

        this.bind("change:enableThumb", function () {
            if (this.get('enableThumb') == 0 ) {
                var portView = new PortView();
                var sliderView = new SliderView();
                sliderView.hideControl();
        	    portView.resetThumb();
            } else if (this.get('enableThumb') ==1 ) {
        	    var portView = new PortView();
                var sliderView = new SliderView();
                sliderView.showControl();
        	    portView.basicThumb();
                portView.portView3dOff();
            }
        });
     },
     distribute: function (ecode) {
         // if (ecode == 49) {
         //     var portView = new PortView();
         //     portView.portViewRemoteOn();
         //     portView.portView3dOff();

         //     var menuView = new MenuView();
         //     menuView.showMenu();
         //     return false;
         // }

         var scene = this.get('scene');
         if (scene == "view") {
             var pageModel = new PageModel();
             pageModel.distribute(ecode);
         }
     },
     toggleThumb: function () {
         if (this.get('enableThumb') == 0) {
 	         this.set('enableThumb', 1);
 	     } else if (this.get('enableThumb') == 1){
 	         this.set('enableThumb', 0);
 	     }
     },
     isThumb: function () {
         if (this.get('enableThumb') == 0) {
 	     return false;
 	 } else {
 	     return true;
         }
     },
     nextIndex: function () {
        this.set('index', this.get('index') + 1);
     },
     prevIndex: function () {
        this.set('index', this.get('index') - 1)
     }

 })