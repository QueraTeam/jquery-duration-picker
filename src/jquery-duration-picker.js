(function ($) {

    $.fn.duration_picker = function (options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            words: {
                days: 'days',
                hours: 'hours',
                minutes: 'minutes',
                seconds: 'seconds'
            },
            backgroundColor: "white"
        }, options);

        var picker = $();

        console.log(picker);

        this.each(function (i, e) {

            var has_error = false;

            function set_error(err) {
                has_error = err;
                if (err) {
                    $(e).addClass('error');
                    picker.find('input').attr('disabled', 'disabled').addClass('disabled');
                }
                else {
                    $(e).removeClass('error');
                    picker.find('input').removeAttr('disabled').removeClass('disabled');
                }
            }

            function picker_to_field() {
                var s = '';
                var days = parseInt(day_input.val());
                var hours = parseInt(hour_input.val());
                var minutes = parseInt(minute_input.val());
                var seconds = parseInt(second_input.val());
                if (day_input.val() != 0)
                    s += days + 'd';
                if (hour_input.val() != 0)
                    s += hours + 'h';
                if (minute_input.val() != 0)
                    s += minutes + 'm';
                if (second_input.val() != 0)
                    s += seconds + 's';
                seconds += minutes * 60 + hours * 60 * 60 + days * 24 * 60 * 60;
                $(e).val(s);
                $(e).data('seconds', seconds);
            }

            function field_to_picker() {
                var s = $(e).val();
                var re = /(\d+)([dhms])/g;
                var len = 0;
                var seconds = 0;
                do {
                    var m = re.exec(s);
                    if (m) {
                        len += m[0].length;
                        var a = parseInt(m[1]);
                        switch (m[2]) {
                            case 'd':
                                seconds += a * 24 * 60 * 60;
                                day_input.val(a);
                                break;
                            case 'h':
                                if (a < 0 || a > 23) {
                                    set_error(true);
                                    return;
                                }
                                seconds += a * 60 * 60;
                                hour_input.val(a);
                                break;
                            case 'm':
                                if (a < 0 || a > 59) {
                                    set_error(true);
                                    return;
                                }
                                seconds += a * 60;
                                minute_input.val(a);
                                break;
                            case 's':
                                if (a < 0 || a > 59) {
                                    set_error(true);
                                    return;
                                }
                                seconds += a;
                                second_input.val(a);
                                break;
                            default:
                                set_error(true);
                                return;
                        }
                    }
                } while (m);
                if (len != s.length) {
                    set_error(true);
                    return;
                }
                set_error(false);
                $(e).data('seconds', seconds);
            }

            var picker = $('<div class="ui custom popup top left transition hidden"></div>').css('width', 120);
            var num_input = $('<input style="width: 40px;" type="number" min="0" value="0">');
            var day_input = num_input.clone().change(picker_to_field);
            $('<div class="ui small transparent input"> ' + settings.words['days'] + '</div>').prepend(day_input).appendTo(picker);
            var hour_input = num_input.clone().attr('max', 23).change(picker_to_field);
            $('<div class="ui small transparent input"> ' + settings.words['hours'] + '</div>').prepend(hour_input).appendTo(picker);
            var minute_input = num_input.clone().attr('max', 59).change(picker_to_field);
            $('<div class="ui small transparent input"> ' + settings.words['minutes'] + '</div>').prepend(minute_input).appendTo(picker);
            var second_input = num_input.clone().attr('max', 59).change(picker_to_field);
            $('<div class="ui small transparent input"> ' + settings.words['seconds'] + '</div>').prepend(second_input).appendTo(picker);
            $('body').append(picker);
            field_to_picker();
            $(e).keyup(field_to_picker);
            $(e).popup({
                on: 'click',
                position: 'bottom center',
                exclusive: true,
                popup: picker
            });
        });

    };

}(jQuery));