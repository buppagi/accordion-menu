;(function (window, document, $){
  "use strict";
  var uniqueId = $.fn.extend({
    uniqueId: (function(){
      var uuid = 0;
      
      return function() {
        return this.each(function(){
          if ( !this.id ) {
            this.id = "ui-id-" + ( ++uuid);
          }
        });
      };
      
    })(),
    
    removeUniqueId: function(){
      return this.each(function(){
        if ( /^ui-id-\d+$/.test( this.id ) ) {
          $( this ).removeAttr( "id" );
        }
      });
    }
  });

  $.fn.accordionUi = function (options) {
    var settings = $.extend({}, $.fn.accordionUi.defaults, options || {});
    var self = this;

    return self.each(function () {
      var $selector = $(this),
        $trigger = $selector.find('.' + settings.triggerClass),
        $panel = $selector.find('.' + settings.panelClass),
        $heading = $selector.find('.' + settings.headingClass),
        activeClass = settings.activeClass,
        labelledby = $trigger.attr('id');

      


      var _create = function () {
        $selector.attr('role', 'presentation');
        var controls = ($panel.attr('id') !== undefined) ? $panel.attr('id') : $panel.uniqueId().attr('id');
        // heading 태그 체크
        if ($selector.is('div')) {
          $selector.find('h3').attr({
            'aria-level': 3,
            'aria-controls': controls
          });
        } else {
          $heading.each(function () {
            var $this = $(this);
            if (($this.is('h1, h2, h3, h4, h5, h6'))) {
              $this.attr('aria-level', '3');
            } else {
              $this.attr({
                'role': 'heading',
                'aria-level': '3'
              });
            }
          });

          // 버튼, a태그 체크
          $trigger.each(function () {
            var $this = $(this);
            if ($this.is('a')) {
              $this.attr({
                'role': 'button',
                'href': '#' + $this.attr('aria-controls'),
                'aria-controls': $panel.attr('id'),
                'aria-expanded': false
              });
            } else if ($this.is('button')) {
              $this.attr({
                'aria-expanded': false,
                'aria-controls': $panel.attr('id')
              });
            }
          });
        }


        $panel.attr({
          'aria-labelledby': labelledby,
          'role': 'region'
        });

        // 기본으로 펼쳐져있는 것 체크
        if ($selector.find('.' + activeClass).length && $($selector.find('.' + activeClass).attr('href')).css('display') === 'block') {
          $selector.find('.' + activeClass).attr('aria-expanded', true);
        }

        eventAction();
      };

      var _local = function() {

      },

      var eventAction = function () {
        $trigger.on('click', function (e) {
          var _this = $(this),
            _target = '#' + _this.attr('aria-controls');

          if (!_this.hasClass(activeClass) && $(_target).css('display') === 'none') {
            // 닫기
            $trigger.removeClass(activeClass).attr('aria-expanded', false);
            $panel.css('display', 'none');
            // 열기
            _this.addClass(activeClass).attr('aria-expanded', true);
            $(_target).css('display', 'block');

            // 화면 이동
            if (settings.viewMoving === true) {
              $('html, body').stop().animate({
                scrollTop: _this.offset().top
              }, 800);
            }
          } else {
            _this.removeClass(activeClass).attr('aria-expanded', false);
            $(_target).css('display', 'none');
          }

          return false;
        });
      };

      var init = function () {
        _create();
      };

      init();
    });
  };

  $.fn.accordionUi.defaults = {
    animate:{},
    triggerClass: 'accordion-trigger',
    panelClass: 'accordion-panel',
    headingClass: 'accordion-heading',
    activeClass: 'is-current',
    collapsible: false,
    viewMoving: false,
    // Callbacks
    activate: null
  };


})(window, document, jQuery);
