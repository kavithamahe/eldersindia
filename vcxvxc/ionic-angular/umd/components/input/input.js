var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/forms', '../app/app', '../../config/config', '../content/content', '../../util/dom', '../../platform/dom-controller', '../../util/form', '../ion', '../../util/util', '../item/item', './native-input', '../../navigation/nav-controller', '../../platform/platform'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var forms_1 = require('@angular/forms');
    var app_1 = require('../app/app');
    var config_1 = require('../../config/config');
    var content_1 = require('../content/content');
    var dom_1 = require('../../util/dom');
    var dom_controller_1 = require('../../platform/dom-controller');
    var form_1 = require('../../util/form');
    var ion_1 = require('../ion');
    var util_1 = require('../../util/util');
    var item_1 = require('../item/item');
    var native_input_1 = require('./native-input');
    var nav_controller_1 = require('../../navigation/nav-controller');
    var platform_1 = require('../../platform/platform');
    /**
     * @name Input
     * @description
     *
     * `ion-input` is meant for text type inputs only, such as `text`,
     * `password`, `email`, `number`, `search`, `tel`, and `url`. Ionic
     * still uses an actual `<input type="text">` HTML element within the
     * component, however, with Ionic wrapping the native HTML input
     * element it's able to better handle the user experience and
     * interactivity.
     *
     * Similarily, `<ion-textarea>` should be used in place of `<textarea>`.
     *
     * An `ion-input` is **not** used for non-text type inputs, such as a
     * `checkbox`, `radio`, `toggle`, `range`, `select`, etc.
     *
     *
     * @usage
     * ```html
     * <ion-list>
     *   <ion-item>
     *     <ion-label color="primary">Inline Label</ion-label>
     *     <ion-input placeholder="Text Input"></ion-input>
     *   </ion-item>
     *
     *   <ion-item>
     *     <ion-label color="primary" fixed>Fixed Label</ion-label>
     *     <ion-input type="tel" placeholder="Tel Input"></ion-input>
     *   </ion-item>
     *
     *   <ion-item>
     *     <ion-input type="number" placeholder="Number Input with no label"></ion-input>
     *   </ion-item>
     *
     *   <ion-item>
     *     <ion-label color="primary" stacked>Stacked Label</ion-label>
     *     <ion-input type="email" placeholder="Email Input"></ion-input>
     *   </ion-item>
     *
     *   <ion-item>
     *     <ion-label color="primary" stacked>Stacked Label</ion-label>
     *     <ion-input type="password" placeholder="Password Input"></ion-input>
     *   </ion-item>
     *
     *   <ion-item>
     *     <ion-label color="primary" floating>Floating Label</ion-label>
     *     <ion-input></ion-input>
     *   </ion-item>
     *
     *   <ion-item>
     *     <ion-input placeholder="Clear Input" clearInput></ion-input>
     *   </ion-item>
     *
     *   <ion-item>
     *     <ion-textarea placeholder="Enter a description"></ion-textarea>
     *   </ion-item>
     * </ion-list>
     * ```
     *
     * @demo /docs/v2/demos/src/input/
     */
    var TextInput = (function (_super) {
        __extends(TextInput, _super);
        function TextInput(config, _plt, _form, _app, elementRef, renderer, _content, _item, nav, ngControl, _dom) {
            var _this = this;
            _super.call(this, config, elementRef, renderer, 'input');
            this._plt = _plt;
            this._form = _form;
            this._app = _app;
            this._content = _content;
            this._item = _item;
            this.ngControl = ngControl;
            this._dom = _dom;
            this._clearInput = false;
            this._disabled = false;
            this._readonly = false;
            this._type = 'text';
            this._value = '';
            /**
             * @input {string} The placeholder for the input
             */
            this.placeholder = '';
            /**
             * @output {event} Expression to call when the input no longer has focus
             */
            this.blur = new core_1.EventEmitter();
            /**
             * @output {event} Expression to call when the input has focus
             */
            this.focus = new core_1.EventEmitter();
            this._nav = nav;
            this._autoFocusAssist = config.get('autoFocusAssist', 'delay');
            this._autoComplete = config.get('autocomplete', 'off');
            this._autoCorrect = config.get('autocorrect', 'off');
            this._keyboardHeight = config.getNumber('keyboardHeight');
            this._useAssist = config.getBoolean('scrollAssist', false);
            this._usePadding = config.getBoolean('scrollPadding', this._useAssist);
            if (elementRef.nativeElement.tagName === 'ION-TEXTAREA') {
                this._type = TEXTAREA;
            }
            if (ngControl) {
                ngControl.valueAccessor = this;
                this.inputControl = ngControl;
            }
            _form.register(this);
            // only listen to content scroll events if there is content
            if (_content) {
                this._scrollStart = _content.ionScrollStart.subscribe(function (ev) {
                    _this.scrollHideFocus(ev, true);
                });
                this._scrollEnd = _content.ionScrollEnd.subscribe(function (ev) {
                    _this.scrollHideFocus(ev, false);
                });
            }
            this.mode = config.get('mode');
        }
        Object.defineProperty(TextInput.prototype, "clearInput", {
            /**
             * @input {boolean} A clear icon will appear in the input when there is a value. Clicking it clears the input.
             */
            get: function () {
                return this._clearInput;
            },
            set: function (val) {
                this._clearInput = (this._type !== TEXTAREA && util_1.isTrueProperty(val));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "value", {
            /**
             * @input {string} The text value of the input
             */
            get: function () {
                return this._value;
            },
            set: function (val) {
                this._value = val;
                this.checkHasValue(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "type", {
            /**
             * @input {string} The HTML input type (text, password, email, number, search, tel, or url)
             */
            get: function () {
                return this._type;
            },
            set: function (val) {
                if (this._type !== TEXTAREA) {
                    this._type = 'text';
                    if (util_1.isString(val)) {
                        val = val.toLowerCase();
                        if (TEXT_TYPE_REGEX.test(val)) {
                            this._type = val;
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "disabled", {
            /**
             * @input {boolean} If the input should be disabled or not
             */
            get: function () {
                return this.ngControl ? this.ngControl.disabled : this._disabled;
            },
            set: function (val) {
                this.setDisabled(this._disabled = util_1.isTrueProperty(val));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        TextInput.prototype.setDisabled = function (val) {
            this._item && this._item.setElementClass('item-input-disabled', val);
            this._native && this._native.isDisabled(val);
        };
        Object.defineProperty(TextInput.prototype, "readonly", {
            /**
             * @input {boolean} If the input should be readonly or not
             */
            get: function () {
                return this._readonly;
            },
            set: function (val) {
                this._readonly = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "mode", {
            /**
             * @input {string} The mode to apply to this component.
             */
            set: function (val) {
                this._setMode(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "clearOnEdit", {
            /**
             * @input {boolean} whether to clear the input upon editing or not
             */
            get: function () {
                return this._clearOnEdit;
            },
            set: function (val) {
                this._clearOnEdit = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "_nativeInput", {
            /**
             * @private
             */
            set: function (nativeInput) {
                if (this.type !== TEXTAREA) {
                    this.setNativeInput(nativeInput);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "_nativeTextarea", {
            /**
             * @private
             */
            set: function (nativeInput) {
                if (this.type === TEXTAREA) {
                    this.setNativeInput(nativeInput);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "_nextInput", {
            /**
             * @private
             */
            set: function (nextInput) {
                var _this = this;
                if (nextInput) {
                    nextInput.focused.subscribe(function () {
                        _this._form.tabFocus(_this);
                    });
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        TextInput.prototype.setNativeInput = function (nativeInput) {
            var _this = this;
            this._native = nativeInput;
            nativeInput.setValue(this._value);
            nativeInput.isDisabled(this.disabled);
            if (this._item && this._item.labelId !== null) {
                nativeInput.labelledBy(this._item.labelId);
            }
            nativeInput.valueChange.subscribe(function (inputValue) {
                _this.onChange(inputValue);
                _this.checkHasValue(inputValue);
            });
            nativeInput.keydown.subscribe(function (inputValue) {
                _this.onKeydown(inputValue);
            });
            this.focusChange(this.hasFocus());
            nativeInput.focusChange.subscribe(function (textInputHasFocus) {
                _this.focusChange(textInputHasFocus);
                _this.checkHasValue(nativeInput.getValue());
                if (!textInputHasFocus) {
                    _this.onTouched(textInputHasFocus);
                }
            });
            this.checkHasValue(nativeInput.getValue());
            var ionInputEle = this._elementRef.nativeElement;
            var nativeInputEle = nativeInput.element();
            // copy ion-input attributes to the native input element
            dom_1.copyInputAttributes(ionInputEle, nativeInputEle);
            if (ionInputEle.hasAttribute('autofocus')) {
                // the ion-input element has the autofocus attributes
                ionInputEle.removeAttribute('autofocus');
                if (this._autoFocusAssist === 'immediate') {
                    // config says to immediate focus on the input
                    // works best on android devices
                    nativeInputEle.focus();
                }
                else if (this._autoFocusAssist === 'delay') {
                    // config says to chill out a bit and focus on the input after transitions
                    // works best on desktop
                    this._plt.timeout(function () {
                        nativeInputEle.focus();
                    }, 650);
                }
            }
            // by default set autocomplete="off" unless specified by the input
            if (ionInputEle.hasAttribute('autocomplete')) {
                this._autoComplete = ionInputEle.getAttribute('autocomplete');
            }
            nativeInputEle.setAttribute('autocomplete', this._autoComplete);
            // by default set autocorrect="off" unless specified by the input
            if (ionInputEle.hasAttribute('autocorrect')) {
                this._autoCorrect = ionInputEle.getAttribute('autocorrect');
            }
            nativeInputEle.setAttribute('autocorrect', this._autoCorrect);
        };
        /**
         * @private
         */
        TextInput.prototype.initFocus = function () {
            var _this = this;
            // begin the process of setting focus to the inner input element
            var app = this._app;
            var content = this._content;
            var nav = this._nav;
            var nativeInput = this._native;
            (void 0) /* console.debug */;
            if (content) {
                // this input is inside of a scroll view
                // find out if text input should be manually scrolled into view
                // get container of this input, probably an ion-item a few nodes up
                var ele = this._elementRef.nativeElement;
                ele = ele.closest('ion-item,[ion-item]') || ele;
                var scrollData = getScrollData(ele.offsetTop, ele.offsetHeight, content.getContentDimensions(), this._keyboardHeight, this._plt.height());
                if (Math.abs(scrollData.scrollAmount) < 4) {
                    // the text input is in a safe position that doesn't
                    // require it to be scrolled into view, just set focus now
                    this.setFocus();
                    // all good, allow clicks again
                    app.setEnabled(true);
                    nav && nav.setTransitioning(false);
                    if (this._usePadding) {
                        content.clearScrollPaddingFocusOut();
                    }
                    return;
                }
                if (this._usePadding) {
                    // add padding to the bottom of the scroll view (if needed)
                    content.addScrollPadding(scrollData.scrollPadding);
                }
                // manually scroll the text input to the top
                // do not allow any clicks while it's scrolling
                var scrollDuration = getScrollAssistDuration(scrollData.scrollAmount);
                app.setEnabled(false, scrollDuration);
                nav && nav.setTransitioning(true);
                // temporarily move the focus to the focus holder so the browser
                // doesn't freak out while it's trying to get the input in place
                // at this point the native text input still does not have focus
                nativeInput.beginFocus(true, scrollData.inputSafeY);
                // scroll the input into place
                content.scrollTo(0, scrollData.scrollTo, scrollDuration, function () {
                    (void 0) /* console.debug */;
                    // the scroll view is in the correct position now
                    // give the native text input focus
                    nativeInput.beginFocus(false, 0);
                    // ensure this is the focused input
                    _this.setFocus();
                    // all good, allow clicks again
                    app.setEnabled(true);
                    nav && nav.setTransitioning(false);
                    if (_this._usePadding) {
                        content.clearScrollPaddingFocusOut();
                    }
                });
            }
            else {
                // not inside of a scroll view, just focus it
                this.setFocus();
            }
        };
        /**
         * @private
         */
        TextInput.prototype.setFocus = function () {
            var _this = this;
            // immediately set focus
            this._form.setAsFocused(this);
            // set focus on the actual input element
            (void 0) /* console.debug */;
            this._native.setFocus();
            // ensure the body hasn't scrolled down
            this._dom.write(function () {
                _this._plt.doc().body.scrollTop = 0;
            });
        };
        /**
         * @private
         */
        TextInput.prototype.scrollHideFocus = function (ev, shouldHideFocus) {
            var _this = this;
            // do not continue if there's no nav, or it's transitioning
            if (this._nav && this.hasFocus()) {
                // if it does have focus, then do the dom write
                this._dom.write(function () {
                    _this._native.hideFocus(shouldHideFocus);
                });
            }
        };
        /**
         * @private
         */
        TextInput.prototype.inputBlurred = function (ev) {
            this.blur.emit(ev);
        };
        /**
         * @private
         */
        TextInput.prototype.inputFocused = function (ev) {
            this.focus.emit(ev);
        };
        /**
         * @private
         */
        TextInput.prototype.writeValue = function (val) {
            this._value = val;
            this.checkHasValue(val);
        };
        /**
         * @private
         */
        TextInput.prototype.onChange = function (val) {
            this.checkHasValue(val);
        };
        /**
         * @private
         */
        TextInput.prototype.onKeydown = function (val) {
            if (this._clearOnEdit) {
                this.checkClearOnEdit(val);
            }
        };
        /**
         * @private
         */
        TextInput.prototype.onTouched = function (val) { };
        /**
         * @private
         */
        TextInput.prototype.hasFocus = function () {
            // check if an input has focus or not
            return this._plt.hasFocus(this._native.element());
        };
        /**
         * @private
         */
        TextInput.prototype.hasValue = function () {
            var inputValue = this._value;
            return (inputValue !== null && inputValue !== undefined && inputValue !== '');
        };
        /**
         * @private
         */
        TextInput.prototype.checkHasValue = function (inputValue) {
            if (this._item) {
                var hasValue = (inputValue !== null && inputValue !== undefined && inputValue !== '');
                this._item.setElementClass('input-has-value', hasValue);
            }
        };
        /**
         * @private
         */
        TextInput.prototype.focusChange = function (inputHasFocus) {
            if (this._item) {
                (void 0) /* console.debug */;
                this._item.setElementClass('input-has-focus', inputHasFocus);
            }
            // If clearOnEdit is enabled and the input blurred but has a value, set a flag
            if (this._clearOnEdit && !inputHasFocus && this.hasValue()) {
                this._didBlurAfterEdit = true;
            }
        };
        /**
         * @private
         */
        TextInput.prototype.pointerStart = function (ev) {
            // input cover touchstart
            if (ev.type === 'touchstart') {
                this._isTouch = true;
            }
            if ((this._isTouch || (!this._isTouch && ev.type === 'mousedown')) && this._app.isEnabled()) {
                // remember where the touchstart/mousedown started
                this._coord = dom_1.pointerCoord(ev);
            }
            (void 0) /* console.debug */;
        };
        /**
         * @private
         */
        TextInput.prototype.pointerEnd = function (ev) {
            // input cover touchend/mouseup
            (void 0) /* console.debug */;
            if ((this._isTouch && ev.type === 'mouseup') || !this._app.isEnabled()) {
                // the app is actively doing something right now
                // don't try to scroll in the input
                ev.preventDefault();
                ev.stopPropagation();
            }
            else if (this._coord) {
                // get where the touchend/mouseup ended
                var endCoord = dom_1.pointerCoord(ev);
                // focus this input if the pointer hasn't moved XX pixels
                // and the input doesn't already have focus
                if (!dom_1.hasPointerMoved(8, this._coord, endCoord) && !this.hasFocus()) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    // begin the input focus process
                    this.initFocus();
                }
            }
            this._coord = null;
        };
        /**
         * @private
         */
        TextInput.prototype.setItemInputControlCss = function () {
            var item = this._item;
            var nativeInput = this._native;
            var inputControl = this.inputControl;
            // Set the control classes on the item
            if (item && inputControl) {
                setControlCss(item, inputControl);
            }
            // Set the control classes on the native input
            if (nativeInput && inputControl) {
                setControlCss(nativeInput, inputControl);
            }
        };
        /**
         * @private
         */
        TextInput.prototype.ngOnInit = function () {
            var item = this._item;
            if (item) {
                if (this.type === TEXTAREA) {
                    item.setElementClass('item-textarea', true);
                }
                item.setElementClass('item-input', true);
                item.registerInput(this.type);
            }
            // By default, password inputs clear after focus when they have content
            if (this.type === 'password' && this.clearOnEdit !== false) {
                this.clearOnEdit = true;
            }
        };
        /**
         * @private
         */
        TextInput.prototype.ngAfterContentChecked = function () {
            this.setItemInputControlCss();
        };
        /**
         * @private
         */
        TextInput.prototype.ngOnDestroy = function () {
            this._form.deregister(this);
            // only stop listening to content scroll events if there is content
            if (this._content) {
                this._scrollStart.unsubscribe();
                this._scrollEnd.unsubscribe();
            }
        };
        /**
         * @private
         */
        TextInput.prototype.clearTextInput = function () {
            (void 0) /* console.debug */;
            this._value = '';
            this.onChange(this._value);
            this.writeValue(this._value);
        };
        /**
        * Check if we need to clear the text input if clearOnEdit is enabled
        * @private
        */
        TextInput.prototype.checkClearOnEdit = function (inputValue) {
            if (!this._clearOnEdit) {
                return;
            }
            // Did the input value change after it was blurred and edited?
            if (this._didBlurAfterEdit && this.hasValue()) {
                // Clear the input
                this.clearTextInput();
            }
            // Reset the flag
            this._didBlurAfterEdit = false;
        };
        /**
         * @private
         * Angular2 Forms API method called by the view (formControlName) to register the
         * onChange event handler that updates the model (Control).
         * @param {Function} fn  the onChange event handler.
         */
        TextInput.prototype.registerOnChange = function (fn) { this.onChange = fn; };
        /**
         * @private
         * Angular2 Forms API method called by the view (formControlName) to register
         * the onTouched event handler that marks model (Control) as touched.
         * @param {Function} fn  onTouched event handler.
         */
        TextInput.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
        /**
         * @private
         */
        TextInput.prototype.focusNext = function () {
            this._form.tabFocus(this);
        };
        TextInput.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-input,ion-textarea',
                        template: '<input [(ngModel)]="_value" [type]="type" (blur)="inputBlurred($event)" (focus)="inputFocused($event)" [placeholder]="placeholder" [disabled]="disabled" [readonly]="readonly" class="text-input" [ngClass]="\'text-input-\' + _mode" *ngIf="_type!==\'textarea\'"  #input>' +
                            '<textarea [(ngModel)]="_value" (blur)="inputBlurred($event)" (focus)="inputFocused($event)" [placeholder]="placeholder" [disabled]="disabled" [readonly]="readonly" class="text-input" [ngClass]="\'text-input-\' + _mode" *ngIf="_type===\'textarea\'" #textarea></textarea>' +
                            '<input [type]="type" aria-hidden="true" next-input *ngIf="_useAssist">' +
                            '<button ion-button clear [hidden]="!clearInput" type="button" class="text-input-clear-icon" (click)="clearTextInput()" (mousedown)="clearTextInput()"></button>' +
                            '<div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)" (mouseup)="pointerEnd($event)" class="input-cover" tappable *ngIf="_useAssist"></div>',
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        TextInput.ctorParameters = [
            { type: config_1.Config, },
            { type: platform_1.Platform, },
            { type: form_1.Form, },
            { type: app_1.App, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: content_1.Content, decorators: [{ type: core_1.Optional },] },
            { type: item_1.Item, decorators: [{ type: core_1.Optional },] },
            { type: nav_controller_1.NavController, decorators: [{ type: core_1.Optional },] },
            { type: forms_1.NgControl, decorators: [{ type: core_1.Optional },] },
            { type: dom_controller_1.DomController, },
        ];
        TextInput.propDecorators = {
            'placeholder': [{ type: core_1.Input },],
            'clearInput': [{ type: core_1.Input },],
            'value': [{ type: core_1.Input },],
            'type': [{ type: core_1.Input },],
            'disabled': [{ type: core_1.Input },],
            'readonly': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            'clearOnEdit': [{ type: core_1.Input },],
            '_nativeInput': [{ type: core_1.ViewChild, args: ['input', { read: native_input_1.NativeInput },] },],
            '_nativeTextarea': [{ type: core_1.ViewChild, args: ['textarea', { read: native_input_1.NativeInput },] },],
            '_nextInput': [{ type: core_1.ViewChild, args: [native_input_1.NextInput,] },],
            'blur': [{ type: core_1.Output },],
            'focus': [{ type: core_1.Output },],
        };
        return TextInput;
    }(ion_1.Ion));
    exports.TextInput = TextInput;
    /**
     * @name TextArea
     * @description
     *
     * `ion-textarea` is is used for multi-line text inputs. Ionic still
     * uses an actual `<textarea>` HTML element within the component;
     * however, with Ionic wrapping the native HTML text area element, Ionic
     * is able to better handle the user experience and interactivity.
     *
     * Note that `<ion-textarea>` must load its value from the `value` or
     * `[(ngModel)]` attribute. Unlike the native `<textarea>` element,
     * `<ion-textarea>` does not support loading its value from the
     * textarea's inner content.
     *
     * When requiring only a single-line text input, we recommend using
     * `<ion-input>` instead.
     *
     * @usage
     * ```html
     *  <ion-item>
     *    <ion-label>Comments</ion-label>
     *    <ion-textarea></ion-textarea>
     *  </ion-item>
     *
     *  <ion-item>
     *    <ion-label stacked>Message</ion-label>
     *    <ion-textarea [(ngModel)]="msg"></ion-textarea>
     *  </ion-item>
     *
     *  <ion-item>
     *    <ion-label floating>Description</ion-label>
     *    <ion-textarea></ion-textarea>
     *  </ion-item>
     *
     * <ion-item>
     *    <ion-label>Long Description</ion-label>
     *    <ion-textarea rows="6" placeholder="enter long description here..."></ion-textarea>
     *  </ion-item>
     * ```
     *
     * @demo /docs/v2/demos/src/textarea/
     */
    var SCROLL_ASSIST_SPEED = 0.3;
    var TEXTAREA = 'textarea';
    var TEXT_TYPE_REGEX = /password|email|number|search|tel|url|date|month|time|week/;
    /**
     * @private
     */
    function getScrollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, plaformHeight) {
        // compute input's Y values relative to the body
        var inputTop = (inputOffsetTop + scrollViewDimensions.contentTop - scrollViewDimensions.scrollTop);
        var inputBottom = (inputTop + inputOffsetHeight);
        // compute the safe area which is the viewable content area when the soft keyboard is up
        var safeAreaTop = scrollViewDimensions.contentTop;
        var safeAreaHeight = (plaformHeight - keyboardHeight - safeAreaTop) / 2;
        var safeAreaBottom = safeAreaTop + safeAreaHeight;
        // figure out if each edge of teh input is within the safe area
        var inputTopWithinSafeArea = (inputTop >= safeAreaTop && inputTop <= safeAreaBottom);
        var inputTopAboveSafeArea = (inputTop < safeAreaTop);
        var inputTopBelowSafeArea = (inputTop > safeAreaBottom);
        var inputBottomWithinSafeArea = (inputBottom >= safeAreaTop && inputBottom <= safeAreaBottom);
        var inputBottomBelowSafeArea = (inputBottom > safeAreaBottom);
        /*
        Text Input Scroll To Scenarios
        ---------------------------------------
        1) Input top within safe area, bottom within safe area
        2) Input top within safe area, bottom below safe area, room to scroll
        3) Input top above safe area, bottom within safe area, room to scroll
        4) Input top below safe area, no room to scroll, input smaller than safe area
        5) Input top within safe area, bottom below safe area, no room to scroll, input smaller than safe area
        6) Input top within safe area, bottom below safe area, no room to scroll, input larger than safe area
        7) Input top below safe area, no room to scroll, input larger than safe area
        */
        var scrollData = {
            scrollAmount: 0,
            scrollTo: 0,
            scrollPadding: 0,
            inputSafeY: 0
        };
        if (inputTopWithinSafeArea && inputBottomWithinSafeArea) {
            // Input top within safe area, bottom within safe area
            // no need to scroll to a position, it's good as-is
            return scrollData;
        }
        // looks like we'll have to do some auto-scrolling
        if (inputTopBelowSafeArea || inputBottomBelowSafeArea || inputTopAboveSafeArea) {
            // Input top or bottom below safe area
            // auto scroll the input up so at least the top of it shows
            if (safeAreaHeight > inputOffsetHeight) {
                // safe area height is taller than the input height, so we
                // can bring up the input just enough to show the input bottom
                scrollData.scrollAmount = Math.round(safeAreaBottom - inputBottom);
            }
            else {
                // safe area height is smaller than the input height, so we can
                // only scroll it up so the input top is at the top of the safe area
                // however the input bottom will be below the safe area
                scrollData.scrollAmount = Math.round(safeAreaTop - inputTop);
            }
            scrollData.inputSafeY = -(inputTop - safeAreaTop) + 4;
            if (inputTopAboveSafeArea && scrollData.scrollAmount > inputOffsetHeight) {
                // the input top is above the safe area and we're already scrolling it into place
                // don't let it scroll more than the height of the input
                scrollData.scrollAmount = inputOffsetHeight;
            }
        }
        // figure out where it should scroll to for the best position to the input
        scrollData.scrollTo = (scrollViewDimensions.scrollTop - scrollData.scrollAmount);
        // when auto-scrolling, there also needs to be enough
        // content padding at the bottom of the scroll view
        // always add scroll padding when a text input has focus
        // this allows for the content to scroll above of the keyboard
        // content behind the keyboard would be blank
        // some cases may not need it, but when jumping around it's best
        // to have the padding already rendered so there's no jank
        scrollData.scrollPadding = keyboardHeight;
        // var safeAreaEle: HTMLElement = (<any>window).safeAreaEle;
        // if (!safeAreaEle) {
        //   safeAreaEle = (<any>window).safeAreaEle  = document.createElement('div');
        //   safeAreaEle.style.cssText = 'position:absolute; padding:1px 5px; left:0; right:0; font-weight:bold; font-size:10px; font-family:Courier; text-align:right; background:rgba(0, 128, 0, 0.8); text-shadow:1px 1px white; pointer-events:none;';
        //   document.body.appendChild(safeAreaEle);
        // }
        // safeAreaEle.style.top = safeAreaTop + 'px';
        // safeAreaEle.style.height = safeAreaHeight + 'px';
        // safeAreaEle.innerHTML = `
        //   <div>scrollTo: ${scrollData.scrollTo}</div>
        //   <div>scrollAmount: ${scrollData.scrollAmount}</div>
        //   <div>scrollPadding: ${scrollData.scrollPadding}</div>
        //   <div>inputSafeY: ${scrollData.inputSafeY}</div>
        //   <div>scrollHeight: ${scrollViewDimensions.scrollHeight}</div>
        //   <div>scrollTop: ${scrollViewDimensions.scrollTop}</div>
        //   <div>contentHeight: ${scrollViewDimensions.contentHeight}</div>
        //   <div>plaformHeight: ${plaformHeight}</div>
        // `;
        return scrollData;
    }
    exports.getScrollData = getScrollData;
    function setControlCss(element, control) {
        element.setElementClass('ng-untouched', control.untouched);
        element.setElementClass('ng-touched', control.touched);
        element.setElementClass('ng-pristine', control.pristine);
        element.setElementClass('ng-dirty', control.dirty);
        element.setElementClass('ng-valid', control.valid);
        element.setElementClass('ng-invalid', !control.valid);
    }
    function getScrollAssistDuration(distanceToScroll) {
        distanceToScroll = Math.abs(distanceToScroll);
        var duration = distanceToScroll / SCROLL_ASSIST_SPEED;
        return Math.min(400, Math.max(150, duration));
    }
});
//# sourceMappingURL=input.js.map