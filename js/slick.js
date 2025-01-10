! function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(i) {
    "use strict";
    var t, s = window.Slick || {};
    (s = (t = 0, function s(e, o) {
        var n, l = this;
        l.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: i(e),
            appendDots: i(e),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(t, s) {
                return i('<button type="button" />').text(s + 1)
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
        }, l.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
        }, i.extend(l, l.initials), l.activeBreakpoint = null, l.animType = null, l.animProp = null, l.breakpoints = [], l.breakpointSettings = [], l.cssTransitions = !1, l.focussed = !1, l.interrupted = !1, l.hidden = "hidden", l.paused = !0, l.positionProp = null, l.respondTo = null, l.rowCount = 1, l.shouldClick = !0, l.$slider = i(e), l.$slidesCache = null, l.transformType = null, l.transitionType = null, l.visibilityChange = "visibilitychange", l.windowWidth = 0, l.windowTimer = null, n = i(e).data("slick") || {}, l.options = i.extend({}, l.defaults, o, n), l.currentSlide = l.options.initialSlide, l.originalSettings = l.options, void 0 !== document.mozHidden ? (l.hidden = "mozHidden", l.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (l.hidden = "webkitHidden", l.visibilityChange = "webkitvisibilitychange"), l.autoPlay = i.proxy(l.autoPlay, l), l.autoPlayClear = i.proxy(l.autoPlayClear, l), l.autoPlayIterator = i.proxy(l.autoPlayIterator, l), l.changeSlide = i.proxy(l.changeSlide, l), l.clickHandler = i.proxy(l.clickHandler, l), l.selectHandler = i.proxy(l.selectHandler, l), l.setPosition = i.proxy(l.setPosition, l), l.swipeHandler = i.proxy(l.swipeHandler, l), l.dragHandler = i.proxy(l.dragHandler, l), l.keyHandler = i.proxy(l.keyHandler, l), l.instanceUid = t++, l.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, l.registerBreakpoints(), l.init(!0)
    })).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, s.prototype.addSlide = s.prototype.slickAdd = function(t, s, e) {
        var o = this;
        if ("boolean" == typeof s) e = s, s = null;
        else if (s < 0 || s >= o.slideCount) return !1;
        o.unload(), "number" == typeof s ? 0 === s && 0 === o.$slides.length ? i(t).appendTo(o.$slideTrack) : e ? i(t).insertBefore(o.$slides.eq(s)) : i(t).insertAfter(o.$slides.eq(s)) : !0 === e ? i(t).prependTo(o.$slideTrack) : i(t).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(t, s) {
            i(s).attr("data-slick-index", t)
        }), o.$slidesCache = o.$slides, o.reinit()
    }, s.prototype.animateHeight = function() {
        if (1 === this.options.slidesToShow && !0 === this.options.adaptiveHeight && !1 === this.options.vertical) {
            var i = this.$slides.eq(this.currentSlide).outerHeight(!0);
            this.$list.animate({
                height: i
            }, this.options.speed)
        }
    }, s.prototype.animateSlide = function(t, s) {
        var e = {},
            o = this;
        o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (t = -t), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
            left: t
        }, o.options.speed, o.options.easing, s) : o.$slideTrack.animate({
            top: t
        }, o.options.speed, o.options.easing, s) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), i({
            animStart: o.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(i) {
                i = Math.ceil(i), !1 === o.options.vertical ? (e[o.animType] = "translate(" + i + "px, 0px)", o.$slideTrack.css(e)) : (e[o.animType] = "translate(0px," + i + "px)", o.$slideTrack.css(e))
            },
            complete: function() {
                s && s.call()
            }
        })) : (o.applyTransition(), t = Math.ceil(t), !1 === o.options.vertical ? e[o.animType] = "translate3d(" + t + "px, 0px, 0px)" : e[o.animType] = "translate3d(0px," + t + "px, 0px)", o.$slideTrack.css(e), s && setTimeout(function() {
            o.disableTransition(), s.call()
        }, o.options.speed))
    }, s.prototype.getNavTarget = function() {
        var t = this.options.asNavFor;
        return t && null !== t && (t = i(t).not(this.$slider)), t
    }, s.prototype.asNavFor = function(t) {
        var s = this.getNavTarget();
        null !== s && "object" == typeof s && s.each(function() {
            var s = i(this).slick("getSlick");
            s.unslicked || s.slideHandler(t, !0)
        })
    }, s.prototype.applyTransition = function(i) {
        var t = this,
            s = {};
        !1 === t.options.fade ? s[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : s[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(s) : t.$slides.eq(i).css(s)
    }, s.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, s.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
    }, s.prototype.autoPlayIterator = function() {
        var i = this,
            t = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (t = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(t))
    }, s.prototype.buildArrows = function() {
        var t = this;
        !0 === t.options.arrows && (t.$prevArrow = i(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = i(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, s.prototype.buildDots = function() {
        var t, s, e = this;
        if (!0 === e.options.dots && e.slideCount > e.options.slidesToShow) {
            for (e.$slider.addClass("slick-dotted"), s = i("<ul />").addClass(e.options.dotsClass), t = 0; t <= e.getDotCount(); t += 1) s.append(i("<li />").append(e.options.customPaging.call(this, e, t)));
            e.$dots = s.appendTo(e.options.appendDots), e.$dots.find("li").first().addClass("slick-active")
        }
    }, s.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, s) {
            i(s).attr("data-slick-index", t).data("originalStyling", i(s).attr("style") || "")
        }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? i('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), (!0 === t.options.centerMode || !0 === t.options.swipeToSlide) && (t.options.slidesToScroll = 1), i("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
    }, s.prototype.buildRows = function() {
        var i, t, s, e, o, n, l;
        if (e = document.createDocumentFragment(), n = this.$slider.children(), this.options.rows > 0) {
            for (i = 0, l = this.options.slidesPerRow * this.options.rows, o = Math.ceil(n.length / l); i < o; i++) {
                var r = document.createElement("div");
                for (t = 0; t < this.options.rows; t++) {
                    var d = document.createElement("div");
                    for (s = 0; s < this.options.slidesPerRow; s++) {
                        var a = i * l + (t * this.options.slidesPerRow + s);
                        n.get(a) && d.appendChild(n.get(a))
                    }
                    r.appendChild(d)
                }
                e.appendChild(r)
            }
            this.$slider.empty().append(e), this.$slider.children().children().children().css({
                width: 100 / this.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, s.prototype.checkResponsive = function(t, s) {
        var e, o, n, l = this,
            r = !1,
            d = l.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === l.respondTo ? n = a : "slider" === l.respondTo ? n = d : "min" === l.respondTo && (n = Math.min(a, d)), l.options.responsive && l.options.responsive.length && null !== l.options.responsive) {
            for (e in o = null, l.breakpoints) l.breakpoints.hasOwnProperty(e) && (!1 === l.originalSettings.mobileFirst ? n < l.breakpoints[e] && (o = l.breakpoints[e]) : n > l.breakpoints[e] && (o = l.breakpoints[e]));
            null !== o ? null !== l.activeBreakpoint ? (o !== l.activeBreakpoint || s) && (l.activeBreakpoint = o, "unslick" === l.breakpointSettings[o] ? l.unslick(o) : (l.options = i.extend({}, l.originalSettings, l.breakpointSettings[o]), !0 === t && (l.currentSlide = l.options.initialSlide), l.refresh(t)), r = o) : (l.activeBreakpoint = o, "unslick" === l.breakpointSettings[o] ? l.unslick(o) : (l.options = i.extend({}, l.originalSettings, l.breakpointSettings[o]), !0 === t && (l.currentSlide = l.options.initialSlide), l.refresh(t)), r = o) : null !== l.activeBreakpoint && (l.activeBreakpoint = null, l.options = l.originalSettings, !0 === t && (l.currentSlide = l.options.initialSlide), l.refresh(t), r = o), t || !1 === r || l.$slider.trigger("breakpoint", [l, r])
        }
    }, s.prototype.changeSlide = function(t, s) {
        var e, o, n, l = i(t.currentTarget);
        switch (l.is("a") && t.preventDefault(), l.is("li") || (l = l.closest("li")), e = (n = this.slideCount % this.options.slidesToScroll != 0) ? 0 : (this.slideCount - this.currentSlide) % this.options.slidesToScroll, t.data.message) {
            case "previous":
                o = 0 === e ? this.options.slidesToScroll : this.options.slidesToShow - e, this.slideCount > this.options.slidesToShow && this.slideHandler(this.currentSlide - o, !1, s);
                break;
            case "next":
                o = 0 === e ? this.options.slidesToScroll : e, this.slideCount > this.options.slidesToShow && this.slideHandler(this.currentSlide + o, !1, s);
                break;
            case "index":
                var r = 0 === t.data.index ? 0 : t.data.index || l.index() * this.options.slidesToScroll;
                this.slideHandler(this.checkNavigable(r), !1, s), l.children().trigger("focus");
                break;
            default:
                return
        }
    }, s.prototype.checkNavigable = function(i) {
        var t, s;
        if (t = this.getNavigableIndexes(), s = 0, i > t[t.length - 1]) i = t[t.length - 1];
        else
            for (var e in t) {
                if (i < t[e]) {
                    i = s;
                    break
                }
                s = t[e]
            }
        return i
    }, s.prototype.cleanUpEvents = function() {
        this.options.dots && null !== this.$dots && (i("li", this.$dots).off("click.slick", this.changeSlide).off("mouseenter.slick", i.proxy(this.interrupt, this, !0)).off("mouseleave.slick", i.proxy(this.interrupt, this, !1)), !0 === this.options.accessibility && this.$dots.off("keydown.slick", this.keyHandler)), this.$slider.off("focus.slick blur.slick"), !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && (this.$prevArrow && this.$prevArrow.off("click.slick", this.changeSlide), this.$nextArrow && this.$nextArrow.off("click.slick", this.changeSlide), !0 === this.options.accessibility && (this.$prevArrow && this.$prevArrow.off("keydown.slick", this.keyHandler), this.$nextArrow && this.$nextArrow.off("keydown.slick", this.keyHandler))), this.$list.off("touchstart.slick mousedown.slick", this.swipeHandler), this.$list.off("touchmove.slick mousemove.slick", this.swipeHandler), this.$list.off("touchend.slick mouseup.slick", this.swipeHandler), this.$list.off("touchcancel.slick mouseleave.slick", this.swipeHandler), this.$list.off("click.slick", this.clickHandler), i(document).off(this.visibilityChange, this.visibility), this.cleanUpSlideEvents(), !0 === this.options.accessibility && this.$list.off("keydown.slick", this.keyHandler), !0 === this.options.focusOnSelect && i(this.$slideTrack).children().off("click.slick", this.selectHandler), i(window).off("orientationchange.slick.slick-" + this.instanceUid, this.orientationChange), i(window).off("resize.slick.slick-" + this.instanceUid, this.resize), i("[draggable!=true]", this.$slideTrack).off("dragstart", this.preventDefault), i(window).off("load.slick.slick-" + this.instanceUid, this.setPosition)
    }, s.prototype.cleanUpSlideEvents = function() {
        this.$list.off("mouseenter.slick", i.proxy(this.interrupt, this, !0)), this.$list.off("mouseleave.slick", i.proxy(this.interrupt, this, !1))
    }, s.prototype.cleanUpRows = function() {
        var i;
        this.options.rows > 0 && ((i = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(i))
    }, s.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, s.prototype.destroy = function(t) {
        var s = this;
        s.autoPlayClear(), s.touchObject = {}, s.cleanUpEvents(), i(".slick-cloned", s.$slider).detach(), s.$dots && s.$dots.remove(), s.$prevArrow && s.$prevArrow.length && (s.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), s.htmlExpr.test(s.options.prevArrow) && s.$prevArrow.remove()), s.$nextArrow && s.$nextArrow.length && (s.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), s.htmlExpr.test(s.options.nextArrow) && s.$nextArrow.remove()), s.$slides && (s.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"))
        }), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.detach(), s.$list.detach(), s.$slider.append(s.$slides)), s.cleanUpRows(), s.$slider.removeClass("slick-slider"), s.$slider.removeClass("slick-initialized"), s.$slider.removeClass("slick-dotted"), s.unslicked = !0, t || s.$slider.trigger("destroy", [s])
    }, s.prototype.disableTransition = function(i) {
        var t = this,
            s = {};
        s[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(s) : t.$slides.eq(i).css(s)
    }, s.prototype.fadeSlide = function(i, t) {
        var s = this;
        !1 === s.cssTransitions ? (s.$slides.eq(i).css({
            zIndex: s.options.zIndex
        }), s.$slides.eq(i).animate({
            opacity: 1
        }, s.options.speed, s.options.easing, t)) : (s.applyTransition(i), s.$slides.eq(i).css({
            opacity: 1,
            zIndex: s.options.zIndex
        }), t && setTimeout(function() {
            s.disableTransition(i), t.call()
        }, s.options.speed))
    }, s.prototype.fadeSlideOut = function(i) {
        !1 === this.cssTransitions ? this.$slides.eq(i).animate({
            opacity: 0,
            zIndex: this.options.zIndex - 2
        }, this.options.speed, this.options.easing) : (this.applyTransition(i), this.$slides.eq(i).css({
            opacity: 0,
            zIndex: this.options.zIndex - 2
        }))
    }, s.prototype.filterSlides = s.prototype.slickFilter = function(i) {
        var t = this;
        null !== i && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(i).appendTo(t.$slideTrack), t.reinit())
    }, s.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(s) {
            s.stopImmediatePropagation();
            var e = i(this);
            setTimeout(function() {
                t.options.pauseOnFocus && (t.focussed = e.is(":focus"), t.autoPlay())
            }, 0)
        })
    }, s.prototype.getCurrent = s.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, s.prototype.getDotCount = function() {
        var i = 0,
            t = 0,
            s = 0;
        if (!0 === this.options.infinite) {
            if (this.slideCount <= this.options.slidesToShow) ++s;
            else
                for (; i < this.slideCount;) ++s, i = t + this.options.slidesToScroll, t += this.options.slidesToScroll <= this.options.slidesToShow ? this.options.slidesToScroll : this.options.slidesToShow
        } else if (!0 === this.options.centerMode) s = this.slideCount;
        else if (this.options.asNavFor)
            for (; i < this.slideCount;) ++s, i = t + this.options.slidesToScroll, t += this.options.slidesToScroll <= this.options.slidesToShow ? this.options.slidesToScroll : this.options.slidesToShow;
        else s = 1 + Math.ceil((this.slideCount - this.options.slidesToShow) / this.options.slidesToScroll);
        return s - 1
    }, s.prototype.getLeft = function(i) {
        var t, s, e, o, n = this,
            l = 0;
        return n.slideOffset = 0, s = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = -(n.slideWidth * n.options.slidesToShow * 1), o = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? o = -1.5 : 1 === n.options.slidesToShow && (o = -2)), l = s * n.options.slidesToShow * o), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = -((n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * 1), l = -((n.options.slidesToShow - (i - n.slideCount)) * s * 1)) : (n.slideOffset = -(n.slideCount % n.options.slidesToScroll * n.slideWidth * 1), l = -(n.slideCount % n.options.slidesToScroll * s * 1)))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, l = (i + n.options.slidesToShow - n.slideCount) * s), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, l = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), t = !1 === n.options.vertical ? -(i * n.slideWidth * 1) + n.slideOffset : -(i * s * 1) + l, !0 === n.options.variableWidth && (e = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), t = !0 === n.options.rtl ? e[0] ? -((n.$slideTrack.width() - e[0].offsetLeft - e.width()) * 1) : 0 : e[0] ? -1 * e[0].offsetLeft : 0, !0 === n.options.centerMode && (e = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), t = !0 === n.options.rtl ? e[0] ? -((n.$slideTrack.width() - e[0].offsetLeft - e.width()) * 1) : 0 : e[0] ? -1 * e[0].offsetLeft : 0, t += (n.$list.width() - e.outerWidth()) / 2)), t
    }, s.prototype.getOption = s.prototype.slickGetOption = function(i) {
        return this.options[i]
    }, s.prototype.getNavigableIndexes = function() {
        var i, t = 0,
            s = 0,
            e = [];
        for (!1 === this.options.infinite ? i = this.slideCount : (t = -1 * this.options.slidesToScroll, s = -1 * this.options.slidesToScroll, i = 2 * this.slideCount); t < i;) e.push(t), t = s + this.options.slidesToScroll, s += this.options.slidesToScroll <= this.options.slidesToShow ? this.options.slidesToScroll : this.options.slidesToShow;
        return e
    }, s.prototype.getSlick = function() {
        return this
    }, s.prototype.getSlideCount = function() {
        var t, s, e, o = this;
        return (e = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide) ? (o.$slideTrack.find(".slick-slide").each(function(t, n) {
            if (n.offsetLeft - e + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return s = n, !1
        }), t = Math.abs(i(s).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, s.prototype.goTo = s.prototype.slickGoTo = function(i, t) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, t)
    }, s.prototype.init = function(t) {
        var s = this;
        i(s.$slider).hasClass("slick-initialized") || (i(s.$slider).addClass("slick-initialized"), s.buildRows(), s.buildOut(), s.setProps(), s.startLoad(), s.loadSlider(), s.initializeEvents(), s.updateArrows(), s.updateDots(), s.checkResponsive(!0), s.focusHandler()), t && s.$slider.trigger("init", [s]), !0 === s.options.accessibility && s.initADA(), s.options.autoplay && (s.paused = !1, s.autoPlay())
    }, s.prototype.initADA = function() {
        var t = this,
            s = Math.ceil(t.slideCount / t.options.slidesToShow),
            e = t.getNavigableIndexes().filter(function(i) {
                return i >= 0 && i < t.slideCount
            });
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(s) {
            var o = e.indexOf(s);
            if (i(this).attr({
                    role: "tabpanel",
                    id: "slick-slide" + t.instanceUid + s,
                    tabindex: -1
                }), -1 !== o) {
                var n = "slick-slide-control" + t.instanceUid + o;
                i("#" + n).length && i(this).attr({
                    "aria-describedby": n
                })
            }
        }), t.$dots.attr("role", "tablist").find("li").each(function(o) {
            var n = e[o];
            i(this).attr({
                role: "presentation"
            }), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + t.instanceUid + o,
                "aria-controls": "slick-slide" + t.instanceUid + n,
                "aria-label": o + 1 + " of " + s,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(t.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var o = t.currentSlide, n = o + t.options.slidesToShow; o < n; o++) t.options.focusOnChange ? t.$slides.eq(o).attr({
            tabindex: "0"
        }) : t.$slides.eq(o).removeAttr("tabindex");
        t.activateADA()
    }, s.prototype.initArrowEvents = function() {
        !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && (this.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, this.changeSlide), this.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, this.changeSlide), !0 === this.options.accessibility && (this.$prevArrow.on("keydown.slick", this.keyHandler), this.$nextArrow.on("keydown.slick", this.keyHandler)))
    }, s.prototype.initDotEvents = function() {
        !0 === this.options.dots && this.slideCount > this.options.slidesToShow && (i("li", this.$dots).on("click.slick", {
            message: "index"
        }, this.changeSlide), !0 === this.options.accessibility && this.$dots.on("keydown.slick", this.keyHandler)), !0 === this.options.dots && !0 === this.options.pauseOnDotsHover && this.slideCount > this.options.slidesToShow && i("li", this.$dots).on("mouseenter.slick", i.proxy(this.interrupt, this, !0)).on("mouseleave.slick", i.proxy(this.interrupt, this, !1))
    }, s.prototype.initSlideEvents = function() {
        this.options.pauseOnHover && (this.$list.on("mouseenter.slick", i.proxy(this.interrupt, this, !0)), this.$list.on("mouseleave.slick", i.proxy(this.interrupt, this, !1)))
    }, s.prototype.initializeEvents = function() {
        this.initArrowEvents(), this.initDotEvents(), this.initSlideEvents(), this.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, this.swipeHandler), this.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, this.swipeHandler), this.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, this.swipeHandler), this.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, this.swipeHandler), this.$list.on("click.slick", this.clickHandler), i(document).on(this.visibilityChange, i.proxy(this.visibility, this)), !0 === this.options.accessibility && this.$list.on("keydown.slick", this.keyHandler), !0 === this.options.focusOnSelect && i(this.$slideTrack).children().on("click.slick", this.selectHandler), i(window).on("orientationchange.slick.slick-" + this.instanceUid, i.proxy(this.orientationChange, this)), i(window).on("resize.slick.slick-" + this.instanceUid, i.proxy(this.resize, this)), i("[draggable!=true]", this.$slideTrack).on("dragstart", this.preventDefault), i(window).on("load.slick.slick-" + this.instanceUid, this.setPosition), i(this.setPosition)
    }, s.prototype.initUI = function() {
        !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && (this.$prevArrow.show(), this.$nextArrow.show()), !0 === this.options.dots && this.slideCount > this.options.slidesToShow && this.$dots.show()
    }, s.prototype.keyHandler = function(i) {
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === this.options.accessibility ? this.changeSlide({
            data: {
                message: !0 === this.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === this.options.accessibility && this.changeSlide({
            data: {
                message: !0 === this.options.rtl ? "previous" : "next"
            }
        }))
    }, s.prototype.lazyLoad = function() {
        var t, s, e, o, n = this;

        function l(t) {
            i("img[data-lazy]", t).each(function() {
                var t = i(this),
                    s = i(this).attr("data-lazy"),
                    e = i(this).attr("data-srcset"),
                    o = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                    l = document.createElement("img");
                l.onload = function() {
                    t.animate({
                        opacity: 0
                    }, 100, function() {
                        e && (t.attr("srcset", e), o && t.attr("sizes", o)), t.attr("src", s).animate({
                            opacity: 1
                        }, 200, function() {
                            t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), n.$slider.trigger("lazyLoaded", [n, t, s])
                    })
                }, l.onerror = function() {
                    t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, t, s])
                }, l.src = s
            })
        }
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? o = (e = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (e = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), o = 2 + (n.options.slidesToShow / 2 + 1) + n.currentSlide) : (o = Math.ceil((e = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide) + n.options.slidesToShow), !0 === n.options.fade && (e > 0 && e--, o <= n.slideCount && o++)), t = n.$slider.find(".slick-slide").slice(e, o), "anticipated" === n.options.lazyLoad)
            for (var r = e - 1, d = o, a = n.$slider.find(".slick-slide"), c = 0; c < n.options.slidesToScroll; c++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(a.eq(r))).add(a.eq(d)), r--, d++;
        l(t), n.slideCount <= n.options.slidesToShow ? l(s = n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? l(s = n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && l(s = n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }, s.prototype.loadSlider = function() {
        this.setPosition(), this.$slideTrack.css({
            opacity: 1
        }), this.$slider.removeClass("slick-loading"), this.initUI(), "progressive" === this.options.lazyLoad && this.progressiveLazyLoad()
    }, s.prototype.next = s.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, s.prototype.orientationChange = function() {
        this.checkResponsive(), this.setPosition()
    }, s.prototype.pause = s.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, s.prototype.play = s.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, s.prototype.postSlide = function(t) {
        var s = this;
        !s.unslicked && (s.$slider.trigger("afterChange", [s, t]), s.animating = !1, s.slideCount > s.options.slidesToShow && s.setPosition(), s.swipeLeft = null, s.options.autoplay && s.autoPlay(), !0 === s.options.accessibility && (s.initADA(), s.options.focusOnChange)) && i(s.$slides.get(s.currentSlide)).attr("tabindex", 0).focus()
    }, s.prototype.prev = s.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, s.prototype.preventDefault = function(i) {
        i.preventDefault()
    }, s.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var s, e, o, n, l, r = this,
            d = i("img[data-lazy]", r.$slider);
        d.length ? (e = (s = d.first()).attr("data-lazy"), o = s.attr("data-srcset"), n = s.attr("data-sizes") || r.$slider.attr("data-sizes"), (l = document.createElement("img")).onload = function() {
            o && (s.attr("srcset", o), n && s.attr("sizes", n)), s.attr("src", e).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === r.options.adaptiveHeight && r.setPosition(), r.$slider.trigger("lazyLoaded", [r, s, e]), r.progressiveLazyLoad()
        }, l.onerror = function() {
            t < 3 ? setTimeout(function() {
                r.progressiveLazyLoad(t + 1)
            }, 500) : (s.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, s, e]), r.progressiveLazyLoad())
        }, l.src = e) : r.$slider.trigger("allImagesLoaded", [r])
    }, s.prototype.refresh = function(t) {
        var s, e, o = this;
        e = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > e && (o.currentSlide = e), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), s = o.currentSlide, o.destroy(!0), i.extend(o, o.initials, {
            currentSlide: s
        }), o.init(), t || o.changeSlide({
            data: {
                message: "index",
                index: s
            }
        }, !1)
    }, s.prototype.registerBreakpoints = function() {
        var t, s, e, o = this,
            n = o.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            for (t in o.respondTo = o.options.respondTo || "window", n)
                if (e = o.breakpoints.length - 1, n.hasOwnProperty(t)) {
                    for (s = n[t].breakpoint; e >= 0;) o.breakpoints[e] && o.breakpoints[e] === s && o.breakpoints.splice(e, 1), e--;
                    o.breakpoints.push(s), o.breakpointSettings[s] = n[t].settings
                }
            o.breakpoints.sort(function(i, t) {
                return o.options.mobileFirst ? i - t : t - i
            })
        }
    }, s.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && i(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
    }, s.prototype.resize = function() {
        var t = this;
        i(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
            t.windowWidth = i(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
        }, 50))
    }, s.prototype.removeSlide = s.prototype.slickRemove = function(i, t, s) {
        var e = this;
        if (i = "boolean" == typeof i ? !0 === (t = i) ? 0 : e.slideCount - 1 : !0 === t ? --i : i, e.slideCount < 1 || i < 0 || i > e.slideCount - 1) return !1;
        e.unload(), !0 === s ? e.$slideTrack.children().remove() : e.$slideTrack.children(this.options.slide).eq(i).remove(), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slidesCache = e.$slides, e.reinit()
    }, s.prototype.setCSS = function(i) {
        var t, s, e = this,
            o = {};
        !0 === e.options.rtl && (i = -i), t = "left" == e.positionProp ? Math.ceil(i) + "px" : "0px", s = "top" == e.positionProp ? Math.ceil(i) + "px" : "0px", o[e.positionProp] = i, !1 === e.transformsEnabled ? e.$slideTrack.css(o) : (o = {}, !1 === e.cssTransitions ? (o[e.animType] = "translate(" + t + ", " + s + ")", e.$slideTrack.css(o)) : (o[e.animType] = "translate3d(" + t + ", " + s + ", 0px)", e.$slideTrack.css(o)))
    }, s.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var t = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - t)
    }, s.prototype.setFade = function() {
        var t, s = this;
        s.$slides.each(function(e, o) {
            t = -(s.slideWidth * e * 1), !0 === s.options.rtl ? i(o).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: s.options.zIndex - 2,
                opacity: 0
            }) : i(o).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: s.options.zIndex - 2,
                opacity: 0
            })
        }), s.$slides.eq(s.currentSlide).css({
            zIndex: s.options.zIndex - 1,
            opacity: 1
        })
    }, s.prototype.setHeight = function() {
        if (1 === this.options.slidesToShow && !0 === this.options.adaptiveHeight && !1 === this.options.vertical) {
            var i = this.$slides.eq(this.currentSlide).outerHeight(!0);
            this.$list.css("height", i)
        }
    }, s.prototype.setOption = s.prototype.slickSetOption = function() {
        var t, s, e, o, n, l = this,
            r = !1;
        if ("object" === i.type(arguments[0]) ? (e = arguments[0], r = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (e = arguments[0], o = arguments[1], r = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) l.options[e] = o;
        else if ("multiple" === n) i.each(e, function(i, t) {
            l.options[i] = t
        });
        else if ("responsive" === n)
            for (s in o)
                if ("array" !== i.type(l.options.responsive)) l.options.responsive = [o[s]];
                else {
                    for (t = l.options.responsive.length - 1; t >= 0;) l.options.responsive[t].breakpoint === o[s].breakpoint && l.options.responsive.splice(t, 1), t--;
                    l.options.responsive.push(o[s])
                }
        r && (l.unload(), l.reinit())
    }, s.prototype.setPosition = function() {
        this.setDimensions(), this.setHeight(), !1 === this.options.fade ? this.setCSS(this.getLeft(this.currentSlide)) : this.setFade(), this.$slider.trigger("setPosition", [this])
    }, s.prototype.setProps = function() {
        var i = this,
            t = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), (void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.msTransition) && !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== t.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (i.animType = !1)), void 0 !== t.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (i.animType = !1)), void 0 !== t.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (i.animType = !1)), void 0 !== t.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === t.msTransform && (i.animType = !1)), void 0 !== t.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }, s.prototype.setSlideClasses = function(i) {
        var t, s, e, o;
        if (s = this.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), this.$slides.eq(i).addClass("slick-current"), !0 === this.options.centerMode) {
            var n = this.options.slidesToShow % 2 == 0 ? 1 : 0;
            t = Math.floor(this.options.slidesToShow / 2), !0 === this.options.infinite && (i >= t && i <= this.slideCount - 1 - t ? this.$slides.slice(i - t + n, i + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = this.options.slidesToShow + i, s.slice(e - t + 1 + n, e + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? s.eq(s.length - 1 - this.options.slidesToShow).addClass("slick-center") : i === this.slideCount - 1 && s.eq(this.options.slidesToShow).addClass("slick-center")), this.$slides.eq(i).addClass("slick-center")
        } else i >= 0 && i <= this.slideCount - this.options.slidesToShow ? this.$slides.slice(i, i + this.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : s.length <= this.options.slidesToShow ? s.addClass("slick-active").attr("aria-hidden", "false") : (o = this.slideCount % this.options.slidesToShow, e = !0 === this.options.infinite ? this.options.slidesToShow + i : i, this.options.slidesToShow == this.options.slidesToScroll && this.slideCount - i < this.options.slidesToShow ? s.slice(e - (this.options.slidesToShow - o), e + o).addClass("slick-active").attr("aria-hidden", "false") : s.slice(e, e + this.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        ("ondemand" === this.options.lazyLoad || "anticipated" === this.options.lazyLoad) && this.lazyLoad()
    }, s.prototype.setupInfinite = function() {
        var t, s, e, o = this;
        if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (s = null, o.slideCount > o.options.slidesToShow)) {
            for (e = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount - e; t -= 1) s = t - 1, i(o.$slides[s]).clone(!0).attr("id", "").attr("data-slick-index", s - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (t = 0; t < e + o.slideCount; t += 1) s = t, i(o.$slides[s]).clone(!0).attr("id", "").attr("data-slick-index", s + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "")
            })
        }
    }, s.prototype.interrupt = function(i) {
        var t = this;
        i || t.autoPlay(), t.interrupted = i
    }, s.prototype.selectHandler = function(t) {
        var s = parseInt((i(t.target).is(".slick-slide") ? i(t.target) : i(t.target).parents(".slick-slide")).attr("data-slick-index"));
        if (s || (s = 0), this.slideCount <= this.options.slidesToShow) {
            this.slideHandler(s, !1, !0);
            return
        }
        this.slideHandler(s)
    }, s.prototype.slideHandler = function(i, t, s) {
        var e, o, n, l, r, d = null,
            a = this;
        if (t = t || !1, (!0 !== a.animating || !0 !== a.options.waitForAnimate) && (!0 !== a.options.fade || a.currentSlide !== i)) {
            if (!1 === t && a.asNavFor(i), e = i, d = a.getLeft(e), l = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? l : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll) || !1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) {
                !1 === a.options.fade && (e = a.currentSlide, !0 !== s && a.slideCount > a.options.slidesToShow ? a.animateSlide(l, function() {
                    a.postSlide(e)
                }) : a.postSlide(e));
                return
            }
            if (a.options.autoplay && clearInterval(a.autoPlayTimer), o = e < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + e : e >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : e - a.slideCount : e, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, o]), n = a.currentSlide, a.currentSlide = o, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (r = (r = a.getNavTarget()).slick("getSlick")).slideCount <= r.options.slidesToShow && r.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) {
                !0 !== s ? (a.fadeSlideOut(n), a.fadeSlide(o, function() {
                    a.postSlide(o)
                })) : a.postSlide(o), a.animateHeight();
                return
            }!0 !== s && a.slideCount > a.options.slidesToShow ? a.animateSlide(d, function() {
                a.postSlide(o)
            }) : a.postSlide(o)
        }
    }, s.prototype.startLoad = function() {
        !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && (this.$prevArrow.hide(), this.$nextArrow.hide()), !0 === this.options.dots && this.slideCount > this.options.slidesToShow && this.$dots.hide(), this.$slider.addClass("slick-loading")
    }, s.prototype.swipeDirection = function() {
        var i, t, s, e;
        return (i = this.touchObject.startX - this.touchObject.curX, (e = Math.round(180 * (s = Math.atan2(t = this.touchObject.startY - this.touchObject.curY, i)) / Math.PI)) < 0 && (e = 360 - Math.abs(e)), e <= 45 && e >= 0 || e <= 360 && e >= 315) ? !1 === this.options.rtl ? "left" : "right" : e >= 135 && e <= 225 ? !1 === this.options.rtl ? "right" : "left" : !0 === this.options.verticalSwiping ? e >= 35 && e <= 135 ? "down" : "up" : "vertical"
    }, s.prototype.swipeEnd = function(i) {
        var t, s, e = this;
        if (e.dragging = !1, e.swiping = !1, e.scrolling) return e.scrolling = !1, !1;
        if (e.interrupted = !1, e.shouldClick = !(e.touchObject.swipeLength > 10), void 0 === e.touchObject.curX) return !1;
        if (!0 === e.touchObject.edgeHit && e.$slider.trigger("edge", [e, e.swipeDirection()]), e.touchObject.swipeLength >= e.touchObject.minSwipe) {
            switch (s = e.swipeDirection()) {
                case "left":
                case "down":
                    t = e.options.swipeToSlide ? e.checkNavigable(e.currentSlide + e.getSlideCount()) : e.currentSlide + e.getSlideCount(), e.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    t = e.options.swipeToSlide ? e.checkNavigable(e.currentSlide - e.getSlideCount()) : e.currentSlide - e.getSlideCount(), e.currentDirection = 1
            }
            "vertical" != s && (e.slideHandler(t), e.touchObject = {}, e.$slider.trigger("swipe", [e, s]))
        } else e.touchObject.startX !== e.touchObject.curX && (e.slideHandler(e.currentSlide), e.touchObject = {})
    }, s.prototype.swipeHandler = function(i) {
        var t = this;
        if (!1 !== t.options.swipe && (!("ontouchend" in document) || !1 !== t.options.swipe)) {
            if (!1 !== t.options.draggable || -1 === i.type.indexOf("mouse")) switch (t.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), i.data.action) {
                case "start":
                    t.swipeStart(i);
                    break;
                case "move":
                    t.swipeMove(i);
                    break;
                case "end":
                    t.swipeEnd(i)
            }
        }
    }, s.prototype.swipeMove = function(i) {
        var t, s, e, o, n, l, r = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !!r.dragging && !r.scrolling && (!n || 1 === n.length) && ((t = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, r.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), l = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2))), r.options.verticalSwiping || r.swiping || !(l > 4)) ? (!0 === r.options.verticalSwiping && (r.touchObject.swipeLength = l), s = r.swipeDirection(), void 0 !== i.originalEvent && r.touchObject.swipeLength > 4 && (r.swiping = !0, i.preventDefault()), o = (!1 === r.options.rtl ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), !0 === r.options.verticalSwiping && (o = r.touchObject.curY > r.touchObject.startY ? 1 : -1), e = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, !1 === r.options.infinite && (0 === r.currentSlide && "right" === s || r.currentSlide >= r.getDotCount() && "left" === s) && (e = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), !1 === r.options.vertical ? r.swipeLeft = t + e * o : r.swipeLeft = t + e * (r.$list.height() / r.listWidth) * o, !0 === r.options.verticalSwiping && (r.swipeLeft = t + e * o), !0 !== r.options.fade && !1 !== r.options.touchMove && (!0 === r.animating ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft))) : (r.scrolling = !0, !1))
    }, s.prototype.swipeStart = function(i) {
        var t, s = this;
        if (s.interrupted = !0, 1 !== s.touchObject.fingerCount || s.slideCount <= s.options.slidesToShow) return s.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (t = i.originalEvent.touches[0]), s.touchObject.startX = s.touchObject.curX = void 0 !== t ? t.pageX : i.clientX, s.touchObject.startY = s.touchObject.curY = void 0 !== t ? t.pageY : i.clientY, s.dragging = !0
    }, s.prototype.unfilterSlides = s.prototype.slickUnfilter = function() {
        null !== this.$slidesCache && (this.unload(), this.$slideTrack.children(this.options.slide).detach(), this.$slidesCache.appendTo(this.$slideTrack), this.reinit())
    }, s.prototype.unload = function() {
        i(".slick-cloned", this.$slider).remove(), this.$dots && this.$dots.remove(), this.$prevArrow && this.htmlExpr.test(this.options.prevArrow) && this.$prevArrow.remove(), this.$nextArrow && this.htmlExpr.test(this.options.nextArrow) && this.$nextArrow.remove(), this.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, s.prototype.unslick = function(i) {
        this.$slider.trigger("unslick", [this, i]), this.destroy()
    }, s.prototype.updateArrows = function() {
        var i;
        i = Math.floor(this.options.slidesToShow / 2), !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && !this.options.infinite && (this.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), this.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === this.currentSlide ? (this.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), this.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : this.currentSlide >= this.slideCount - this.options.slidesToShow && !1 === this.options.centerMode ? (this.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), this.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : this.currentSlide >= this.slideCount - 1 && !0 === this.options.centerMode && (this.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), this.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, s.prototype.updateDots = function() {
        null !== this.$dots && (this.$dots.find("li").removeClass("slick-active").end(), this.$dots.find("li").eq(Math.floor(this.currentSlide / this.options.slidesToScroll)).addClass("slick-active"))
    }, s.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, i.fn.slick = function() {
        var i, t, e = this,
            o = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            l = e.length;
        for (i = 0; i < l; i++)
            if ("object" == typeof o || void 0 === o ? e[i].slick = new s(e[i], o) : t = e[i].slick[o].apply(e[i].slick, n), void 0 !== t) return t;
        return e
    }
});