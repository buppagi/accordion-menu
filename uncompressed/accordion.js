;(function (window, document, $){
  "use strict";

  $.fn.accordionUi = function (options) {
    var settings = $.extend(true, {}, $.fn.accordionUi.defaults, options);
    var self = this;

    return self.each(function () {
      var $selector = $(this),
        $trigger = $selector.find('.' + settings.triggerClass),
        $panel = $selector.find('.' + settings.panelClass),
        $heading = $selector.find('.' + settings.headingClass),
        labelledby = $trigger.attr('id');

      var create = function () {
        $selector.attr('role', 'presentation');
        // heading 태그 체크
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
              'aria-expanded': false
            });
          } else if ($this.is('button')) {
            $this.attr({
              'aria-expanded': false
            });
          }
        });

        $panel.attr({
          'aria-labelledby': labelledby,
          'role': 'region'
        });

        // 기본으로 펼쳐져있는 것 체크
        if ($selector.find('.' + settings.activeClass).length && $($selector.find('.' + settings.activeClass).attr('href')).css('display') === 'block') {
          $selector.find('.' + settings.activeClass).attr('aria-expanded', true);
        }

        eventAction();
      };

      var eventAction = function () {
        $trigger.on('click', function (e) {
          var _this = $(this),
            _target = '#' + _this.attr('aria-controls');

          if (!_this.hasClass(settings.activeClass) && $(_target).css('display') === 'none') {
            // 닫기
            $trigger.removeClass(settings.activeClass).attr('aria-expanded', false);
            $panel.css('display', 'none');
            // 열기
            _this.addClass(settings.activeClass).attr('aria-expanded', true);
            $(_target).css('display', 'block');

            // 화면 이동
            if (settings.viewMoving === true) {
              $('html, body').stop().animate({
                scrollTop: _this.offset().top
              }, 800);
            }
          } else {
            _this.removeClass(settings.activeClass).attr('aria-expanded', false);
            $(_target).css('display', 'none');
          }

          return false;
        });
      };

      var init = function () {
        create();
      };

      init();
    });
  };

  $.fn.accordionUi.defaults = {
    triggerClass: 'accordion-trigger',
    panelClass: 'accordion-panel',
    headingClass: 'accordion-heading',
    activeClass: 'is-current',
    viewMoving: false
  };
})(window, document, jQuery);