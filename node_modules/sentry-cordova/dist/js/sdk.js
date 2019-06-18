"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("@sentry/browser");
var core_1 = require("@sentry/core");
var client_1 = require("./client");
var integrations_1 = require("./integrations");
var minimal_1 = require("@sentry/minimal");
function init(options) {
    core_1.initAndBind(client_1.CordovaClient, options, __spread(browser_1.defaultIntegrations, [new integrations_1.Cordova(), new integrations_1.Release(), new integrations_1.SDKInformation()]));
}
exports.init = init;
function setRelease(release) {
    minimal_1.configureScope(function (scope) {
        scope.setExtra('__sentry_release', release);
    });
}
exports.setRelease = setRelease;
function setDist(dist) {
    minimal_1.configureScope(function (scope) {
        scope.setExtra('__sentry_dist', dist);
    });
}
exports.setDist = setDist;
//# sourceMappingURL=sdk.js.map