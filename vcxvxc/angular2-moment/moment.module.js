"use strict";
var core_1 = require('@angular/core');
var add_pipe_1 = require('./add.pipe');
var calendar_pipe_1 = require('./calendar.pipe');
var date_format_pipe_1 = require('./date-format.pipe');
var difference_pipe_1 = require('./difference.pipe');
var duration_pipe_1 = require('./duration.pipe');
var from_unix_pipe_1 = require('./from-unix.pipe');
var subtract_pipe_1 = require('./subtract.pipe');
var time_ago_pipe_1 = require('./time-ago.pipe');
var utc_pipe_1 = require('./utc.pipe');
var ANGULAR_MOMENT_PIPES = [
    add_pipe_1.AddPipe,
    calendar_pipe_1.CalendarPipe,
    date_format_pipe_1.DateFormatPipe,
    difference_pipe_1.DifferencePipe,
    duration_pipe_1.DurationPipe,
    from_unix_pipe_1.FromUnixPipe,
    subtract_pipe_1.SubtractPipe,
    time_ago_pipe_1.TimeAgoPipe,
    utc_pipe_1.UtcPipe
];
var MomentModule = (function () {
    function MomentModule() {
    }
    MomentModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: ANGULAR_MOMENT_PIPES,
                    exports: ANGULAR_MOMENT_PIPES
                },] },
    ];
    /** @nocollapse */
    MomentModule.ctorParameters = [];
    return MomentModule;
}());
exports.MomentModule = MomentModule;
//# sourceMappingURL=moment.module.js.map