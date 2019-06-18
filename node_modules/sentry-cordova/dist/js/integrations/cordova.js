"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hub_1 = require("@sentry/hub");
var normalize_1 = require("../normalize");
/** Default Breadcrumbs instrumentations */
var Cordova = /** @class */ (function () {
    function Cordova() {
        /**
         * @inheritDoc
         */
        this.name = 'Cordova';
    }
    /**
     * @inheritDoc
     */
    Cordova.prototype.install = function () {
        hub_1.getDefaultHub().addEventProcessor(function (event) { return normalize_1.normalizeData(event); });
    };
    return Cordova;
}());
exports.Cordova = Cordova;
//# sourceMappingURL=cordova.js.map