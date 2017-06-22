var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Optional, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { Config } from '../../config/config';
import { enableKeyboardControl } from './swiper/swiper-keyboard';
import { Ion } from '../ion';
import { isTrueProperty } from '../../util/util';
import { initEvents } from './swiper/swiper-events';
import { initZoom } from './swiper/swiper-zoom';
import { Platform } from '../../platform/platform';
import { slideTo, slideNext, slidePrev, update, initSwiper, destroySwiper, startAutoplay, stopAutoplay } from './swiper/swiper';
import { SWIPER_EFFECTS } from './swiper/swiper-effects';
import { ViewController } from '../../navigation/view-controller';
/**
 * @name Slides
 * @description
 * The Slides component is a multi-section container. Each section can be swiped
 * or dragged between. It contains any number of [Slide](../Slide) components.
 *
 *
 * ### Creating
 * You should use a template to create slides and listen to slide events. The template
 * should contain the slide container, an `<ion-slides>` element, and any number of
 * [Slide](../Slide) components, written as `<ion-slide>`. Basic configuration
 * values can be set as input properties, which are listed below. Slides events
 * can also be listened to such as the slide changing by placing the event on the
 * `<ion-slides>` element. See [Usage](#usage) below for more information.
 *
 *
 * ### Navigating
 * After creating and configuring the slides, you can navigate between them
 * by swiping or calling methods on the `Slides` instance. You can call `slideTo()` to
 * navigate to a specific slide, or `slideNext()` to change to the slide that follows
 * the active slide. All of the [methods](#instance-members) provided by the `Slides`
 * instance are listed below. See [Usage](#usage) below for more information on
 * navigating between slides.
 *
 *
 * @usage
 *
 * You can add slides to a `@Component` using the following template:
 *
 * ```html
 * <ion-slides>
 *   <ion-slide>
 *     <h1>Slide 1</h1>
 *   </ion-slide>
 *   <ion-slide>
 *     <h1>Slide 2</h1>
 *   </ion-slide>
 *   <ion-slide>
 *     <h1>Slide 3</h1>
 *   </ion-slide>
 * </ion-slides>
 * ```
 *
 * Next, we can use `ViewChild` to assign the Slides instance to
 * your `slides` property. Now we can call any of the `Slides`
 * [methods](#instance-members), for example we can use the Slide's
 * `slideTo()` method in order to navigate to a specific slide on
 * a button click. Below we call the `goToSlide()` method and it
 * navigates to the 3rd slide:
 *
 * ```ts
 * import { ViewChild } from '@angular/core';
 *
 * class MyPage {
 *   @ViewChild(Slides) slides: Slides;
 *
 *   goToSlide() {
 *     this.slides.slideTo(2, 500);
 *   }
 * }
 * ```
 *
 * We can also add events to listen to on the `<ion-slides>` element.
 * Let's add the `ionSlideDidChange` event and call a method when the slide changes:
 *
 * ```html
 * <ion-slides (ionSlideDidChange)="slideChanged()">
 * ```
 *
 * In our class, we add the `slideChanged()` method which gets the active
 * index and prints it:
 *
 * ```ts
 * class MyPage {
 *   ...
 *
 *   slideChanged() {
 *     let currentIndex = this.slides.getActiveIndex();
 *     console.log("Current index is", currentIndex);
 *   }
 * }
 * ```
 *
 * @advanced
 *
 * There are several options available to create customized slides. Ionic exposes
 * the most commonly used options as [inputs](http://learnangular2.com/inputs/).
 * In order to use an option that isn't exposed as an input the following code
 * should be used, where `freeMode` is the option to change:
 *
 * ```ts
 * class MyPage {
 *   @ViewChild(Slides) slides: Slides;
 *
 *   ngAfterViewInit() {
 *     this.slides.freeMode = true;
 *   }
 * }
 *
 * ```
 *
 * To see all of the available options, take a look at the
 * [source for slides](https://github.com/driftyco/ionic/blob/master/src/components/slides/slides.ts).
 *
 * @demo /docs/v2/demos/src/slides/
 * @see {@link /docs/v2/components#slides Slides Component Docs}
 *
 * Adopted from Swiper.js:
 * The most modern mobile touch slider and framework with
 * hardware accelerated transitions.
 *
 * http://www.idangero.us/swiper/
 *
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 */
export var Slides = (function (_super) {
    __extends(Slides, _super);
    function Slides(config, _plt, zone, viewCtrl, elementRef, renderer) {
        var _this = this;
        _super.call(this, config, elementRef, renderer, 'slides');
        this._plt = _plt;
        this._control = null;
        this._effectName = 'slide';
        this._direction = 'horizontal';
        this._initialSlide = 0;
        this._isLoop = false;
        this._pager = false;
        this._paginationType = 'bullets';
        /** @private */
        this.paginationBulletRender = null;
        this._isParallax = false;
        this._speedMs = 300;
        this._isZoom = false;
        /**
         * @private
         * Enabled this option and swiper will be operated as usual except it will
         * not move, real translate values on wrapper will not be set. Useful when
         * you may need to create custom slide transition.
         */
        this.virtualTranslate = false;
        /**
         * @private
         * Set to true to round values of slides width and height to prevent blurry
         * texts on usual resolution screens (if you have such)
         */
        this.roundLengths = false;
        this._spaceBetween = 0;
        this._slidesPerView = 1;
        /**
         * @private
         */
        this.slidesPerColumn = 1;
        /**
         * @private
         */
        this.slidesPerColumnFill = 'column';
        /**
         * @private
         */
        this.slidesPerGroup = 1;
        /**
         * @private
         */
        this.centeredSlides = false;
        /**
         * @private
         */
        this.slidesOffsetBefore = 0;
        /**
         * @private
         */
        this.slidesOffsetAfter = 0;
        // autoplay
        /**
         * @private
         */
        this.autoplayDisableOnInteraction = true;
        /**
         * @private
         */
        this.autoplayStopOnLast = false;
        // Free mode
        /**
         * @private
         */
        this.freeMode = false;
        /**
         * @private
         */
        this.freeModeMomentum = true;
        /**
         * @private
         */
        this.freeModeMomentumRatio = 1;
        /**
         * @private
         */
        this.freeModeMomentumBounce = true;
        /**
         * @private
         */
        this.freeModeMomentumBounceRatio = 1;
        /**
         * @private
         */
        this.freeModeMomentumVelocityRatio = 1;
        /**
         * @private
         */
        this.freeModeSticky = false;
        /**
         * @private
         */
        this.freeModeMinimumVelocity = 0.02;
        // Autoheight
        /**
         * @private
         */
        this.autoHeight = false;
        // Set wrapper width
        /**
         * @private
         */
        this.setWrapperSize = false;
        // Zoom
        /**
         * @private
         */
        this.zoomMax = 3;
        /**
         * @private
         */
        this.zoomMin = 1;
        /**
         * @private
         */
        this.zoomToggle = true;
        // Touches
        /**
         * @private
         */
        this.touchRatio = 1;
        /**
         * @private
         */
        this.touchAngle = 45;
        /**
         * @private
         */
        this.simulateTouch = true;
        /**
         * @private
         */
        this.shortSwipes = true;
        /**
         * @private
         */
        this.longSwipes = true;
        /**
         * @private
         */
        this.longSwipesRatio = 0.5;
        /**
         * @private
         */
        this.longSwipesMs = 300;
        /**
         * @private
         */
        this.followFinger = true;
        /**
         * @private
         */
        this.onlyExternal = false;
        /**
         * @private
         */
        this.threshold = 0;
        /**
         * @private
         */
        this.touchMoveStopPropagation = true;
        /**
         * @private
         */
        this.touchReleaseOnEdges = false;
        // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
        /**
         * @private
         */
        this.iOSEdgeSwipeDetection = false;
        /**
         * @private
         */
        this.iOSEdgeSwipeThreshold = 20;
        // Pagination
        /**
         * @private
         */
        this.paginationClickable = false;
        /**
         * @private
         */
        this.paginationHide = false;
        // Resistance
        /** @private */
        this.resistance = true;
        /** @private */
        this.resistanceRatio = 0.85;
        // Progress
        /** @private */
        this.watchSlidesProgress = false;
        /** @private */
        this.watchSlidesVisibility = false;
        // Clicks
        /**
         * @private
         */
        this.preventClicks = true;
        /**
         * @private
         */
        this.preventClicksPropagation = true;
        /**
         * @private
         */
        this.slideToClickedSlide = false;
        // loop
        /**
         * @private
         */
        this.loopAdditionalSlides = 0;
        /**
         * @private
         */
        this.loopedSlides = null;
        // Swiping/no swiping
        /**
         * @private
         */
        this.swipeHandler = null;
        /**
         * @private
         */
        this.noSwiping = true;
        // Callbacks
        /** @private */
        this.runCallbacksOnInit = true;
        // Controller
        this.controlBy = 'slide';
        this.controlInverse = false;
        // Keyboard
        /**
         * @private
         */
        this.keyboardControl = true;
        // Effects
        /**
         * @private
         */
        this.coverflow = {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        };
        /**
         * @private
         */
        this.flip = {
            slideShadows: true,
            limitRotation: true
        };
        /**
         * @private
         */
        this.cube = {
            slideShadows: true,
            shadow: true,
            shadowOffset: 20,
            shadowScale: 0.94
        };
        /**
         * @private
         */
        this.fade = {
            crossFade: false
        };
        // Accessibility
        /**
         * @private
         */
        this.prevSlideMessage = 'Previous slide';
        /**
         * @private
         */
        this.nextSlideMessage = 'Next slide';
        /**
         * @private
         */
        this.firstSlideMessage = 'This is the first slide';
        /**
         * @private
         */
        this.lastSlideMessage = 'This is the last slide';
        /**
         * @output {Slides} Expression to evaluate when a slide change starts.
         */
        this.ionSlideWillChange = new EventEmitter();
        /**
         * @output {Slides} Expression to evaluate when a slide change ends.
         */
        this.ionSlideDidChange = new EventEmitter();
        /**
         * @output {Slides} Expression to evaluate when a slide moves.
         */
        this.ionSlideDrag = new EventEmitter();
        /**
         * @output {Slides} When slides reach its beginning (initial position).
         */
        this.ionSlideReachStart = new EventEmitter();
        /**
         * @output {Slides} When slides reach its last slide.
         */
        this.ionSlideReachEnd = new EventEmitter();
        /**
         * @output {Slides} Expression to evaluate when a slide moves.
         */
        this.ionSlideAutoplay = new EventEmitter();
        /**
         * @output {Slides} Same as `ionSlideWillChange` but caused by autoplay.
         */
        this.ionSlideAutoplayStart = new EventEmitter();
        /**
         * @output {Slides} Expression to evaluate when a autoplay stops.
         */
        this.ionSlideAutoplayStop = new EventEmitter();
        /**
         * @output {Slides} Same as `ionSlideWillChange` but for "forward" direction only.
         */
        this.ionSlideNextStart = new EventEmitter();
        /**
         * @output {Slides} Same as `ionSlideWillChange` but for "backward" direction only.
         */
        this.ionSlidePrevStart = new EventEmitter();
        /**
         * @output {Slides} Same as `ionSlideDidChange` but for "forward" direction only.
         */
        this.ionSlideNextEnd = new EventEmitter();
        /**
         * @output {Slides} Same as `ionSlideDidChange` but for "backward" direction only.
         */
        this.ionSlidePrevEnd = new EventEmitter();
        /**
         * @output {Slides} When the user taps/clicks on the slide's container.
         */
        this.ionSlideTap = new EventEmitter();
        /**
         * @output {Slides} When the user double taps on the slide's container.
         */
        this.ionSlideDoubleTap = new EventEmitter();
        /** @private */
        this.ionSlideProgress = new EventEmitter();
        /** @private */
        this.ionSlideTransitionStart = new EventEmitter();
        /** @private */
        this.ionSlideTransitionEnd = new EventEmitter();
        /** @private */
        this.ionSlideTouchStart = new EventEmitter();
        /** @private */
        this.ionSlideTouchEnd = new EventEmitter();
        this._unregs = [];
        /** @internal */
        this._allowSwipeToNext = true;
        /** @internal */
        this._allowSwipeToPrev = true;
        this._zone = zone;
        this.id = ++slidesId;
        this.slideId = 'slides-' + this.id;
        this.setElementClass(this.slideId, true);
        // only initialize the slides whent the content is ready
        if (viewCtrl) {
            var subscription = viewCtrl.readReady.subscribe(function () {
                subscription.unsubscribe();
                _this._initSlides();
            });
        }
    }
    Object.defineProperty(Slides.prototype, "autoplay", {
        /**
         * @input {number}  Delay between transitions (in milliseconds). If this
         * parameter is not passed, autoplay is disabled. Default does
         * not have a value and does not autoplay.
         * Default: `null`.
         */
        get: function () {
            return this._autoplayMs;
        },
        set: function (val) {
            this._autoplayMs = parseInt(val, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "control", {
        /**
         * @input {Slides}  Pass another Slides instance or array of Slides instances
         * that should be controlled by this Slides instance.
         * Default: `null`.
         */
        get: function () {
            return this._control;
        },
        set: function (val) {
            if (val instanceof Slides || Array.isArray(val)) {
                this._control = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "effect", {
        /**
         * @input {string} Could be `slide`, `fade`, `cube`, `coverflow` or `flip`.
         * Default: `slide`.
         */
        get: function () {
            return this._effectName;
        },
        set: function (effectName) {
            if (SWIPER_EFFECTS[effectName]) {
                this._effectName = effectName;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "direction", {
        /**
         * @input {string}  Swipe direction: 'horizontal' or 'vertical'.
         * Default: `horizontal`.
         */
        get: function () {
            return this._direction;
        },
        set: function (val) {
            if (val === 'horizontal' || val === 'vertical') {
                this._direction = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "initialSlide", {
        /**
         * @input {number}  Index number of initial slide. Default: `0`.
         */
        get: function () {
            return this._initialSlide;
        },
        set: function (val) {
            this._initialSlide = parseInt(val, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "loop", {
        /**
         * @input {boolean}  Whether to continuously loop from the last slide to the
         * first slide. Default: `false`.
         */
        get: function () {
            return this._isLoop;
        },
        set: function (val) {
            this._isLoop = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "pager", {
        /**
         * @input {boolean}  Whether or not to show the pager. Default: `false`.
         */
        get: function () {
            return this._pager;
        },
        set: function (val) {
            this._pager = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "paginationType", {
        /**
         * @input {string}  String with type of pagination. Can be
         * `bullets`, `fraction`, `progress`. Default: `bullets`.
         * (Note that the pager will not show unless `pager` input
         * is set to true).
         */
        get: function () {
            return this._paginationType;
        },
        set: function (val) {
            if (val === 'bullets' || val === 'fraction' || val === 'progress') {
                this._paginationType = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "parallax", {
        /**
         * @input {boolean} Enable, if you want to use "parallaxed" elements inside of
         * slider. Default: `false`.
         */
        get: function () {
            return this._isParallax;
        },
        set: function (val) {
            this._isParallax = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "speed", {
        /**
         * @input {number}  Duration of transition between slides
         * (in milliseconds). Default: `300`.
         */
        get: function () {
            return this._speedMs;
        },
        set: function (val) {
            this._speedMs = parseInt(val, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "zoom", {
        /**
         * @input {boolean}  Set to `true` to enable zooming functionality.
         * Default: `false`.
         */
        get: function () {
            return this._isZoom;
        },
        set: function (val) {
            this._isZoom = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "spaceBetween", {
        // Slides grid
        /**
         * @input {number}  Distance between slides in px. Default: `0`.
         */
        get: function () {
            return this._spaceBetween;
        },
        set: function (val) {
            this._spaceBetween = parseInt(val, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "slidesPerView", {
        /**
         * @input {number}  Slides per view. Slides visible at the same time. Default: `1`.
         */
        get: function () {
            return this._slidesPerView;
        },
        set: function (val) {
            this._slidesPerView = val === 'auto' ? 'auto' : parseInt(val, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "options", {
        /**
         * @private
         * Deprecated
         */
        set: function (val) {
            // Deprecated warning added 2016-12-28
            console.warn('ion-slides "options" has been deprecated. Please use ion-slide\'s input properties instead.');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "ionWillChange", {
        /**
         * @private
         * Deprecated: Use "ionSlideWillChange" instead.
         * Added 2016-12-29
         */
        get: function () {
            console.warn('ion-slides "ionWillChange" has been deprecated, please use "ionSlideWillChange" instead.');
            return new EventEmitter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "ionDidChange", {
        /**
         * @private
         * Deprecated: Use "ionSlideDidChange" instead.
         * Added 2016-12-29
         */
        get: function () {
            console.warn('ion-slides "ionDidChange" has been deprecated, please use "ionSlideDidChange" instead.');
            return new EventEmitter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slides.prototype, "ionDrag", {
        /**
         * @private
         * Deprecated: Use "ionSlideDrag" instead.
         * Added 2016-12-29
         */
        get: function () {
            console.warn('ion-slides "ionDrag" has been deprecated, please use "ionSlideDrag" instead.');
            return new EventEmitter();
        },
        enumerable: true,
        configurable: true
    });
    Slides.prototype._initSlides = function () {
        if (!this._init) {
            (void 0) /* console.debug */;
            var s = this;
            var plt = s._plt;
            s.container = this.getNativeElement().children[0];
            // init swiper core
            initSwiper(s, plt);
            // init core event listeners
            this._unregs.push(initEvents(s, plt));
            if (this.zoom) {
                // init zoom event listeners
                this._unregs.push(initZoom(s, plt));
            }
            if (this.keyboardControl) {
                // init keyboard event listeners
                s.enableKeyboardControl(true);
            }
            this._init = true;
        }
    };
    /**
     * @private
     */
    Slides.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._plt.timeout(function () {
            _this._initSlides();
        }, 300);
    };
    /**
     * @private
     * Update the underlying slider implementation. Call this if you've added or removed
     * child slides.
     */
    Slides.prototype.update = function (debounce) {
        var _this = this;
        if (debounce === void 0) { debounce = 300; }
        if (this._init) {
            this._plt.cancelTimeout(this._tmr);
            this._tmr = this._plt.timeout(function () {
                update(_this, _this._plt);
                // Don't allow pager to show with > 10 slides
                if (_this.length() > 10) {
                    _this.paginationType = undefined;
                }
            }, debounce);
        }
    };
    /**
     * Transition to the specified slide.
     *
     * @param {number} index  The index number of the slide.
     * @param {number} [speed]  Transition duration (in ms).
     * @param {boolean} [runCallbacks] Whether or not to emit the `ionWillChange`/`ionDidChange` events. Default true.
     */
    Slides.prototype.slideTo = function (index, speed, runCallbacks) {
        slideTo(this, this._plt, index, speed, runCallbacks);
    };
    /**
     * Transition to the next slide.
     *
     * @param {number} [speed]  Transition duration (in ms).
     * @param {boolean} [runCallbacks]  Whether or not to emit the `ionWillChange`/`ionDidChange` events. Default true.
     */
    Slides.prototype.slideNext = function (speed, runCallbacks) {
        slideNext(this, this._plt, runCallbacks, speed, true);
    };
    /**
     * Transition to the previous slide.
     *
     * @param {number} [speed]  Transition duration (in ms).
     * @param {boolean} [runCallbacks]  Whether or not to emit the `ionWillChange`/`ionDidChange` events. Default true.
     */
    Slides.prototype.slidePrev = function (speed, runCallbacks) {
        slidePrev(this, this._plt, runCallbacks, speed, true);
    };
    /**
     * Get the index of the active slide.
     *
     * @returns {number} The index number of the current slide.
     */
    Slides.prototype.getActiveIndex = function () {
        return this._activeIndex;
    };
    /**
     * Get the index of the previous slide.
     *
     * @returns {number} The index number of the previous slide.
     */
    Slides.prototype.getPreviousIndex = function () {
        return this._previousIndex;
    };
    /**
     * Get the total number of slides.
     *
     * @returns {number} The total number of slides.
     */
    Slides.prototype.length = function () {
        return this._slides.length;
    };
    /**
     * Get whether or not the current slide is the last slide.
     *
     * @returns {boolean} If the slide is the last slide or not.
     */
    Slides.prototype.isEnd = function () {
        return this._isEnd;
    };
    /**
     * Get whether or not the current slide is the first slide.
     *
     * @returns {boolean} If the slide is the first slide or not.
     */
    Slides.prototype.isBeginning = function () {
        return this._isBeginning;
    };
    /**
     * Start auto play.
     */
    Slides.prototype.startAutoplay = function () {
        startAutoplay(this, this._plt);
    };
    /**
     * Stop auto play.
     */
    Slides.prototype.stopAutoplay = function () {
        stopAutoplay(this);
    };
    /**
     * Lock or unlock the ability to slide to the next slides.
     */
    Slides.prototype.lockSwipeToNext = function (shouldLockSwipeToNext) {
        this._allowSwipeToNext = !shouldLockSwipeToNext;
    };
    /**
     * Lock or unlock the ability to slide to the previous slides.
     */
    Slides.prototype.lockSwipeToPrev = function (shouldLockSwipeToPrev) {
        this._allowSwipeToPrev = !shouldLockSwipeToPrev;
    };
    /**
     * Lock or unlock the ability to slide to change slides.
     */
    Slides.prototype.lockSwipes = function (shouldLockSwipes) {
        this._allowSwipeToNext = this._allowSwipeToPrev = !shouldLockSwipes;
    };
    /**
     * Enable or disable keyboard control.
     */
    Slides.prototype.enableKeyboardControl = function (shouldEnableKeyboard) {
        enableKeyboardControl(this, this._plt, shouldEnableKeyboard);
    };
    /**
     * @private
     */
    Slides.prototype.ngOnDestroy = function () {
        this._init = false;
        this._unregs.forEach(function (unReg) {
            unReg();
        });
        this._unregs.length = 0;
        destroySwiper(this);
        this.enableKeyboardControl(false);
    };
    /**
     * @private
     * Deprecated, please use the instance of ion-slides.
     */
    Slides.prototype.getSlider = function () {
        // deprecated 2016-12-29
        console.warn("ion-slides, getSlider() has been removed. Please use the properties and methods on the instance of ion-slides instead.");
    };
    Slides.decorators = [
        { type: Component, args: [{
                    selector: 'ion-slides',
                    template: '<div class="swiper-container">' +
                        '<div class="swiper-wrapper">' +
                        '<ng-content></ng-content>' +
                        '</div>' +
                        '<div [class.hide]="!pager" class="swiper-pagination"></div>' +
                        '</div>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    Slides.ctorParameters = [
        { type: Config, },
        { type: Platform, },
        { type: NgZone, },
        { type: ViewController, decorators: [{ type: Optional },] },
        { type: ElementRef, },
        { type: Renderer, },
    ];
    Slides.propDecorators = {
        'autoplay': [{ type: Input },],
        'control': [{ type: Input },],
        'effect': [{ type: Input },],
        'direction': [{ type: Input },],
        'initialSlide': [{ type: Input },],
        'loop': [{ type: Input },],
        'pager': [{ type: Input },],
        'paginationType': [{ type: Input },],
        'parallax': [{ type: Input },],
        'speed': [{ type: Input },],
        'zoom': [{ type: Input },],
        'spaceBetween': [{ type: Input },],
        'slidesPerView': [{ type: Input },],
        'ionSlideWillChange': [{ type: Output },],
        'ionSlideDidChange': [{ type: Output },],
        'ionSlideDrag': [{ type: Output },],
        'ionSlideReachStart': [{ type: Output },],
        'ionSlideReachEnd': [{ type: Output },],
        'ionSlideAutoplay': [{ type: Output },],
        'ionSlideAutoplayStart': [{ type: Output },],
        'ionSlideAutoplayStop': [{ type: Output },],
        'ionSlideNextStart': [{ type: Output },],
        'ionSlidePrevStart': [{ type: Output },],
        'ionSlideNextEnd': [{ type: Output },],
        'ionSlidePrevEnd': [{ type: Output },],
        'ionSlideTap': [{ type: Output },],
        'ionSlideDoubleTap': [{ type: Output },],
        'options': [{ type: Input },],
        'ionWillChange': [{ type: Output },],
        'ionDidChange': [{ type: Output },],
        'ionDrag': [{ type: Output },],
    };
    return Slides;
}(Ion));
var slidesId = -1;
//# sourceMappingURL=slides.js.map