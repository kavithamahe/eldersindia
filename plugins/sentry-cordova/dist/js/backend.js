"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("@sentry/browser");
var types_1 = require("@sentry/types");
var PLUGIN_NAME = 'Sentry';
/** The Sentry Cordova SDK Backend. */
var CordovaBackend = /** @class */ (function () {
    /** Creates a new cordova backend instance. */
    function CordovaBackend(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.browserBackend = new browser_1.BrowserBackend(options);
    }
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.install = function () {
        var _this = this;
        this.browserBackend.install();
        if (this.isCordova()) {
            this.deviceReadyCallback = function () { return _this.runNativeInstall(); };
            document.addEventListener('deviceready', this.deviceReadyCallback);
        }
        return true;
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.eventFromException = function (exception) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.browserBackend.eventFromException(exception)];
            });
        });
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.eventFromMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.browserBackend.eventFromMessage(message)];
            });
        });
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.sendEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.nativeCall('sendEvent', event)];
                    case 1:
                        _a.sent();
                        // Otherwise this is from native response
                        return [2 /*return*/, { status: types_1.Status.Success }];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, this.browserBackend.sendEvent(event)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // CORDOVA --------------------
    CordovaBackend.prototype.nativeCall = function (action) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var exec = window && window.Cordova && window.Cordova.exec;
            if (!exec) {
                reject('Cordova.exec not available');
            }
            else {
                window.Cordova.exec(resolve, reject, PLUGIN_NAME, action, args);
            }
        });
    };
    CordovaBackend.prototype.runNativeInstall = function () {
        document.removeEventListener('deviceready', this.deviceReadyCallback);
        if (this.options.dsn && this.options.enabled !== false) {
            this.nativeCall('install', this.options.dsn, this.options);
        }
    };
    CordovaBackend.prototype.isCordova = function () {
        return window.cordova !== undefined || window.Cordova !== undefined;
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.storeBreadcrumb = function (breadcrumb) {
        this.nativeCall('addBreadcrumb', breadcrumb).catch(function () {
            // We do nothing since all breadcrumbs are attached in the event.
            // This only applies to android.
        });
        return true;
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.storeScope = function (scope) {
        this.nativeCall('setExtraContext', scope.getExtra()).catch(function () {
            // We do nothing since scope is handled and attached to the event.
            // This only applies to android.
        });
        this.nativeCall('setTagsContext', scope.getTags()).catch(function () {
            // We do nothing since scope is handled and attached to the event.
            // This only applies to android.
        });
        this.nativeCall('setUserContext', scope.getUser()).catch(function () {
            // We do nothing since scope is handled and attached to the event.
            // This only applies to android.
        });
    };
    return CordovaBackend;
}());
exports.CordovaBackend = CordovaBackend;
//# sourceMappingURL=backend.js.map