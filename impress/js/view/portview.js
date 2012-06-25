window.PortView = Backbone.View.extend({
    basicThumb: function () {
        var past = $('.past');
        var future = $('.future');
        var count = 0;

        $('.present')[0].style.WebkitTransform = 'translateZ(-1000px) translate(0%, -37%)';
        $('.present').addClass('thumb');
        $('.slider-container')[0].style.WebkitTransform = 'translate(0%, 27%) translateZ(-250px)';

        for (var i = past.length - 1; i >= 0 ; i--) {
            count++;
            past[i].style.MozTransform = 'translateZ(-2500px) translate(-' + (80 + 20*count)  + '%, -50%) rotateY(75deg)';
            past[i].style.WebkitTransform = 'translateZ(-2500px) translate(-' + (80 + 20*count)  + '%, -50%) rotateY(75deg)';
            if (count <= 5) {
                $(past[i]).addClass('thumb');    
            } else {
                $(past[i]).removeClass('thumb');
            }
            
        }

        for (var j = 0; j < future.length; j++) {
            future[j].style.MozTransform = 'translateZ(-2500px) translate(' + (80 + 20*(j + 1))  + '%, -50%) rotateY(-75deg)';
            future[j].style.WebkitTransform = 'translateZ(-2500px) translate(' + (80 + 20*(j + 1))  + '%, -50%) rotateY(-75deg)';
            if ((j + 1) <= 5) {
                $(future[j]).addClass('thumb');    
            } else {
                $(future[j]).removeClass('thumb');
            }
        }
    },
    resetThumb: function () {
        var section = $('section');
        for (var i = 0; i < section.length; i++) {
            $(section[i]).removeClass('thumb');
            section[i].style.WebkitTransform = '';
        }
        $('.slider-container')[0].style.WebkitTransform = '';
    },
    portView3dOn: function () {
        var _this = this;
        $(document).on('mousemove', function (e) {
            var cw = document.documentElement.clientWidth;
            var ch = document.documentElement.clientHeight;
            var centerX = cw / 2;
            var centerY = ch / 2;
            var x;
            var y;
            if (e.clientX < centerX) {
                var dx = Math.abs(centerX - e.clientX);
                dx = parseFloat(dx / centerX).toFixed(5);
                var degree = dx * 90 * 0.1;
                var x = degree * (-1);
            } else {
                var dx = Math.abs(centerX - e.clientX);
                dx = parseFloat(dx / centerX).toFixed(5);
                var degree = dx * 90 * 0.1;
                var x = degree;
            }

            if (e.clientY < centerY) {
                var dy = Math.abs(centerY - e.clientY);
                dy = parseFloat(dy / centerY).toFixed(5);
                var degree = dy * 90 * 0.1;
                var y = degree;
            } else {
                var dy = Math.abs(centerY - e.clientY);
                dy = parseFloat(dy / centerY).toFixed(5);
                var degree = dy * 90 * 0.1;
                var y = degree * (-1);
            }
            
            _this._rotatePortview(x, y);
            
        })
    },
    portView3dOff: function () {
        $(document).off('mousemove');
    },
    randomRotateOn: function () {
        var _this = this;
        var startDeg = -10;
        var endDeg = 10;
        var curDeg = startDeg;
        var gap = 0.5;
        var flag = 0;

        window.rotateTimer = setInterval(function () {
            if (flag == 0) {
                curDeg = curDeg + gap;
                if (curDeg > endDeg) flag = 1;                
                _this._rotatePortview(curDeg, 0);                 
            }

            if (flag == 1) {
                curDeg = curDeg - gap;
                if (curDeg < startDeg) flag = 0;
                _this._rotatePortview(curDeg, 0);                                 
            }            
        }, 100);
    },
    randomRotateOff: function () {
        clearInterval(window.rotateTimer);
    },
    _rotatePortview: function (x, y) {
        if (configModel.isThumb() == true) {
            $('.slider-container')[0].style.WebkitTransform = 'rotateY(' + x + 'deg) rotateX(' + y + 'deg) translate(0%, 27%) translateZ(-250px)';   
        } else {
            $('.slider-container')[0].style.WebkitTransform = 'rotateY(' + x + 'deg) rotateX(' + y + 'deg)' ;       
        }
    },
    portViewRemoteOn: function () {
        $('.slider-container')[0].style.WebkitTransform = 'translateZ(2500px)';   
    },
    portViewRemoteOff: function () {
         $('.slider-container')[0].style.WebkitTransform = 'translateZ(0px)'; 
    }

})