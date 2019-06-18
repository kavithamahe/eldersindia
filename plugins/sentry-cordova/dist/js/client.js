"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@sentry/core");
var backend_1 = require("./backend");
/**
 * The Sentry Cordova SDK Client.
 *
 * @see CordovaOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
var CordovaClient = /** @class */ (function (_super) {
    __extends(CordovaClient, _super);
    /**
     * Creates a new Cordova SDK instance.
     * @param options Configuration options for this SDK.
     */
    function CordovaClient(options) {
        return _super.call(this, backend_1.CordovaBackend, options) || this;
    }
    return CordovaClient;
}(core_1.BaseClient));
exports.CordovaClient = CordovaClient;
//# sourceMappingURL=client.js.map