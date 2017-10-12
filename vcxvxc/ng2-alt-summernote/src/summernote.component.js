"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../summernote.d.ts" />
var $ = require("jquery");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SUMMERNOTE_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return SummernoteComponent; }),
    multi: true
};
var SummernoteComponent = (function () {
    function SummernoteComponent(element) {
        this.element = element;
        this.whitespaceEmpty = false;
        this.emptyChange = new core_1.EventEmitter();
        this.textChange = new core_1.EventEmitter();
        this._disabled = false;
        this.onTouched = function () { };
        this.onChange = function () { };
    }
    Object.defineProperty(SummernoteComponent.prototype, "options", {
        get: function () {
            return this._options || {};
        },
        set: function (options) {
            this._options = options;
            this.addCallbacks();
            this.refreshOptions();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SummernoteComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            if (disabled != null) {
                this._disabled = disabled;
                $(this.element.nativeElement).find('.summernote').summernote(disabled ? 'disable' : 'enable');
                this.refreshOptions();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SummernoteComponent.prototype, "empty", {
        get: function () {
            return this._empty;
        },
        set: function (value) {
            if (this._empty != value) {
                this._empty = value;
                this.emptyChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SummernoteComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    SummernoteComponent.prototype.refreshOptions = function () {
        $(this.element.nativeElement).find('.summernote').summernote(this.options);
        if (this.options.tooltip != undefined && !this.options.tooltip)
            $(this.element.nativeElement).find('.note-editor button.note-btn').tooltip('destroy');
    };
    SummernoteComponent.prototype.addCallbacks = function () {
        var _this = this;
        this.options.callbacks = {
            onChange: function (contents, $editable) {
                _this.refreshEmpty();
                _this.onChange(contents);
            },
            onBlur: function () {
                _this.onTouched();
            },
            onImageUpload: function (data) {
                data.pop();
            }
        };
    };
    SummernoteComponent.prototype.refreshEmpty = function () {
        var summernote = $(this.element.nativeElement).find('.summernote');
        if (summernote == null)
            return;
        this.empty = summernote.summernote('isEmpty');
        if (this.whitespaceEmpty)
            this.empty = this.empty || summernote.summernote('code').replace(/(<\/?[^>]+>)|(&nbsp;)/g, "").trim() === '';
    };
    SummernoteComponent.prototype.ngOnInit = function () {
        if (this.options == null) {
            this.options = {};
        }
        this.refreshEmpty();
    };
    SummernoteComponent.prototype.ngOnDestroy = function () {
        $(this.element.nativeElement).find('.summernote').summernote('destroy');
    };
    SummernoteComponent.prototype.writeValue = function (code) {
        this.value = code;
        $(this.element.nativeElement).find('.summernote').summernote('code', code);
        this.refreshEmpty();
    };
    SummernoteComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    SummernoteComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return SummernoteComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SummernoteComponent.prototype, "options", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SummernoteComponent.prototype, "disabled", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SummernoteComponent.prototype, "whitespaceEmpty", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SummernoteComponent.prototype, "emptyChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SummernoteComponent.prototype, "textChange", void 0);
SummernoteComponent = __decorate([
    core_1.Component({
        selector: 'summernote',
        template: '<div class="summernote"></div>',
        providers: [SUMMERNOTE_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], SummernoteComponent);
exports.SummernoteComponent = SummernoteComponent;
//# sourceMappingURL=summernote.component.js.map