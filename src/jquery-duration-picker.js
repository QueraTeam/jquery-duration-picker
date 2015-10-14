(function ($) {

    var langs = {
        en: {
            day: 'day',
            hour: 'hour',
            minute: 'minute',
            second: 'second',
            days: 'days',
            hours: 'hours',
            minutes: 'minutes',
            seconds: 'seconds'
        },
        fa: {
            day: 'روز',
            hour: 'ساعت',
            minute: 'دقیقه',
            second: 'ثانیه',
            days: 'روز',
            hours: 'ساعت',
            minutes: 'دقیقه',
            seconds: 'ثانیه'
        }
    };

    $.fn.duration_picker = function (options) {

        var settings = $.extend({
            lang: 'en',
            formatter: function(s) {return s}
        }, options);

        this.each(function (i, e) {

            e = $(e);
            
            if (e.data('jdp') === '1')
                return;

            var e2 = $('<div class="jdp-input">' +
                '<div class="jdp-block">' +
                    '<span id="jdp-days"></span><br>' +
                    '<span class="jdp-label" id="days_label"></span>' +
                '</div>' +
                '<div class="jdp-block">' +
                    '<span id="jdp-hours"></span><br>' +
                    '<span class="jdp-label" id="hours_label"></span>' +
                '</div>' +
                '<div class="jdp-block">' +
                    '<span id="jdp-minutes"></span><br>' +
                    '<span class="jdp-label" id="minutes_label"></span>' +
                '</div>' +
                '<div class="jdp-block">' +
                    '<span id="jdp-seconds"></span><br>' +
                    '<span class="jdp-label" id="seconds_label"></span>' +
                '</div>' +
            '</div>');

            e.after(e2).hide().data('jdp', '1');

            var days = 0;
            var hours = 0;
            var minutes = 0;
            var seconds = 0;

            var disabled = false;
            if (e.hasClass('disabled') || e.attr('disabled')=='disabled') {
                disabled = true;
                e2.addClass('disabled');
            }

            function update_e() {
                var total = seconds + minutes * 60 + hours * 60 * 60 + days * 24 * 60 * 60;
                e.val(total);
                e.change();
            }
            
            function update_e2() {
                e2.find('#jdp-days').text(settings.formatter(days));
                e2.find('#jdp-hours').text(settings.formatter(hours));
                e2.find('#jdp-minutes').text(settings.formatter(minutes));
                e2.find('#jdp-seconds').text(settings.formatter(seconds));
                if (days == 1)
                    e2.find('#days_label').text(langs[settings.lang]['day']);
                else
                    e2.find('#days_label').text(langs[settings.lang]['days']);
                if (hours == 1)
                    e2.find('#hours_label').text(langs[settings.lang]['hour']);
                else
                    e2.find('#hours_label').text(langs[settings.lang]['hours']);
                if (minutes == 1)
                    e2.find('#minutes_label').text(langs[settings.lang]['minute']);
                else
                    e2.find('#minutes_label').text(langs[settings.lang]['minutes']);
                if (seconds == 1)
                    e2.find('#seconds_label').text(langs[settings.lang]['second']);
                else
                    e2.find('#seconds_label').text(langs[settings.lang]['seconds']);
            }
            
            function update_picker() {
                if (disabled)
                    return;
                day_input.val(days);
                hour_input.val(hours);
                minute_input.val(minutes);
                second_input.val(seconds);
            }

            function init() {
                if (e.val() === '')
                    e.val(0);
                var total = parseInt(e.val(), 10);
                seconds = total % 60;
                total = Math.floor(total/60);
                minutes = total % 60;
                total = Math.floor(total/60);
                hours = total % 24;
                days = Math.floor(total/24);
                update_e2();
                update_picker();
            }

            function picker_changed() {
                days = parseInt(day_input.val());
                hours = parseInt(hour_input.val());
                minutes = parseInt(minute_input.val());
                seconds = parseInt(second_input.val());
                update_e();
                update_e2();
            }

            if (!disabled) {
                var picker = $('<div class="ui custom popup top left transition hidden"></div>').css('width', 110);
                var num_input = $('<input style="width: 40px;" type="number" min="0" value="0">');
                var day_input = num_input.clone().change(picker_changed);
                $('<div class="ui small transparent input"> ' + langs[settings.lang]['days'] + '</div>').prepend(day_input).appendTo(picker);
                var hour_input = num_input.clone().attr('max', 23).change(picker_changed);
                $('<div class="ui small transparent input"> ' + langs[settings.lang]['hours'] + '</div>').prepend(hour_input).appendTo(picker);
                var minute_input = num_input.clone().attr('max', 59).change(picker_changed);
                $('<div class="ui small transparent input"> ' + langs[settings.lang]['minutes'] + '</div>').prepend(minute_input).appendTo(picker);
                var second_input = num_input.clone().attr('max', 59).change(picker_changed);
                $('<div class="ui small transparent input"> ' + langs[settings.lang]['seconds'] + '</div>').prepend(second_input).appendTo(picker);
                e.after(picker);
                e2.popup({
                    on: 'click',
                    position: 'bottom center',
                    exclusive: true,
                    popup: picker
                });
            }
            init();
            e.change(init);
        });

    };

}(jQuery));
