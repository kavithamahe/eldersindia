"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@sentry/types");
exports.Severity = types_1.Severity;
var minimal_1 = require("@sentry/minimal");
exports.addBreadcrumb = minimal_1.addBreadcrumb;
exports.captureMessage = minimal_1.captureMessage;
exports.captureException = minimal_1.captureException;
exports.captureEvent = minimal_1.captureEvent;
exports.configureScope = minimal_1.configureScope;
var hub_1 = require("@sentry/hub");
exports.getDefaultHub = hub_1.getDefaultHub;
exports.getHubFromCarrier = hub_1.getHubFromCarrier;
exports.Hub = hub_1.Hub;
exports.Scope = hub_1.Scope;
var backend_1 = require("./backend");
exports.CordovaBackend = backend_1.CordovaBackend;
var client_1 = require("./client");
exports.CordovaClient = client_1.CordovaClient;
var sdk_1 = require("./sdk");
exports.init = sdk_1.init;
exports.setDist = sdk_1.setDist;
exports.setRelease = sdk_1.setRelease;
var version_1 = require("./version");
exports.SDK_NAME = version_1.SDK_NAME;
exports.SDK_VERSION = version_1.SDK_VERSION;
var Integrations = require("./integrations");
exports.Integrations = Integrations;
//# sourceMappingURL=sentry-cordova.js.map