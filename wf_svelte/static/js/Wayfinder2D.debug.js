if (Float32Array === undefined) {
    var Float32Array = function() {
        return [ 0, 0 ];
    };
}

if (typeof window !== "undefined") {
    window.requestAnimFrame = function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 16);
        };
    }();
    (function() {
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    })();
    if (typeof String.prototype.format !== "function") {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != "undefined" ? args[number] : match;
            });
        };
    }
    window.log = function() {
        log.history = log.history || [];
        log.history.push(arguments);
        if (this.console) {
            console.log(Array.prototype.slice.call(arguments));
        }
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
}

window.console = window.console || {
    log: function() {},
    error: function() {}
};

if (!Array.prototype.map) {
    Array.prototype.map = function(callback) {
        var T, A, k;
        if (this == null) {
            throw new TypeError("this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }
        if (arguments.length > 1) {
            T = arguments[1];
        }
        A = new Array(len);
        k = 0;
        while (k < len) {
            var kValue, mappedValue;
            if (k in O) {
                kValue = O[k];
                mappedValue = callback.call(T, kValue, k, O);
                A[k] = mappedValue;
            }
            k++;
        }
        return A;
    };
}

var Class = function() {};

(function() {
    var initializing = false, fnTest = /xyz/.test(function() {
        xyz;
    }) ? /\b_super\b/ : /.*/;
    this.Class = function() {};
    Class.extend = function(prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? function(name, fn) {
                return function() {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            }(name, prop[name]) : prop[name];
        }
        function Class() {
            if (!initializing && this.init) this.init.apply(this, arguments);
        }
        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
})();

function ClassCallback(classScope, fnCallback) {
    return function() {
        return fnCallback.apply(classScope, arguments);
    };
}

var Callback = ClassCallback;

!function(a, b, c, d) {
    "use strict";
    function e(a, b, c) {
        return setTimeout(j(a, c), b);
    }
    function f(a, b, c) {
        return Array.isArray(a) ? (g(a, c[b], c), !0) : !1;
    }
    function g(a, b, c) {
        var e;
        if (a) if (a.forEach) a.forEach(b, c); else if (a.length !== d) for (e = 0; e < a.length; ) b.call(c, a[e], e, a), 
        e++; else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a);
    }
    function h(b, c, d) {
        var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";
        return function() {
            var c = new Error("get-stack-trace"), d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", f = a.console && (a.console.warn || a.console.log);
            return f && f.call(a.console, e, d), b.apply(this, arguments);
        };
    }
    function i(a, b, c) {
        var d, e = b.prototype;
        d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && la(d, c);
    }
    function j(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    }
    function k(a, b) {
        return typeof a == oa ? a.apply(b ? b[0] || d : d, b) : a;
    }
    function l(a, b) {
        return a === d ? b : a;
    }
    function m(a, b, c) {
        g(q(b), function(b) {
            a.addEventListener(b, c, !1);
        });
    }
    function n(a, b, c) {
        g(q(b), function(b) {
            a.removeEventListener(b, c, !1);
        });
    }
    function o(a, b) {
        for (;a; ) {
            if (a == b) return !0;
            a = a.parentNode;
        }
        return !1;
    }
    function p(a, b) {
        return a.indexOf(b) > -1;
    }
    function q(a) {
        return a.trim().split(/\s+/g);
    }
    function r(a, b, c) {
        if (a.indexOf && !c) return a.indexOf(b);
        for (var d = 0; d < a.length; ) {
            if (c && a[d][c] == b || !c && a[d] === b) return d;
            d++;
        }
        return -1;
    }
    function s(a) {
        return Array.prototype.slice.call(a, 0);
    }
    function t(a, b, c) {
        for (var d = [], e = [], f = 0; f < a.length; ) {
            var g = b ? a[f][b] : a[f];
            r(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
        }
        return c && (d = b ? d.sort(function(a, c) {
            return a[b] > c[b];
        }) : d.sort()), d;
    }
    function u(a, b) {
        for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length; ) {
            if (c = ma[g], e = c ? c + f : b, e in a) return e;
            g++;
        }
        return d;
    }
    function v() {
        return ua++;
    }
    function w(b) {
        var c = b.ownerDocument || b;
        return c.defaultView || c.parentWindow || a;
    }
    function x(a, b) {
        var c = this;
        this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, 
        this.domHandler = function(b) {
            k(a.options.enable, [ a ]) && c.handler(b);
        }, this.init();
    }
    function y(a) {
        var b, c = a.options.inputClass;
        return new (b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z);
    }
    function z(a, b, c) {
        var d = c.pointers.length, e = c.changedPointers.length, f = b & Ea && d - e === 0, g = b & (Ga | Ha) && d - e === 0;
        c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, 
        A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
    }
    function A(a, b) {
        var c = a.session, d = b.pointers, e = d.length;
        c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);
        var f = c.firstInput, g = c.firstMultiple, h = g ? g.center : f.center, i = b.center = E(d);
        b.timeStamp = ra(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), 
        b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY);
        var j = F(b.deltaTime, b.deltaX, b.deltaY);
        b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y, 
        b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, 
        b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, 
        C(c, b);
        var k = a.element;
        o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k;
    }
    function B(a, b) {
        var c = b.center, d = a.offsetDelta || {}, e = a.prevDelta || {}, f = a.prevInput || {};
        b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = {
            x: f.deltaX || 0,
            y: f.deltaY || 0
        }, d = a.offsetDelta = {
            x: c.x,
            y: c.y
        }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
    }
    function C(a, b) {
        var c, e, f, g, h = a.lastInterval || b, i = b.timeStamp - h.timeStamp;
        if (b.eventType != Ha && (i > Da || h.velocity === d)) {
            var j = b.deltaX - h.deltaX, k = b.deltaY - h.deltaY, l = F(i, j, k);
            e = l.x, f = l.y, c = qa(l.x) > qa(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b;
        } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
        b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g;
    }
    function D(a) {
        for (var b = [], c = 0; c < a.pointers.length; ) b[c] = {
            clientX: pa(a.pointers[c].clientX),
            clientY: pa(a.pointers[c].clientY)
        }, c++;
        return {
            timeStamp: ra(),
            pointers: b,
            center: E(b),
            deltaX: a.deltaX,
            deltaY: a.deltaY
        };
    }
    function E(a) {
        var b = a.length;
        if (1 === b) return {
            x: pa(a[0].clientX),
            y: pa(a[0].clientY)
        };
        for (var c = 0, d = 0, e = 0; b > e; ) c += a[e].clientX, d += a[e].clientY, 
        e++;
        return {
            x: pa(c / b),
            y: pa(d / b)
        };
    }
    function F(a, b, c) {
        return {
            x: b / a || 0,
            y: c / a || 0
        };
    }
    function G(a, b) {
        return a === b ? Ia : qa(a) >= qa(b) ? 0 > a ? Ja : Ka : 0 > b ? La : Ma;
    }
    function H(a, b, c) {
        c || (c = Qa);
        var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]];
        return Math.sqrt(d * d + e * e);
    }
    function I(a, b, c) {
        c || (c = Qa);
        var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]];
        return 180 * Math.atan2(e, d) / Math.PI;
    }
    function J(a, b) {
        return I(b[1], b[0], Ra) + I(a[1], a[0], Ra);
    }
    function K(a, b) {
        return H(b[0], b[1], Ra) / H(a[0], a[1], Ra);
    }
    function L() {
        this.evEl = Ta, this.evWin = Ua, this.pressed = !1, x.apply(this, arguments);
    }
    function M() {
        this.evEl = Xa, this.evWin = Ya, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    function N() {
        this.evTarget = $a, this.evWin = _a, this.started = !1, x.apply(this, arguments);
    }
    function O(a, b) {
        var c = s(a.touches), d = s(a.changedTouches);
        return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [ c, d ];
    }
    function P() {
        this.evTarget = bb, this.targetIds = {}, x.apply(this, arguments);
    }
    function Q(a, b) {
        var c = s(a.touches), d = this.targetIds;
        if (b & (Ea | Fa) && 1 === c.length) return d[c[0].identifier] = !0, [ c, c ];
        var e, f, g = s(a.changedTouches), h = [], i = this.target;
        if (f = c.filter(function(a) {
            return o(a.target, i);
        }), b === Ea) for (e = 0; e < f.length; ) d[f[e].identifier] = !0, e++;
        for (e = 0; e < g.length; ) d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], 
        e++;
        return h.length ? [ t(f.concat(h), "identifier", !0), h ] : void 0;
    }
    function R() {
        x.apply(this, arguments);
        var a = j(this.handler, this);
        this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a), 
        this.primaryTouch = null, this.lastTouches = [];
    }
    function S(a, b) {
        a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b);
    }
    function T(a) {
        var b = a.changedPointers[0];
        if (b.identifier === this.primaryTouch) {
            var c = {
                x: b.clientX,
                y: b.clientY
            };
            this.lastTouches.push(c);
            var d = this.lastTouches, e = function() {
                var a = d.indexOf(c);
                a > -1 && d.splice(a, 1);
            };
            setTimeout(e, cb);
        }
    }
    function U(a) {
        for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) {
            var e = this.lastTouches[d], f = Math.abs(b - e.x), g = Math.abs(c - e.y);
            if (db >= f && db >= g) return !0;
        }
        return !1;
    }
    function V(a, b) {
        this.manager = a, this.set(b);
    }
    function W(a) {
        if (p(a, jb)) return jb;
        var b = p(a, kb), c = p(a, lb);
        return b && c ? jb : b || c ? b ? kb : lb : p(a, ib) ? ib : hb;
    }
    function X() {
        if (!fb) return !1;
        var b = {}, c = a.CSS && a.CSS.supports;
        return [ "auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none" ].forEach(function(d) {
            b[d] = c ? a.CSS.supports("touch-action", d) : !0;
        }), b;
    }
    function Y(a) {
        this.options = la({}, this.defaults, a || {}), this.id = v(), this.manager = null, 
        this.options.enable = l(this.options.enable, !0), this.state = nb, this.simultaneous = {}, 
        this.requireFail = [];
    }
    function Z(a) {
        return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : "";
    }
    function $(a) {
        return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : "";
    }
    function _(a, b) {
        var c = b.manager;
        return c ? c.get(a) : a;
    }
    function aa() {
        Y.apply(this, arguments);
    }
    function ba() {
        aa.apply(this, arguments), this.pX = null, this.pY = null;
    }
    function ca() {
        aa.apply(this, arguments);
    }
    function da() {
        Y.apply(this, arguments), this._timer = null, this._input = null;
    }
    function ea() {
        aa.apply(this, arguments);
    }
    function fa() {
        aa.apply(this, arguments);
    }
    function ga() {
        Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, 
        this._input = null, this.count = 0;
    }
    function ha(a, b) {
        return b = b || {}, b.recognizers = l(b.recognizers, ha.defaults.preset), 
        new ia(a, b);
    }
    function ia(a, b) {
        this.options = la({}, ha.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, 
        this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, 
        this.element = a, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), 
        ja(this, !0), g(this.options.recognizers, function(a) {
            var b = this.add(new a[0](a[1]));
            a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
        }, this);
    }
    function ja(a, b) {
        var c = a.element;
        if (c.style) {
            var d;
            g(a.options.cssProps, function(e, f) {
                d = u(c.style, f), b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || "";
            }), b || (a.oldCssProps = {});
        }
    }
    function ka(a, c) {
        var d = b.createEvent("Event");
        d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
    }
    var la, ma = [ "", "webkit", "Moz", "MS", "ms", "o" ], na = b.createElement("div"), oa = "function", pa = Math.round, qa = Math.abs, ra = Date.now;
    la = "function" != typeof Object.assign ? function(a) {
        if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object");
        for (var b = Object(a), c = 1; c < arguments.length; c++) {
            var e = arguments[c];
            if (e !== d && null !== e) for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f]);
        }
        return b;
    } : Object.assign;
    var sa = h(function(a, b, c) {
        for (var e = Object.keys(b), f = 0; f < e.length; ) (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), 
        f++;
        return a;
    }, "extend", "Use `assign`."), ta = h(function(a, b) {
        return sa(a, b, !0);
    }, "merge", "Use `assign`."), ua = 1, va = /mobile|tablet|ip(ad|hone|od)|android/i, wa = "ontouchstart" in a, xa = u(a, "PointerEvent") !== d, ya = wa && va.test(navigator.userAgent), za = "touch", Aa = "pen", Ba = "mouse", Ca = "kinect", Da = 25, Ea = 1, Fa = 2, Ga = 4, Ha = 8, Ia = 1, Ja = 2, Ka = 4, La = 8, Ma = 16, Na = Ja | Ka, Oa = La | Ma, Pa = Na | Oa, Qa = [ "x", "y" ], Ra = [ "clientX", "clientY" ];
    x.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), 
            this.evWin && m(w(this.element), this.evWin, this.domHandler);
        },
        destroy: function() {
            this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), 
            this.evWin && n(w(this.element), this.evWin, this.domHandler);
        }
    };
    var Sa = {
        mousedown: Ea,
        mousemove: Fa,
        mouseup: Ga
    }, Ta = "mousedown", Ua = "mousemove mouseup";
    i(L, x, {
        handler: function(a) {
            var b = Sa[a.type];
            b & Ea && 0 === a.button && (this.pressed = !0), b & Fa && 1 !== a.which && (b = Ga), 
            this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, {
                pointers: [ a ],
                changedPointers: [ a ],
                pointerType: Ba,
                srcEvent: a
            }));
        }
    });
    var Va = {
        pointerdown: Ea,
        pointermove: Fa,
        pointerup: Ga,
        pointercancel: Ha,
        pointerout: Ha
    }, Wa = {
        2: za,
        3: Aa,
        4: Ba,
        5: Ca
    }, Xa = "pointerdown", Ya = "pointermove pointerup pointercancel";
    a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"), 
    i(M, x, {
        handler: function(a) {
            var b = this.store, c = !1, d = a.type.toLowerCase().replace("ms", ""), e = Va[d], f = Wa[a.pointerType] || a.pointerType, g = f == za, h = r(b, a.pointerId, "pointerId");
            e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0), 
            0 > h || (b[h] = a, this.callback(this.manager, e, {
                pointers: b,
                changedPointers: [ a ],
                pointerType: f,
                srcEvent: a
            }), c && b.splice(h, 1));
        }
    });
    var Za = {
        touchstart: Ea,
        touchmove: Fa,
        touchend: Ga,
        touchcancel: Ha
    }, $a = "touchstart", _a = "touchstart touchmove touchend touchcancel";
    i(N, x, {
        handler: function(a) {
            var b = Za[a.type];
            if (b === Ea && (this.started = !0), this.started) {
                var c = O.call(this, a, b);
                b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), 
                this.callback(this.manager, b, {
                    pointers: c[0],
                    changedPointers: c[1],
                    pointerType: za,
                    srcEvent: a
                });
            }
        }
    });
    var ab = {
        touchstart: Ea,
        touchmove: Fa,
        touchend: Ga,
        touchcancel: Ha
    }, bb = "touchstart touchmove touchend touchcancel";
    i(P, x, {
        handler: function(a) {
            var b = ab[a.type], c = Q.call(this, a, b);
            c && this.callback(this.manager, b, {
                pointers: c[0],
                changedPointers: c[1],
                pointerType: za,
                srcEvent: a
            });
        }
    });
    var cb = 2500, db = 25;
    i(R, x, {
        handler: function(a, b, c) {
            var d = c.pointerType == za, e = c.pointerType == Ba;
            if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) {
                if (d) S.call(this, b, c); else if (e && U.call(this, c)) return;
                this.callback(a, b, c);
            }
        },
        destroy: function() {
            this.touch.destroy(), this.mouse.destroy();
        }
    });
    var eb = u(na.style, "touchAction"), fb = eb !== d, gb = "compute", hb = "auto", ib = "manipulation", jb = "none", kb = "pan-x", lb = "pan-y", mb = X();
    V.prototype = {
        set: function(a) {
            a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), 
            this.actions = a.toLowerCase().trim();
        },
        update: function() {
            this.set(this.manager.options.touchAction);
        },
        compute: function() {
            var a = [];
            return g(this.manager.recognizers, function(b) {
                k(b.options.enable, [ b ]) && (a = a.concat(b.getTouchAction()));
            }), W(a.join(" "));
        },
        preventDefaults: function(a) {
            var b = a.srcEvent, c = a.offsetDirection;
            if (this.manager.session.prevented) return void b.preventDefault();
            var d = this.actions, e = p(d, jb) && !mb[jb], f = p(d, lb) && !mb[lb], g = p(d, kb) && !mb[kb];
            if (e) {
                var h = 1 === a.pointers.length, i = a.distance < 2, j = a.deltaTime < 250;
                if (h && i && j) return;
            }
            return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0;
        },
        preventSrc: function(a) {
            this.manager.session.prevented = !0, a.preventDefault();
        }
    };
    var nb = 1, ob = 2, pb = 4, qb = 8, rb = qb, sb = 16, tb = 32;
    Y.prototype = {
        defaults: {},
        set: function(a) {
            return la(this.options, a), this.manager && this.manager.touchAction.update(), 
            this;
        },
        recognizeWith: function(a) {
            if (f(a, "recognizeWith", this)) return this;
            var b = this.simultaneous;
            return a = _(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), 
            this;
        },
        dropRecognizeWith: function(a) {
            return f(a, "dropRecognizeWith", this) ? this : (a = _(a, this), delete this.simultaneous[a.id], 
            this);
        },
        requireFailure: function(a) {
            if (f(a, "requireFailure", this)) return this;
            var b = this.requireFail;
            return a = _(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), 
            this;
        },
        dropRequireFailure: function(a) {
            if (f(a, "dropRequireFailure", this)) return this;
            a = _(a, this);
            var b = r(this.requireFail, a);
            return b > -1 && this.requireFail.splice(b, 1), this;
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0;
        },
        canRecognizeWith: function(a) {
            return !!this.simultaneous[a.id];
        },
        emit: function(a) {
            function b(b) {
                c.manager.emit(b, a);
            }
            var c = this, d = this.state;
            qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), 
            d >= qb && b(c.options.event + Z(d));
        },
        tryEmit: function(a) {
            return this.canEmit() ? this.emit(a) : void (this.state = tb);
        },
        canEmit: function() {
            for (var a = 0; a < this.requireFail.length; ) {
                if (!(this.requireFail[a].state & (tb | nb))) return !1;
                a++;
            }
            return !0;
        },
        recognize: function(a) {
            var b = la({}, a);
            return k(this.options.enable, [ this, b ]) ? (this.state & (rb | sb | tb) && (this.state = nb), 
            this.state = this.process(b), void (this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), 
            void (this.state = tb));
        },
        process: function(a) {},
        getTouchAction: function() {},
        reset: function() {}
    }, i(aa, Y, {
        defaults: {
            pointers: 1
        },
        attrTest: function(a) {
            var b = this.options.pointers;
            return 0 === b || a.pointers.length === b;
        },
        process: function(a) {
            var b = this.state, c = a.eventType, d = b & (ob | pb), e = this.attrTest(a);
            return d && (c & Ha || !e) ? b | sb : d || e ? c & Ga ? b | qb : b & ob ? b | pb : ob : tb;
        }
    }), i(ba, aa, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: Pa
        },
        getTouchAction: function() {
            var a = this.options.direction, b = [];
            return a & Na && b.push(lb), a & Oa && b.push(kb), b;
        },
        directionTest: function(a) {
            var b = this.options, c = !0, d = a.distance, e = a.direction, f = a.deltaX, g = a.deltaY;
            return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia : 0 > f ? Ja : Ka, 
            c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia : 0 > g ? La : Ma, 
            c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
        },
        attrTest: function(a) {
            return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a));
        },
        emit: function(a) {
            this.pX = a.deltaX, this.pY = a.deltaY;
            var b = $(a.direction);
            b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a);
        }
    }), i(ca, aa, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [ jb ];
        },
        attrTest: function(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob);
        },
        emit: function(a) {
            if (1 !== a.scale) {
                var b = a.scale < 1 ? "in" : "out";
                a.additionalEvent = this.options.event + b;
            }
            this._super.emit.call(this, a);
        }
    }), i(da, Y, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 251,
            threshold: 9
        },
        getTouchAction: function() {
            return [ hb ];
        },
        process: function(a) {
            var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime > b.time;
            if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f) this.reset(); else if (a.eventType & Ea) this.reset(), 
            this._timer = e(function() {
                this.state = rb, this.tryEmit();
            }, b.time, this); else if (a.eventType & Ga) return rb;
            return tb;
        },
        reset: function() {
            clearTimeout(this._timer);
        },
        emit: function(a) {
            this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), 
            this.manager.emit(this.options.event, this._input)));
        }
    }), i(ea, aa, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [ jb ];
        },
        attrTest: function(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob);
        }
    }), i(fa, aa, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .3,
            direction: Na | Oa,
            pointers: 1
        },
        getTouchAction: function() {
            return ba.prototype.getTouchAction.call(this);
        },
        attrTest: function(a) {
            var b, c = this.options.direction;
            return c & (Na | Oa) ? b = a.overallVelocity : c & Na ? b = a.overallVelocityX : c & Oa && (b = a.overallVelocityY), 
            this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga;
        },
        emit: function(a) {
            var b = $(a.offsetDirection);
            b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
        }
    }), i(ga, Y, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 9,
            posThreshold: 10
        },
        getTouchAction: function() {
            return [ ib ];
        },
        process: function(a) {
            var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime < b.time;
            if (this.reset(), a.eventType & Ea && 0 === this.count) return this.failTimeout();
            if (d && f && c) {
                if (a.eventType != Ga) return this.failTimeout();
                var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0, h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;
                this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, 
                this._input = a;
                var i = this.count % b.taps;
                if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function() {
                    this.state = rb, this.tryEmit();
                }, b.interval, this), ob) : rb;
            }
            return tb;
        },
        failTimeout: function() {
            return this._timer = e(function() {
                this.state = tb;
            }, this.options.interval, this), tb;
        },
        reset: function() {
            clearTimeout(this._timer);
        },
        emit: function() {
            this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
        }
    }), ha.VERSION = "2.0.8", ha.defaults = {
        domEvents: !1,
        touchAction: gb,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [ [ ea, {
            enable: !1
        } ], [ ca, {
            enable: !1
        }, [ "rotate" ] ], [ fa, {
            direction: Na
        } ], [ ba, {
            direction: Na
        }, [ "swipe" ] ], [ ga ], [ ga, {
            event: "doubletap",
            taps: 2
        }, [ "tap" ] ], [ da ] ],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var ub = 1, vb = 2;
    ia.prototype = {
        set: function(a) {
            return la(this.options, a), a.touchAction && this.touchAction.update(), 
            a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, 
            this.input.init()), this;
        },
        stop: function(a) {
            this.session.stopped = a ? vb : ub;
        },
        recognize: function(a) {
            var b = this.session;
            if (!b.stopped) {
                this.touchAction.preventDefaults(a);
                var c, d = this.recognizers, e = b.curRecognizer;
                (!e || e && e.state & rb) && (e = b.curRecognizer = null);
                for (var f = 0; f < d.length; ) c = d[f], b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), 
                !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++;
            }
        },
        get: function(a) {
            if (a instanceof Y) return a;
            for (var b = this.recognizers, c = 0; c < b.length; c++) if (b[c].options.event == a) return b[c];
            return null;
        },
        add: function(a) {
            if (f(a, "add", this)) return this;
            var b = this.get(a.options.event);
            return b && this.remove(b), this.recognizers.push(a), a.manager = this, 
            this.touchAction.update(), a;
        },
        remove: function(a) {
            if (f(a, "remove", this)) return this;
            if (a = this.get(a)) {
                var b = this.recognizers, c = r(b, a);
                -1 !== c && (b.splice(c, 1), this.touchAction.update());
            }
            return this;
        },
        on: function(a, b) {
            if (a !== d && b !== d) {
                var c = this.handlers;
                return g(q(a), function(a) {
                    c[a] = c[a] || [], c[a].push(b);
                }), this;
            }
        },
        off: function(a, b) {
            if (a !== d) {
                var c = this.handlers;
                return g(q(a), function(a) {
                    b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a];
                }), this;
            }
        },
        emit: function(a, b) {
            this.options.domEvents && ka(a, b);
            var c = this.handlers[a] && this.handlers[a].slice();
            if (c && c.length) {
                b.type = a, b.preventDefault = function() {
                    b.srcEvent.preventDefault();
                };
                for (var d = 0; d < c.length; ) c[d](b), d++;
            }
        },
        destroy: function() {
            this.element && ja(this, !1), this.handlers = {}, this.session = {}, 
            this.input.destroy(), this.element = null;
        }
    }, la(ha, {
        INPUT_START: Ea,
        INPUT_MOVE: Fa,
        INPUT_END: Ga,
        INPUT_CANCEL: Ha,
        STATE_POSSIBLE: nb,
        STATE_BEGAN: ob,
        STATE_CHANGED: pb,
        STATE_ENDED: qb,
        STATE_RECOGNIZED: rb,
        STATE_CANCELLED: sb,
        STATE_FAILED: tb,
        DIRECTION_NONE: Ia,
        DIRECTION_LEFT: Ja,
        DIRECTION_RIGHT: Ka,
        DIRECTION_UP: La,
        DIRECTION_DOWN: Ma,
        DIRECTION_HORIZONTAL: Na,
        DIRECTION_VERTICAL: Oa,
        DIRECTION_ALL: Pa,
        Manager: ia,
        Input: x,
        TouchAction: V,
        TouchInput: P,
        MouseInput: L,
        PointerEventInput: M,
        TouchMouseInput: R,
        SingleTouchInput: N,
        Recognizer: Y,
        AttrRecognizer: aa,
        Tap: ga,
        Pan: ba,
        Swipe: fa,
        Pinch: ca,
        Rotate: ea,
        Press: da,
        on: m,
        off: n,
        each: g,
        merge: ta,
        extend: sa,
        assign: la,
        inherit: i,
        bindFn: j,
        prefixed: u
    });
    var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};
    wb.Hammer = ha, "function" == typeof define && define.amd ? define(function() {
        return ha;
    }) : "undefined" != typeof module && module.exports ? module.exports = ha : a[c] = ha;
}(window, document, "Hammer");

(function() {
    "use strict";
    var shim = {};
    if (typeof exports === "undefined") {
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
            shim.exports = {};
            define(function() {
                return shim.exports;
            });
        } else {
            shim.exports = window;
        }
    } else {
        shim.exports = exports;
    }
    (function(exports) {
        var vec2 = {};
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6;
        }
        vec2.create = function() {
            return new Float32Array(2);
        };
        vec2.clone = function(a) {
            var out = new Float32Array(2);
            out[0] = a[0];
            out[1] = a[1];
            return out;
        };
        vec2.fromValues = function(x, y) {
            var out = new Float32Array(2);
            out[0] = x;
            out[1] = y;
            return out;
        };
        vec2.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            return out;
        };
        vec2.set = function(out, x, y) {
            out[0] = x;
            out[1] = y;
            return out;
        };
        vec2.add = function(out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            return out;
        };
        vec2.sub = vec2.subtract = function(out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            return out;
        };
        vec2.mul = vec2.multiply = function(out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            return out;
        };
        vec2.div = vec2.divide = function(out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            return out;
        };
        vec2.min = function(out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            return out;
        };
        vec2.max = function(out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            return out;
        };
        vec2.scale = function(out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            return out;
        };
        vec2.dist = vec2.distance = function(a, b) {
            var x = b[0] - a[0], y = b[1] - a[1];
            return Math.sqrt(x * x + y * y);
        };
        vec2.sqrDist = vec2.squaredDistance = function(a, b) {
            var x = b[0] - a[0], y = b[1] - a[1];
            return x * x + y * y;
        };
        vec2.len = vec2.length = function(a) {
            var x = a[0], y = a[1];
            return Math.sqrt(x * x + y * y);
        };
        vec2.sqrLen = vec2.squaredLength = function(a) {
            var x = a[0], y = a[1];
            return x * x + y * y;
        };
        vec2.negate = function(out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            return out;
        };
        vec2.normalize = function(out, a) {
            var x = a[0], y = a[1];
            var len = x * x + y * y;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
            }
            return out;
        };
        vec2.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1];
        };
        vec2.cross = function(out, a, b) {
            var z = a[0] * b[1] - a[1] * b[0];
            out[0] = out[1] = 0;
            out[2] = z;
            return out;
        };
        vec2.lerp = function(out, a, b, t) {
            var ax = a[0], ay = a[1];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            return out;
        };
        vec2.transformMat2 = function(out, a, m) {
            var x = a[0], y = a[1];
            out[0] = x * m[0] + y * m[1];
            out[1] = x * m[2] + y * m[3];
            return out;
        };
        vec2.forEach = function() {
            var vec = new Float32Array(2);
            return function(a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 2;
                }
                if (!offset) {
                    offset = 0;
                }
                if (count) {
                    l = Math.min(count * stride + offset, a.length);
                } else {
                    l = a.length;
                }
                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1];
                }
                return a;
            };
        }();
        vec2.str = function(a) {
            return "vec2(" + a[0] + ", " + a[1] + ")";
        };
        if (typeof exports !== "undefined") {
            exports.vec2 = vec2;
        }
        var vec3 = {};
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6;
        }
        vec3.create = function() {
            return new Float32Array(3);
        };
        vec3.clone = function(a) {
            var out = new Float32Array(3);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            return out;
        };
        vec3.fromValues = function(x, y, z) {
            var out = new Float32Array(3);
            out[0] = x;
            out[1] = y;
            out[2] = z;
            return out;
        };
        vec3.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            return out;
        };
        vec3.set = function(out, x, y, z) {
            out[0] = x;
            out[1] = y;
            out[2] = z;
            return out;
        };
        vec3.add = function(out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            return out;
        };
        vec3.sub = vec3.subtract = function(out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            return out;
        };
        vec3.mul = vec3.multiply = function(out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            return out;
        };
        vec3.div = vec3.divide = function(out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            return out;
        };
        vec3.min = function(out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            return out;
        };
        vec3.max = function(out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            return out;
        };
        vec3.scale = function(out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            return out;
        };
        vec3.dist = vec3.distance = function(a, b) {
            var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2];
            return Math.sqrt(x * x + y * y + z * z);
        };
        vec3.sqrDist = vec3.squaredDistance = function(a, b) {
            var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2];
            return x * x + y * y + z * z;
        };
        vec3.len = vec3.length = function(a) {
            var x = a[0], y = a[1], z = a[2];
            return Math.sqrt(x * x + y * y + z * z);
        };
        vec3.sqrLen = vec3.squaredLength = function(a) {
            var x = a[0], y = a[1], z = a[2];
            return x * x + y * y + z * z;
        };
        vec3.negate = function(out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            return out;
        };
        vec3.normalize = function(out, a) {
            var x = a[0], y = a[1], z = a[2];
            var len = x * x + y * y + z * z;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
                out[2] = a[2] * len;
            }
            return out;
        };
        vec3.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        };
        vec3.cross = function(out, a, b) {
            var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2];
            out[0] = ay * bz - az * by;
            out[1] = az * bx - ax * bz;
            out[2] = ax * by - ay * bx;
            return out;
        };
        vec3.lerp = function(out, a, b, t) {
            var ax = a[0], ay = a[1], az = a[2];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
            return out;
        };
        vec3.transformMat4 = function(out, a, m) {
            var x = a[0], y = a[1], z = a[2];
            out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
            out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
            out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
            return out;
        };
        vec3.transformQuat = function(out, a, q) {
            var x = a[0], y = a[1], z = a[2], qx = q[0], qy = q[1], qz = q[2], qw = q[3], ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return out;
        };
        vec3.forEach = function() {
            var vec = new Float32Array(3);
            return function(a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 3;
                }
                if (!offset) {
                    offset = 0;
                }
                if (count) {
                    l = Math.min(count * stride + offset, a.length);
                } else {
                    l = a.length;
                }
                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    vec[2] = a[i + 2];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1];
                    a[i + 2] = vec[2];
                }
                return a;
            };
        }();
        vec3.str = function(a) {
            return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
        };
        if (typeof exports !== "undefined") {
            exports.vec3 = vec3;
        }
        var vec4 = {};
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6;
        }
        vec4.create = function() {
            return new Float32Array(4);
        };
        vec4.clone = function(a) {
            var out = new Float32Array(4);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };
        vec4.fromValues = function(x, y, z, w) {
            var out = new Float32Array(4);
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = w;
            return out;
        };
        vec4.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };
        vec4.set = function(out, x, y, z, w) {
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = w;
            return out;
        };
        vec4.add = function(out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            return out;
        };
        vec4.sub = vec4.subtract = function(out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            out[3] = a[3] - b[3];
            return out;
        };
        vec4.mul = vec4.multiply = function(out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            out[3] = a[3] * b[3];
            return out;
        };
        vec4.div = vec4.divide = function(out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            out[3] = a[3] / b[3];
            return out;
        };
        vec4.min = function(out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            out[3] = Math.min(a[3], b[3]);
            return out;
        };
        vec4.max = function(out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            out[3] = Math.max(a[3], b[3]);
            return out;
        };
        vec4.scale = function(out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            return out;
        };
        vec4.dist = vec4.distance = function(a, b) {
            var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2], w = b[3] - a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        };
        vec4.sqrDist = vec4.squaredDistance = function(a, b) {
            var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2], w = b[3] - a[3];
            return x * x + y * y + z * z + w * w;
        };
        vec4.len = vec4.length = function(a) {
            var x = a[0], y = a[1], z = a[2], w = a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        };
        vec4.sqrLen = vec4.squaredLength = function(a) {
            var x = a[0], y = a[1], z = a[2], w = a[3];
            return x * x + y * y + z * z + w * w;
        };
        vec4.negate = function(out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = -a[3];
            return out;
        };
        vec4.normalize = function(out, a) {
            var x = a[0], y = a[1], z = a[2], w = a[3];
            var len = x * x + y * y + z * z + w * w;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
                out[2] = a[2] * len;
                out[3] = a[3] * len;
            }
            return out;
        };
        vec4.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
        };
        vec4.lerp = function(out, a, b, t) {
            var ax = a[0], ay = a[1], az = a[2], aw = a[3];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
            out[3] = aw + t * (b[3] - aw);
            return out;
        };
        vec4.transformMat4 = function(out, a, m) {
            var x = a[0], y = a[1], z = a[2], w = a[3];
            out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
            out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
            out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
            out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
            return out;
        };
        vec4.transformQuat = function(out, a, q) {
            var x = a[0], y = a[1], z = a[2], qx = q[0], qy = q[1], qz = q[2], qw = q[3], ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return out;
        };
        vec4.forEach = function() {
            var vec = new Float32Array(4);
            return function(a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 4;
                }
                if (!offset) {
                    offset = 0;
                }
                if (count) {
                    l = Math.min(count * stride + offset, a.length);
                } else {
                    l = a.length;
                }
                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    vec[2] = a[i + 2];
                    vec[3] = a[i + 3];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1];
                    a[i + 2] = vec[2];
                    a[i + 3] = vec[3];
                }
                return a;
            };
        }();
        vec4.str = function(a) {
            return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
        };
        if (typeof exports !== "undefined") {
            exports.vec4 = vec4;
        }
        var mat2 = {};
        var mat2Identity = new Float32Array([ 1, 0, 0, 1 ]);
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6;
        }
        mat2.create = function() {
            return new Float32Array(mat2Identity);
        };
        mat2.clone = function(a) {
            var out = new Float32Array(4);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };
        mat2.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };
        mat2.identity = function(out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };
        mat2.transpose = function(out, a) {
            if (out === a) {
                var a1 = a[1];
                out[1] = a[2];
                out[2] = a1;
            } else {
                out[0] = a[0];
                out[1] = a[2];
                out[2] = a[1];
                out[3] = a[3];
            }
            return out;
        };
        mat2.invert = function(out, a) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], det = a0 * a3 - a2 * a1;
            if (!det) {
                return null;
            }
            det = 1 / det;
            out[0] = a3 * det;
            out[1] = -a1 * det;
            out[2] = -a2 * det;
            out[3] = a0 * det;
            return out;
        };
        mat2.adjoint = function(out, a) {
            var a0 = a[0];
            out[0] = a[3];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a0;
            return out;
        };
        mat2.determinant = function(a) {
            return a[0] * a[3] - a[2] * a[1];
        };
        mat2.mul = mat2.multiply = function(out, a, b) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            out[0] = a0 * b0 + a1 * b2;
            out[1] = a0 * b1 + a1 * b3;
            out[2] = a2 * b0 + a3 * b2;
            out[3] = a2 * b1 + a3 * b3;
            return out;
        };
        mat2.rotate = function(out, a, rad) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], s = Math.sin(rad), c = Math.cos(rad);
            out[0] = a0 * c + a1 * s;
            out[1] = a0 * -s + a1 * c;
            out[2] = a2 * c + a3 * s;
            out[3] = a2 * -s + a3 * c;
            return out;
        };
        mat2.scale = function(out, a, v) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], v0 = v[0], v1 = v[1];
            out[0] = a0 * v0;
            out[1] = a1 * v1;
            out[2] = a2 * v0;
            out[3] = a3 * v1;
            return out;
        };
        mat2.str = function(a) {
            return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
        };
        if (typeof exports !== "undefined") {
            exports.mat2 = mat2;
        }
        var mat3 = {};
        var mat3Identity = new Float32Array([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6;
        }
        mat3.create = function() {
            return new Float32Array(mat3Identity);
        };
        mat3.clone = function(a) {
            var out = new Float32Array(9);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };
        mat3.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };
        mat3.identity = function(out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        };
        mat3.transpose = function(out, a) {
            if (out === a) {
                var a01 = a[1], a02 = a[2], a12 = a[5];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a01;
                out[5] = a[7];
                out[6] = a02;
                out[7] = a12;
            } else {
                out[0] = a[0];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a[1];
                out[4] = a[4];
                out[5] = a[7];
                out[6] = a[2];
                out[7] = a[5];
                out[8] = a[8];
            }
            return out;
        };
        mat3.invert = function(out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], b01 = a22 * a11 - a12 * a21, b11 = -a22 * a10 + a12 * a20, b21 = a21 * a10 - a11 * a20, det = a00 * b01 + a01 * b11 + a02 * b21;
            if (!det) {
                return null;
            }
            det = 1 / det;
            out[0] = b01 * det;
            out[1] = (-a22 * a01 + a02 * a21) * det;
            out[2] = (a12 * a01 - a02 * a11) * det;
            out[3] = b11 * det;
            out[4] = (a22 * a00 - a02 * a20) * det;
            out[5] = (-a12 * a00 + a02 * a10) * det;
            out[6] = b21 * det;
            out[7] = (-a21 * a00 + a01 * a20) * det;
            out[8] = (a11 * a00 - a01 * a10) * det;
            return out;
        };
        mat3.adjoint = function(out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8];
            out[0] = a11 * a22 - a12 * a21;
            out[1] = a02 * a21 - a01 * a22;
            out[2] = a01 * a12 - a02 * a11;
            out[3] = a12 * a20 - a10 * a22;
            out[4] = a00 * a22 - a02 * a20;
            out[5] = a02 * a10 - a00 * a12;
            out[6] = a10 * a21 - a11 * a20;
            out[7] = a01 * a20 - a00 * a21;
            out[8] = a00 * a11 - a01 * a10;
            return out;
        };
        mat3.determinant = function(a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8];
            return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
        };
        mat3.mul = mat3.multiply = function(out, a, b) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], b00 = b[0], b01 = b[1], b02 = b[2], b10 = b[3], b11 = b[4], b12 = b[5], b20 = b[6], b21 = b[7], b22 = b[8];
            out[0] = b00 * a00 + b01 * a10 + b02 * a20;
            out[1] = b00 * a01 + b01 * a11 + b02 * a21;
            out[2] = b00 * a02 + b01 * a12 + b02 * a22;
            out[3] = b10 * a00 + b11 * a10 + b12 * a20;
            out[4] = b10 * a01 + b11 * a11 + b12 * a21;
            out[5] = b10 * a02 + b11 * a12 + b12 * a22;
            out[6] = b20 * a00 + b21 * a10 + b22 * a20;
            out[7] = b20 * a01 + b21 * a11 + b22 * a21;
            out[8] = b20 * a02 + b21 * a12 + b22 * a22;
            return out;
        };
        mat3.str = function(a) {
            return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
        };
        if (typeof exports !== "undefined") {
            exports.mat3 = mat3;
        }
        var mat4 = {};
        var mat4Identity = new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]);
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6;
        }
        mat4.create = function() {
            return new Float32Array(mat4Identity);
        };
        mat4.clone = function(a) {
            var out = new Float32Array(16);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };
        mat4.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };
        mat4.identity = function(out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        };
        mat4.transpose = function(out, a) {
            if (out === a) {
                var a01 = a[1], a02 = a[2], a03 = a[3], a12 = a[6], a13 = a[7], a23 = a[11];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a01;
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a02;
                out[9] = a12;
                out[11] = a[14];
                out[12] = a03;
                out[13] = a13;
                out[14] = a23;
            } else {
                out[0] = a[0];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a[1];
                out[5] = a[5];
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a[2];
                out[9] = a[6];
                out[10] = a[10];
                out[11] = a[14];
                out[12] = a[3];
                out[13] = a[7];
                out[14] = a[11];
                out[15] = a[15];
            }
            return out;
        };
        mat4.invert = function(out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) {
                return null;
            }
            det = 1 / det;
            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
            return out;
        };
        mat4.adjoint = function(out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
            out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
            out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
            out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
            out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
            out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
            out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
            out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
            out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
            out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
            out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
            out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
            out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
            out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
            out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
            out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
            return out;
        };
        mat4.determinant = function(a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
            return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        };
        mat4.mul = mat4.multiply = function(out, a, b) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[4];
            b1 = b[5];
            b2 = b[6];
            b3 = b[7];
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[8];
            b1 = b[9];
            b2 = b[10];
            b3 = b[11];
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[12];
            b1 = b[13];
            b2 = b[14];
            b3 = b[15];
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            return out;
        };
        mat4.translate = function(out, a, v) {
            var x = v[0], y = v[1], z = v[2], a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23;
            if (a === out) {
                out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
                out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
                out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
                out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
            } else {
                a00 = a[0];
                a01 = a[1];
                a02 = a[2];
                a03 = a[3];
                a10 = a[4];
                a11 = a[5];
                a12 = a[6];
                a13 = a[7];
                a20 = a[8];
                a21 = a[9];
                a22 = a[10];
                a23 = a[11];
                out[0] = a00;
                out[1] = a01;
                out[2] = a02;
                out[3] = a03;
                out[4] = a10;
                out[5] = a11;
                out[6] = a12;
                out[7] = a13;
                out[8] = a20;
                out[9] = a21;
                out[10] = a22;
                out[11] = a23;
                out[12] = a00 * x + a10 * y + a20 * z + a[12];
                out[13] = a01 * x + a11 * y + a21 * z + a[13];
                out[14] = a02 * x + a12 * y + a22 * z + a[14];
                out[15] = a03 * x + a13 * y + a23 * z + a[15];
            }
            return out;
        };
        mat4.scale = function(out, a, v) {
            var x = v[0], y = v[1], z = v[2];
            out[0] = a[0] * x;
            out[1] = a[1] * x;
            out[2] = a[2] * x;
            out[3] = a[3] * x;
            out[4] = a[4] * y;
            out[5] = a[5] * y;
            out[6] = a[6] * y;
            out[7] = a[7] * y;
            out[8] = a[8] * z;
            out[9] = a[9] * z;
            out[10] = a[10] * z;
            out[11] = a[11] * z;
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };
        mat4.rotate = function(out, a, rad, axis) {
            var x = axis[0], y = axis[1], z = axis[2], len = Math.sqrt(x * x + y * y + z * z), s, c, t, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;
            if (Math.abs(len) < GLMAT_EPSILON) {
                return null;
            }
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;
            a00 = a[0];
            a01 = a[1];
            a02 = a[2];
            a03 = a[3];
            a10 = a[4];
            a11 = a[5];
            a12 = a[6];
            a13 = a[7];
            a20 = a[8];
            a21 = a[9];
            a22 = a[10];
            a23 = a[11];
            b00 = x * x * t + c;
            b01 = y * x * t + z * s;
            b02 = z * x * t - y * s;
            b10 = x * y * t - z * s;
            b11 = y * y * t + c;
            b12 = z * y * t + x * s;
            b20 = x * z * t + y * s;
            b21 = y * z * t - x * s;
            b22 = z * z * t + c;
            out[0] = a00 * b00 + a10 * b01 + a20 * b02;
            out[1] = a01 * b00 + a11 * b01 + a21 * b02;
            out[2] = a02 * b00 + a12 * b01 + a22 * b02;
            out[3] = a03 * b00 + a13 * b01 + a23 * b02;
            out[4] = a00 * b10 + a10 * b11 + a20 * b12;
            out[5] = a01 * b10 + a11 * b11 + a21 * b12;
            out[6] = a02 * b10 + a12 * b11 + a22 * b12;
            out[7] = a03 * b10 + a13 * b11 + a23 * b12;
            out[8] = a00 * b20 + a10 * b21 + a20 * b22;
            out[9] = a01 * b20 + a11 * b21 + a21 * b22;
            out[10] = a02 * b20 + a12 * b21 + a22 * b22;
            out[11] = a03 * b20 + a13 * b21 + a23 * b22;
            if (a !== out) {
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            return out;
        };
        mat4.rotateX = function(out, a, rad) {
            var s = Math.sin(rad), c = Math.cos(rad), a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            if (a !== out) {
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            out[4] = a10 * c + a20 * s;
            out[5] = a11 * c + a21 * s;
            out[6] = a12 * c + a22 * s;
            out[7] = a13 * c + a23 * s;
            out[8] = a20 * c - a10 * s;
            out[9] = a21 * c - a11 * s;
            out[10] = a22 * c - a12 * s;
            out[11] = a23 * c - a13 * s;
            return out;
        };
        mat4.rotateY = function(out, a, rad) {
            var s = Math.sin(rad), c = Math.cos(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            if (a !== out) {
                out[4] = a[4];
                out[5] = a[5];
                out[6] = a[6];
                out[7] = a[7];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            out[0] = a00 * c - a20 * s;
            out[1] = a01 * c - a21 * s;
            out[2] = a02 * c - a22 * s;
            out[3] = a03 * c - a23 * s;
            out[8] = a00 * s + a20 * c;
            out[9] = a01 * s + a21 * c;
            out[10] = a02 * s + a22 * c;
            out[11] = a03 * s + a23 * c;
            return out;
        };
        mat4.rotateZ = function(out, a, rad) {
            var s = Math.sin(rad), c = Math.cos(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            if (a !== out) {
                out[8] = a[8];
                out[9] = a[9];
                out[10] = a[10];
                out[11] = a[11];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            out[0] = a00 * c + a10 * s;
            out[1] = a01 * c + a11 * s;
            out[2] = a02 * c + a12 * s;
            out[3] = a03 * c + a13 * s;
            out[4] = a10 * c - a00 * s;
            out[5] = a11 * c - a01 * s;
            out[6] = a12 * c - a02 * s;
            out[7] = a13 * c - a03 * s;
            return out;
        };
        mat4.fromRotationTranslation = function(out, q, v) {
            var x = q[0], y = q[1], z = q[2], w = q[3], x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
            out[0] = 1 - (yy + zz);
            out[1] = xy + wz;
            out[2] = xz - wy;
            out[3] = 0;
            out[4] = xy - wz;
            out[5] = 1 - (xx + zz);
            out[6] = yz + wx;
            out[7] = 0;
            out[8] = xz + wy;
            out[9] = yz - wx;
            out[10] = 1 - (xx + yy);
            out[11] = 0;
            out[12] = v[0];
            out[13] = v[1];
            out[14] = v[2];
            out[15] = 1;
            return out;
        };
        mat4.frustum = function(out, left, right, bottom, top, near, far) {
            var rl = 1 / (right - left), tb = 1 / (top - bottom), nf = 1 / (near - far);
            out[0] = near * 2 * rl;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = near * 2 * tb;
            out[6] = 0;
            out[7] = 0;
            out[8] = (right + left) * rl;
            out[9] = (top + bottom) * tb;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = far * near * 2 * nf;
            out[15] = 0;
            return out;
        };
        mat4.perspective = function(out, fovy, aspect, near, far) {
            var f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
            out[0] = f / aspect;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = f;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = 2 * far * near * nf;
            out[15] = 0;
            return out;
        };
        mat4.ortho = function(out, left, right, bottom, top, near, far) {
            var lr = 1 / (left - right), bt = 1 / (bottom - top), nf = 1 / (near - far);
            out[0] = -2 * lr;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = -2 * bt;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 2 * nf;
            out[11] = 0;
            out[12] = (left + right) * lr;
            out[13] = (top + bottom) * bt;
            out[14] = (far + near) * nf;
            out[15] = 1;
            return out;
        };
        mat4.lookAt = function(out, eye, center, up) {
            var x0, x1, x2, y0, y1, y2, z0, z1, z2, len, eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2], centerx = center[0], centery = center[1], centerz = center[2];
            if (Math.abs(eyex - centerx) < GLMAT_EPSILON && Math.abs(eyey - centery) < GLMAT_EPSILON && Math.abs(eyez - centerz) < GLMAT_EPSILON) {
                return mat4.identity(out);
            }
            z0 = eyex - centerx;
            z1 = eyey - centery;
            z2 = eyez - centerz;
            len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
            z0 *= len;
            z1 *= len;
            z2 *= len;
            x0 = upy * z2 - upz * z1;
            x1 = upz * z0 - upx * z2;
            x2 = upx * z1 - upy * z0;
            len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
            if (!len) {
                x0 = 0;
                x1 = 0;
                x2 = 0;
            } else {
                len = 1 / len;
                x0 *= len;
                x1 *= len;
                x2 *= len;
            }
            y0 = z1 * x2 - z2 * x1;
            y1 = z2 * x0 - z0 * x2;
            y2 = z0 * x1 - z1 * x0;
            len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
            if (!len) {
                y0 = 0;
                y1 = 0;
                y2 = 0;
            } else {
                len = 1 / len;
                y0 *= len;
                y1 *= len;
                y2 *= len;
            }
            out[0] = x0;
            out[1] = y0;
            out[2] = z0;
            out[3] = 0;
            out[4] = x1;
            out[5] = y1;
            out[6] = z1;
            out[7] = 0;
            out[8] = x2;
            out[9] = y2;
            out[10] = z2;
            out[11] = 0;
            out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
            out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
            out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
            out[15] = 1;
            return out;
        };
        mat4.str = function(a) {
            return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
        };
        if (typeof exports !== "undefined") {
            exports.mat4 = mat4;
        }
        var quat = {};
        var quatIdentity = new Float32Array([ 0, 0, 0, 1 ]);
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6;
        }
        quat.create = function() {
            return new Float32Array(quatIdentity);
        };
        quat.clone = vec4.clone;
        quat.fromValues = vec4.fromValues;
        quat.copy = vec4.copy;
        quat.set = vec4.set;
        quat.identity = function(out) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };
        quat.setAxisAngle = function(out, axis, rad) {
            rad = rad * .5;
            var s = Math.sin(rad);
            out[0] = s * axis[0];
            out[1] = s * axis[1];
            out[2] = s * axis[2];
            out[3] = Math.cos(rad);
            return out;
        };
        quat.add = vec4.add;
        quat.mul = quat.multiply = function(out, a, b) {
            var ax = a[0], ay = a[1], az = a[2], aw = a[3], bx = b[0], by = b[1], bz = b[2], bw = b[3];
            out[0] = ax * bw + aw * bx + ay * bz - az * by;
            out[1] = ay * bw + aw * by + az * bx - ax * bz;
            out[2] = az * bw + aw * bz + ax * by - ay * bx;
            out[3] = aw * bw - ax * bx - ay * by - az * bz;
            return out;
        };
        quat.scale = vec4.scale;
        quat.rotateX = function(out, a, rad) {
            rad *= .5;
            var ax = a[0], ay = a[1], az = a[2], aw = a[3], bx = Math.sin(rad), bw = Math.cos(rad);
            out[0] = ax * bw + aw * bx;
            out[1] = ay * bw + az * bx;
            out[2] = az * bw - ay * bx;
            out[3] = aw * bw - ax * bx;
            return out;
        };
        quat.rotateY = function(out, a, rad) {
            rad *= .5;
            var ax = a[0], ay = a[1], az = a[2], aw = a[3], by = Math.sin(rad), bw = Math.cos(rad);
            out[0] = ax * bw - az * by;
            out[1] = ay * bw + aw * by;
            out[2] = az * bw + ax * by;
            out[3] = aw * bw - ay * by;
            return out;
        };
        quat.rotateZ = function(out, a, rad) {
            rad *= .5;
            var ax = a[0], ay = a[1], az = a[2], aw = a[3], bz = Math.sin(rad), bw = Math.cos(rad);
            out[0] = ax * bw + ay * bz;
            out[1] = ay * bw - ax * bz;
            out[2] = az * bw + aw * bz;
            out[3] = aw * bw - az * bz;
            return out;
        };
        quat.calculateW = function(out, a) {
            var x = a[0], y = a[1], z = a[2];
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = -Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
            return out;
        };
        quat.dot = vec4.dot;
        quat.lerp = vec4.lerp;
        quat.slerp = function(out, a, b, t) {
            var ax = a[0], ay = a[1], az = a[2], aw = a[3], bx = b[0], by = b[1], bz = b[2], bw = a[3];
            var cosHalfTheta = ax * bx + ay * by + az * bz + aw * bw, halfTheta, sinHalfTheta, ratioA, ratioB;
            if (Math.abs(cosHalfTheta) >= 1) {
                if (out !== a) {
                    out[0] = ax;
                    out[1] = ay;
                    out[2] = az;
                    out[3] = aw;
                }
                return out;
            }
            halfTheta = Math.acos(cosHalfTheta);
            sinHalfTheta = Math.sqrt(1 - cosHalfTheta * cosHalfTheta);
            if (Math.abs(sinHalfTheta) < .001) {
                out[0] = ax * .5 + bx * .5;
                out[1] = ay * .5 + by * .5;
                out[2] = az * .5 + bz * .5;
                out[3] = aw * .5 + bw * .5;
                return out;
            }
            ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
            ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
            out[0] = ax * ratioA + bx * ratioB;
            out[1] = ay * ratioA + by * ratioB;
            out[2] = az * ratioA + bz * ratioB;
            out[3] = aw * ratioA + bw * ratioB;
            return out;
        };
        quat.invert = function(out, a) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3, invDot = dot ? 1 / dot : 0;
            out[0] = -a0 * invDot;
            out[1] = -a1 * invDot;
            out[2] = -a2 * invDot;
            out[3] = a3 * invDot;
            return out;
        };
        quat.conjugate = function(out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a[3];
            return out;
        };
        quat.len = quat.length = vec4.length;
        quat.sqrLen = quat.squaredLength = vec4.squaredLength;
        quat.normalize = vec4.normalize;
        quat.str = function(a) {
            return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
        };
        if (typeof exports !== "undefined") {
            exports.quat = quat;
        }
    })(shim.exports);
})();

var ArrayUtility = Class.extend({
    init: function(objectOrArray) {
        if (objectOrArray instanceof Object) {
            var object = objectOrArray;
            this.data = [];
            for (var i in object) {
                this.data.push(object[i]);
            }
        } else if (objectOrArray instanceof Array) {
            this.data = objectOrArray;
        } else throw "Argument objectOrArray must be an object or array";
    },
    get: function() {
        return this.data;
    },
    sort: function(callback) {
        var cb = function(a, b) {
            if (callback(a, b)) return 1;
            if (callback(b, a)) return -1;
            return 0;
        };
        this.data.sort(cb);
        return this.data;
    }
});

var Color = function(r, g, b, a) {
    this.r = 1;
    this.g = 1;
    this.b = 1;
    this.a = 1;
    this.clone = function() {
        return new Color(this.r, this.g, this.b, this.a);
    };
    this.fromHex = function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
        if (result) {
            this.r = parseInt(result[1], 16) / 255;
            this.g = parseInt(result[2], 16) / 255;
            this.b = parseInt(result[3], 16) / 255;
            if (result[4]) this.a = parseInt(result[4], 16) / 255;
        }
        return this;
    };
    this.toHex = function() {
        var componentToHex = function(v) {
            var h = v.toString(16);
            return h.length == 1 ? "0" + h : h;
        };
        return "#" + componentToHex(this.r * 255) + componentToHex(this.g * 255) + componentToHex(this.b * 255) + componentToHex(this.a * 255);
    };
    this.toString = function() {
        return "rgba(" + Math.floor(this.r * 255) + ", " + Math.floor(this.g * 255) + ", " + Math.floor(this.b * 255) + ", " + this.a + ")";
    };
    this.toVector = function() {
        return vec4.fromValues(this.r, this.g, this.b, this.a);
    };
    this.set = function(r, g, b, a) {
        if (typeof r == "number") this.r = r;
        if (typeof g == "number") this.g = g;
        if (typeof b == "number") this.b = b;
        if (typeof a == "number") this.a = a;
    };
    this.set(r, g, b, a);
};

function Rectangle(_x, _y, _width, _height) {
    this.x = _x;
    this.y = _y;
    this.width = _width;
    this.height = _height;
    this.intersects = function(other) {
        return !(other.x > this.x + this.width || other.x + other.width < this.x || other.y > this.y + this.height || other.y + other.height < this.y);
    };
}

var WayfinderAPI = {
    LOCATION: "//api.3dwayfinder.com/",
    LIVE_LOCATION: "//api.3dwayfinder.com/",
    CDN_LOCATION: "//wayfinder-cdn.com/",
    PROJECT: false,
    LIVE: false,
    getLOCATION(live) {
        return live || WayfinderAPI.LIVE ? WayfinderAPI.LIVE_LOCATION : WayfinderAPI.LOCATION;
    },
    getJSON: function(url, callback) {
        Logistics.getJSON(url, callback).error(function(info) {
            if (console && console.log) console.log("Failed to get JSON: " + JSON.stringify(info));
        });
    },
    getURL: function(classname, method, args, live) {
        if (WayfinderAPI.PROJECT === false) throw "No project opened! Call WayfinderAPI.open(<project name>);";
        args = args || [];
        return [ WayfinderAPI.getLOCATION(live), "public", WayfinderAPI.PROJECT, classname, method ].concat(args).join("/");
    },
    open: function(project) {
        WayfinderAPI.PROJECT = project;
    }
};

WayfinderAPI["2d"] = {};

WayfinderAPI["3d"] = {};

WayfinderAPI["access"] = {};

WayfinderAPI["advertisements"] = {};

WayfinderAPI["beacons"] = {};

WayfinderAPI["building"] = {};

WayfinderAPI["guitranslations"] = {};

WayfinderAPI["images"] = {};

WayfinderAPI["kiosks"] = {};

WayfinderAPI["languages"] = {};

WayfinderAPI["lights"] = {};

WayfinderAPI["locationgroups"] = {};

WayfinderAPI["locations"] = {};

WayfinderAPI["materials"] = {};

WayfinderAPI["mobile"] = {};

WayfinderAPI["models"] = {};

WayfinderAPI["navigation"] = {};

WayfinderAPI["poisettings"] = {};

WayfinderAPI["pages"] = {};

WayfinderAPI["svg"] = {};

WayfinderAPI["settings"] = {};

WayfinderAPI["snapshot"] = {};

WayfinderAPI["statistics"] = {};

WayfinderAPI["templates"] = {};

WayfinderAPI["textures"] = {};

WayfinderAPI["2d"]["bundle"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "bundle", [], live), callback);
};

WayfinderAPI["2d"]["bundle"].url = function() {
    return WayfinderAPI.getURL("2d", "bundle", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["edges"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "edges", [], live), callback);
};

WayfinderAPI["2d"]["edges"].url = function() {
    return WayfinderAPI.getURL("2d", "edges", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["getWatermark"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "getWatermark", [], live), callback);
};

WayfinderAPI["2d"]["getWatermark"].url = function() {
    return WayfinderAPI.getURL("2d", "getWatermark", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["image"] = function(level_id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "image", [ level_id ], live), callback);
};

WayfinderAPI["2d"]["image"].url = function(level_id) {
    return WayfinderAPI.getURL("2d", "image", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["lod"] = function(level_id, lod, x, y, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "lod", [ level_id, lod, x, y ], live), callback);
};

WayfinderAPI["2d"]["lod"].url = function(level_id, lod, x, y) {
    return WayfinderAPI.getURL("2d", "lod", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["lodcount"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "lodcount", [], live), callback);
};

WayfinderAPI["2d"]["lodcount"].url = function() {
    return WayfinderAPI.getURL("2d", "lodcount", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["nodes"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "nodes", [], live), callback);
};

WayfinderAPI["2d"]["nodes"].url = function() {
    return WayfinderAPI.getURL("2d", "nodes", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["overlays"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "overlays", [], live), callback);
};

WayfinderAPI["2d"]["overlays"].url = function() {
    return WayfinderAPI.getURL("2d", "overlays", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["2d"]["pack"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("2d", "pack", [], live), callback);
};

WayfinderAPI["2d"]["pack"].url = function() {
    return WayfinderAPI.getURL("2d", "pack", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["3d"]["getWatermark"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("3d", "getWatermark", [], live), callback);
};

WayfinderAPI["3d"]["getWatermark"].url = function() {
    return WayfinderAPI.getURL("3d", "getWatermark", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["3d"]["pack"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("3d", "pack", [], live), callback);
};

WayfinderAPI["3d"]["pack"].url = function() {
    return WayfinderAPI.getURL("3d", "pack", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["3d"]["scene"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("3d", "scene", [], live), callback);
};

WayfinderAPI["3d"]["scene"].url = function() {
    return WayfinderAPI.getURL("3d", "scene", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["access"]["hasWatermark"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("access", "hasWatermark", [], live), callback);
};

WayfinderAPI["access"]["hasWatermark"].url = function() {
    return WayfinderAPI.getURL("access", "hasWatermark", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["access"]["template"] = function(templateName, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("access", "template", [ templateName ], live), callback);
};

WayfinderAPI["access"]["template"].url = function(templateName) {
    return WayfinderAPI.getURL("access", "template", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["advertisements"]["all"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("advertisements", "all", [], live), callback);
};

WayfinderAPI["advertisements"]["all"].url = function() {
    return WayfinderAPI.getURL("advertisements", "all", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["advertisements"]["data"] = function(id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("advertisements", "data", [ id ], live), callback);
};

WayfinderAPI["advertisements"]["data"].url = function(id) {
    return WayfinderAPI.getURL("advertisements", "data", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["advertisements"]["frames"] = function(template_id, container_id, check_time, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("advertisements", "frames", [ template_id, container_id, check_time ], live), callback);
};

WayfinderAPI["advertisements"]["frames"].url = function(template_id, container_id, check_time) {
    return WayfinderAPI.getURL("advertisements", "frames", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["beacons"]["getBeacon"] = function(id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("beacons", "getBeacon", [ id ], live), callback);
};

WayfinderAPI["beacons"]["getBeacon"].url = function(id) {
    return WayfinderAPI.getURL("beacons", "getBeacon", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["beacons"]["getBeacons"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("beacons", "getBeacons", [], live), callback);
};

WayfinderAPI["beacons"]["getBeacons"].url = function() {
    return WayfinderAPI.getURL("beacons", "getBeacons", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["building"]["levels"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("building", "levels", [], live), callback);
};

WayfinderAPI["building"]["levels"].url = function() {
    return WayfinderAPI.getURL("building", "levels", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["building"]["location"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("building", "location", [], live), callback);
};

WayfinderAPI["building"]["location"].url = function() {
    return WayfinderAPI.getURL("building", "location", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["building"]["pack"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("building", "pack", [], live), callback);
};

WayfinderAPI["building"]["pack"].url = function() {
    return WayfinderAPI.getURL("building", "pack", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["guitranslations"]["get"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("guitranslations", "get", [], live), callback);
};

WayfinderAPI["guitranslations"]["get"].url = function() {
    return WayfinderAPI.getURL("guitranslations", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["images"]["checkImage"] = function(id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("images", "checkImage", [ id ], live), callback);
};

WayfinderAPI["images"]["checkImage"].url = function(id) {
    return WayfinderAPI.getURL("images", "checkImage", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["images"]["get"] = function(id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("images", "get", [ id ], live), callback);
};

WayfinderAPI["images"]["get"].url = function(id) {
    return WayfinderAPI.getURL("images", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["images"]["thumbnail"] = function(id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("images", "thumbnail", [ id ], live), callback);
};

WayfinderAPI["images"]["thumbnail"].url = function(id) {
    return WayfinderAPI.getURL("images", "thumbnail", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["kiosks"]["all"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("kiosks", "all", [], live), callback);
};

WayfinderAPI["kiosks"]["all"].url = function() {
    return WayfinderAPI.getURL("kiosks", "all", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["kiosks"]["start"] = function(kioskId, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("kiosks", "start", [ kioskId ], live), callback);
};

WayfinderAPI["kiosks"]["start"].url = function(kioskId) {
    return WayfinderAPI.getURL("kiosks", "start", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["languages"]["get"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("languages", "get", [], live), callback);
};

WayfinderAPI["languages"]["get"].url = function() {
    return WayfinderAPI.getURL("languages", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["languages"]["translation"] = function(id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("languages", "translation", [ id ], live), callback);
};

WayfinderAPI["languages"]["translation"].url = function(id) {
    return WayfinderAPI.getURL("languages", "translation", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["lights"]["get"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("lights", "get", [], live), callback);
};

WayfinderAPI["lights"]["get"].url = function() {
    return WayfinderAPI.getURL("lights", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["locationgroups"]["get"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("locationgroups", "get", [], live), callback);
};

WayfinderAPI["locationgroups"]["get"].url = function() {
    return WayfinderAPI.getURL("locationgroups", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["locations"]["byfloor"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("locations", "byfloor", [], live), callback);
};

WayfinderAPI["locations"]["byfloor"].url = function() {
    return WayfinderAPI.getURL("locations", "byfloor", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["locations"]["bygroup"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("locations", "bygroup", [], live), callback);
};

WayfinderAPI["locations"]["bygroup"].url = function() {
    return WayfinderAPI.getURL("locations", "bygroup", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["locations"]["bynode"] = function(node_id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("locations", "bynode", [ node_id ], live), callback);
};

WayfinderAPI["locations"]["bynode"].url = function(node_id) {
    return WayfinderAPI.getURL("locations", "bynode", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["locations"]["get"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("locations", "get", [], live), callback);
};

WayfinderAPI["locations"]["get"].url = function() {
    return WayfinderAPI.getURL("locations", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["locations"]["location"] = function(poi_id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("locations", "location", [ poi_id ], live), callback);
};

WayfinderAPI["locations"]["location"].url = function(poi_id) {
    return WayfinderAPI.getURL("locations", "location", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["locations"]["tags"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("locations", "tags", [], live), callback);
};

WayfinderAPI["locations"]["tags"].url = function() {
    return WayfinderAPI.getURL("locations", "tags", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["materials"]["get"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("materials", "get", [], live), callback);
};

WayfinderAPI["materials"]["get"].url = function() {
    return WayfinderAPI.getURL("materials", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["materials"]["textureMaterialNames"] = function(names, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("materials", "textureMaterialNames", [ names ], live), callback);
};

WayfinderAPI["materials"]["textureMaterialNames"].url = function(names) {
    return WayfinderAPI.getURL("materials", "textureMaterialNames", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["materials"]["textures"] = function(materialName, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("materials", "textures", [ materialName ], live), callback);
};

WayfinderAPI["materials"]["textures"].url = function(materialName) {
    return WayfinderAPI.getURL("materials", "textures", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["materials"]["uniforms"] = function(materialName, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("materials", "uniforms", [ materialName ], live), callback);
};

WayfinderAPI["materials"]["uniforms"].url = function(materialName) {
    return WayfinderAPI.getURL("materials", "uniforms", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["mobile"]["bundle"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("mobile", "bundle", [], live), callback);
};

WayfinderAPI["mobile"]["bundle"].url = function() {
    return WayfinderAPI.getURL("mobile", "bundle", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["all"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "all", [], live), callback);
};

WayfinderAPI["models"]["all"].url = function() {
    return WayfinderAPI.getURL("models", "all", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["allmeshes"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "allmeshes", [], live), callback);
};

WayfinderAPI["models"]["allmeshes"].url = function() {
    return WayfinderAPI.getURL("models", "allmeshes", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["get"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "get", [], live), callback);
};

WayfinderAPI["models"]["get"].url = function() {
    return WayfinderAPI.getURL("models", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["instances"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "instances", [], live), callback);
};

WayfinderAPI["models"]["instances"].url = function() {
    return WayfinderAPI.getURL("models", "instances", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["json"] = function(model_id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "json", [ model_id ], live), callback);
};

WayfinderAPI["models"]["json"].url = function(model_id) {
    return WayfinderAPI.getURL("models", "json", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["meshes"] = function(model_id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "meshes", [ model_id ], live), callback);
};

WayfinderAPI["models"]["meshes"].url = function(model_id) {
    return WayfinderAPI.getURL("models", "meshes", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["meshesOfInstances"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "meshesOfInstances", [], live), callback);
};

WayfinderAPI["models"]["meshesOfInstances"].url = function() {
    return WayfinderAPI.getURL("models", "meshesOfInstances", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["meshesbyfloor"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "meshesbyfloor", [], live), callback);
};

WayfinderAPI["models"]["meshesbyfloor"].url = function() {
    return WayfinderAPI.getURL("models", "meshesbyfloor", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["models"]["model"] = function(model_id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("models", "model", [ model_id ], live), callback);
};

WayfinderAPI["models"]["model"].url = function(model_id) {
    return WayfinderAPI.getURL("models", "model", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["navigation"]["allAttributes"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("navigation", "allAttributes", [], live), callback);
};

WayfinderAPI["navigation"]["allAttributes"].url = function() {
    return WayfinderAPI.getURL("navigation", "allAttributes", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["navigation"]["attributes"] = function(id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("navigation", "attributes", [ id ], live), callback);
};

WayfinderAPI["navigation"]["attributes"].url = function(id) {
    return WayfinderAPI.getURL("navigation", "attributes", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["navigation"]["edges"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("navigation", "edges", [], live), callback);
};

WayfinderAPI["navigation"]["edges"].url = function() {
    return WayfinderAPI.getURL("navigation", "edges", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["navigation"]["node"] = function(id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("navigation", "node", [ id ], live), callback);
};

WayfinderAPI["navigation"]["node"].url = function(id) {
    return WayfinderAPI.getURL("navigation", "node", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["navigation"]["nodes"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("navigation", "nodes", [], live), callback);
};

WayfinderAPI["navigation"]["nodes"].url = function() {
    return WayfinderAPI.getURL("navigation", "nodes", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["navigation"]["nodesbytype"] = function(type, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("navigation", "nodesbytype", [ type ], live), callback);
};

WayfinderAPI["navigation"]["nodesbytype"].url = function(type) {
    return WayfinderAPI.getURL("navigation", "nodesbytype", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["poisettings"]["get"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("poisettings", "get", [], live), callback);
};

WayfinderAPI["poisettings"]["get"].url = function() {
    return WayfinderAPI.getURL("poisettings", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["poisettings"]["getAllPOISettings"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("poisettings", "getAllPOISettings", [], live), callback);
};

WayfinderAPI["poisettings"]["getAllPOISettings"].url = function() {
    return WayfinderAPI.getURL("poisettings", "getAllPOISettings", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["poisettings"]["getText"] = function(key, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("poisettings", "getText", [ key ], live), callback);
};

WayfinderAPI["poisettings"]["getText"].url = function(key) {
    return WayfinderAPI.getURL("poisettings", "getText", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["poisettings"]["getTexts"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("poisettings", "getTexts", [], live), callback);
};

WayfinderAPI["poisettings"]["getTexts"].url = function() {
    return WayfinderAPI.getURL("poisettings", "getTexts", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["poisettings"]["map"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("poisettings", "map", [], live), callback);
};

WayfinderAPI["poisettings"]["map"].url = function() {
    return WayfinderAPI.getURL("poisettings", "map", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["poisettings"]["setting"] = function(key, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("poisettings", "setting", [ key ], live), callback);
};

WayfinderAPI["poisettings"]["setting"].url = function(key) {
    return WayfinderAPI.getURL("poisettings", "setting", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["pages"]["getAll"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("pages", "getAll", [], live), callback);
};

WayfinderAPI["pages"]["getAll"].url = function() {
    return WayfinderAPI.getURL("pages", "getAll", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["svg"]["bundle"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("svg", "bundle", [], live), callback);
};

WayfinderAPI["svg"]["bundle"].url = function() {
    return WayfinderAPI.getURL("svg", "bundle", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["svg"]["get"] = function(id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("svg", "get", [ id ], live), callback);
};

WayfinderAPI["svg"]["get"].url = function(id) {
    return WayfinderAPI.getURL("svg", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["svg"]["getBuilding"] = function(id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("svg", "getBuilding", [ id ], live), callback);
};

WayfinderAPI["svg"]["getBuilding"].url = function(id) {
    return WayfinderAPI.getURL("svg", "getBuilding", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["settings"]["get"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("settings", "get", [], live), callback);
};

WayfinderAPI["settings"]["get"].url = function() {
    return WayfinderAPI.getURL("settings", "get", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["settings"]["getText"] = function(key, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("settings", "getText", [ key ], live), callback);
};

WayfinderAPI["settings"]["getText"].url = function(key) {
    return WayfinderAPI.getURL("settings", "getText", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["settings"]["getTexts"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("settings", "getTexts", [], live), callback);
};

WayfinderAPI["settings"]["getTexts"].url = function() {
    return WayfinderAPI.getURL("settings", "getTexts", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["settings"]["map"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("settings", "map", [], live), callback);
};

WayfinderAPI["settings"]["map"].url = function() {
    return WayfinderAPI.getURL("settings", "map", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["settings"]["setting"] = function(key, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("settings", "setting", [ key ], live), callback);
};

WayfinderAPI["settings"]["setting"].url = function(key) {
    return WayfinderAPI.getURL("settings", "setting", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["snapshot"]["current"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("snapshot", "current", [], live), callback);
};

WayfinderAPI["snapshot"]["current"].url = function() {
    return WayfinderAPI.getURL("snapshot", "current", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["snapshot"]["getLatestId"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("snapshot", "getLatestId", [], live), callback);
};

WayfinderAPI["snapshot"]["getLatestId"].url = function() {
    return WayfinderAPI.getURL("snapshot", "getLatestId", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["statistics"]["click"] = function(data, session_id, type, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("statistics", "click", [ data, session_id, type ], live), callback);
};

WayfinderAPI["statistics"]["click"].url = function(data, session_id, type) {
    return WayfinderAPI.getURL("statistics", "click", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["statistics"]["device"] = function(width, height, kiosk, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("statistics", "device", [ width, height, kiosk ], live), callback);
};

WayfinderAPI["statistics"]["device"].url = function(width, height, kiosk) {
    return WayfinderAPI.getURL("statistics", "device", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["statistics"]["endSession"] = function(session_id, language_id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("statistics", "endSession", [ session_id, language_id ], live), callback);
};

WayfinderAPI["statistics"]["endSession"].url = function(session_id, language_id) {
    return WayfinderAPI.getURL("statistics", "endSession", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["statistics"]["search"] = function(data, session_id, type, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("statistics", "search", [ data, session_id, type ], live), callback);
};

WayfinderAPI["statistics"]["search"].url = function(data, session_id, type) {
    return WayfinderAPI.getURL("statistics", "search", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["statistics"]["startSession"] = function(language_id, kiosk, application, layout, device_id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("statistics", "startSession", [ language_id, kiosk, application, layout, device_id ], live), callback);
};

WayfinderAPI["statistics"]["startSession"].url = function(language_id, kiosk, application, layout, device_id) {
    return WayfinderAPI.getURL("statistics", "startSession", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["templates"]["css"] = function(template_id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("templates", "css", [ template_id ], live), callback);
};

WayfinderAPI["templates"]["css"].url = function(template_id) {
    return WayfinderAPI.getURL("templates", "css", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["count"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "count", [], live), callback);
};

WayfinderAPI["textures"]["count"].url = function() {
    return WayfinderAPI.getURL("textures", "count", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["map"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "map", [], live), callback);
};

WayfinderAPI["textures"]["map"].url = function() {
    return WayfinderAPI.getURL("textures", "map", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["mipmap"] = function(level, name, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "mipmap", [ level, name ], live), callback);
};

WayfinderAPI["textures"]["mipmap"].url = function(level, name) {
    return WayfinderAPI.getURL("textures", "mipmap", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["names"] = function(callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "names", [], live), callback);
};

WayfinderAPI["textures"]["names"].url = function() {
    return WayfinderAPI.getURL("textures", "names", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["texture"] = function(name, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "texture", [ name ], live), callback);
};

WayfinderAPI["textures"]["texture"].url = function(name) {
    return WayfinderAPI.getURL("textures", "texture", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["texturebyid"] = function(texture_id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "texturebyid", [ texture_id ], live), callback);
};

WayfinderAPI["textures"]["texturebyid"].url = function(texture_id) {
    return WayfinderAPI.getURL("textures", "texturebyid", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["thumbnail"] = function(name, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "thumbnail", [ name ], live), callback);
};

WayfinderAPI["textures"]["thumbnail"].url = function(name) {
    return WayfinderAPI.getURL("textures", "thumbnail", Array.prototype.slice.call(arguments, 0));
};

WayfinderAPI["textures"]["thumbnailbyid"] = function(texture_id, callback, live) {
    WayfinderAPI.getJSON(WayfinderAPI.getURL("textures", "thumbnailbyid", [ texture_id ], live), callback);
};

WayfinderAPI["textures"]["thumbnailbyid"].url = function(texture_id) {
    return WayfinderAPI.getURL("textures", "thumbnailbyid", Array.prototype.slice.call(arguments, 0));
};

var DeviceFactory = {
    init: function() {},
    getDevice: function(wayfinder) {
        var cordova = this.isCordova();
        if (cordova) {
            var device = window.device;
            switch (device.platform) {
              case "Android":
                return new AndroidDevice(wayfinder, device.name, device.platform, device.uuid, device.version);
                break;

              case "iPhone":
                return new iOSDevice(wayfinder, device.name, device.platform, device.uuid, device.version);
                break;

              case "iOS":
                return new iOSDevice(wayfinder, device.name, device.platform, device.uuid, device.version);
                break;

              default:
                return new Device(wayfinder, navigator.userAgent, navigator.platform, "", "");
                break;
            }
        } else if (typeof navigator !== "undefined") {
            return new Device(wayfinder, navigator.userAgent, navigator.platform, "", "");
        } else if (typeof Qt !== "undefined") {
            return new QtDevice(wayfinder, Qt);
        } else return new Device(wayfinder, "unknown", "unknown", "", "");
    },
    isCordova: function() {
        if (typeof window !== "undefined") {
            var cordovas = [ window.cordova, window.device, window.PhoneGap, window.phonegap ];
            for (var i = 0; i < cordovas.length; i++) {
                if (cordovas[i]) return cordovas[i];
            }
            return false;
        } else return false;
    },
    checkClass: function() {
        if (typeof class_a === "function") return true;
        return false;
    }
};

var Device = Class.extend({
    init: function(wayfinder, name, platform, uuid, version) {
        this.wayfinder = wayfinder;
        this.name = name;
        this.platform = platform;
        this.uuid = uuid;
        this.version = version;
        this.locationManager;
        console.log("Device", typeof LocationManager);
        if (typeof LocationManager === "function") {
            this.locationManager = new LocationManager(this.wayfinder);
            this.locationManager.cbOnLocationChange = ClassCallback(this, this.onLocationChange);
        }
        this.broadcastChannel;
        this.setup();
    },
    cbOnPause: function() {},
    cbOnRasume: function() {},
    setup: function() {
        if (BroadcastChannel) {
            if (typeof WayfinderChannel === "object") {
                this.broadcastChannel = WayfinderChannel;
            } else {
                this.broadcastChannel = new BroadcastChannel("WayfinderChannel");
            }
            var scope = this;
            this.wayfinder.events.on("any", function() {
                if (scope.broadcastChannel) {
                    var msg = JSON.stringify(Array.from(arguments), function(k, v) {
                        return k && v && typeof v !== "number" ? Array.isArray(v) ? "[object Array]" : "" + v : v;
                    });
                    scope.broadcastChannel.postMessage(msg);
                }
            });
        }
    },
    openMaps: function(latitude, longitude, zoom) {
        window.open("https://maps.google.com/maps?q=" + latitude + "," + longitude + "&z=" + zoom);
    },
    openMapsWidthAddress: function(address, zoom) {
        window.open("https://maps.google.com/maps?q=" + address + "&z=" + zoom);
    },
    openURL: function(url) {
        window.open(url, "_blank");
    },
    trackEvent: function(category, action, label, id) {},
    isWIFITurnedOn: function() {
        return true;
    },
    isBluetoothEnabled: function() {
        return new Promise(function(resolve, reject) {
            reject("No Bluetooth available!");
        });
    },
    enableBluetooth: function() {},
    startRangingBeacons: function() {},
    locationAcquired: function(status) {
        if (status) {
            this.wayfinder.events.trigger("location-success");
        } else {
            this.wayfinder.events.trigger("location-failed");
        }
    },
    startGeoLocating: function() {
        if (this.locationManager) {
            this.wayfinder.events.trigger("location-start");
            this.locationManager.addProvider("gps", GeolocationProvider, this, this.wayfinder.building);
            this.locationManager.start(ClassCallback(this, this.locationAcquired));
        }
    },
    startBeaconLocating: function() {
        if (this.locationManager) {
            if (!this.locationManager.hasProvider("ble")) {
                this.locationManager.addProvider("ble", BeaconProvider, this.device, this.wayfinder.mobileLogic.mobileData.ibeacons, this.wayfinder.nodes);
            }
            if (!this.locationManager.isStarted()) {
                this.locationManager.start(ClassCallback(this, this.locationAcquired));
                this.wayfinder.events.trigger("location-start");
            }
        }
    },
    stopLocating: function() {
        console.log("stopLocating");
        if (this.locationManager) {
            this.wayfinder.events.trigger("location-stop");
            this.locationManager.stop(ClassCallback(this, this.locationAcquired));
        }
    },
    onLocationChange: function(location, count) {
        this.wayfinder.logic.onLocationChange(location);
        console.log("onLocationChange", count);
        if (count === 0) {
            this.wayfinder.events.trigger("location-success");
        }
    },
    setStatusBarColor: function(color) {},
    addGeofencing: function(fence, success, error) {},
    createEvent: function(calendarName, title, location, notes, startDate, endDate, success, error) {
        console.log("Device.createEvent");
    },
    getSystemLanguage: function() {
        var userLang = this.wayfinder.device.getSystemLanguage();
        if (typeof userLang === "string" && userLang.length > 0) {
            userLang = userLang.split("-");
            if (this.wayfinder.languages[userLang[0]]) this.wayfinder.setLanguage(userLang[0]);
        }
    },
    exit: function() {},
    initPushNotifications: function(deviceID, callback, notificationCallback) {},
    isBluetoothEnabled: function() {
        return new Promise(function(resolve, reject) {
            reject(new Error("No bluetooth"));
        });
    },
    getLocationFailCount: function() {
        return this.wayfinder.device.locationManager.getFailCount();
    },
    isPaused: function() {
        return this.wayfinder.device.paused;
    },
    onEvent: function() {}
});

var WayfinderOptions = Class.extend({
    init: function() {
        this.application = "wayfinder";
        this.map = "map";
        this.project = "demo";
        this.kiosk = false;
        this.debugLog = false;
        this.debugPOIs = false;
        this.debugTranslations = false;
        this.drawKioskIcon = true;
        this.apiLocation = "../../api/";
        this.language = false;
        this.disablePathDrawing = false;
        this.searchScroreLimiter = 3;
        this.searchMinimumScrore = 10;
        this.filterPOIs = "";
        this.assetsLocation = "/shared/";
        this.pathDisplayInstructions = false;
        this.pathZoomPadding = 100;
        this.pathColor = "rgba(255,0,0,0.8)";
        this.pathPauseTime = 2e3;
        this.pathSpotRadius = 3;
        this.pathStride = 30;
        this.pathSpeed = 60;
        this.zoomPadding = 1.05;
        this.poiColor = "rgba(100,200,0,0.9)";
        this.poiRadius = 9;
        this.textureLOD = 0;
        this.shadowManualUpdate = true;
        this.debugTransparency = false;
        this.disableModelLoading = false;
        this.disableCollisionTrees = false;
        this.disableRendering = false;
        this.mapSize = [ 1024, 1024 ];
        this.forceFullMapUpdate = false;
        this.enableLOD = true;
        this.maxLOD = 2;
        this.enableUserLocation = true;
        this.overlayHighlightColor = "#ff0000dd";
        this.mapPadding = .1;
        this.enableUserYAHSetting = false;
        this.application = "2D";
        this.pathZoomIn = false;
        this.poi2DTitlePadding = 12;
        this.path2DMessageSize = 16;
        this.map2DRotation = 0;
        this.disableMap2DMovement = false;
        this.debug = false;
        this.debugBeacons = false;
        this.debugMouseLocation = false;
        this.upscale = 1;
        this.yahRotation = 0;
        this.poi2DTitleWeight = "normal";
        this.gps = false;
        this.factory = new WayfinderFactory();
        this.directionalShadowResolution = 2048;
        this.showDebug = false;
        this.display = false;
    },
    _parseFromURL: function() {
        var overriddenOptions = {};
        if (location.hash.length > 1 && location.hash.indexOf("{") > -1) {
            var args = decodeURIComponent(location.hash.substring(1)).split("#");
            if (args.length > 0 && args[0].indexOf("{") > -1 && args[0].indexOf("}") > -1) {
                overriddenOptions = JSON.parse(args[0]);
            }
        } else if (location.search.length > 1) {
            var options = decodeURIComponent(location.search.substring(1)).split("&");
            if (options.length > 0) {
                var option;
                for (var i in options) {
                    option = options[i].split("=");
                    if (option.length > 1) {
                        overriddenOptions[option[0]] = option[1];
                    }
                }
            }
        }
        return overriddenOptions;
    },
    _getAliases: function() {
        return {
            kiosk: "kiosk.default"
        };
    },
    loadFromURL: function() {
        var aliases = this._getAliases();
        var overriddenOptions = this._parseFromURL();
        for (var i in overriddenOptions) {
            console.log("Overriding option: " + i + "=" + overriddenOptions[i]);
            this[i] = overriddenOptions[i];
            if (aliases[i]) {
                this[aliases[i]] = overriddenOptions[i];
            }
        }
    }
});

var WF_DEBUG = false;

var Wayfinder = Class.extend({
    init: function(options, factory) {
        if (!options || !(options instanceof WayfinderOptions)) options = new WayfinderOptions();
        if (!factory) factory = new WayfinderFactory(this);
        this.factory = factory;
        this.logicName = "generic";
        this.setOptions(options);
        this.settings = new Settings();
        this.statistics = new WFStatistics(this);
        this.monitor = null;
        this.firstFinishedLoading = false;
        this.debugLog = false;
        this.kiosk = false;
        this.screens = [];
        this.dataLoaded = false;
        this.resizeObserver = null;
        if (options.debugLog && DebugLog && typeof DebugLog === "DebugLog") {
            this.debugLog = new DebugLog(options.debugLog);
        }
        Logistics.onStageProgress(ClassCallback(this, this.onStageProgress));
        Logistics.onProgress(ClassCallback(this, this.onProgress));
        this.languages = {};
        this.pois = {};
        this.poisArray = [];
        this.rooms = {};
        this.poiGroups = {};
        this.shortcuts = [];
        this.mainGroups = [];
        this.groupSlugs = {};
        this.groupTree = {};
        this.nodes = {};
        this.edges = {};
        this.attributes = {};
        this.poisettings = new Settings();
        this.poiAdvertisements = {};
        this.advertisements = {};
        this.translator = new Translator(this.options.language, {});
        this.building = null;
        this.firstLanguageChange = true;
        this.search = new WayfinderSearch(this);
        this.events = new WayfinderEvents(this);
        this.device = DeviceFactory.getDevice(this);
        this.accessibility = "";
        this.maps = {};
        this.hasWatermark = true;
        this.acquiringLocation = false;
    },
    cbOnPOIClick: function(poi) {},
    cbOnDataLoaded: function() {},
    cbOnProgress: function(percentage) {},
    cbOnStageProgress: function(stage, percentage) {},
    cbOnLanguageChange: function(language) {},
    cbOnBeforeFloorChange: function(floor) {},
    cbOnFloorChange: function(floor) {},
    cbOnZoomChange: function(percentage) {},
    cbOnPathStep: function(steps, i) {},
    cbOnPathStart: function(endNode, poi) {},
    cbOnPathFinished: function(path) {},
    cbOnTouch: function(action, value) {},
    cbOnMapUpdate: function() {},
    cbOnMapReady: function() {},
    cbOnLocationChange: function(location) {},
    cbOnWebGLContextFail: function() {
        console.warn("cbOnWebGLContextFail has to be overridden");
    },
    finishedLoading: function(argument) {
        if (!this.firstFinishedLoading) {
            this.firstFinishedLoading = true;
            this.onDataLoaded();
        }
    },
    setOptions: function(options) {
        this.options = options;
        this.options.project = this.readProjectName();
        this.options.loadFromURL();
    },
    setStyle: function(template_id) {
        $("head").append('<link rel="stylesheet" type="text/css" href="{0}">'.format(WayfinderAPI.templates.css.url(template_id)));
    },
    open: function(project, canvas) {
        if (typeof project !== "undefined") {
            this.options.project = project;
        }
        this.setupCanvas(canvas);
        WayfinderAPI.open(this.options.project);
        this.resize();
        this.startLoading();
        console.log("Open", this.options.project);
        if (typeof document !== "undefined" && typeof this.onVisibilityChange === "function") {
            document.addEventListener("visibilitychange", ClassCallback(this, this.onVisibilityChange));
        }
    },
    setupCanvas: function(canvas) {
        if (!canvas && typeof document !== "undefined") {
            canvas = document.getElementById(this.options.map);
        }
        this.maps[this.logicName] = {
            logic: this.logic,
            canvas: canvas,
            loaded: false
        };
        if (typeof ResizeObserver != "undefined" && canvas) {
            var scope = this;
        }
    },
    readProjectName: function() {
        if (typeof document !== "undefined") {
            var path = document.location.pathname;
            var folders = path.split("/");
            for (var i = 0; i < folders.length; i++) {
                if (folders[i] == "projects") {
                    if (folders.length > i + 1) {
                        return folders[i + 1];
                    }
                }
            }
        }
        return this.options.project;
    },
    getLayout: function() {
        if (typeof document !== "undefined") {
            var metas = document.getElementsByTagName("meta");
            for (var i in metas) {
                if (metas[i].name == "layout") return metas[i].content;
            }
            var path = document.location.pathname;
            var folders = path.split("/");
            for (var i = 0; i < folders.length; i++) {
                if (folders[i] == "projects") {
                    if (folders.length > i + 2) {
                        return folders[i + 2];
                    }
                }
            }
        }
        return "default";
    },
    log: function() {
        if (this.debugLog) {
            this.debugLog.logArray(this.log.arguments);
        }
    },
    getProject: function() {
        return this.options.project;
    },
    getAPILocation: function() {
        if (WayfinderAPI && WayfinderAPI.LOCATION) {
            return WayfinderAPI.LOCATION;
        } else {
            return this.options.apiLocation;
        }
    },
    setKiosk: function(node_id) {
        this.options.kiosk = node_id;
    },
    getKiosk: function() {
        return this.options.kiosk;
    },
    getKioskNode: function() {
        if (this.options.kiosk && this.options.kiosk in this.nodes) return this.nodes[this.options.kiosk];
        return false;
    },
    showPath: function(endNode, poi, options) {
        return this.logic.showPath(this.getKioskNode(), endNode, poi, options);
    },
    showPathToRoom: function(room_id) {
		var room = this.getRoom(room_id);
		if (room && room.pois && room.pois.length > 0) {
			var poi = room.pois[0];
			return this.logic.showPath(this.getKioskNode(), poi.node, poi, {});
		}
		return false;
	},
    findPath: function(from, to, options) {
        return this.logic.findPath(from, to, options);
    },
    showPathFromPOIToPOI: function(from, to) {
        this.logic.showPathFromPOIToPOI(from, to);
    },
    showKiosk: function() {
        return this.logic.showKiosk();
    },
    showFloor: function(floor, callback, withoutPOIs, doNotSet) {
        if (typeof floor === "object" && !doNotSet) {
            this.building.setActiveFloors(floor);
        }
        this.logic.showFloor(this.building.getCurrentFloor(), callback, withoutPOIs, doNotSet);
        this.events.trigger("floor-change", floor);
    },
    getLanguage: function() {
        return this.translator.getLanguage();
    },
    setLanguage: function(language) {
        var lang = this.languages[language];
        if (lang) {
            this.translator.translate(language, lang.textDirection);
        }
        this.translator.translate(language);
        this.events.trigger("language-change", language);
    },
    startLoading: function() {
        var add = "";
        let params = new URL(document.location.toString()).searchParams;
        let wfcache = params.get("wfcache");
        if (wfcache && wfcache.length > 0) {
            add = "?wfcache=" + wfcache;
        }
        Logistics.getJSON(WayfinderAPI["building"].pack.url() + add, null, ClassCallback(this, this.onBundleData), {
            stage: "settings"
        });
    },
    onBundleData: function(response) {
        var data = response.data;
        this.settings.data = data.settings;
        this.poisettings.data = data.poisettings;
        this.hasWatermark = data.hasWatermark;
        this.screens = data.screens;
        this.texts = data.texts;
        this.onSettings();
        this.building.setLocation(data.location);
        if (data.guitranslations) {
            this.translator.setTranslations(data.guitranslations);
        }
        this.factory.createLanguages(data.languages);
        this.onSettings();
        this.factory.createFloors(data.levels);
        this.factory.createLocations(data);
        this.factory.createPOIAdvertisements(data.poi_ads);
    },
    onDataCreated: function() {
        this.finishedLoading();
    },
    loadSecondaryResources: function() {
        var scope = this;
        function load() {
            scope.loadHiddenPOIIcons();
        }
        setTimeout(load, 1e3);
    },
    loadHiddenPOIIcons: function(data) {
        if (this.pois) {
            for (var i in this.pois) {
                if (this.pois[i].image_id && this.pois[i].image_id !== 0 && !this.pois[i].alwaysVisible) {
                    Logistics.getImage(WayfinderAPI.getURL("images", "thumbnail", [ this.pois[i].image_id ]), ClassCallback(this.pois[i], this.pois[i].setIcon));
                }
            }
        }
    },
    onSettings: function() {
        this.building = this.factory.createBuilding(this.settings.data);
        if (this.options.language == false) {
            this.options.language = this.settings.get("language.default", "en");
        }
        if (this.options.kiosk === false) {
            this.setKiosk(this.settings.getInt("kiosk.default", 0));
        }
        if (this.options.screen && this.screens && this.screens.length > 0 && !this.monitor) {
            for (var s in this.screens) {
                if (this.screens[s].id == this.options.screen) {
                    this.setKiosk(this.screens[s].node_id);
                    this.monitor = new WayfinderMonitor(this, this.options.screen);
                    this.monitor.start();
                    break;
                }
            }
        }
    },
    onFinishedLoading: function() {
        if (!this.firstFinishedLoading) {
            this.firstFinishedLoading = true;
            this.onDataLoaded();
        }
    },
    onDataLoaded: function() {
        this.setKiosk(this.options.kiosk);
        this.dataLoaded = true;
        this.events.setupDeprecated(this);
        this.loadSecondaryResources();
        this.cbOnProgress(100);
        this.cbOnDataLoaded();
        this.setLanguage(this.options.language);
        var scope = this;
        setTimeout(function() {
            scope.runDefaultActions();
        }, 1e3);
    },
    createTranslations: function(translations) {
        if (this.translator && translations) {
            this.translator.setTranslations(translations["data"]);
        }
    },
    onProgress: function(progress) {
        this.events.trigger("data-progress", progress);
    },
    onStageProgress: function(stage, progress) {
        this.events.trigger("data-stage-progress", stage, progress);
    },
    resize: function() {
        if (this.logic) {
            this.logic.resize();
        }
    },
    onPOIClick: function(poi, position, event, allPOIs) {
        if (typeof this.cbOnPOIClick === "function") {
            this.events.trigger("map-click", poi, position, event, allPOIs);
        }
    },
    onZoomChange: function(zoom) {
        this.events.trigger("zoom-change", zoom);
    },
    setZoom: function(percentage) {
        this.logic.setZoom(percentage);
    },
    zoomIn: function() {
        this.logic.zoomIn();
    },
    zoomOut: function() {
        this.logic.zoomOut();
    },
    pathToText: function(path) {
        return this.logic.pathToText(path);
    },
    getPOIWithExternalId: function(id) {
        for (var i in this.pois) {
            if (this.pois[i].room_id == id) {
                return this.pois[i];
            }
        }
        return false;
    },
    getNearestPOI: function(source, pois) {
        if (this.logic) return this.logic.getNearestPOI(source, pois);
        return null;
    },
    restoreDefaultState: function() {
        if (this.options.language) {
            this.setLanguage(this.options.language);
        }
        this.clearHighlights();
        this.clearDisplaying();
        this.showKiosk();
    },
    showScreensaver: function() {},
    hideScreensaver: function() {},
    setHighlights: function(pois) {
        this.logic.clearHighlights();
        this.logic.setHighlights(pois);
    },
    clearHighlights: function() {
        this.logic.clearHighlights();
    },
    setDisplaying: function(pois) {
        this.clearDisplaying();
        this.logic.setDisplaying(pois);
    },
    clearDisplaying: function() {
        this.logic.clearDisplaying();
    },
    onSetLanguage: function(language) {},
    getLanguages: function() {
        return this.languages;
    },
    getPOIs: function() {
        return this.pois;
    },
    getPOIsArray: function() {
        return this.poisArray;
    },
    getPOIGroups: function() {
        return this.poiGroups;
    },
    getMainGroups: function() {
        return this.mainGroups;
    },
    getGroupTree: function() {
        return this.groupTree;
    },
    getShortcuts: function() {
        return this.shortcuts;
    },
    getNodes: function() {
        return this.nodes;
    },
    getEdges: function() {
        return this.edges;
    },
    getFilteredAdvertisements: function() {
        var kioskID = this.getKiosk();
        var floorID = this.getKioskNode().floor_id;
        var results = [];
        for (var t in this.advertisements) {
            results[t] = {};
            for (var a in this.advertisements[t]) {
                ads = this.advertisements[t][a];
                results[t][a] = ads.filter(function(ad) {
                    if (kioskID && floorID) {
                        if (ad.kiosk && (ad.kiosk != null && parseInt(ad.kiosk)) > 0 && parseInt(ad.kiosk) != kioskID) {
                            return false;
                        }
                        if (ad.floor && ad.floor != null && ad.floor != 0 && ad.kiosk != floorID) {
                            return false;
                        }
                    }
                    return true;
                });
            }
        }
        return results;
    },
    clearPath: function() {
        this.logic.clearPath();
    },
    zoomOnPathSegment: function(startNode, endNode) {},
    getCurrentFloor: function() {
        return this.building.getCurrentFloor();
    },
    setCurrentFloor: function(floor) {
        return this.building.setCurrentFloor(floor);
    },
    findNearestNodeOnFloor: function(floor, position) {
        return this.logic.findNearestNodeOnFloor(floor, position);
    },
    getImageData: function() {
        return false;
    },
    createExtraMap: function(key, logic, canvas) {
        if (typeof logic === "function") {
            logic = new logic(this, key);
            this.maps[key] = {
                logic: logic,
                canvas: canvas,
                loaded: false
            };
            logic.initData();
            logic.loadMapData();
        } else {
            console.log("Logic", logic);
            throw new Error("Given logic is not a function");
        }
    },
    isMapInitialized: function(key) {
        return !!this.maps[key];
    },
    parsePOIFromURLParam: function(param) {
        if (typeof param === "string") {
            param = decodeURIComponent(param);
            if (param.indexOf("poi-") === 0) {
                var ids = param.split("poi-");
                if (ids.length > 1 && this.pois[ids[1]]) {
                    return this.pois[ids[1]];
                }
            } else if (param.indexOf("room-") === 0) {
                var ids = param.split("room-");
                if (ids.length > 1 && this.getRoom(ids[1])) {
                    var room = this.getRoom(ids[1]);
                    if (room.pois.length > 0) return room.pois[0];
                }
            } else {
                var results = this.search.search(param, "poi", {
                    limitToHighestScore: true,
                    splitString: false
                });
                if (results) {
                    if (results.length == 1) {
                        return results[0];
                    } else if (results.length > 1) {
                        var pois = this.getNearestPOIs(this.getKioskNode(), results);
                        if (pois && pois.length > 0) {
                            return pois[0];
                        }
                    }
                }
            }
        }
        return false;
    },
    runDefaultActions: function() {
        this.events.trigger("pre-ready");
        console.log("runDefaultActions", "Destination", this.options.destination, "Source", this.options.source, "GPS", this.options.gps);
        var scope = this;
        var b = false;
        var a = false;
        var _alert = false;
        this.events.on("location-start", function() {
            console.log("location-start");
            scope.acquiringLocation = true;
        });
        this.events.on("location-success", function() {
            b = scope.parsePOIFromURLParam(scope.options.destination);
            console.log("location-success", b);
            if (scope.acquiringLocation) {
                if (b) {
                    scope.showPath(b.node, b);
                }
            }
            scope.acquiringLocation = false;
        });
        this.events.on("location-failed", function() {
            setTimeout(function() {
                scope.acquiringLocation = false;
                if (!_alert) {
                    alert("Location failed");
                    _alert = true;
                }
            }, 500);
        });
        if (this.options.source) {
            a = this.parsePOIFromURLParam(this.options.source);
            if (a) {
                this.setKiosk(a.getNode().id);
            }
        }
        if (this.options.sourceNode) {
            b = this.nodes[this.options.source];
            console.log("sourceNode", this.options.source, b, a);
            if (a && b) {
                this.showFloor(a.node.floor);
                this.showPathFromPOIToPOI(a, b);
            }
        }
        if (this.options.display) {
            var c = this.parsePOIFromURLParam(this.options.display);
            console.log("Display", this.options.display, c);
            if (c) {
                this.showFloor(c.node.floor);
                this.setHighlights([ c ]);
                this.setDisplaying([ c ]);
            }
        }
        if (this.options.destination) {
            b = this.parsePOIFromURLParam(this.options.destination);
            console.log("b", b);
            if (!!this.options.gps && b) {
                this.setHighlights([ b ]);
                this.setDisplaying([ b ]);
            } else if (b) {
                if (a) {
                    this.showFloor(a.node.floor);
                    this.showPathFromPOIToPOI(a, b);
                } else {
                    scope.showPath(b.node, b);
                }
            }
        }
        if (this.options.gps) {
            console.log("Starting geolocation");
            this.device.startGeoLocating();
        }
        this.statistics.start();
        this.events.trigger("ready");
    },
    isMapInitialized: function(key) {
        return !!this.maps[key];
    },
    switchToMap: function(key) {
        if (this.maps[key]) {
            for (var i in this.maps) {
                if (typeof this.maps[i] === "object" && this.maps[i].logic) {
                    this.maps[i].logic.pause();
                }
            }
            this.logic = this.maps[key].logic;
            this.logic.run();
        } else {
            throw new Error("No such map inialized: " + key);
        }
    },
    isDataLoaded: function(type) {
        return !!this.loadedData[type];
    },
    run: function() {
        return this.logic.run();
    },
    pause: function() {
        return this.logic.pause();
    },
    isRunning: function() {
        return this.logic.isRunning();
    },
    update: function(fullUpdate) {
        return this.logic.update(fullUpdate);
    },
    getScreenPosition: function(poi) {
        return this.logic.getScreenPosition(poi);
    },
    switchCanvas: function(element) {
        this.logic.switchCanvas(element);
    },
    getNearestPOIs: function(source, pois, radius) {
        return this.logic.getNearestPOIs(source, pois, radius);
    },
    getRoom: function(room_id) {
        return this.logic.getRoom(room_id);
    },
    getGroupWithSlug: function(slug) {
        if (typeof slug === "string" && this.groupSlugs[slug.toLowerCase()]) {
            return this.poiGroups[this.groupSlugs[slug.toLowerCase()]];
        }
        return false;
    }
});

var WayfinderLogic = Class.extend({
    init: function(wayfinder, name) {
        this.wayfinder = wayfinder;
        this.name = name;
    },
    resize: function() {
        if (typeof document !== "undefined") {
            var canvas = this.getCanvas();
            if (!canvas) {
                canvas = document.getElementById(this.wayfinder.options.map);
                this.wayfinder.setupCanvas(canvas);
            }
            if (canvas && typeof window !== "undefined") {
                var style = window.getComputedStyle(canvas.parentNode, null);
                var scale = 1;
                if (this.wayfinder.options.upscale > 0) {}
                canvas.setAttribute("width", parseInt(style.width) * scale);
                canvas.setAttribute("height", parseInt(style.height) * scale);
            }
        }
    },
    getCanvas: function() {
        if (this.name && this.wayfinder) {
            if (this.wayfinder.maps[this.name]) {
                return this.wayfinder.maps[this.name].canvas;
            }
        }
        return false;
    },
    loadMapData: function() {},
    showFloor: function() {},
    onDataLoaded: function() {
        console.log("Logic.onDataLoaded");
        this.wayfinder.setKiosk(this.wayfinder.options.kiosk);
        if (this.wayfinder.getKioskNode()) {
            this.wayfinder.showFloor(this.wayfinder.getKioskNode().getFloor());
        } else if (this.wayfinder.building.getSortedFloors() && this.wayfinder.building.getSortedFloors().length > 0) {
            this.wayfinder.showFloor(this.wayfinder.building.getSortedFloors()[0]);
        }
        this.wayfinder.showKiosk();
        this.wayfinder.events.trigger("data-loaded");
        this.dataLoaded = true;
        this.wayfinder.loadSecondaryResources();
        this.wayfinder.onFinishedLoading();
    },
    loadPOIIcons: function(data) {
        if (this.wayfinder.pois) {
            var dt = null;
            var poi;
            for (var i in this.wayfinder.pois) {
                poi = this.wayfinder.pois[i];
                if (poi.image_id && poi.image_id !== 0 && poi.alwaysVisible && !this.wayfinder.settings.getBoolean("poi.map.only-text", true, poi)) {
                    dt = Logistics.getImage(WayfinderAPI.getURL("images", "getLarge", [ poi.image_id ]), null, ClassCallback(poi, poi.setIcon), {
                        stage: "locations"
                    });
                }
            }
        }
    },
    textPathSimplification: function(path) {
        var simplePath = {};
        var shortDist = 30;
        var doNotUse = "generic portal kiosk landmark";
        simplePath.distance = 0;
        simplePath.steps = [];
        function getTurn(angle) {
            if (angle >= 45 && angle < 135) {
                return "right";
            } else if (angle >= 135 && angle < 225) {
                return "around";
            } else if (angle >= 225 && angle < 315) {
                return "left";
            }
            return false;
        }
        if (path && path.length > 0) {
            var turn = false;
            var turn2 = false;
            var startNode = path[path.length - 1].bNode;
            var lastDistance = 0;
            for (var i = 0; i < path.length; i++) {
                simplePath.distance += path[i].distance;
                lastDistance += path[i].distance;
                turn = getTurn(path[i].angle);
                if (path[i].type && path[i].type == "landmark") {
                    if (path[i].bNode && path[i].bNode.pois && path[i].bNode.pois.length > 0) simplePath.steps.push({
                        landmark: path[i].bNode.pois,
                        endNode: path[i].bNode,
                        startNode: startNode,
                        in: lastDistance
                    }); else if (path[i].aNode && path[i].aNode.pois && path[i].aNode.pois.length > 0) {
                        simplePath.steps.push({
                            landmark: path[i].aNode.pois,
                            endNode: path[i].aNode,
                            startNode: startNode,
                            in: lastDistance
                        });
                    }
                }
                if (path[i] && path[i].aNode && path[i].aNode.neighbours) {
                    var neighbours = path[i].aNode.neighbours;
                    for (var n = 0; n < neighbours.length; n++) {
                        if (neighbours[n] && neighbours[n].type == "landmark" && !(path[i].bNode && neighbours[n].id == path[i].bNode.id) && !(path[i].aNode && neighbours[n].id == path[i].aNode.id) && startNode.type != "landmark") {
                            simplePath.steps.push({
                                "landmark-nearby": neighbours[n],
                                startNode: path[i].bNode,
                                endNode: path[i].aNode,
                                startNode: startNode
                            });
                        }
                    }
                }
                if (turn) {
                    if (!(typeof path[i].type == "string" && doNotUse.indexOf(path[i].type) == -1)) {
                        if (lastDistance > 0) simplePath.steps.push({
                            walk: lastDistance / 100,
                            endNode: path[i].bNode,
                            startNode: startNode
                        });
                        simplePath.steps.push({
                            turn: turn,
                            endNode: path[i].bNode,
                            startNode: startNode,
                            in: lastDistance
                        });
                    }
                    startNode = path[i].bNode;
                    lastDistance = 0;
                }
                if (path[i].type && doNotUse.indexOf(path[i].type) == -1) {
                    if (i > 0 && i < path.length - 1 && path[i].type !== path[i + 1].type) {
                        if (lastDistance > 0) {
                            simplePath.steps.push({
                                walk: lastDistance / 100,
                                endNode: path[i].bNode,
                                startNode: startNode
                            });
                        }
                        simplePath.steps.push({
                            use: path[i].type,
                            endNode: path[i].bNode,
                            startNode: startNode,
                            in: lastDistance
                        });
                        startNode = path[i].bNode;
                    }
                    lastDistance = 0;
                }
                if (path[i].go_to_floor) {
                    if (lastDistance > 0) {
                        simplePath.steps.push({
                            walk: lastDistance / 100,
                            endNode: path[i].bNode,
                            startNode: startNode
                        });
                    }
                    lastDistance = 0;
                    simplePath.steps.push({
                        go_to_floor: path[i].go_to_floor,
                        endNode: path[i].bNode,
                        startNode: startNode
                    });
                    startNode = path[i].bNode;
                }
            }
            if (lastDistance > 0) {
                simplePath.steps.push({
                    walk: lastDistance / 100,
                    endNode: path[path.length - 1].bNode,
                    startNode: startNode
                });
            }
        }
        return simplePath;
    },
    run: function() {},
    pause: function() {},
    isRunning: function() {},
    getNearestPOI: function() {},
    getRoom: function(room_id) {
        return this.wayfinder.rooms[room_id];
    }
});

var WayfinderFactory = Class.extend({
    init: function(wayfinder) {
        this.wayfinder = wayfinder;
    },
    createFloors: function(floors) {
        if (floors && this.wayfinder.building) {
            for (var i in floors) {
                if (typeof floors[i] === "object") {
                    this.wayfinder.building.addFloor(this.createFloor(floors[i], this.wayfinder.languages));
                }
            }
        }
    },
    createNodes: function(nodes) {
        if (nodes) {
            var defaultKiosk = this.wayfinder.settings.getInt("kiosk.default", 0);
            var floors = this.wayfinder.building.getFloors();
            for (var i = 0; i < nodes.length; i++) {
                var node = this.createNode(nodes[i]);
                if (!node) continue;
                this.wayfinder.nodes[nodes[i].id] = node;
                if (node.floor_id in floors) {
                    floors[node.floor_id].addNode(node);
                }
                if (nodes[i].id == defaultKiosk) {
                    this.wayfinder.kiosk = node;
                }
            }
        }
    },
    createAttributes: function(attributes) {
        if (attributes) {
            this.wayfinder.attributes = attributes;
        }
    },
    createPOIs: function(pois) {
        for (var i = 0; i < pois.length; i++) {
            var poi = this.createPOI(pois[i], this.wayfinder.languages);
            this.wayfinder.pois[pois[i].id] = poi;
            this.wayfinder.poisArray.push(poi);
            if (poi.node_id in this.wayfinder.nodes) {
                this.wayfinder.nodes[poi.node_id].addPOI(poi);
            }
            if (this.wayfinder.poisettings && this.wayfinder.poisettings.data && this.wayfinder.poisettings["data"][poi.id]) {
                poi.settings = this.wayfinder.poisettings["data"][poi.id];
            }
            if (poi.room_id && poi.room_id != "") {
                if (!this.wayfinder.rooms[poi.room_id]) {
                    this.wayfinder.rooms[poi.room_id] = new Room(poi, this.wayfinder.languages);
                }
                this.wayfinder.rooms[poi.room_id].addPOI(poi);
            }
        }
    },
    createTags: function(tags) {
        if (tags) {
            for (var t in tags) {
                var tag = tags[t];
                var poi = this.wayfinder.pois[tag["poi_id"]];
                if (poi) {
                    poi.setTags(tag["tags"]);
                }
            }
        }
    },
    filterPOIs: function(tags) {
        if (tags && tags.length > 0) {
            var poi;
            var tag = "";
            for (var j in tags) {
                tag = tags[j].trim();
                if (tag && tag !== "") {
                    for (var i in this.wayfinder.pois) {
                        poi = this.wayfinder.pois[i];
                        poi.setShowInMenu(false);
                        if (poi.getTags().indexOf(tag) > -1) {
                            poi.setShowInMenu(true);
                            continue;
                        }
                    }
                }
            }
        }
    },
    createGroups: function(poiGroupsData, poisInGroupsData) {
        if (poisInGroupsData && poiGroupsData) {
            var poiGroup, poiGroupData;
            var childGroups = {};
            for (poiGroupData in poiGroupsData) {
                poiGroup = this.createPOIGroup(poiGroupsData[poiGroupData], this.wayfinder.languages);
                if (poiGroup.parent_id) {
                    if (!childGroups[poiGroup.parent_id]) {
                        childGroups[poiGroup.parent_id] = [];
                    }
                    childGroups[poiGroup.parent_id].push(poiGroup.getID());
                }
                if (typeof poiGroup.slug === "string" && poiGroup.slug.length > 0) {
                    this.wayfinder.groupSlugs[poiGroup.slug.toLowerCase()] = poiGroup.id;
                }
                this.wayfinder.poiGroups[poiGroup.getID()] = poiGroup;
            }
            var scope = this;
            for (var c in childGroups) {
                if (this.wayfinder.poiGroups[c]) {
                    this.wayfinder.poiGroups[c].setChildren(childGroups[c]);
                    childGroups[c].map(function(child_id) {
                        scope.wayfinder.poiGroups[child_id].setParent(scope.wayfinder.poiGroups[c]);
                    });
                }
            }
            for (var poiGroupID in poisInGroupsData) {
                poiGroupData = poisInGroupsData[poiGroupID];
                for (var poiIndex in poiGroupData) {
                    var poi = this.wayfinder.pois[poiGroupData[poiIndex]];
                    poiGroup = this.wayfinder.poiGroups[poiGroupID];
                    if (poi && poiGroup) {
                        poiGroup.addPOI(poi);
                        poi.addGroup(poiGroup);
                    }
                }
            }
            if (Object && Object.values && Array && Array.prototype.filter) {
                this.wayfinder.shortcuts = Object.values(this.wayfinder.poiGroups).filter(function(group) {
                    return group && group.getShowInTopMenu();
                });
                this.wayfinder.shortcuts.sort(function(a, b) {
                    return a.order - b.order;
                });
                this.wayfinder.mainGroups = Object.values(this.wayfinder.poiGroups).filter(function(group) {
                    return group && group.getShowInMenu() && group.parent_id == null;
                });
                this.wayfinder.mainGroups.sort(function(a, b) {
                    return a.order - b.order;
                });
            }
            var tree = {};
            var _group;
            for (group in this.wayfinder.poiGroups) {
                _group = this.wayfinder.poiGroups[group];
                tree[_group.getID()] = [];
                tree[_group.getID()] = this.findTree(tree[_group.getID()], _group);
            }
            this.wayfinder.groupTree = tree;
        }
    },
    findTree: function(arr, group) {
        if (typeof group === "object" && group.getParent() && group.getParent().getID() !== group.getID()) {
            arr.push(group.getParent().getID());
            return this.findTree(arr, group.getParent());
        }
        return arr;
    },
    createPOIAdvertisements: function(poiAdsData) {
        if (poiAdsData) {
            var ads = [];
            for (var a = 0; a < poiAdsData.length; a++) {
                var poiAdData = poiAdsData[a];
                var poi = this.wayfinder.pois[poiAdData["poi_id"]];
                if (poi) {
                    var poiAd = new POIAdvertisement(poiAdData);
                    ads.push(poiAd);
                    poi.addAdvertisement(poiAd);
                }
            }
            this.wayfinder.poiAdvertisements = ads;
        }
    },
    createPOIAdvertisement: function(data) {
        return new POIAdvertisement(data.id, data.poi_id, data.advertisement_id);
    },
    addPOIsToFloor: function(floorPOIs) {
        for (var floor_id in floorPOIs) {
            var floors = this.wayfinder.building.getFloors();
            if (!(floor_id in floors)) continue;
            var floor = floors[floor_id];
            for (var i in floorPOIs[floor_id]) {
                if (!(floorPOIs[floor_id][i] in this.wayfinder.pois)) continue;
                floor.addPOI(this.wayfinder.pois[floorPOIs[floor_id][i]]);
            }
        }
    },
    createEdges: function(edges) {
        if (edges) {
            for (var node_id in edges) {
                if (!(node_id in this.wayfinder.nodes)) continue;
                for (var i in edges[node_id]) {
                    if (!(edges[node_id][i] in this.wayfinder.nodes)) continue;
                    this.wayfinder.nodes[node_id].addNeighbour(this.wayfinder.nodes[edges[node_id][i]]);
                }
            }
            this.wayfinder.edges = edges;
        }
    },
    createBuilding: function(data) {
        return new Building(data);
    },
    createFloor: function(floorData, languages) {
        return new Floor(floorData, languages);
    },
    createNode: function(data) {
        return new NavigationNode(data);
    },
    createPOI: function(data, languages) {
        return new POI(data, languages);
    },
    createPOIGroup: function(data, languages) {
        return new POIGroup(data, languages);
    },
    createLanguages: function(languages) {
        for (var name in languages) {
            this.wayfinder.languages[name] = new Language(languages[name]);
            if (name.toLowerCase() == this.wayfinder.options.language.toLowerCase()) {
                this.wayfinder.translator.setLanguage(name, this.wayfinder.languages[name].textDirection);
            }
        }
        this.wayfinder.translator.translate();
    },
    createLocations: function(data) {
        this.createNodes(data.navigation.nodes);
        this.createEdges(data.navigation.edges);
        this.createPOIs(data.locations.all);
        this.addPOIsToFloor(data.locations.byfloor);
        this.createGroups(data.locations.groups, data.locations.bygroup);
        this.createTags(data.locations.tags);
        if (this.wayfinder.options.filterPOIs) {
            this.filterPOIs(this.wayfinder.options.filterPOIs.trim().split(","));
        }
        this.wayfinder.advertisements = this.createAdvertisements(data.a);
        this.createAttributes(data.locations.attributes);
    },
    createAdvertisements: function(ads) {
        var banners = {};
        var _template = {};
        var now = Date.now();
        var frames = [];
        var template, banner, frame, enabled, keyword, keywords;
        for (var i in ads) {
            template = ads[i];
            if (template) {
                _template = {};
                for (var b in template) {
                    banner = template[b];
                    frames = [];
                    for (var f in banner) {
                        frame = banner[f];
                        enabled = frame.enabled;
                        if (enabled && frame.from_date) {
                            enabled = enabled && new Date(frame.from_date).getTime() <= now;
                        }
                        if (enabled && frame.to_date) {
                            enabled = enabled && new Date(frame.to_date).getTime() >= now;
                        }
                        if (typeof frame.kiosk === "string" && frame.kiosk.length > 0) {
                            if (parseInt(this.wayfinder.options.kiosk) !== parseInt(frame.kiosk)) {
                                enabled = false;
                            }
                        }
                        if (frame.keywords.length > 0) {
                            keywords = frame.keywords.join(";") + ";";
                            for (var k = 0; k < frame.keywords.length; k++) {
                                keyword = frame.keywords[k];
                                if (keyword.indexOf("kiosk-") > -1) {
                                    if (keywords.indexOf("kiosk-" + this.wayfinder.getKiosk() + ";") == -1) {
                                        enabled = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (enabled) {
                            frames.push(frame);
                        }
                    }
                    if (frames.length > 0) {
                        _template[b] = frames;
                    }
                }
                banners[i] = _template;
            }
        }
        return banners;
    }
});

var WayfinderSearch = Class.extend({
    init: function(wayfinder) {
        this.wayfinder = wayfinder;
        this.searchParams = [];
        this.limit = 0;
        this.options = {
            maxSearchParams: 15,
            stringSearch: "relative",
            minimumScore: 1,
            splitKeywords: true,
            splitString: true,
            limit: Infinity,
            scoreLimit: 1.5,
            limitToHighestScore: false,
            searchStringLength: 2,
            scoreAccuracy: 10,
            poi: {
                name: 1,
                description: .5,
                tags: 1,
                room_id: .5
            }
        };
        this.results = {};
        this.highScore = 0;
        this.scores = [];
        this.providers = {};
        this.setupProviders();
    },
    overrideOptions: function(options) {
        for (var i in options) {
            this.options[i] = options[i];
        }
    },
    setupProviders: function() {
        this.providers["poi"] = ClassCallback(this, this.POIsProvider);
    },
    clearResults: function() {
        this.results = {};
        this.highScore = 0;
        this.scores = [];
    },
    search: function(searchstring, _type, _options) {
        var type = "poi";
        this.clearResults();
        if (typeof _type == "string") type = _type;
        this.overrideOptions(_options);
        if (typeof searchstring !== "undefined" && searchstring.length >= this.options.searchStringLength) {
            searchstring = searchstring.trim().toLowerCase();
            if (this.options.splitKeywords) this.searchParams = searchstring.split(" "); else {
                this.searchParams = [ searchstring ];
            }
            if (this.searchParams.length > this.options.maxSearchParams) {
                this.searchParams.splice(this.options.maxSearchParams, this.searchParams.length - this.options.maxSearchParams);
            }
            if (this.providers[type] && typeof this.providers[type] == "function") {
                this.providers[type](this.searchParams, this.wayfinder);
            }
        }
        return this.order(this.results, this.highScore, this.scores);
    },
    pushResult: function(score, key, obj) {
        if (score >= this.options.minimumScore) {
            score = parseFloat(parseFloat(score).toFixed(2));
            if (!this.results[score]) this.results[score] = {};
            if (this.scores.indexOf(score) == -1) this.scores.push(score);
            this.results[score][key] = obj;
            this.highScore = Math.max(this.highScore, score);
        }
    },
    POIsProvider: function(keywords, wayfinder) {
        var language = this.wayfinder.getLanguage();
        var scope = this;
        function searchPOI(poi, param, index) {
            var _score = 0;
            if (scope.options.poi.name && poi.getName(language)) {
                _score = scope.searchString(poi.getName(language), param, scope.options.poi.name, index);
            }
            if (scope.options.poi.description && poi.getDescription(language)) {
                _score = Math.max(_score, scope.searchString(poi.getDescription(language), param, scope.options.poi.description, index));
            }
            if (scope.options.poi.tags && poi.getTags()) {
                _score = Math.max(_score, scope.searchString(poi.getTags(), param, scope.options.poi.tags, index));
            }
            if (scope.options.poi.room_id && poi.getRoomId()) {
                _score = Math.max(_score, scope.searchString(poi.getRoomId(), param, scope.options.poi.room_id, index));
            }
            return _score;
        }
        var pois = wayfinder.pois;
        var score = -1;
        for (var i in pois) {
            if (pois[i].getShowInMenu()) {
                score = 0;
                for (var k in keywords) {
                    score += searchPOI(pois[i], keywords[k], k);
                }
                this.pushResult(score, pois[i].getID(), pois[i]);
            }
        }
    },
    findWithChar: function(character) {
        var foundPOIs = [];
        var language = this.wayfinder.getLanguage();
        var pois = this.wayfinder.pois;
        for (var i in pois) {
            if (pois[i].getShowInMenu() && pois[i].hasName(language) && pois[i].getFirstChar(language) == character) {
                foundPOIs.push(pois[i]);
            }
        }
        foundPOIs.sort(function(a, b) {
            if (a.getName(language) && b.getName(language)) return a.getName(language).toLowerCase().trim().localeCompare(b.getName(language).toLowerCase().trim());
        });
        return foundPOIs;
    },
    searchString: function(string, keyword, scoreDown, index) {
        if (typeof string == "string" && typeof keyword == "string") {
            string = string.toLowerCase().trim();
            keyword = keyword.toLowerCase().trim();
            switch (this.options.stringSearch) {
              case "strict":
                return this.searchStringStrict(string, keyword, scoreDown, index);
                break;

              case "relative":
                return this.searchStringRelatively(string, keyword, scoreDown, index);

              default:
                return this.searchStringStrict(string, keyword, scoreDown, index);
            }
        }
        return 0;
    },
    searchStringStrict: function(string, keyword, scoreDown, index) {
        if (!(string && keyword)) {
            return 0;
        }
        var pos = string.indexOf(keyword);
        if (pos > -1 && pos < 100) {
            pos = 100 - pos;
            var len = keyword.length / string.length;
            return (pos + len) * scoreDown;
        } else {
            return 0;
        }
    },
    searchStringRelatively: function(string, keyword, scoreDown, index) {
        if (!(string && keyword)) {
            return 0;
        }
        var tokens = keyword.split("");
        var strings = [ string ];
        if (this.options.splitString) {
            strings = string.split(/,\s*|\s/);
        }
        var tokenIndex = 0, stringIndex = 0, matchedPositions = [], score = -1;
        var lastFoundIndex = 0;
        if (!scoreDown) {
            scoreDown = 1;
        }
        function evaluate(matchedTokens, tokens, string) {
            var maxSubArrayLength = 0;
            var currentLength = 0;
            var holesTotalLength = 0;
            var lastToken = -1;
            for (var i = 0; i < matchedTokens.length; i++) {
                if (lastToken == matchedTokens[i] - 1) {
                    currentLength++;
                    maxSubArrayLength = Math.max(maxSubArrayLength, currentLength);
                } else {
                    holesTotalLength = Math.max(holesTotalLength, matchedTokens[i] - lastToken - 1);
                    currentLength = 1;
                }
                lastToken = matchedTokens[i];
            }
            holesTotalLength = Math.max(holesTotalLength, tokens - matchedTokens[matchedTokens.length - 1] - 1);
            var score = maxSubArrayLength <= tokens ? maxSubArrayLength / tokens * 4 : 0;
            score += matchedTokens.length == string.length ? 2 : 0;
            score += matchedTokens[0] === 0 ? 1 : 0;
            score += 1 - matchedTokens[0] / string.length;
            score -= holesTotalLength;
            return score * 10;
        }
        var _string;
        var __score;
        for (var i = 0; i < strings.length; i++) {
            _string = strings[i];
            if (_string.length > 1) {
                while (stringIndex < _string.length) {
                    if (_string[stringIndex] === tokens[tokenIndex]) {
                        lastFoundIndex = stringIndex;
                        matchedPositions.push(stringIndex);
                        tokenIndex++;
                    } else if (!this.options.splitString && _string[stringIndex] == " ") {} else if (stringIndex == _string.length - 1 && tokenIndex < tokens.length) {
                        stringIndex = lastFoundIndex;
                        tokenIndex++;
                    }
                    if (tokenIndex >= tokens.length) {
                        break;
                    }
                    stringIndex++;
                }
                if (matchedPositions.length > 0) {
                    __score = evaluate(matchedPositions, tokens.length, _string);
                    if (i == index && __score > 0) {
                        score += __score;
                    } else {
                        score = Math.max(__score - i * .3, score);
                    }
                } else {
                    score = Math.max(score, -1);
                }
                tokenIndex = 0;
                stringIndex = 0;
                matchedPositions.length = 0;
            }
        }
        score = Math.round(score * scoreDown);
        return score;
    },
    order: function(searchResult, highScore, scores) {
        var sorted = [];
        if (!searchResult || searchResult.length == 0) return sorted;
        var count = 0;
        var keys = scores.sort(function(a, b) {
            return a - b;
        }).reverse();
        var s;
        for (var i in keys) {
            s = keys[i];
            if (searchResult[s]) {
                var obj;
                for (var i in searchResult[s]) {
                    obj = searchResult[s][parseInt(i)];
                    if (highScore / s > this.options.scoreLimit && count > 0) {
                        return sorted;
                    }
                    sorted.push(obj);
                    count++;
                    if (this.options.limit > 0 && count > this.options.limit) {
                        return sorted;
                    }
                }
                if (this.options.limitToHighestScore) {
                    return sorted;
                }
            }
        }
        return sorted;
    }
});

var WayfinderEvents = Class.extend({
    init: function() {
        this.events = {
            "map-click": [],
            "map-pause": [],
            "map-run": [],
            "map-ready": [],
            "language-change": [],
            "data-loaded": [],
            "device-pause": [],
            "device-resume": [],
            "location-start": [],
            "location-change": [],
            "location-success": [],
            "location-failed": [],
            "pre-ready": [],
            ready: []
        };
        this.onceEvents = {};
    },
    setupDeprecated: function(wayfinder) {
        this.on("data-loaded", wayfinder.cbOnDataLoaded);
        this.on("map-click", wayfinder.cbOnPOIClick);
        this.on("language-change", wayfinder.cbOnLanguageChange);
        this.on("data-progress", wayfinder.cbOnProgress);
        this.on("data-stage-progress", wayfinder.cbOnStageProgress);
        this.on("floor-change-before", wayfinder.cbOnBeforeFloorChange);
        this.on("floor-change", wayfinder.cbOnFloorChange);
        this.on("zoom-change", wayfinder.cbOnZoomChange);
        this.on("map-update", wayfinder.cbOnMapUpdate);
        this.on("map-ready", wayfinder.cbOnMapReady);
        this.on("map-touch", wayfinder.cbOnTouch);
        this.on("path-start", wayfinder.cbOnPathStart);
        this.on("path-step", wayfinder.cbOnPathStep);
        this.on("path-finished", wayfinder.cbOnPathFinished);
        this.on("data-assets-progress", wayfinder.onAssetsProgress);
        this.on("location-change", wayfinder.cbOnLocationChange);
    },
    on: function(type, callback) {
        this.listen(type, callback);
    },
    once: function(type, callback) {
        if (typeof this.onceEvents[type] !== "object") {
            this.onceEvents[type] = [];
        }
        this.onceEvents[type].push(callback);
    },
    listen: function(type, callback) {
        if (typeof this.events[type] !== "object") {
            this.events[type] = [];
        }
        this.events[type].push(callback);
    },
    trigger: function() {
        var args = Array.prototype.slice.call(arguments);
        if (args.length > 0) {
            var type = args[0];
            args.shift();
            if (this.events[type]) {
                var fun;
                for (var i = 0, len = this.events[type].length; i < len; i++) {
                    fun = this.events[type][i];
                    if (typeof fun === "function") {
                        fun.apply(this, args);
                    }
                }
            }
            if (this.onceEvents[type]) {
                var fun;
                for (var i = 0, len = this.onceEvents[type].length; i < len; i++) {
                    fun = this.onceEvents[type][i];
                    if (typeof fun === "function") {
                        fun.apply(this, args);
                    }
                    delete this.onceEvents[type];
                }
            }
            if (this.events["any"]) {
                var fun;
                for (var i = 0, len = this.events["any"].length; i < len; i++) {
                    fun = this.events["any"][i];
                    if (typeof fun === "function") {
                        args.unshift(type);
                        fun.apply(this, args);
                    }
                }
            }
        }
    }
});

var Building = Class.extend({
    init: function(settings, languages) {
        this.name = settings["building.name"];
        this.address = settings["building.address"];
        this.link = new Translations(settings["building.link"]);
        this.description = new Translations(settings["building.description"]);
        this.logoID = settings["building.logo"];
        this.backgroundID = settings["building.background"];
        this.floors = {};
        this.sortedFloors = null;
        this.currentFloor = false;
        this.location = {
            latitude: 0,
            longitude: 0,
            direction: 0,
            scale: 0
        };
    },
    addFloor: function(floor) {
        this.floors[floor.id] = floor;
    },
    removeFloor: function(floor) {
        delete this.floors[floor.id];
    },
    getFloors: function() {
        return this.floors;
    },
    getSortedFloors: function() {
        var sortedFloors = new ArrayUtility(this.floors);
        this.sortedFloors = sortedFloors.sort(function(a, b) {
            return a.index < b.index;
        });
        return this.sortedFloors;
    },
    setActiveFloors: function(floor) {
        if (typeof floor === "object") {
            var _floor, activeFloor;
            for (var i in this.floors) {
                _floor = this.floors[i];
                if (typeof _floor === "object" && _floor.setActive) {
                    _floor.setActive(false);
                }
                if (_floor.id == floor.id) {
                    activeFloor = _floor;
                }
            }
            activeFloor.setActive(true);
            this.currentFloor = activeFloor;
        }
    },
    getCurrentFloor: function() {
        return this.currentFloor;
    },
    setCurrentFloor: function(floor) {
        if (typeof floor === "object") {
            this.currentFloor = floor;
        }
    },
    setLocation: function(location) {
        if (location) {
            this.location.latitude = parseFloat(location["latitude"]);
            this.location.longitude = parseFloat(location["longitude"]);
            this.location.scale = parseFloat(location["scale"]);
            this.location.direction = parseFloat(location["direction"]);
        }
    }
});

var Settings = Class.extend({
    init: function() {
        this.data = {};
    },
    has: function(key) {
        return key in this.data;
    },
    hasItem: function(key, item) {
        return item && item.settings && item.settings[key];
    },
    get: function(key, defaultValue, item) {
        if (item && item.settings && item.settings[key]) {
            return item.settings[key]["value"];
        }
        if (key in this.data) return this.data[key];
        return defaultValue;
    },
    getInt: function(key, defaultValue, item) {
        return parseInt(this.get(key, defaultValue, item));
    },
    getFloat: function(key, defaultValue, item) {
        return parseFloat(this.get(key, defaultValue, item));
    },
    getColor: function(key, defaultValue, item) {
        return new Color().fromHex(this.get(key, defaultValue, item));
    },
    getBoolean: function(key, defaultValue, item) {
        return this.get(key, defaultValue, item) === true;
    },
    getModel: function(key, defaultValue, item) {
        var val = this.getInt(key, 0, item);
        return val === 0 ? defaultValue : val;
    },
    set: function(key, value) {
        this.data[key] = value;
    },
    override: function(local) {
        for (var i in local) {
            this.data[i] = local[i];
        }
    }
});

var NavigationNode = Class.extend({
    init: function(nodeData) {
        this.id = nodeData.id;
        this.floor_id = nodeData.level_id;
        this.type = nodeData.type;
        this.position = vec3.fromValues(-parseFloat(nodeData.x), parseFloat(nodeData.y), parseFloat(nodeData.z));
        this.rotation = vec3.fromValues(parseFloat(nodeData.rotation_x), parseFloat(nodeData.rotation_y), parseFloat(nodeData.rotation_z));
        this.floor = false;
        this.pois = [];
        this.weight = 0;
        if (nodeData.weight) this.weight = parseFloat(nodeData.weight);
        this.zoom = 0;
        if (nodeData.zoom) this.zoom = parseFloat(nodeData.zoom);
        this.position2d = vec2.create();
        this.neighbours = [];
        if (nodeData.weight) {
            this.weight = parseFloat(nodeData.weight);
        }
        if (nodeData.zoom) {
            this.zoom = parseFloat(nodeData.zoom);
        }
    },
    setFloor: function(floor) {
        if (floor instanceof Floor && floor.id == this.floor_id) this.floor = floor;
    },
    addPOI: function(poi) {
        if (poi instanceof POI && poi.node_id == this.id) {
            poi.setNode(this);
            this.pois.push(poi);
        }
    },
    getID: function() {
        return this.id;
    },
    getFloor: function() {
        return this.floor;
    },
    getPOIs: function() {
        return this.pois;
    },
    setPosition2D: function(x, y) {
        this.position2d = vec2.fromValues(parseFloat(x), parseFloat(y));
    },
    setWeight: function(weight) {
        this.weight = parseFloat(weight);
    },
    addNeighbour: function(node) {
        if (node instanceof NavigationNode) this.neighbours.push(node);
    }
});

var Floor = Class.extend({
    init: function(floorData, languages) {
        this.id = parseInt(floorData.id, 10);
        this.name_id = parseInt(floorData.name_id, 10);
        this.model_id = parseInt(floorData.model_id, 10);
        this.format = floorData.format;
        this.index = parseInt(floorData.index, 10);
        this.y = parseFloat(floorData.y, 10);
        this.lightmap_id = parseInt(floorData.lightmap_id, 10);
        this.showInMenu = parseInt(floorData.show_in_menu, 10) !== 0;
        this.names = new Translations();
        this.active = false;
        this.svg = floorData.svg;
        for (var language in languages) {
            this.names.set(language, floorData[language]);
        }
        this.pois = [];
        this.nodes = [];
        this.node3D = false;
        this.mapMeshPathToID = {};
        this.mapIDToMeshPath = {};
    },
    toString: function() {
        return JSON.stringify({
            class: "Floor",
            id: this.id,
            index: this.index
        });
    },
    getID: function() {
        return this.id;
    },
    getName: function(language) {
        return this.names.get(language);
    },
    getNames: function() {
        return this.names;
    },
    addPOI: function(poi) {
        if (poi instanceof POI) {
            poi.setFloor(this);
            this.pois.push(poi);
        }
    },
    addNode: function(node) {
        if (typeof node === "object" && node.floor_id == this.id) {
            node.setFloor(this);
            this.nodes.push(node);
        }
    },
    getPOIs: function() {
        return this.pois;
    },
    getNodes: function() {
        return this.nodes;
    },
    getShowInMenu: function() {
        return this.showInMenu;
    },
    setActive: function(_active) {
        this.active = _active;
    },
    getActive: function() {
        return this.active;
    },
    setMeshNames: function(idNameMap) {
        for (var meshID in idNameMap) {
            this.mapMeshPathToID[idNameMap[meshID]] = parseInt(meshID);
            this.mapIDToMeshPath[parseInt(meshID)] = idNameMap[meshID];
        }
    },
    getMeshIDByPath: function(path) {
        if (path in this.mapMeshPathToID) return this.mapMeshPathToID[path];
        return 0;
    },
    getMeshPathByID: function(mesh_id) {
        if (mesh_id in this.mapIDToMeshPath) return this.mapIDToMeshPath[mesh_id];
        return false;
    },
    showYAH: function() {
        if (!this.node3D) return;
        var yah = this.node3D.find("YAHLocation/YAH");
        if (!yah) return;
        yah.onEachChild(function(subnode) {
            var renderer = subnode.getComponent(RendererComponent);
            if (renderer) renderer.enable();
            var billboard = subnode.getComponent(Billboard);
            if (billboard) billboard.enable();
        });
    },
    hideYAH: function() {
        if (!this.node3D) return;
        var yah = this.node3D.find("YAHLocation/YAH");
        if (!yah) return;
        yah.onEachChild(function(subnode) {
            var renderer = subnode.getComponent(RendererComponent);
            if (renderer) renderer.disable();
            var billboard = subnode.getComponent(Billboard);
            if (billboard) billboard.disable();
        });
    }
});

var POI = Class.extend({
    init: function(poiData, languages) {
        this.id = parseInt(poiData.id);
        this.type = poiData.type;
        this.node_id = parseInt(poiData.node_id);
        this.mesh_id = parseInt(poiData.mesh_id);
        this.room_id = poiData.room_id;
        this.image_id = parseInt(poiData.image_id);
        this.icon = null;
        this.iconTinted = null;
        this.iconUrl = null;
        this.background_id = parseInt(poiData.background_id);
        this.backgroundUrl = null;
        this.background = null;
        this.showInMenu = parseInt(poiData.show_in_menu) != 0;
        this.alwaysVisible = parseInt(poiData.always_visible) != 0;
        this.mesh_name = poiData.mesh_name;
        this.externalLogo = poiData.external_logo;
        this.settings = {};
        this.names = new Translations();
        this.descriptions = new Translations();
        this.open = new Translations();
        for (var language in languages) {
            this.names.set(language, poiData["names_" + language]);
            this.descriptions.set(language, poiData["descriptions_" + language]);
            this.open.set(language, poiData["opening_hours_" + language]);
        }
        this.floor = false;
        this.node = false;
        this.groups = [];
        this.advertisements = [];
        this.groupNames = {};
        this.tags = "";
        this.email = poiData.email;
        this.web = poiData.web;
        this.phone = poiData.phone;
        this.opening_hours = languages.length > 0 ? poiData["opening_hours_" + languages[0]] : poiData["opening_hours"];
        this.object = false;
        this.visible = false;
        this.meshNode = false;
        this.submesh = false;
        this.canvasBoard = false;
        this.geometryCreated = false;
        this.engine;
        this.wayfinder;
    },
    toString: function() {
        return JSON.stringify({
            class: "POI",
            id: this.id,
            room_id: this.room_id,
            showInMenu: this.showInMenu,
            email: this.email,
            phone: this.phone,
            web: this.web
        });
    },
    getID: function() {
        return this.id;
    },
    getSetting: function(key, _default) {
        return this.wayfinder.settings.get(key, _default, this);
    },
    getSettingBoolean: function(key, _default) {
        return this.wayfinder.settings.getBoolean(key, _default, this);
    },
    getSettingFloat: function(key, _default) {
        return this.wayfinder.settings.getFloat(key, _default, this);
    },
    hasSetting: function(key) {
        return this.wayfinder.settings.hasItem(key, this);
    },
    getName: function(language) {
        return this.names.get(language);
    },
    getNames: function() {
        return this.names;
    },
    getDescription: function(language) {
        return this.descriptions.get(language);
    },
    getOpeningHours: function(language) {
        return this.open.get(language);
    },
    getDescriptions: function() {
        return this.descriptions;
    },
    getShowInMenu: function() {
        return this.showInMenu;
    },
    hasName: function(language) {
        return this.names.hasTranslation(language);
    },
    getFirstChar: function(language) {
        var name = this.getName(language);
        return name ? name.charAt(0).toLowerCase() : "";
    },
    setShowInMenu: function(value) {
        this.showInMenu = value;
    },
    setFloor: function(floor) {
        if (floor instanceof Floor) this.floor = floor;
    },
    getFloor: function() {
        return this.floor;
    },
    setNode: function(node) {
        if (typeof node === "object") {
            this.node = node;
        }
        if (this.object && this.node) {
            mat4.fromTranslation(this.object.transform.relative, this.node.position);
        }
    },
    getNode: function() {
        return this.node;
    },
    addGroup: function(group) {
        this.groups.push(group);
    },
    getGroups: function() {
        return this.groups;
    },
    getGroupNames: function(language) {
        if (typeof this.groupNames[language] !== "undefined") return this.groupNames[language];
        var result = {};
        for (var groupID in this.groups) {
            if (typeof this.groups[groupID] === "object") {
                var translations = this.groups[groupID].getNames();
                for (var language in translations.getAll()) {
                    if (!result[language]) result[language] = [];
                    result[language].push(translations.get(language));
                }
            }
        }
        this.groupNames = result;
        if (typeof this.groupNames[language] === "undefined") {
            this.groupNames[language] = [];
        }
        return this.groupNames[language];
    },
    addAdvertisement: function(advertisement) {
        this.advertisements.push(advertisement);
    },
    getAdvertisements: function() {
        return this.advertisements;
    },
    hasAdvertisements: function() {
        if (typeof this.advertisements === "object" && this.advertisements.length > 0) {
            return true;
        } else {
            return false;
        }
    },
    getTags: function() {
        return this.tags;
    },
    setTags: function(tag) {
        this.tags = tag;
    },
    setIcon: function(image) {
        this.icon = image;
    },
    getIcon: function() {
        return this.icon;
    },
    setBackground: function(image) {
        this.background = image;
    },
    getBackground: function() {
        return this.background;
    },
    getRoomId: function() {
        return this.room_id;
    },
    isAlwaysVisible: function() {
        return this.alwaysVisible;
    },
    getIconUrl: function() {
        if (!this.iconUrl && this.image_id > 0) {
            return this.iconUrl = WayfinderAPI.getURL("images", "getLarge", this.image_id);
        } else {
            return this.iconUrl;
        }
    },
    getBackgroundUrl: function() {
        if (!this.backgroundUrl && this.background_id > 0) {
            return this.backgroundUrl = WayfinderAPI.getURL("images", "getLarge", this.background_id);
        } else {
            return this.backgroundUrl;
        }
    },
    getLines(language, linesCount) {
        var text = this.getName(language);
        var words = text.replace(/\&shy;/g, " &shy; ").split(" ");
        var textLength = text.replace("&shy;", "-").length;
        var lines = [];
        var currentLine = words[0];
        if (linesCount <= 0) return words;
        if (words.length <= linesCount) return words;
        for (var i = 1; i < words.length; i++) {
            if (words[i].toLowerCase() !== "&shy;") {
                if (currentLine.length > textLength / linesCount) {
                    lines.push(currentLine);
                    currentLine = words[i];
                } else {
                    currentLine += " " + words[i];
                }
            } else {
                if (currentLine.length + 1 > textLength / linesCount) {
                    lines.push(currentLine + "-");
                    currentLine = "";
                } else if (i + 1 < words.length) {
                    lines.push(currentLine + words[++i]);
                    currentLine = "";
                }
            }
        }
        if (currentLine !== "") lines.push(currentLine);
        return lines;
    }
});

var POIAdvertisement = Class.extend({
    init: function(data) {
        if (typeof data === "object") {
            this.id = parseInt(data.id);
            this.poi_id = parseInt(data.poi_id);
            this.advertisement_id = parseInt(data.advertisement_id);
            this.content_type = data.contentType;
            this.thumb = data.thumb;
            this.priority = parseInt(data.priority);
            this.video_length = parseInt(data.video_length);
            this.from_date = Date.parse(data.from_date);
            this.to_date = Date.parse(data.to_date);
        }
    },
    getID: function() {
        return this.id;
    },
    getPOIId: function() {
        return this.poi_id;
    },
    getAdvertisementId: function() {
        return this.advertisement_id;
    }
});

var POIGroup = Class.extend({
    init: function(poiGroupData, languages) {
        this.id = parseInt(poiGroupData.group_id);
        this.names = new Translations();
        this.desciptions = new Translations();
        this.imageID = poiGroupData.image_id;
        for (var language in languages) {
            this.names.set(language, poiGroupData[language]);
        }
        for (var language in languages) {
            this.desciptions.set(language, poiGroupData["description_" + language]);
        }
        this.pois = [];
        this.showInMenu = poiGroupData.show_main;
        this.showInTopMenu = poiGroupData.show_top;
        this.color = new Color().fromHex(poiGroupData.color);
        this.parent_id = poiGroupData.parent_id;
        this.order = parseInt(poiGroupData.order);
        this.iconUrl = false;
        this.childGroups = [];
        this.parent = null;
        this.slug = poiGroupData.slug;
    },
    toString: function() {
        return JSON.stringify({
            class: "POIGroup",
            id: this.id,
            showInMenu: this.showInMenu,
            showInTopMenu: this.showInTopMenu,
            parent_id: this.parent_id,
            slug: this.slug
        });
    },
    getID: function() {
        return this.id;
    },
    getName: function(language) {
        return this.names.get(language);
    },
    getNames: function() {
        return this.names;
    },
    getDescription: function(language) {
        return this.desciptions.get(language);
    },
    getDescriptions: function() {
        return this.desciptions;
    },
    getShowInMenu: function() {
        return this.showInMenu != 0;
    },
    getShowInTopMenu: function() {
        return this.showInTopMenu != 0;
    },
    getImageID: function() {
        return this.imageID;
    },
    addPOI: function(poi) {
        this.pois.push(poi);
    },
    getPOIs: function() {
        return this.pois;
    },
    getColor: function() {
        return this.color;
    },
    getIconUrl: function() {
        if (!this.iconUrl && this.imageID > 0) {
            return this.iconUrl = WayfinderAPI.getURL("images", "getLarge", this.imageID);
        } else {
            return this.iconUrl;
        }
    },
    getChildren: function() {
        return this.childGroups;
    },
    setChildren: function(_children) {
        this.childGroups = _children;
    },
    setParent: function(parent) {
        this.parent = parent;
    },
    getParent: function() {
        return this.parent;
    }
});

var Room = Class.extend({
    init: function(_room, languages) {
        this.id = parseInt(_room.id);
        this.room_id = _room.room_id;
        this.names = new Translations();
        this.pois = [];
        for (var language in languages) {
            this.names.set(language, _room["names_" + language]);
        }
    },
    toString: function() {
        return JSON.stringify({
            class: "Room",
            id: this.id,
            room_id: this.room_id
        });
    },
    getName: function(language) {
        return this.names.get(language);
    },
    getNames: function() {
        return this.names;
    },
    getPOIs: function() {
        return this.pois;
    },
    addPOI: function(_poi) {
        this.pois.push(_poi);
    }
});

var Logistics = function() {
    var storageSupport = false;
    if (typeof window !== "undefined") {
        storageSupport = "localStorage" in window && window["localStorage"] !== null;
    }
    var queue = [];
    var multiQueue = [];
    var stages = {};
    var loadedCount = 0;
    var loading = false;
    var afterLoadCallback = null;
    var progressCallback = null;
    var stageCallback = null;
    var loadedCheckTimer = null;
    var options = {
        loadFromLocalStorage: false,
        storeToLocalStorage: false,
        loadFromFile: false,
        enableCORS: true,
        useCookies: false,
        fallbackFromStorage: true,
        urlParseFunction: null
    };
    var me = this;
    var typefunctions = {
        text: {
            load: function(dt) {
                makeHTTPRequest(dt);
            },
            parse: function(dt, http) {
                dt.data = http.responseText;
            },
            store: function(dt) {
                return dt.data;
            },
            restore: function(dt, data) {
                return data;
            }
        },
        json: {
            load: function(dt) {
                makeHTTPRequest(dt);
            },
            parse: function(dt, http) {
                try {
                    dt.data = JSON.parse(http.responseText);
                } catch (e) {
                    if (typeof console !== "undefined" && console.error) {
                        console.error("JSON parsing failed for " + dt.url, e);
                    }
                }
            },
            store: function(dt) {
                return JSON.stringify(dt.data);
            },
            restore: function(dt, data) {
                if (data) {
                    return JSON.parse(data);
                } else {
                    return {};
                }
            }
        },
        xml: {
            load: function(dt) {
                makeHTTPRequest(dt);
            },
            parse: function(dt, http) {
                if (http.responseXML) {
                    dt.data = http.responseXML;
                } else {
                    dt.data = parseXML(http.responseText);
                }
            },
            store: function(dt) {
                if (XMLSerializer) {
                    return new XMLSerializer().serializeToString(dt.data);
                } else {
                    return "";
                }
            },
            restore: function(dt, data) {
                return parseXML(data);
            }
        },
        image: {
            load: function(dt) {
                if (dt) {
                    dt.data = new Image();
                    if (dt.useCORS) {
                        dt.data.crossOrigin = "Anonymous";
                    }
                    dt.data.onload = function() {
                        dt.ready();
                    };
                    dt.data.onerror = function() {
                        dt.failed();
                    };
                    dt.data.src = dt.url;
                }
            },
            parse: function(dt) {},
            store: function(dt) {
                var canvas = document.createElement("canvas");
                canvas.width = dt.data.width;
                canvas.height = dt.data.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(dt.data, 0, 0);
                var dataURL = canvas.toDataURL("image/png");
                canvas = null;
                return dataURL;
            },
            restore: function(dt, data) {
                var img = new Image();
                img.src = data;
                return img;
            }
        },
        binary: {
            load: function(dt) {
                makeHTTPRequest(dt);
            },
            parse: function(dt, http) {
                dt.data = http.response;
            },
            store: function(dt) {
                var str = "";
                var bytes = new Uint8Array(dt.data);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    str += String.fromCharCode(bytes[i]);
                }
                return window.btoa(str);
            },
            restore: function(dt, data) {
                var buf = new ArrayBuffer(data.length * 2);
                var bufView = new Uint16Array(buf);
                for (var i = 0, strLen = data.length; i < strLen; i++) {
                    bufView[i] = data.charCodeAt(i);
                }
                return buf;
            }
        }
    };
    var DataTransporter = function(_url, _params, _success, _type, _requestType, _options) {
        this.url = _url;
        this.params = _params;
        this.success = _success;
        this.dataType = _type;
        this.loaded = false;
        this.data = false;
        this.requestType = _requestType;
        this.useCORS = false;
        this.options = _options ? _options : {};
        this.successCallback = _success;
        this.errorCallback = false;
        this.alwaysCallback = false;
        this.progressCallback = false;
        this.setOption = function(key, value) {
            this.options[key] = value;
        };
        this.getOption = function(key) {
            return this.options[key];
        };
        this.ready = function() {
            this.loaded = true;
            loadedCount++;
            callSuccess(this);
            callProgress(this);
        };
        this.failed = function() {
            loadedCount++;
            callProgress(this);
            callError(this);
        };
        this.done = function(callback) {
            this.successCallback = callback;
        };
        this.fail = function(callback) {
            this.errorCallback = callback;
        };
        this.error = function(callback) {
            this.errorCallback = callback;
        };
        this.always = function(callback) {
            this.alwaysCallback = callback;
        };
        this.progress = function(callback) {
            this.progressCallback = callback;
        };
        this.toString = function() {
            return this.data;
        };
    };
    var MultiTransporter = function(urlList, _success, _options) {
        this.urls = urlList;
        this.results = {};
        this.loadedCount = 0;
        this.count = 0;
        this.successCallback = _success;
        _options = _options ? _options : {};
        this.load = function() {
            var dt = null;
            var url = null;
            for (var key in this.urls) {
                if (this.urls.hasOwnProperty(key)) {
                    this.count++;
                }
            }
            for (var i in this.urls) {
                url = this.urls[i];
                if (url && url.url && url.type) {
                    try {
                        dt = get(url.url, undefined, callback(this, this.ready, i), url.type, JSON.parse(JSON.stringify(_options)));
                        dt.setOption("logistics.multi.key", i);
                        dt.fail(callback(this, this.fail));
                    } catch (e) {
                        this.fail();
                    }
                }
            }
        };
        this.ready = function(data, status, dt) {
            var key = dt.getOption("logistics.multi.key");
            this.results[key] = data;
            this.loadedCount++;
            this.checkIfAllReady();
        };
        this.fail = function(dt) {
            this.loadedCount++;
            this.checkIfAllReady();
        };
        this.getKeyForURL = function(url) {};
        this.checkIfAllReady = function() {
            if (this.loadedCount >= this.count) {
                if (typeof this.successCallback === "function") {
                    this.successCallback(this.results);
                }
            }
        };
    };
    var get = function(_url, _params, _success, _type, _options) {
        var _requestType = "GET";
        if (typeof _params === "function") {
            _options = _success;
            _success = _params;
            _params = undefined;
        } else if (_params && typeof _params === "object") {
            _requestType = "POST";
        }
        if (typeof options.urlParseFunction == "function") {
            _url = options.urlParseFunction(_url);
        }
        var dt = new DataTransporter(_url, _params, _success, _type, _requestType, _options);
        if (options.enableCORS) {
            dt.useCORS = ifCORSNeeded(_url);
        }
        if (dt) {
            queue.push(dt);
            startLoad(dt);
        }
        return dt;
    };
    var getMultiple = function(urlList, success, options) {
        var mt = new MultiTransporter(urlList, success, options);
        multiQueue.push(mt);
        mt.load();
    };
    var ifCORSNeeded = function(_url) {
        if (typeof document === "undefined" || typeof _url === "undefined") return false;
        var url = _url.match(/(https?:)?\/\/([^\/]+)\/(.*)/);
        if (!url) return false;
        if (document && url[1] === document.location.origin) return false;
        return true;
    };
    var checkOptions = function(dt) {
        if (dt) {
            var stage = dt.getOption("stage");
            if (stage) {
                if (typeof stages[stage] !== "object") {
                    stages[stage] = [];
                }
                stages[stage].push(dt);
            }
        }
    };
    var startLoad = function(dt) {
        load(dt);
        return true;
    };
    var load = function(dt) {
        checkOptions(dt);
        if (options.loadFromLocalStorage && inLocalStorage(dt)) {
            restore(dt);
        } else {
            getTypeFunction(dt.dataType, "load")(dt);
        }
    };
    var inLocalStorage = function(dt) {
        if (storageSupport && localStorage.getItem(dt.url) !== null) {
            return true;
        }
        return false;
    };
    var restore = function(dt) {
        dt.data = getTypeFunction(dt.dataType, "restore")(dt, loadFromLocalStorage(dt));
        dt.ready();
    };
    var getTypeFunction = function(type, method) {
        if (typefunctions && typefunctions[type] && typefunctions[type][method]) {
            return typefunctions[type][method];
        } else if (typefunctions && typefunctions[type]) {
            return typefunctions[type];
        }
        return function() {
            if (typeof console !== "undefined" && console.warn) {
                console.warn("Method " + method + " for " + type + " not found");
            }
        };
    };
    var setTypeFunction = function(type, method) {
        if (type && method) {
            typefunctions[type] = method;
        }
    };
    var makeHTTPRequest = function(dt) {
        var xhr = getHTTPObject(dt);
        if (xhr && dt) {
            var url = dt.url;
            var params = null;
            xhr.open(dt.requestType, url, true);
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("text/plain");
            }
            if (dt.dataType == "binary") {
                xhr.responseType = "arraybuffer";
                if (dt.useCORS) {
                    xhr.setRequestHeader("Content-Type", "application/x-3dtechdata");
                }
            }
            if (dt.dataType == "default") {
                xhr.responseType = "arraybuffer";
                if (dt.useCORS) {
                    xhr.setRequestHeader("Content-Type", "application/octet-stream");
                }
            }
            if (dt.options.headers) {
                console.log("dt.headers", dt);
                for (var h in dt.options.headers) {
                    console.log("h", h, dt.options.headers[h]);
                    xhr.setRequestHeader(h, dt.options.headers[h]);
                }
            }
            if (dt.params) {
                params = new FormData();
                for (var i in dt.params) {
                    params.append(i, dt.params[i]);
                }
            }
            if (dt.useCORS && options.useCookies) {
                xhr.withCredentials = true;
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var status = xhr.status;
                    if (status == 200 || status == 0 || status == 300) {
                        getTypeFunction(dt.dataType, "parse")(dt, xhr);
                        dt.ready();
                    } else {
                        dt.failed();
                    }
                } else {
                    if (typeof dt.progressCallback === "function") {
                        dt.progressCallback(xhr);
                    }
                }
            };
            xhr.ontimeout = function() {
                dt.failed();
            };
            xhr.onerror = function() {
                dt.failed();
            };
            callProgress(dt);
            xhr.send(params);
        } else {
            throw "http failed";
        }
    };
    var parseXML = function(data) {
        var xml = null;
        if (!data || typeof data !== "string") {
            return xml;
        }
        if (window && window.DOMParser) {
            var parser = new DOMParser();
            xml = parser.parseFromString(data, "text/xml");
        } else {
            xml = new ActiveXObject("Microsoft.XMLDOM");
            xml.async = false;
            xml.loadXML(data);
        }
        if (!xml || xml.getElementsByTagName("parsererror").length) {
            throw "XML parsing failed";
        }
        return xml;
    };
    var getHTTPObject = function(dt) {
        var http = false;
        if (dt.useCORS && window && window.XDomainRequest) {
            try {
                http = new XDomainRequest();
            } catch (E) {
                http = false;
            }
        } else if (XMLHttpRequest) {
            try {
                http = new XMLHttpRequest();
            } catch (e) {
                http = false;
            }
        } else if (typeof ActiveXObject !== "undefined") {
            try {
                http = new ActiveXObject("Msxml2.XMLHTTP");
                alert(2);
            } catch (e) {
                try {
                    http = new ActiveXObject("Microsoft.XMLHTTP");
                    alert(3);
                } catch (E) {
                    http = false;
                }
            }
        }
        return http;
    };
    var clear = function() {
        queue = [];
        multiQueue = [];
        loadedCount = 0;
        loading = false;
    };
    var store = function() {
        if (storageSupport) {
            for (var i in queue) {
                storeToLocalStorage(queue[i]);
            }
        } else {
            console.warn("localStorage isn't supported");
        }
    };
    var clearStorage = function() {
        localStorage.clear();
    };
    var storeToLocalStorage = function(dt) {
        if (storageSupport) {
            try {
                localStorage[dt.url] = getTypeFunction(dt.dataType, "store")(dt);
            } catch (err) {
                console.warn("localStorage limit exceeded");
            }
        } else {
            console.warn("localStorage isn't supported");
        }
    };
    var loadFromLocalStorage = function(dt) {
        return localStorage[dt.url];
    };
    var callSuccess = function(dt) {
        if (dt && typeof dt.successCallback === "function") {
            dt.successCallback(dt.data, "success", dt);
            callIfFinished();
        }
        if (dt && options.storeToLocalStorage) {
            storeToLocalStorage(dt);
        }
    };
    var callError = function(dt) {
        if (dt && options.fallbackFromStorage && inLocalStorage(dt)) {
            restore(dt);
            return;
        } else if (dt && typeof dt.errorCallback === "function") {
            dt.errorCallback(dt, "error", "");
        } else {
            throw "Resource " + dt.url + " not loaded";
        }
        callIfFinished();
    };
    var callProgress = function(dt) {
        if (progressCallback && typeof progressCallback === "function" && queue.length && loadedCount) {
            progressCallback(loadedCount / queue.length);
        }
        if (dt && dt.getOption("stage")) {
            callStageCallback(dt);
        }
    };
    var callStageCallback = function(dt) {
        if (stageCallback && typeof stageCallback === "function") {
            var stage = stages[dt.getOption("stage")];
            var length = stage.length;
            var loadedCount = 0;
            for (var i = 0; i < length; i++) {
                if (stage[i] && stage[i].loaded) {
                    loadedCount++;
                }
            }
            if (length > 0) {
                stageCallback(dt.getOption("stage"), loadedCount / length);
            }
        }
    };
    var callIfFinished = function() {
        if (loadedCheckTimer === null) {
            loadedCheckTimer = setTimeout(finishedChecker, 5);
        }
    };
    var finishedChecker = function() {
        loadedCheckTimer = null;
        if (queue.length == loadedCount && afterLoadCallback && typeof afterLoadCallback === "function") {
            afterLoadCallback();
        }
    };
    var callback = function(classScope, fnCallback) {
        return function() {
            return fnCallback.apply(classScope, arguments);
        };
    };
    var setOption = function(key, value) {
        options[key] = value;
    };
    var getOption = function(key) {
        return options[key];
    };
    return {
        count: function() {
            return queue.length;
        },
        loadedCount: function() {
            return loadedCount;
        },
        clear: function() {
            clear();
        },
        get: function(url, params, success, type, options) {
            return get(url, params, success, toLowerCase(type), options);
        },
        getJSON: function(url, params, success, options) {
            return get(url, params, success, "json", options);
        },
        getImage: function(url, params, success, options) {
            return get(url, params, success, "image", options);
        },
        getBinary: function(url, params, success, options) {
            return get(url, params, success, "binary", options);
        },
        getXML: function(url, params, success, options) {
            return get(url, params, success, "xml", options);
        },
        getText: function(url, params, success, options) {
            return get(url, params, success, "text", options);
        },
        getMultiple: function(urlList, success, options) {
            getMultiple(urlList, success, options);
        },
        store: function() {
            store();
        },
        clearStorage: function() {
            clearStorage();
        },
        types: function() {
            return typefunctions;
        },
        onFinishedLoading: function(callback) {
            afterLoadCallback = callback;
        },
        onProgress: function(callback) {
            progressCallback = callback;
        },
        onStageProgress: function(callback) {
            stageCallback = callback;
        },
        getQueue: function() {
            return queue;
        },
        getTypeFunction: function(type, method) {
            return getTypeFunction(type, method);
        },
        setTypeFunction: function(type, method) {
            return setTypeFunction(type, method);
        },
        getOption: function(key) {
            return getOption(key);
        },
        setOption: function(key, value) {
            setOption(key, value);
        },
        start: function() {
            return start();
        }
    };
}();

var Language = Class.extend({
    init: function(languageData) {
        this.name = languageData.name;
        this.id = languageData.id;
        this.nativeName = languageData["native"];
        this.textDirection = languageData.text_direction ? languageData.text_direction.toLowerCase() : "ltr";
        this.flagImage = languageData.flag;
        this.order = parseInt(languageData.order);
    },
    getName: function() {
        return this.name;
    },
    getID: function() {
        return this.id;
    },
    getNativeName: function() {
        return this.nativeName;
    },
    getTextDirection: function() {
        return this.textDirection;
    }
});

var Translator = Class.extend({
    init: function(language, translationMap) {
        this.language = language;
        this.direction = "ltr";
        this.translations = translationMap;
    },
    setTranslations: function(translationMap) {
        this.translations = translationMap;
    },
    setLanguage: function(language, direction) {
        this.language = language;
        if (direction) {
            this.direction = direction;
        }
    },
    getLanguage: function() {
        return this.language;
    },
    _isJQueryObject: function(obj) {
        return typeof jQuery !== "undefined" && obj instanceof jQuery;
    },
    get: function(key, params) {
        if (this.translations && key && this.translations[key] && this.translations[key][this.language]) {
            var str = this.translations[key][this.language];
            if (params && typeof str === "string") {
                str = this.replaceValues(str, params);
            }
            return str;
        }
        return key;
    },
    translate: function(language, direction) {
        if (language) {
            this.language = language;
        }
        if (direction) {
            this.direction = direction;
        }
        if (typeof document !== "undefined" && document.querySelectorAll) {
            var elements = document.querySelectorAll("[data-translation-element]");
            for (var i = 0; i < elements.length; i++) {
                this.translateElement(elements[i], elements[i].getAttribute("data-translation-element"));
            }
            var elements = document.querySelectorAll("[data-translation-attributes]");
            for (var i = 0; i < elements.length; i++) {
                var attributes = elements[i].getAttribute("data-translation-attributes").split(",");
                var key = "";
                for (var j = 0; j < attributes.length; j++) {
                    key = elements[i].getAttribute("data-translation-attribute-" + attributes[j]);
                    if (elements[i] && key) {
                        elements[i].setAttribute(attributes[j], this.get(key));
                    }
                }
            }
        }
    },
    setElement: function(element, key) {
        if (element && key) {
            if (this._isJQueryObject(element)) {
                element = element[0];
            }
            element.setAttribute("data-translation-element", key);
        }
    },
    setAttribute: function(element, attribute, key) {
        if (element && key && attribute) {
            if (this._isJQueryObject(element)) {
                element = element[0];
            }
            var attr = [];
            if (element.getAttribute("data-translation-attributes")) {
                attr = element.getAttribute("data-translation-attributes").split(",");
            }
            attr.push(attribute);
            element.setAttribute("data-translation-attributes", attr.join(","));
            element.setAttribute("data-translation-attribute-" + attribute, key);
        }
    },
    translateElement: function(parent, key, params) {
        if (typeof parent === "object" && parent !== null) {
            if (this._isJQueryObject(parent)) {
                parent = parent[0];
            }
            if (typeof parent === "string") {
                parent = document.getElementById(parent);
            }
            if (key && this.exists(key)) {
                var value = this.get(key, params);
                this.setElement(parent, key);
                parent.innerHTML = value;
                parent.classList.remove("wf-translated-rtl");
                parent.classList.remove("wf-translated-ltr");
                parent.classList.remove("no-translation");
                parent.classList.add("wf-translated-" + this.direction);
            } else {
                parent.classList.add("no-translation");
            }
        }
    },
    translateAttribute: function(parent, attribute, key, params) {
        if (parent && attribute && key) {
            if (this._isJQueryObject(parent)) {
                parent = parent[0];
            }
            var value = this.get(key, params);
            this.setAttribute(parent, attribute, key);
            parent.setAttribute(attribute, value);
            if (!this.exists(key) && parent.classList) {
                parent.classList.add("no-translation");
            }
        }
    },
    replaceValues: function(str, params) {
        if (str && params) {
            var count = 0;
            for (var i in params) {
                str = str.replace(new RegExp("%" + count++, "g"), params[i]);
            }
        }
        return str;
    },
    exists: function(key) {
        if (this.translations && key && this.translations[key] && this.translations[key][this.language]) return true; else return false;
    }
});

var Translations = Class.extend({
    init: function(translations) {
        if (translations) this.translations = translations; else this.translations = {};
    },
    set: function(language, translation) {
        this.translations[language] = translation;
    },
    get: function(language) {
        if (!this.translations[language]) return false;
        return this.translations[language];
    },
    setAll: function(translations) {
        this.translations = translations;
    },
    getAll: function() {
        return this.translations;
    },
    hasTranslation: function(language) {
        return typeof this.translations[language] == "string" && this.translations[language] != "";
    },
    setTranslations: function(element, language) {
        var defaultAdded = false;
        if (element && language) {
            for (var l in this.translations) {
                element.attr("data-lang-" + l, this.translations[l]);
            }
            if (this.translations[language]) element.html(this.translations[language]); else element.html("no translation");
            element.attr("data-translated", true);
        }
    }
});

var TranslationsMap = Class.extend({
    init: function() {
        this.translations = {};
    },
    add: function(id, translations) {
        if (!(translations instanceof Translations)) throw "Only Translation instances can be added to translations map";
        this.translations[id] = translations;
    },
    get: function(id) {
        if (!this.translations[id]) return new Translations({
            english: "--missing--"
        });
        return this.translations[id];
    }
});

var WFStatistics = Class.extend({
    init: function(wayfinder) {
        this.wayfinder = wayfinder;
        this.session_id = 0;
        this.storageSupport = typeof window !== "undefined" && "localStorage" in window && window["localStorage"] !== null;
        this.storagePrefix = "wfstats_";
        this.device_id = 0;
        this.searchPhrase = "";
        this.checkStorage();
    },
    start: function(callback) {
        var me = this;
        if (typeof screen !== "undefined" && !this.device_id) {
            WayfinderAPI.statistics.device(screen.width, screen.height, this.wayfinder.getKiosk(), function(data) {
                if (data) {
                    me.device_id = data["data"]["id"];
                    me.store("deviceId", data["data"]["id"]);
                    console.log("Device created", data);
                    if (typeof callback === "function") {
                        callback(me.device_id);
                    }
                }
            }, true);
        } else {
            if (typeof callback === "function") {
                callback(me.device_id);
            }
        }
    },
    onSessionStart: function(callback) {
        var me = this;
        var language = this.wayfinder.languages[this.wayfinder.getLanguage()];
        if (language && language.getID() && this.wayfinder.getKiosk()) {
            WayfinderAPI.statistics.startSession(language.getID(), this.wayfinder.getKiosk(), this.wayfinder.options.application, this.wayfinder.getLayout(), this.device_id, function(data) {
                try {
                    if (data) me.session_id = data["data"];
                    if (typeof callback === "function") {
                        callback();
                    }
                } catch (e) {
                    console.log("Something went wrong sending startSession");
                }
            }, true);
        }
    },
    onSessionEnd: function() {
        var scope = this;
        if (this.session_id) {
            var language = this.wayfinder.languages[this.wayfinder.getLanguage()];
            WayfinderAPI.statistics.endSession(this.session_id, language.getID(), function() {
                scope.session_id = 0;
                console.log("Session ended!");
            }, true);
        }
    },
    onClick: function(location, type) {
        if (!this.session_id) {
            var scope = this;
            this.onSessionStart(function() {
                WayfinderAPI.statistics.click(location, scope.session_id, type, null, true);
            }, true);
        } else {
            WayfinderAPI.statistics.click(location, this.session_id, type, null, true);
        }
    },
    onLanguageChange: function(language) {},
    onSearch: function(searchstring, type) {
        if (!this.session_id) {
            this.onSessionStart(function() {
                WayfinderAPI.statistics.search(searchstring, this.session_id, type, null, true);
            });
        } else {
            WayfinderAPI.statistics.search(searchstring, this.session_id, type, null, true);
        }
    },
    checkStorage: function() {
        if (this.storageSupport) {
            this.deviceId = localStorage.getItem(this.storagePrefix + "deviceId");
        }
    },
    getTime: function() {},
    store: function(key, value) {
        if (this.storageSupport) {
            localStorage[this.storagePrefix + key] = JSON.stringify(value);
        }
    },
    isOnline: function() {}
});

var WayfinderMonitor = Class.extend({
    init: function(wayfinder, deviceId) {
        this.wayfinder = wayfinder;
        this.device_id = deviceId;
        this.socket = null;
    },
    start: function() {
        var scope = this;
        var protocol = location.protocol === "https:" ? "wss://" : "ws://";
        this.socket = new WebSocket(protocol + WayfinderAPI.LIVE_LOCATION + "monitor/" + this.wayfinder.options.project + "/" + this.device_id);
        this.socket.addEventListener("open", event => {
            console.log("connected");
        });
        this.socket.addEventListener("message", event => {
            console.log("Message from server ", event.data);
            var msg = JSON.parse(event.data);
            scope.actOnMessage(msg);
        });
        this.socket.addEventListener("ping", () => {
            console.log("ping");
            this.socket.send("pong");
        });
        this.socket.onclose = function(e) {
            console.log(e, new Date());
            console.log("Socket is closed. Reconnect will be attempted in 10 second.", e.reason);
            setTimeout(function() {
                scope.start();
            }, 1e4);
        };
        this.socket.onerror = function(err) {
            console.log(err);
            console.error("Socket encountered error: ", err.message, "Closing socket");
            scope.socket.close();
        };
        WayfinderAPI.kiosks.start(this.device_id, function(data) {});
    },
    reload: function() {
        this.socket.send("refreshing");
        if (URL && URLSearchParams) {
            var url = new URL(window.location.href);
            url.searchParams.set("wfcache", Date.now());
            window.location.replace(url);
        } else {
            window.location.reload();
        }
    },
    actOnMessage: function(msg) {
        var scope = this;
        if (msg) {
            switch (msg.type) {
              case "refresh":
                if (msg.delay && msg.delay === "now") {
                    this.reload();
                } else {
                    if (this.wayfinder.isRunning()) {
                        console.log("WFM: Waiting for map pause to refresh");
                        this.wayfinder.events.once("map-pause", function() {
                            console.log("WFM: Map paused. Refreshing in 3s");
                            setTimeout(function() {
                                scope.reload();
                            }, 3e3);
                        });
                    } else {
                        setTimeout(function() {
                            console.log("WFM: refreshing now");
                            scope.reload();
                        }, 1e3);
                    }
                }
                break;
            }
        }
    }
});

var WayfinderFactory2D = WayfinderFactory.extend({
    createOverlays: function(overlays) {
        if (overlays) {
            var poi_id, i;
            for (poi_id in overlays) {
                if (poi_id in this.wayfinder.pois) {
                    if (!this.wayfinder.overlays[poi_id]) this.wayfinder.overlays[poi_id] = [];
                    for (i in overlays[poi_id]) this.wayfinder.overlays[poi_id].push(new Overlay(this.wayfinder.pois[poi_id], overlays[poi_id][i], this.wayfinder.options.map2DRotation));
                }
            }
        }
    },
    addNode2DData: function(coordinates) {
        if (this.wayfinder.nodes) {
            for (var i in this.wayfinder.nodes) {
                var node = this.wayfinder.nodes[i];
                if (coordinates[node.floor_id]) {
                    var coordinate = coordinates[node.floor_id][node.id];
                    if (coordinate) {
                        node.setPosition2D(coordinate.x, coordinate.y);
                        node.setWeight(coordinate.weight);
                    }
                }
            }
        }
    },
    createEdges: function(edges) {
        if (edges) {
            for (var node_id in edges) {
                if (!(node_id in this.wayfinder.nodes)) continue;
                for (var i in edges[node_id]) {
                    if (!(edges[node_id][i] in this.wayfinder.nodes)) continue;
                    this.wayfinder.nodes[node_id].addNeighbour(this.wayfinder.nodes[edges[node_id][i]]);
                }
            }
        }
    },
    createNode: function(data) {
        return new NavigationNode2D(data);
    }
});

var Wayfinder2D = Wayfinder.extend({
    init: function(options) {
        if (!options || !(options instanceof Wayfinder2DOptions)) options = new Wayfinder2DOptions();
        this._super(options, new WayfinderFactory2D(this));
        this.logicName = "2d";
        this.logic = new WayfinderLogic2D(this, this.logicName);
        this.overlays = {};
        this.adImage = false;
        this.yahImage = false;
        this.paused = false;
        this.path = false;
        this.dehighlightOverlay = false;
    },
    onBundleData: function(result) {
        console.log("2D.onBundleData");
        this._super(result);
        this.logic.loadMapData();
    },
    isCanvasSupported: function() {
        var elem = document.createElement("canvas");
        return !!(elem.getContext && elem.getContext("2d"));
    },
    onPOIsLoaded: function(data) {
        this._super(data);
        Logistics.getMultiple({
            nodes_2d: {
                url: WayfinderAPI.getURL("2d", "nodes", []),
                type: "json"
            },
            overlays: {
                url: WayfinderAPI.getURL("2d", "overlays", []),
                type: "json"
            },
            location: {
                url: WayfinderAPI.getURL("building", "location", []),
                type: "json"
            },
            lodcount: {
                url: WayfinderAPI.getURL("2d", "lodcount", []),
                type: "json"
            },
            "ad-image": {
                url: "images/ad.png",
                type: "image"
            },
            "yah-image": {
                url: "images/yah.png",
                type: "image"
            }
        }, ClassCallback(this, this.on2DDataLoaded), {
            stage: "settings"
        });
        this.loadMapImages();
    },
    on2DDataLoaded: function(data) {
        console.log("on2DDataLoaded");
        var scope = this;
        var nodes = data["nodes_2d"]["data"];
        var overlays = data["overlays"]["data"];
        this.adImage = data["ad-image"];
        scope.yahImage = scope.settings.getInt("kiosk.you-are-here-image", 0) ? scope.settings.getInt("kiosk.you-are-here-image", 0) : data["yah-image"];
        this.options.maxLOD = parseInt(data["lodcount"]["data"] || 1);
        this.factory.addNode2DData(nodes);
        this.factory.createOverlays(overlays);
        this.map.update(true);
        this.onDataLoaded();
        if (typeof cbOnMapReady === "function") {
            this.cbOnMapReady();
        }
    },
    onDataLoaded: function() {
        this._super();
    },
    overrideOptions: function() {
        this.options.disableMap2DMovement = this.settings.getBoolean("camera.2d.disableMap2DMovement", false);
    },
    setupFloor: function() {
        var floor = false;
        if (this.getKioskNode() && this.getKioskNode().floor) {
            floor = this.getKioskNode().floor;
        } else {
            var maxIndex = 0;
            for (var j in this.building.getFloors()) {
                floor = this.building.getFloors()[j];
                if (floor.index >= maxIndex) {
                    maxIndex = floor.index;
                }
            }
        }
        if (floor) {
            this.showFloor(floor);
        }
    },
    setDehighlightOverlay: function(val) {
        this.dehighlightOverlay = !!val;
    },
    fitMultiplePOIsInView: function(pois, maxZoom) {
        this.logic.fitMultiplePOIsInView(pois, maxZoom);
    }
});

var WayfinderLogic2D = WayfinderLogic.extend({
    init: function(wayfinder, name) {
        this._super(wayfinder, name);
        this.map = wayfinder.map;
        this.currentFloor = false;
        this.factory = new WayfinderFactory2D(this.wayfinder);
    },
    cbOnZoomChange: function() {
        this.events.trigger("zoom-change");
    },
    loadMapData: function() {
        Logistics.getJSON(WayfinderAPI["2d"].pack.url(), null, ClassCallback(this, this.onMapData), {
            stage: "map"
        });
    },
    onMapData: function(result) {
        var scope = this;
        var data = result.data;
        this.factory.addNode2DData(data.nodes);
        this.factory.createOverlays(data.overlays);
        var yahSetting = this.wayfinder.settings.getInt("kiosk.you-are-here-image", 0);
        var yahImage = yahSetting !== 0 ? WayfinderAPI.getURL("images", "getLarge", [ yahSetting ]) : "images/yah.png";
        Logistics.getImage(yahImage, function(img, b) {
            scope.wayfinder.yahImage = img;
        });
        this.wayfinder.options.pathZoomPadding = this.wayfinder.settings.getInt("path.2d.padding", this.wayfinder.options.pathZoomPadding);
        this.wayfinder.options.maxLOD = Math.max(this.wayfinder.options.maxLOD, parseInt(data["lodcount"] || 1));
        this.setup();
        this.loadMapImages();
        this.wayfinder.resize();
        this.wayfinder.events.trigger("map-ready");
        this.loadPOIIcons();
        this.onDataLoaded();
        this.wayfinder.map.start();
        this.wayfinder.map.update(true);
        this.showKiosk();
        var progressTimer = null;
        this.wayfinder.events.on("data-stage-progress", function(stage, progress) {
            clearTimeout(progressTimer);
            progressTimer = setTimeout(function() {
                scope.wayfinder.map.update(true);
            }, 500);
        });
        if (typeof this.wayfinder.cbOnMapReady === "function") this.wayfinder.cbOnMapReady();
    },
    onDataLoaded: function() {
        this._super();
        if (this.wayfinder.getCurrentFloor()) {
            if (!this.wayfinder.settings.getBoolean("camera.2d.disablezooming", false)) {
                var floor = this.wayfinder.building.getFloors()[this.wayfinder.getCurrentFloor().id];
                if (typeof floor === "object") {
                    this.map.fitMultiplePOIsInView(floor.pois);
                }
            } else this.showKiosk();
        }
    },
    setup: function() {
        this.map = new Map2D(this.wayfinder);
        this.wayfinder.map = this.map;
        this.map.setup();
        this.map.onPOIClick = ClassCallback(this.wayfinder, this.wayfinder.onPOIClick);
        var scope = this;
        this.map.getTransformer().cbOnZoomChange = function() {
            scope.wayfinder.events.trigger("zoom-change");
        };
    },
    loadMapImages: function() {
        var scope = this;
        var floor;
        var setImage = function(image, status, dt) {
            scope.wayfinder.map.addLODImage(dt.params.floor_id, 0, 0, 0, image);
        };
        for (var i in this.wayfinder.building.getFloors()) {
            floor = this.wayfinder.building.getFloors()[i];
            Logistics.getImage(WayfinderAPI.getURL("2d", "image", [ floor.id ]), {
                floor_id: floor.id
            }, setImage, {
                stage: "floors"
            });
        }
    },
    setDefaultView: function(zoom) {
        if (this.wayfinder.pathComponent) {
            this.wayfinder.pathComponent.clearPath();
        }
        this.setKioskView(zoom);
    },
    setKioskView: function(zoom) {},
    setNodeView: function(node, zoom, rotate) {},
    showPath: function(sourceNode, endNode, poi, _options, callback) {
        if (!sourceNode || !endNode) return;
        var pathFinder = new PathFinder2D(this.wayfinder.nodes);
        var options = {
            displayDestinationOnStart: _options && _options.displayDestinationOnStart ? true : false,
            ignoreTypes: _options && _options.ignoreTypes ? _options.ignoreTypes : []
        };
        this.path = pathFinder.find(sourceNode.id, endNode.id, options);
        if (this.path === false) return;
        var scope = this;
        if (!(this.wayfinder.settings.getBoolean("camera.2d.disableMap2DMovement", false) || this.wayfinder.settings.getBoolean("camera.2d.disableZooming", false))) {
            this.wayfinder.map.fitPathInView(this.path);
        }
        this.wayfinder.map.pathRenderer.reset();
        this.wayfinder.showFloor(sourceNode.floor);
        this.wayfinder.map.redraw();
        this.wayfinder.map.pathRenderer.setPath(this.path, function() {
            if (poi) {
                scope.clearHighlights();
                scope.clearDisplaying();
                scope.setHighlights([ poi ]);
                scope.setDisplaying([ poi ]);
            }
            scope.wayfinder.map.redraw();
            scope.wayfinder.events.trigger("path-finished", scope.path, endNode, poi);
            if (typeof callback == "function") {
                callback(scope.path, endNode, poi);
            }
        });
        return this.path;
    },
    findPath: function(fromNode, toNode) {
        if (!fromNode || !toNode) return;
        var pathFinder = new PathFinder2D(this.wayfinder.nodes);
        var path = pathFinder.find(fromNode.id, toNode.id);
        return path;
    },
    updatePath: function(startNode, endNode, poi) {
        if (this.wayfinder.getKiosk() === false || endNode === false) return;
        var pathFinder = new PathFinder2D(this.wayfinder.nodes);
        this.path = pathFinder.find(startNode.id, endNode.id);
        if (this.path === false) {
            console.log("updatePath", "No path found", startNode, endNode);
            return;
        }
        var scope = this;
        this.map.pathRenderer.reset();
        this.map.redraw();
        this.map.pathRenderer.updatePath(this.path, function() {
            if (poi) {
                scope.clearHighlights();
                scope.setHighlights([ poi ]);
            }
            scope.map.redraw();
            scope.wayfinder.events.trigger("path-finished", scope.path, endNode, poi);
        });
        return this.path;
    },
    getNearestPOI: function(source, pois) {
        var _pois = this.getNearestPOIs(this.wayfinder.nodes[source], pois);
        if (Array.isArray(_pois) && _pois.length > 0) {
            return _pois[0];
        }
        return null;
    },
    getNearestPOIs: function(source, pois, radius) {
        var pathFinder = new PathFinder2D(this.wayfinder.nodes);
        var path, poi, _dist;
        var _pois = [];
        var _radius = radius ? radius : Infinity;
        for (var i = 0, len = pois.length; i < len; i++) {
            poi = pois[i];
            if (poi && poi.node && poi.node.position2d) {
                if (radius && vec2.dist(source.position2d, poi.node.position2d) >= _radius) {
                    continue;
                }
                path = pathFinder.find(source.id, poi.node.id);
                if (path) {
                    _dist = path.getDistance();
                    if (_radius >= _dist) {
                        _pois.push({
                            dist: _dist,
                            poi: poi
                        });
                    }
                } else {
                    console.log("No path for", poi);
                }
            }
        }
        _pois = _pois.sort(function(a, b) {
            return a.dist - b.dist;
        });
        _pois = _pois.map(function(item) {
            return item.poi;
        });
        return _pois;
    },
    resize: function() {
        if (this.map) {
            var scale = 1;
            if (this.wayfinder.paused) {
                this.wayfinder.run();
            }
            if (this.wayfinder.options.upscale > 0) {
                var context = this.map.renderer.context;
                var devicePixelRatio = window.devicePixelRatio || 1;
                var backingStoreRatio = this.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
                scale = Math.max(this.wayfinder.options.upscale, Math.round(devicePixelRatio / backingStoreRatio * 100) / 100);
            }
            var canvas = this.getCanvas();
            var style = window.getComputedStyle(canvas.parentNode, null);
            this.map.resize(canvas, parseInt(style.width), parseInt(style.height), scale);
            this.map.update(true);
        }
    },
    setZoom: function(percentage) {
        this.map.setZoom(percentage);
        this.map.update(true);
    },
    zoomIn: function() {
        this.map.zoomIn();
        this.map.update(true);
    },
    zoomOut: function() {
        this.map.zoomOut();
        this.map.update(true);
    },
    setHighlights: function(pois) {
        this.map.setHighlights(pois);
        this.map.update(true);
    },
    clearHighlights: function() {
        this.map.clearHighlights();
        this.map.update(true);
    },
    clearDisplaying: function() {
        this.map.clearDisplaying();
        this.map.update(true);
    },
    setDisplaying: function(pois) {
        this.map.setDisplaying(pois);
        this.map.update(true);
    },
    showFloor: function() {
        if (this.wayfinder.map) {
            this.wayfinder.map.update(true);
        }
    },
    showKiosk: function() {
        if (this.wayfinder.getKiosk() === false) return;
        this.wayfinder.map.pathRenderer.reset();
        this.wayfinder.showFloor(this.wayfinder.getKioskNode().floor);
        var floor = this.wayfinder.getCurrentFloor();
        if (floor) {
            if (this.wayfinder.settings.getBoolean("kiosk.view.fit-floor-pois", false)) {
                this.wayfinder.map.fitMultiplePOIsInView(this.wayfinder.building.getFloors()[floor.id].pois);
            } else {
                var defaultZoom = this.wayfinder.settings.getFloat("kiosk.2d.default-zoom", 0);
                this.setZoom(defaultZoom);
                this.wayfinder.map.center();
            }
        }
        this.wayfinder.map.redraw();
    },
    clearPath: function() {
        this.map.pathRenderer.clearPath();
        this.map.pathRenderer.reset();
        this.map.update(true);
    },
    setLanguage: function(language) {
        this._super(language);
        this.map.update(true);
    },
    findNearestNodeOnFloor: function(floor, position, hasNeighbours) {
        return this.map.findNearestNodeOnFloor(floor, position, hasNeighbours);
    },
    pause: function() {
        this.wayfinder.paused = true;
        this.wayfinder.events.trigger("map-pause");
    },
    run: function() {
        this.wayfinder.paused = false;
        this.wayfinder.events.trigger("map-run");
    },
    isRunning: function() {
        return !this.paused;
    },
    onVisibilityChange: function() {
        if (typeof document !== "undefined" && document.hidden) {
            this.pause();
        } else {
            this.run();
        }
    },
    getScreenPosition: function(poi) {
        return this.map.getPOIOverlayLocationOnMap(poi);
    },
    update: function(full) {
        if (this.map) {
            this.map.update(full);
        }
    },
    switchCanvas: function(element) {
        this.wayfinder.maps[this.name].canvas = element;
        this.map.updateCanvas(element);
        this.resize();
        this.map.update(true);
    },
    showPathFromPOIToPOI: function(from, to) {
        if (typeof from !== "object" || typeof to !== "object") return;
        var pathFinder = new PathFinder2D(this.wayfinder.nodes);
        this.wayfinder.path = pathFinder.find(from.node.id, to.node.id);
        if (this.wayfinder.path === false) return;
        var scope = this;
        if (!(this.wayfinder.settings.getBoolean("camera.2d.disableMap2DMovement", false) || this.wayfinder.settings.getBoolean("camera.2d.disableZooming", false))) {
            this.map.fitPathInView(this.wayfinder.path);
        }
        this.wayfinder.map.pathRenderer.reset();
        this.wayfinder.setCurrentFloor(from.node.floor);
        this.wayfinder.map.redraw();
        this.wayfinder.map.pathRenderer.setPath(this.wayfinder.path, function() {
            if (to) {
                scope.clearHighlights();
                scope.clearDisplaying();
                scope.setHighlights([ to ]);
                scope.setDisplaying([ to ]);
            }
            scope.wayfinder.map.redraw();
            scope.wayfinder.events.trigger("path-finished", scope.path, to.node, to);
        });
        return this.wayfinder.path;
    },
    onLocationChange: function(location) {
        var node = this.wayfinder.findNearestNodeOnFloor(location.floor, location.location, true);
        var nodeTypes = "stairs, elevator, elevator";
        var path = this.path;
        console.log("cbOnLocationChange", location, node, path);
        if (node) {
            this.wayfinder.setKiosk(node.id);
            if (path && path.nodes.length > 0 && !this.map.pathRenderer.animating) {
                this.updatePath(this.wayfinder.getKioskNode(), path.nodes[path.nodes.length - 1]);
                var _nearest = this.getNearestPOIs(node, this.wayfinder.getCurrentFloor().pois, 125);
                if (_nearest && _nearest.length > 0) {
                    var p;
                    var pos;
                    var nextPos;
                    for (var j = 0, len = _nearest.length; j < len; j++) {
                        p = _nearest[j];
                        if (nodeTypes.indexOf(p.node.type) > -1) {
                            pos = path.nodes.indexOf(p.node);
                            if (path.nodes.length > pos) {
                                nextPos = path.nodes[pos + 1];
                            }
                        }
                    }
                }
            }
            this.map.update(true);
            this.wayfinder.events.trigger("location-change", location);
        }
    },
    pathToText: function(path) {
        var pf = new Pathfinder2D(this.wayfinder.nodes);
        var result = pf.pathToText(path);
        return this.textPathSimplification(result);
    },
    fitMultiplePOIsInView: function(pois, maxZoom) {
        this.wayfinder.map.fitMultiplePOIsInView(pois, maxZoom);
    }
});

var Wayfinder2DOptions = WayfinderOptions.extend({
    init: function() {
        this._super();
        this.pathDisplayInstructions = false;
        this.pathZoomPadding = 50;
        this.pathColor = "rgba(255,0,0,0.8)";
        this.pathPauseTime = 2e3;
        this.pathSpotRadius = 3;
        this.pathStride = 10;
        this.pathSpeed = 60;
        this.poiColor = "rgba(100,100,100,0.5)";
        this.poiRadius = 5;
        this.mapSize = [ 1024, 1024 ];
        this.forceFullMapUpdate = false;
        this.enableLOD = true;
        this.maxLOD = 2;
        this.enableUserLocation = true;
        this.overlayHighlightColor = "#ff0000dd";
        this.mapPadding = .1;
        this.enableUserYAHSetting = false;
        this.application = "2D";
        this.pathZoomIn = false;
        this.poi2DTitlePadding = 12;
        this.path2DMessageSize = 16;
        this.map2DRotation = 0;
        this.disableMap2DMovement = false;
        this.debug = false;
        this.debugBeacons = false;
        this.debugMouseLocation = false;
        this.upscale = 1;
        this.yahRotation = 0;
        this.poi2DTitleWeight = "normal";
    }
});

var NavigationNode2D = NavigationNode.extend({
    init: function(nodeData) {
        this._super(nodeData);
        this.position2d = false;
        this.weight = false;
        this.neighbours = [];
    },
    setPosition2D: function(x, y) {
        this.position2d = vec2.fromValues(parseFloat(x), parseFloat(y));
    },
    setWeight: function(weight) {
        this.weight = parseFloat(weight);
    },
    addNeighbour: function(node) {
        if (node instanceof NavigationNode2D) this.neighbours.push(node);
    }
});

var Overlay = Class.extend({
    init: function(poi, overlayData, rotate) {
        this.visible = overlayData["visible"] == "1" ? true : false;
        this.polygon = this.createPolygon(overlayData["polygon"]);
        this.poi = poi;
        this.rotate = rotate ? rotate : 0;
        this.bounds = this.calculateBounds(this.polygon, 0);
        this.longestEdge = this.findLongestEdge(this.polygon);
    },
    createPolygon: function(data) {
        var polygon = [];
        if (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i] && data[i].x && data[i].y) {
                    polygon.push(vec2.fromValues(data[i].x, data[i].y));
                }
            }
        }
        return polygon;
    },
    contains: function(pt) {
        var i, j;
        var c = false;
        if (this.bounds[0] <= pt[0] && pt[0] <= this.bounds[0] + this.bounds[2] && pt[1] >= this.bounds[1] && pt[1] <= this.bounds[1] + this.bounds[3]) {
            for (i = 0, j = this.polygon.length - 1; i < this.polygon.length; j = i++) {
                if (this.polygon[i][1] > pt[1] != this.polygon[j][1] > pt[1] && pt[0] < (this.polygon[j][0] - this.polygon[i][0]) * (pt[1] - this.polygon[i][1]) / (this.polygon[j][1] - this.polygon[i][1]) + this.polygon[i][0]) c = !c;
            }
        }
        return c;
    },
    calculateBounds: function(polygon, rotation) {
        if (!polygon) return false;
        var minX = Infinity;
        var minY = Infinity;
        var maxX = -Infinity;
        var maxY = -Infinity;
        var point;
        for (var i = 0; i < polygon.length; i++) {
            point = polygon[i];
            if (rotation) {
                point = this.rotatePoint(point, rotation);
            }
            minX = Math.min(minX, point[0]);
            minY = Math.min(minY, point[1]);
            maxX = Math.max(maxX, point[0]);
            maxY = Math.max(maxY, point[1]);
        }
        point = this.rotatePoint(vec2.fromValues(minX, minY), -rotation);
        return [ point[0], point[1], maxX - minX, maxY - minY, maxX, maxY ];
    },
    calculateArea: function(points) {
        var area = 0, i, j, point1, point2;
        for (i = 0, j = points.length - 1; i < points.length; j = i, i++) {
            point1 = points[i];
            point2 = points[j];
            area += point1[0] * point2[1];
            area -= point1[1] * point2[0];
        }
        area /= 2;
        return area;
    },
    calculateCenter: function(points) {
        var total = vec2.create();
        for (var i = 0; i < points.length; i++) {
            vec2.add(total, total, points[i]);
        }
        return vec2.divide(total, total, vec2.fromValues(points.length, points.length));
    },
    findLongestEdge: function(poly, options) {
        var longest = null;
        var longestObj = null;
        var longestLength = -Infinity;
        var tempLen;
        poly.push(poly[0]);
        simplPoly = this.simplifyPoly(poly, .1);
        for (var j = 0; j < simplPoly.length - 1; j++) {
            tempLen = Math.abs(vec2.distance(simplPoly[j], simplPoly[j + 1]));
            if (tempLen > longestLength) {
                longest = [ simplPoly[j], simplPoly[j + 1] ];
                longestLength = tempLen;
            }
        }
        if (longest && longestLength > 1) {
            var deltaX = longest[0][0] < longest[1][0] ? longest[1][0] - longest[0][0] : longest[0][0] - longest[1][0];
            var deltaY = longest[0][0] < longest[1][0] ? longest[1][1] - longest[0][1] : longest[0][1] - longest[1][1];
            angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            var _center = [ (this.bounds[0] + this.bounds[4]) / 2, (this.bounds[1] + this.bounds[5]) / 2 ];
            var midpoint = vec2.add(vec2.create(), longest[0], longest[1]);
            vec2.scale(midpoint, midpoint, .5);
            var cmid = vec2.sub(vec2.create(), _center, midpoint);
            vec2.normalize(cmid, cmid);
            var dir = 0;
            var cw = angle < 45 || angle > 225;
            var horizontal = Math.abs(angle) > 135 && Math.abs(angle) < 225 || Math.abs(angle) < 45;
            var left = cmid[0] < 0;
            var top = cmid[1] < 0;
            if (cw && top && horizontal) {
                dir = 180;
            } else if (cw && left && !horizontal) {
                dir = 180;
            } else if (!cw && !left && !horizontal) {
                dir = 180;
            }
            var innerBounds = this.findInnerBounds(simplPoly, longest, dir - angle, Math.min(this.bounds[2], this.bounds[3]), midpoint);
            var center = vec2.create();
            vec2.add(center, innerBounds[1], innerBounds[0]);
            vec2.scale(center, center, .5);
            if (angle < 0) {}
            if (Math.abs(angle) < 10 && Math.abs(angle) > 0) {
                angle = 0;
            }
            if (angle < 180 && angle > 170) {
                angle = 0;
            }
            if (Math.abs(angle) > 80 && Math.abs(angle) < 100) {
                angle = -90;
            }
            return longestObj = {
                width: Math.abs(innerBounds[0][0] - innerBounds[1][0]),
                height: Math.abs(innerBounds[0][1] - innerBounds[1][1]),
                rotateWidth: innerBounds[2],
                rotateHeight: innerBounds[3],
                edge: innerBounds,
                center: center,
                angle: -(angle % 180) * (Math.PI / 180),
                bounds: this.bounds,
                longest: longest
            };
        }
        return longestObj;
    },
    simplifyPoly: function(points, angle) {
        var prevPoint = points[0], newPoints = [ prevPoint ], point;
        var a = vec2.create();
        var b = vec2.create();
        var _angle;
        for (var i = 1, len = points.length; i < len - 1; i++) {
            point = points[i];
            a = vec2.sub(a, prevPoint, point);
            b = vec2.sub(b, point, points[i + 1]);
            _angle = Math.abs(Math.atan2(a[0] * b[1] - a[1] * b[0], a[0] * b[0] + a[1] * b[1]));
            if (_angle >= Math.PI) {
                _angle = Math.abs(_angle / (Math.PI / 2) - parseInt(_angle / (Math.PI / 2))) * (Math.PI / 2);
            }
            if (_angle > angle) {
                newPoints.push(point);
                prevPoint = point;
            }
        }
        newPoints.push(points[points.length - 1]);
        return newPoints;
    },
    findInnerBounds: function(_poly, edge, angle, maxDist, _midpoint) {
        var debug = this.poi.getName("en") == "KEI";
        var scope = this;
        angle = angle * (Math.PI / 180);
        var first = edge[0][0] < edge[1][0] ? edge[0].slice() : edge[1].slice();
        var second = edge[0][0] < edge[1][0] ? edge[1].slice() : edge[0].slice();
        var origin = first.slice();
        second = this.rotatePoint(second, angle, origin);
        second[1] += maxDist;
        var poly = this.rotatePoly(_poly.slice(), angle, origin);
        var minX = Math.min(first[0], second[0]);
        var minY = Math.min(first[1], second[1]);
        var maxX = Math.max(first[0], second[0]);
        var maxY = 0;
        if (debug) console.log(this.poi.getName("en"), "newPoly", this.polyToString(poly), "minmax", this.polyToString([ [ minX, minY ], [ maxX, maxY ] ]));
        var heightGram = {};
        var _p, _p2;
        var rx, rx2, ydiff;
        function setHeight(rx, y) {
            if (y > minY) {
                if (!heightGram[rx]) heightGram[rx] = Infinity;
                heightGram[rx] = Math.min(heightGram[rx], y - minY);
            }
        }
        if (poly.length > 4) {
            var DECI = Math.ceil(100 / (maxX - minX));
            for (var p = 0; p < poly.length - 1; p++) {
                _p = poly[p];
                _p2 = poly[p + 1];
                if (_p[1] <= minY) {
                    minX = Math.min(minX, _p[0]);
                    maxX = Math.max(maxX, _p[0]);
                }
                if (_p[1] >= minY) {
                    maxY = Math.max(maxY, _p[1]);
                    rx = Math.floor(_p[0] * DECI);
                    rx2 = Math.floor(_p2[0] * DECI);
                    setHeight(rx, _p[1]);
                    if (Math.abs(rx2 - rx) > 1) {
                        ydiff = _p2[1] - _p[1];
                        if (debug) console.log(this.poi.getName("en"), "gap", rx, rx2, ydiff, rx2 - rx);
                        var i = 0;
                        var y = rx < rx2 ? _p[1] : _p2[1];
                        for (var nk = Math.min(rx, rx2) + 1; nk < Math.max(rx, rx2); nk++) {
                            setHeight(nk, y + ++i * (ydiff / (rx2 - rx)));
                        }
                    } else {
                        if (debug) console.log(this.poi.getName("en"), "no gap?", rx, rx2, rx2 - rx);
                    }
                }
            }
            var lastVal = 0;
            var maxLen = 0, curLen = 0, lastX = -Infinity;
            var last = false;
            var maxAreaX = -Infinity;
            var minXX = minX;
            var maxXX, maxYY;
            var maxArea = 0;
            for (var i = Math.floor(minX * DECI); i <= Math.floor(maxX * DECI); i++) {
                if (heightGram[i]) {
                    maxLen = 0;
                    curLen = 0;
                    lastVal = 0;
                    last = false;
                    for (var j = Math.floor(minX * DECI); j <= Math.floor(maxX * DECI); j++) {
                        if (heightGram[j]) {
                            lastVal = heightGram[j];
                        }
                        if (lastVal >= heightGram[i]) {
                            if (!last) {
                                lastX = j;
                            }
                            curLen++;
                            last = true;
                        } else {
                            if (curLen >= maxLen) {
                                maxLen = curLen / DECI;
                                maxAreaX = lastX / DECI;
                            }
                            last = false;
                            curLen = 0;
                        }
                    }
                    if (maxLen == 0 && curLen > 0 && lastX != -Infinity) {
                        maxLen = curLen / DECI;
                        maxAreaX = lastX / DECI;
                    }
                    if (maxLen > 0 && maxLen * heightGram[i] > maxArea) {
                        maxArea = maxLen * heightGram[i];
                        minXX = maxAreaX;
                        maxXX = maxAreaX + maxLen;
                        maxYY = heightGram[i];
                    }
                }
            }
            if (maxArea > 0) {
                minX = minXX;
                maxX = maxXX;
                maxY = minY + maxYY;
            } else {
                console.log(this.poi.getName("en"), "no max area", maxArea, minXX, maxXX, maxYY);
            }
            if (debug) {
                console.log(this.poi.getName("en"), "heightGram", this.polyToString(Object.entries(heightGram).map((i, v) => [ parseInt(i[0]) / DECI, minY + i[1] ])));
                console.log(this.poi.getName("en"), "area", maxArea, minXX, maxXX, maxYY);
            }
        }
        return [ this.rotatePoint([ minX, minY ], -angle, origin), this.rotatePoint([ maxX, maxY ], -angle, origin), Math.abs(maxX - minX), Math.abs(maxY - minY) ];
    },
    polyToString: function(poly) {
        var str = "";
        for (p in poly) {
            str += "(" + poly[p][0] + ", " + poly[p][1] + "),";
        }
        return str;
    },
    isPointBetween: function(p, a, b) {
        return (a.x <= p.x && p.x <= b.x || a.x >= p.x && p.x >= b.x) && (a.y <= p.y && p.y <= b.y || a.y >= p.y && p.y >= b.y);
    },
    rotatePoint: function(p, alpha, origin) {
        var cosAlpha, sinAlpha, xshifted, yshifted;
        if (origin == null) {
            origin = [ 0, 0 ];
        }
        xshifted = p[0] - origin[0];
        yshifted = p[1] - origin[1];
        cosAlpha = Math.cos(alpha);
        sinAlpha = Math.sin(alpha);
        var x = cosAlpha * xshifted - sinAlpha * yshifted + origin[0];
        var y = sinAlpha * xshifted + cosAlpha * yshifted + origin[1];
        return vec2.fromValues(x, Math.floor(y * 1e7) / 1e7);
    },
    rotatePoly: function(poly, alpha, origin) {
        var j, len, results;
        results = [];
        for (j = 0, len = poly.length; j < len; j++) {
            results.push(this.rotatePoint(poly[j], alpha, origin));
        }
        return results;
    },
    rotateVector: function(vec, ang) {
        ang = -ang * (Math.PI / 180);
        var cos = Math.cos(ang);
        var sin = Math.sin(ang);
        return vec2.fromValues(Math.round(1e4 * (vec[0] * cos - vec[1] * sin)) / 1e4, Math.round(1e4 * (vec[0] * sin + vec[1] * cos)) / 1e4);
    },
    getOrientation: function(p1, p2, p) {
        var orin = (p2[0] - p1[0]) * (p[1] - p1[1]) - (p[0] - p1[0]) * (p2[1] - p1[1]);
        if (orin > 0) return -1;
        if (orin < 0) return 1;
        return 0;
    },
    getBounds: function() {
        return this.bounds;
    },
    getRotatedAreaBounds: function() {
        return this.rotatedAreaBounds;
    }
});

var Renderer2D = Class.extend({
    init: function(renderQueue) {
        this.wayfinder = false;
        this.context = false;
        this.enabled = true;
        this.damaged = true;
        this.renderQueue = renderQueue;
        this.parent = false;
    },
    onAdd: function() {},
    enable: function() {
        this.enabled = true;
    },
    disable: function() {
        this.enabled = false;
    },
    damage: function() {
        if (this.parent) {
            this.parent.damage(this);
        }
    },
    undamage: function() {
        this.damaged = false;
    },
    setContext: function(context) {
        this.context = context;
    },
    setWayfinder: function(wayfinder) {
        this.wayfinder = wayfinder;
    },
    setParent: function(parent) {
        this.parent = parent;
    },
    render: function(rect) {}
});

var FloorRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(1);
        this.lod = 0;
        this.debugPoint = vec2.create();
        this.mapImages = [];
    },
    setLOD: function(lod) {
        this.lod = lod;
    },
    getLOD: function() {
        return lod;
    },
    getRequiredTiles: function(rect) {
        var tiles = [];
        var splitTo = Math.pow(2, this.lod);
        var width = this.wayfinder.options.mapSize[0] / splitTo;
        var height = this.wayfinder.options.mapSize[1] / splitTo;
        for (var x = 0; x < splitTo; x++) {
            for (var y = 0; y < splitTo; y++) {
                var r = new Rectangle(x * width, y * height, width, height);
                if (rect.intersects(r)) tiles.push(vec2.fromValues(x, y));
            }
        }
        return tiles;
    },
    clear: function() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    },
    renderDefault: function() {
        this.clear();
        var T = this.wayfinder.map.getTransformer();
        var image = this.wayfinder.map.getCurrentLOD(0, 0, 0);
        if (!image) return;
        this.context.save();
        this.context.translate(T.getViewWidth() / 2, T.getViewHeight() / 2);
        this.context.rotate(this.wayfinder.options.map2DRotation * Math.PI / 180);
        this.context.translate(-T.getViewWidth() / 2, -T.getViewHeight() / 2);
        this.context.translate(T.getZoomedMapPosition()[0], T.getZoomedMapPosition()[1]);
        this.context.scale(T.getZoom(), T.getZoom());
        this.context.drawImage(image, 0, 0);
        this.context.restore();
    },
    renderTile: function(tile) {
        if (tile.image === false) return;
        var T = this.wayfinder.map.getTransformer();
        var splitTo = Math.pow(2, this.lod);
        var width = this.wayfinder.options.mapSize[0] / splitTo;
        var height = this.wayfinder.options.mapSize[1] / splitTo;
        this.context.save();
        this.context.translate(T.getViewWidth() / 2, T.getViewHeight() / 2);
        this.context.rotate(this.wayfinder.options.map2DRotation * Math.PI / 180);
        this.context.translate(-T.getViewWidth() / 2, -T.getViewHeight() / 2);
        this.context.translate(T.getZoomedMapPosition()[0], T.getZoomedMapPosition()[1]);
        this.context.drawImage(tile.image, tile.x * width * T.getZoom(), tile.y * height * T.getZoom(), width * T.getZoom(), height * T.getZoom());
        this.context.restore();
    },
    render: function(rect) {
        if (!this.wayfinder.getCurrentFloor()) {
            return;
        }
        var T = this.wayfinder.map.getTransformer();
        if (this.lod === 0 || !this.wayfinder.options.enableLOD) {
            this.renderDefault();
        } else {
            var tiles = [];
            var i;
            var requiredTiles = this.getRequiredTiles(rect);
            var fallbackNeeded = false;
            for (i = 0; i < requiredTiles.length; i++) {
                var tile = this.wayfinder.map.getCurrentLOD(this.lod, requiredTiles[i][0], requiredTiles[i][1]);
                tiles.push({
                    x: requiredTiles[i][0],
                    y: requiredTiles[i][1],
                    image: tile
                });
                if (tile === false) {
                    fallbackNeeded = true;
                }
            }
            if (fallbackNeeded) {
                return this.renderDefault();
            }
            this.clear();
            for (i = 0; i < requiredTiles.length; i++) {
                this.renderTile(tiles[i]);
            }
        }
        if (this.wayfinder.options.debugMouseLocation) {
            this.context.save();
            var pt = T.transformPoint(this.debugPoint);
            this.context.beginPath();
            this.context.fillStyle = "rgba(255,0,0,0.7)";
            this.context.arc(pt[0], pt[1], 5, 0, Math.PI * 2, true);
            this.context.closePath();
            this.context.fill();
            this.context.restore();
        }
    }
});

var POIsRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(4);
    },
    onAdd: function() {
        this.overlayColor = this.wayfinder.settings.getColor("poi.2d.overlay.color", this.wayfinder.options.overlayHighlightColor);
        this.drawAlwaysNames = this.wayfinder.settings.getBoolean("poi.2d.display-names-always", false);
        this.overlayColorFromGroup = this.wayfinder.settings.getBoolean("poi.2d.overlay-group-color", false);
        this.nameBackgroundColor = this.wayfinder.settings.getColor("poi.2d.name.background-color", "#ffffff");
        this.nameFontSize = this.wayfinder.settings.getInt("poi.2d.name.font-size", 12);
        this.nameFontFamily = this.wayfinder.settings.get("poi.text.font-family", "Arial");
        this.displayRoomID = this.wayfinder.settings.get("poi.2d.name.display-room-id", true);
        this.fontPadding = this.wayfinder.settings.getInt("poi.2d.name.padding", this.wayfinder.options.poi2DTitlePadding);
        this.drawSpot = this.wayfinder.settings.getBoolean("poi.2d.display-node-dot", false);
        this.dehighlightOverlayColor = this.wayfinder.settings.getColor("poi.dehighlight.overlay_color", "#000000CC");
    },
    render: function(rect) {
        var floor = this.wayfinder.map.getCurrentFloor();
        var scope = this;
        var showOnlyName = this.wayfinder.settings.getBoolean("poi.map.only-text", false);
        if (!floor) return;
        if (!floor.nodes) return;
        var T = this.wayfinder.map.getTransformer();
        function renderPOI(poi, pt) {
            if (typeof poi !== "object") return false;
            var hideAlways = false;
            if (poi.alwaysVisible && poi.id in scope.wayfinder.overlays && !scope.isPOIinHighlights(poi)) {
                var overlay = scope.wayfinder.overlays[poi.id];
                if (overlay && 0 < overlay.length) {
                    for (var o in overlay) {
                        if (scope.sameOverlay(overlay[o], poi)) {
                            hideAlways = true;
                            break;
                        }
                    }
                }
            }
            if (poi.getAdvertisements().length > 0) {
                hasAd = true;
                return;
            }
            showOnlyName = scope.wayfinder.settings.getBoolean("poi.map.only-text", false, poi);
            if (poi.alwaysVisible && !hideAlways || scope.isPOIinDisplaying(poi)) {
                if (showOnlyName && poi.showInMenu) {
                    scope.renderPOIName(poi, pt);
                } else if (poi.image_id !== 0 && !showOnlyName) {
                    scope.renderPOIIcon(poi, pt);
                } else if (poi.hasName(scope.wayfinder.getLanguage())) {
                    scope.renderPOIName(poi, pt);
                }
            }
        }
        var later = [];
        this.context.save();
        for (var i = 0; i < floor.nodes.length; i++) {
            if (floor.nodes[i].pois.length === 0) continue;
            var has_overlay = false;
            var hasAd = false;
            var pt = T.transformPoint(floor.nodes[i].position2d);
            var poi = false;
            if (pt[0] >= 0 && pt[0] <= T.getViewWidth() && pt[1] >= 0 && pt[1] <= T.getViewHeight()) {
                for (var j = 0; j < floor.nodes[i].pois.length; j++) {
                    poi = floor.nodes[i].pois[j];
                    if (this.isPOIinDisplaying(poi) || this.isPOIinHighlights(poi)) {
                        later.push({
                            poi: poi,
                            pt: pt
                        });
                    } else {
                        renderPOI(poi, pt);
                    }
                }
                if (!has_overlay && !poi.showInMenu && this.drawSpot) {
                    this.context.beginPath();
                    this.context.fillStyle = this.wayfinder.options.poiColor;
                    this.context.arc(pt[0], pt[1], this.wayfinder.options.poiRadius, 0, Math.PI * 2, true);
                    this.context.closePath();
                    this.context.fill();
                }
                if (this.wayfinder.adImage && hasAd) {
                    this.context.drawImage(this.wayfinder.adImage, pt[0] - this.wayfinder.options.poiRadius * 1.5, pt[1] - this.wayfinder.options.poiRadius * 1.5, this.wayfinder.options.poiRadius * 3, this.wayfinder.options.poiRadius * 3);
                }
            }
        }
        if (this.wayfinder.dehighlightOverlay) {
            this.context.fillStyle = this.dehighlightOverlayColor;
            this.context.fillRect(0, 0, T.getViewWidth(), T.getViewHeight());
        }
        for (var l = 0; l < later.length; l++) {
            renderPOI(later[l].poi, later[l].pt);
        }
        this.context.restore();
    },
    isPOIinHighlights: function(poi) {
        if (!poi) return false;
        for (var i in this.wayfinder.map.highlights) {
            if (this.wayfinder.map.highlights[i].id == poi.id) {
                return true;
            }
        }
        return false;
    },
    isPOIinDisplaying: function(poi) {
        for (var i in this.wayfinder.map.displaying) {
            if (this.wayfinder.map.displaying[i].id === poi.id) {
                return true;
            }
        }
        return false;
    },
    sameOverlay: function(overlay, poi) {
        var _other;
        for (var i in this.wayfinder.map.displaying) {
            _other = this.wayfinder.map.displaying[i];
            if (_other !== poi && _other.getNode() && _other.getNode().floor == poi.getNode().floor) {
                if (this.wayfinder.overlays[_other.id]) {
                    for (var o in this.wayfinder.overlays[_other.id]) {
                        if (JSON.stringify(this.wayfinder.overlays[_other.id][o].bounds) == JSON.stringify(overlay.bounds)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    },
    renderPOIIcon: function(poi, pt) {
        if (poi && poi.getIcon()) {
            var T = this.wayfinder.map.getTransformer();
            var overlay = this.wayfinder.overlays[poi.id];
            var iconWidth = poi.getIcon().width;
            var iconHeight = poi.getIcon().height;
            var ratio = iconHeight / iconWidth;
            var width = Math.floor(this.wayfinder.settings.getInt("poi.2d.icon-size", this.wayfinder.options.poiRadius, poi));
            var height = width * ratio;
            var offsetX = this.wayfinder.settings.getInt("poi.map.offset-x", 0, poi);
            var offsetY = this.wayfinder.settings.getInt("poi.map.offset-y", 0, poi);
            var offsetRotation = this.wayfinder.settings.getInt("poi.map.rotation", 0, poi);
            var poiScale = this.wayfinder.settings.getFloat("poi.map.scale", 1, poi);
            var poiHighlightScale = this.wayfinder.settings.getFloat("poi.2d.icon-highlight-scale", 1.1, poi);
            var mapRotate = this.wayfinder.options.map2DRotation;
            var flip = mapRotate >= 180 ? -1 : 1;
            var alignLongest = this.wayfinder.settings.get("poi.map.align-longest-edge", false, poi);
            var fitToOverlay = this.wayfinder.settings.getBoolean("poi.2d.fit-to-overlay", false, poi);
            var tintedIcon = this.wayfinder.settings.getBoolean("poi.2d.tint_logo", false, poi);
            var highlightTint = this.wayfinder.settings.getBoolean("poi.2d.tint-highlighted", false, poi);
            var highlightInvert = this.wayfinder.settings.getBoolean("poi.2d.invert-highlighted", true, poi);
            this.wayfinder.settings.getColor("poi.2d.name.highlight-color", "#000000", poi);
            var poiInHighlights = this.isPOIinHighlights(poi);
            var rotation = 0;
            if (overlay && 0 < overlay.length) {
                var edge = overlay[0].longestEdge;
                if (edge && fitToOverlay) {
                    var overlayWidth = Math.floor((alignLongest ? edge.rotateWidth : edge.width) * .9);
                    var overlayHeight = Math.floor((alignLongest ? edge.rotateHeight : edge.height) * .9);
                    var newAngle = edge.angle;
                    if (this.wayfinder.options.map2DRotation !== 0 && this.wayfinder.options.map2DRotation < 180) {
                        rotation = this.wayfinder.options.map2DRotation * (Math.PI / 180);
                    } else if (this.wayfinder.options.map2DRotation >= 180) {
                        rotation = this.wayfinder.options.map2DRotation * (Math.PI / 180) - Math.PI;
                    }
                    var squarish = Math.round((Math.round(Math.abs(newAngle) / (Math.PI / 2)) - Math.abs(newAngle) / (Math.PI / 2)) * 100) == 0;
                    var bigEnough = width < Math.min(overlayWidth, overlayHeight) && squarish;
                    if (bigEnough) {
                        newAngle = 0;
                    }
                    pt = T.transformPoint(edge.center);
                    if (iconWidth >= iconHeight) {
                        if (overlayWidth >= overlayHeight) {
                            width = width * Math.min(1, overlayHeight / height, overlayWidth / width);
                            height = width * ratio;
                        } else {
                            height = height * Math.min(1, overlayHeight / height, overlayWidth / width);
                            width = height / ratio;
                            if (!(bigEnough && squarish) && alignLongest) {
                                rotation += (newAngle < 0 ? -1 : 1) * (Math.PI / 2);
                            }
                        }
                    } else {
                        if (overlayWidth >= overlayHeight) {
                            height = Math.min(height, overlayHeight);
                            width = height / ratio;
                        } else {
                            width = Math.min(width, overlayWidth);
                            height = width * ratio;
                            if (!(bigEnough && squarish) && alignLongest) {
                                rotation += (newAngle < 0 ? -1 : 1) * (Math.PI / 2);
                            }
                        }
                    }
                    if (alignLongest) {
                        rotation -= newAngle;
                    }
                }
            }
            rotation += offsetRotation * (Math.PI / 180);
            if (poiInHighlights) {
                width = width * poiHighlightScale;
                height = height * poiHighlightScale;
                tintedIcon = highlightTint;
            }
            width *= poiScale * T.getZoom();
            height *= poiScale * T.getZoom();
            var offset = vec2.fromValues(offsetX, offsetY);
            offset = T.rotatePoint(offset, -rotation);
            this.context.save();
            if (alignLongest) {
                this.context.rotate(rotation);
                pt = T.rotatePoint(pt, -rotation);
            } else {
                pt = T.rotatePointAroundCenter(pt, T.transformPoint([ 512, 512 ]), -rotation);
            }
            pt[0] += offset[0] * T.getZoom() * flip;
            pt[1] -= offset[1] * T.getZoom() * flip;
            if (tintedIcon && poiInHighlights) {
                if (poi.iconTinted == null) {
                    var canvas = document.createElement("canvas");
                    canvas.width = iconWidth;
                    canvas.height = iconHeight;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(poi.getIcon(), 0, 0);
                    ctx.globalCompositeOperation = "multiply";
                    ctx.fillStyle = this.wayfinder.settings.getColor("poi.2d.tint_logo_color", "#fff", poi);
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.globalCompositeOperation = "destination-in";
                    ctx.drawImage(poi.getIcon(), 0, 0);
                    poi.iconTinted = canvas;
                }
                this.context.drawImage(poi.iconTinted, Math.round(pt[0] - width / 2), Math.round(pt[1] - height / 2), Math.round(width), Math.round(height));
            } else if (highlightInvert && poiInHighlights) {
                if (poi.iconInverted == null) {
                    var canvas = document.createElement("canvas");
                    canvas.width = iconWidth;
                    canvas.height = iconHeight;
                    var ctx = canvas.getContext("2d");
                    if (ctx.filter) {
                        ctx.filter = "invert(1)";
                    } else {
                        console.warn("no filter");
                    }
                    ctx.drawImage(poi.getIcon(), 0, 0);
                    poi.iconInverted = canvas;
                }
                this.context.drawImage(poi.iconInverted, Math.round(pt[0] - width / 2), Math.round(pt[1] - height / 2), Math.round(width), Math.round(height));
            } else {
                this.context.drawImage(poi.getIcon(), Math.round(pt[0] - width / 2), Math.round(pt[1] - height / 2), Math.round(width), Math.round(height));
            }
            this.context.restore();
        }
    },
    renderPOIName: function(poi, pt) {
        var debug = "Timberland";
        var name = poi.getName(this.wayfinder.getLanguage());
        if (typeof name === "string") {
            var fontWeight = this.wayfinder.settings.get("poi.2d.name.weight", this.wayfinder.options.poi2DTitleWeight, poi);
            var offsetRotation = this.wayfinder.settings.getInt("poi.map.rotation", 0, poi);
            var offsetX = this.wayfinder.settings.getInt("poi.map.offset-x", 0, poi);
            var offsetY = this.wayfinder.settings.getInt("poi.map.offset-y", 0, poi);
            var poiScale = this.wayfinder.settings.getFloat("poi.map.scale", 1, poi);
            var roundness = this.wayfinder.settings.getFloat("poi.2d.name.padding", 5, poi);
            var fitToOverlay = this.wayfinder.settings.getBoolean("poi.2d.fit-to-overlay", false);
            var smallestFontSize = 5;
            var T = this.wayfinder.map.getTransformer();
            var fontSize = Math.floor(this.nameFontSize);
            var mapRotate = this.wayfinder.options.map2DRotation;
            var flip = mapRotate >= 180 ? -1 : 1;
            this.context.font = fontWeight + " " + fontSize + "px " + this.nameFontFamily;
            this.context.textAlign = "center";
            var padding = .9;
            var overlay = this.wayfinder.overlays[poi.id];
            var textWidth = this.context.measureText(name).width + roundness * 2;
            var textHeight = fontSize + roundness * 2;
            var lineSpacing = fontSize * 0;
            var wrap = this.wayfinder.settings.getInt("poi.text.wrap", -1, poi);
            var lines = [ name.replace("&shy;", "") ];
            var rotation = 0;
            if (wrap > -1) {
                lines = poi.getLines(this.wayfinder.getLanguage(), wrap);
                textWidth = 0;
                textHeight = roundness * 2;
                for (var i = 0; i < lines.length; i++) {
                    textWidth = Math.max(textWidth, this.context.measureText(lines[i]).width);
                    textHeight += fontSize + lineSpacing;
                }
                textWidth += roundness * 2;
            }
            if (overlay && 0 < overlay.length) {
                var edge = overlay[0].longestEdge;
                if (edge && fitToOverlay) {
                    var alignLongest = this.wayfinder.settings.get("poi.map.align-longest-edge", false, poi);
                    var width = (alignLongest ? edge.rotateWidth : edge.width) * padding;
                    var height = (alignLongest ? edge.rotateHeight : edge.height) * padding;
                    var newAngle = edge.angle;
                    pt = T.transformPoint(edge.center);
                    var squarish = Math.round((Math.round(Math.abs(newAngle) / (Math.PI / 2)) - Math.abs(newAngle) / (Math.PI / 2)) * 100) == 0;
                    var bigEnough = textWidth < edge.width;
                    if (bigEnough && squarish) {
                        newAngle = 0;
                    }
                    if (textWidth >= textHeight) {
                        if (width >= height) {
                            fontSize = Math.floor(this.nameFontSize * (Math.min(textWidth, width) / textWidth));
                        } else {
                            fontSize = Math.floor(this.nameFontSize * (Math.min(height, textWidth) / textWidth));
                            if (!(bigEnough && squarish) && alignLongest) {
                                rotation += (newAngle < 0 ? -1 : 1) * (Math.PI / 2);
                            }
                        }
                    } else {
                        if (width >= height) {
                            fontSize = Math.floor(this.nameFontSize * (width / textHeight));
                        } else {
                            fontSize = Math.floor(this.nameFontSize * (Math.min(height, textWidth) / textWidth));
                            if (!(bigEnough && squarish) && alignLongest) {
                                rotation += (newAngle < 0 / 4 ? -1 : 1) * (Math.PI / 2);
                            }
                        }
                    }
                    if (alignLongest) {
                        rotation -= newAngle;
                    }
                    if (mapRotate !== 0 && mapRotate < 180) {
                        rotation += mapRotate * (Math.PI / 180);
                    } else if (mapRotate >= 180) {
                        rotation += mapRotate * (Math.PI / 180) - Math.PI;
                    }
                }
            }
            rotation += offsetRotation * (Math.PI / 180);
            textWidth = 0;
            textHeight = 0;
            var offset = vec2.fromValues(offsetX, offsetY);
            offset = T.rotatePoint(offset, -rotation);
            this.context.save();
            if (alignLongest) {
                this.context.rotate(rotation);
                pt = T.rotatePoint(pt, -rotation);
            } else {
                pt = T.rotatePointAroundCenter(pt, T.transformPoint([ 512, 512 ]), -rotation);
            }
            pt[0] += offset[0] * T.getZoom() * flip;
            pt[1] -= offset[1] * T.getZoom() * flip;
            fontSize *= T.getZoom() * poiScale;
            this.context.textBaseline = "middle";
            this.context.font = fontWeight + " " + fontSize + "px " + this.nameFontFamily;
            for (var i = 0; i < lines.length; i++) {
                textWidth = Math.max(textWidth, this.context.measureText(lines[i]).width);
                textHeight += fontSize + lineSpacing;
            }
            metrics = this.context.measureText(name);
            var bgWidth = textWidth + roundness * 2;
            var bgHeight = textHeight + roundness * 2;
            var offset = lines.length == 1 ? 0 : textHeight / 2 - fontSize / 2;
            if (fontSize > smallestFontSize) {
                if (this.nameBackgroundColor.a > 0) {
                    this.roundedRect(this.context, pt[0] - bgWidth / 2, pt[1] - bgHeight / 2, bgWidth, bgHeight, roundness, this.nameBackgroundColor.toString());
                }
                var nameColor = this.wayfinder.settings.getColor("poi.2d.name.color", "#000000", poi);
                if (this.isPOIinHighlights(poi)) {
                    nameColor = this.wayfinder.settings.getColor("poi.2d.name.highlight-color", "#000000", poi);
                }
                this.context.fillStyle = nameColor;
                for (var j = 0; j < lines.length; j++) {
                    this.context.fillText(lines[j], pt[0], pt[1] - offset);
                    offset -= fontSize + lineSpacing;
                }
            }
            this.context.restore();
        }
    },
    measureText: function() {},
    roundedRect: function(ctx, x, y, width, height, radius, color) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
        ctx.fillStyle = color;
        ctx.fill();
    },
    renderRotatedAreaBounds: function(ctx, bounds, color, name) {
        var T = this.wayfinder.map.getTransformer();
        var a = T.transformPoint(bounds[0]);
        var b = vec2.add(vec2.create(), a, bounds[1]);
        vec2.scale(b, b, T.getZoom());
        var c = T.transformPoint(bounds[1]);
        var d = T.transformPoint(bounds[0]);
        var e = T.transformPoint(bounds[1]);
        this.context.beginPath();
        this.context.fillStyle = "rgba(255, 0, 0, 1.0)";
        this.context.arc(a[0], a[1], 5 * T.getZoom(), 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
        this.context.beginPath();
        this.context.fillStyle = "rgba(0, 255, 0, 1.0)";
        this.context.arc(b[0], b[1], 3 * T.getZoom(), 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
        this.context.beginPath();
        this.context.fillStyle = "rgba(0, 0, 255, 1.0)";
        this.context.arc(c[0], c[1], 3 * T.getZoom(), 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
    },
    calcNiceAngle: function(angle, name) {
        if (angle > Math.PI / 2) {
            angle = Math.PI - angle;
        }
        var pis = angle / (Math.PI / 2);
        var nearAng = Math.round(pis) - pis;
        if (Math.abs(nearAng) < .27) {
            angle = Math.round(pis) * (Math.PI / 2);
        }
        return angle;
    },
    nearPI: function(angle) {
        var pis = angle / (Math.PI / 2);
        var nearAng = Math.round(pis) - pis;
        if (Math.abs(nearAng) < .27) {
            return true;
        }
        return false;
    },
    getBoundsMidPoint: function(bounds) {
        var vec = vec2.sub(vec2.create(), bounds[1], bounds[0]);
        vec2.scale(vec, vec, .5);
        var cross = vec2.fromValues(-vec[1], vec[0]);
        vec2.normalize(cross, cross);
        vec2.scale(cross, cross, bounds[2] / 2);
        var value = vec2.add(vec2.create(), bounds[0], vec);
        vec2.sub(value, value, cross);
        return value;
    },
    getPOILocationOnMap: function(poi) {
        var T = this.wayfinder.map.getTransformer();
        var pt = T.transformPoint(poi.getNode().position2d);
        if (pt[0] >= 0 && pt[0] <= T.getViewWidth() && pt[1] >= 0 && pt[1] <= T.getViewHeight()) {
            return T.inverseScale(pt);
        } else {
            return false;
        }
    },
    getPOIOverlayLocationOnMap: function(poi) {
        var overlay = this.wayfinder.overlays[poi.id];
        if (overlay && overlay.length > 0) {
            overlay = overlay[0];
            var T = this.wayfinder.map.getTransformer();
            var pt = T.transformPoint(vec2.fromValues(overlay.bounds[0] + overlay.bounds[2] / 2, overlay.bounds[1] + overlay.bounds[3] / 2));
            if (pt[0] >= 0 && pt[0] <= T.getViewWidth() && pt[1] >= 0 && pt[1] <= T.getViewHeight()) {
                return T.inverseScale(pt);
            } else return this.getPOILocationOnMap(poi);
        } else {
            return this.getPOILocationOnMap(poi);
        }
    },
    renderPolygon: function(polygon, color, angle) {
        var T = this.wayfinder.map.getTransformer();
        var pt = T.transformPoint(vec2.fromValues(polygon[0][0], polygon[0][1]));
        this.context.fillStyle = color;
        this.context.beginPath();
        if (angle) {
            pt = T.rotatePoint(pt, angle);
        }
        this.context.moveTo(pt[0], pt[1]);
        for (var i = 0; i < polygon.length; i++) {
            pt = T.transformPoint(vec2.set(pt, polygon[i][0], polygon[i][1]));
            if (angle) {
                pt = T.rotatePoint(pt, angle);
            }
            this.context.lineTo(pt[0], pt[1]);
        }
        this.context.closePath();
        this.context.fill();
    },
    drawRectangle: function(ctx, point, width, height, rotation, color) {
        var T = this.wayfinder.map.getTransformer();
        point = T.transformPoint(point);
        if (rotation) {} else {
            rotation = 0;
        }
        width = width * T.getZoom();
        height = height * T.getZoom();
        ctx.save();
        ctx.strokeStyle = color;
        ctx.translate(point[0], point[1]);
        ctx.rotate(rotation);
        ctx.rect(0, 0, width, height);
        ctx.stroke();
        ctx.restore();
    },
    drawPoint: function(point, radius, color) {
        var T = this.wayfinder.map.getTransformer();
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.arc(point[0], point[1], radius * T.getZoom(), 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
    }
});

var PathRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(3);
        this.spots = [];
        this.position = 0;
        this.timer = false;
        this.animating = false;
        this.paused = false;
        this.msgOffset = vec2.fromValues(0, 10);
        this.message = "";
        this.messagePosition = vec2.fromValues(0, 0);
    },
    onAdd: function() {
        this.spotColor = this.wayfinder.settings.getColor("path.2d.color", "rgba(255,0,0,0.8)");
        this.pathPauseTime = this.wayfinder.settings.getInt("path.2d.pause-time", this.wayfinder.options.pathPauseTime);
        this.messageSize = this.wayfinder.settings.getInt("path.2d.message-size", this.wayfinder.options.path2DMessageSize);
        this.spotSize = this.wayfinder.settings.getFloat("path.2d.size", this.wayfinder.options.pathSpotRadius);
        this.pathSpeed = this.wayfinder.settings.getFloat("path.2d.speed", this.wayfinder.options.pathSpeed);
        this.pathStride = this.wayfinder.settings.getFloat("path.2d.stride", this.wayfinder.options.pathStride);
        if (this.spotSize < .1) this.spotSize = .1;
        if (this.pathSpeed < .05) this.pathSpeed = .05;
        if (this.pathStride < .05) this.pathStride = .05;
    },
    reset: function() {
        this.position = 0;
    },
    generatePath: function(path) {
        this.spots = [];
        var offset = 0;
        var step = this.pathStride;
        var spot, a, b, dir, length;
        for (var i = 1, len = path.nodes.length; i < len; i++) {
            a = path.nodes[i - 1];
            b = path.nodes[i];
            dir = vec2.normalize(vec2.create(), vec2.subtract(vec2.create(), b.position2d, a.position2d));
            length = vec2.distance(a.position2d, b.position2d);
            if (a.type === "portal" && b.type === "portal") {
                this.spots.push({
                    floor: a.floor,
                    position: a.position2d,
                    node: a
                });
            } else {
                for (var pos = offset; pos < length; pos += step) {
                    spot = {
                        floor: a.floor,
                        position: vec2.add(vec2.create(), a.position2d, vec2.scale(vec2.create(), dir, pos))
                    };
                    if (pos + step > length) {
                        offset = step - (length - pos);
                        spot["node"] = b;
                    }
                    this.spots.push(spot);
                }
            }
        }
    },
    setPath: function(path, callback) {
        if (!(path instanceof Path2D) || path.isEmpty()) return;
        this.clearPath();
        this.position = 0;
        this.generatePath(path);
        vec2.set(this.messagePosition, 0, 0);
        var getActualNextFloor = function(spots, position) {
            var count = 0;
            for (var i = position + 1, len = spots.length; i < len; i++) {
                if (spots[i].floor.id == spots[i - 1].floor.id) {
                    count++;
                    if (count == 2) {
                        return spots[i].floor;
                    }
                } else {
                    count = 0;
                }
            }
            return false;
        };
        var scope = this;
        this.animating = true;
        var animate = function() {
            scope.paused = false;
            var currentSpot = scope.spots[scope.position];
            scope.renderSpot(scope.position);
            scope.position++;
            var nextSpot = scope.spots[scope.position];
            if (currentSpot && currentSpot.node) {
                scope.wayfinder.events.trigger("path-step", currentSpot);
            }
            if (scope.position === scope.spots.length) {
                scope.animating = false;
                if (scope.wayfinder.map.getCurrentFloor() !== scope.spots[scope.spots.length - 1].floor) {
                    scope.wayfinder.showFloor(currentSpot.floor);
                    scope.wayfinder.map.renderer.damageAll();
                    scope.wayfinder.map.renderer.render();
                }
                if (callback && typeof callback === "function") {
                    scope.wayfinder.events.trigger("path-finished", path);
                    callback();
                }
                return;
            }
            var pause = 0;
            if (nextSpot && currentSpot.floor.id !== nextSpot.floor.id) {
                var targetFloor = getActualNextFloor(scope.spots, scope.position + 1);
                pause = scope.pathPauseTime;
                if (targetFloor) {
                    scope.wayfinder.events.trigger("floor-change-before", nextSpot.floor, targetFloor, currentSpot.floor, scope.spots[scope.position]);
                    if (scope.wayfinder.options.pathDisplayInstructions) {
                        scope.messagePosition = scope.wayfinder.map.getTransformer().transformPoint(vec2.add(scope.messagePosition, currentSpot.position, scope.msgOffset));
                        var language = scope.wayfinder.getLanguage();
                        scope.message = scope.wayfinder.translator.get("go_to_floor", [ scope.wayfinder.map.getCurrentFloor().getName(language), targetFloor.getName(language) ]);
                        scope.renderMessage(scope.messagePosition, scope.message);
                    }
                    scope.paused = true;
                }
            } else if (scope.position > 1 && scope.spots[scope.position - 2].floor.id !== currentSpot.floor.id) {
                scope.wayfinder.showFloor(currentSpot.floor);
                scope.wayfinder.map.renderer.damageAll();
                scope.wayfinder.map.renderer.render();
            }
            scope.timer = setTimeout(animate, scope.pathSpeed + pause);
        };
        if (!this.paused) {
            this.timer = setTimeout(animate, this.wayfinder.options.pathSpeed);
        }
        if (!path.isEmpty()) {
            this.wayfinder.events.trigger("path-start", path.nodes[path.nodes.length - 1]);
        }
    },
    updatePath: function(path) {
        if (!this.animating) {
            this.generatePath(path);
            this.position = this.spots.length;
        }
    },
    clearPath: function() {
        this.position = 0;
        this.spots = [];
        this.paused = false;
        this.animating = false;
        clearTimeout(this.timer);
        this.wayfinder.map.update(true);
    },
    renderMessage: function(position, msg) {
        var T = this.wayfinder.map.getTransformer();
        var padding = 20;
        this.context.save();
        this.context.font = "bold " + this.messageSize * T.getViewScale() + "px sans-serif";
        this.context.textBaseline = "top";
        this.context.textAlign = "center";
        this.context.fillStyle = "rgba(40, 40, 40, 0.75)";
        var width = this.context.measureText(msg).width;
        this.context.fillRect(position[0] - (width + padding) / 2, position[1], width + padding, this.messageSize * T.getViewScale() + padding);
        this.context.fillStyle = "rgba(255,255,255,1.0)";
        this.context.fillText(msg, position[0], position[1] + padding / 2);
        this.context.restore();
    },
    renderSpot: function(position) {
        var pos = this.spots[position].position;
        if (!this.spots[position]) return;
        var T = this.wayfinder.map.getTransformer();
        var pt = T.transformPoint(this.spots[position].position);
        this.context.save();
        this.context.beginPath();
        this.context.fillStyle = this.spotColor.toString();
        this.context.arc(pt[0], pt[1], this.spotSize * T.getZoom(), 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
        this.context.restore();
    },
    render: function(rect) {
        if (this.spots.length === 0) {
            return;
        }
        var floor = this.wayfinder.map.getCurrentFloor();
        this.context.save();
        for (var i = 0, len = this.position; i < len; i++) {
            if (this.spots[i].floor.id !== floor.id) {
                continue;
            }
            this.renderSpot(i);
        }
        if (this.paused) {
            this.renderMessage(this.messagePosition, this.message);
        }
        this.context.restore();
    }
});

var NodesRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(2);
    },
    render: function(rect) {
        var T = this.wayfinder.map.getTransformer();
        var floor = this.wayfinder.map.getCurrentFloor();
        if (!floor) return;
        this.context.save();
        for (var i in floor.nodes) {
            var pt = T.transformPoint(floor.nodes[i].position2d);
            this.context.beginPath();
            this.context.fillStyle = "rgba(60,120,0,0.7)";
            this.context.arc(pt[0], pt[1], 2, 0, Math.PI * 2, true);
            this.context.closePath();
            this.context.fill();
            this.context.fillText(floor.nodes[i].id, pt[0] + 2, pt[1] + 2);
        }
        this.context.restore();
    }
});

var EdgesRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(2);
    },
    render: function(rect) {
        var T = this.wayfinder.map.getTransformer();
        var floor = this.wayfinder.map.getCurrentFloor();
        if (!floor) return;
        this.context.save();
        for (var i in floor.nodes) {
            var origin = T.transformPoint(floor.nodes[i].position2d);
            for (var j in floor.nodes[i].neighbours) {
                var pt = T.transformPoint(floor.nodes[i].neighbours[j].position2d);
                this.context.lineWidth = 1;
                this.context.strokeStyle = "rgba(10,10,10,0.1)";
                this.context.beginPath();
                this.context.moveTo(origin[0], origin[1]);
                this.context.lineTo(pt[0], pt[1]);
                this.context.closePath();
                this.context.stroke();
            }
        }
        this.context.restore();
    }
});

var ExtrasRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(5);
        this.yahSize = 30;
        this.locationAnimationProgress = 0;
        this.pulseAnimationProgress = 0;
        this.pulseAnimationDirection = 1;
        this.yahColor = new Color(255, 0, 0, 1);
    },
    onAdd: function() {
        this.yahSize = this.wayfinder.settings.getInt("kiosk.2d.yah-size", this.wayfinder.settings.getInt("poi.2d.icon-size", this.wayfinder.options.poiRadius));
        this.yahYOffset = this.wayfinder.settings.getFloat("kiosk.2d.yah-y-offset", 1);
        this.yahXOffset = this.wayfinder.settings.getFloat("kiosk.2d.yah-x-offset", 1);
        this.yahColor = this.wayfinder.settings.getColor("kiosk.yah-color", this.wayfinder.settings.get("path.2d.color", "#FF0000"));
        this.otherFloorSpot = this.wayfinder.settings.getBoolean("poi.2d.yah-other-floors", false);
        this.yahPulseAnimation = this.wayfinder.settings.getBoolean("kiosk.2d.yah.pulse", false);
        this.yahPulseColor = this.wayfinder.settings.getColor("kiosk.2d.yah.pulse-color", "rgba(255,0,0,0.8)");
    },
    render: function(rect) {
        var scope = this;
        var T = this.wayfinder.map.getTransformer();
        this.context.save();
        this.yahImage = "";
        var locationManager = this.wayfinder.device.locationManager;
        if (locationManager && this.wayfinder.options.enableUserLocation && typeof locationManager.getCurrentPosition == "function" && locationManager.getCurrentPosition()) {
            var posData = locationManager.getCurrentPosition();
            var userLocation = T.transformPoint(posData.location);
            this.context.beginPath();
            this.context.fillStyle = "rgba(0, 0, 200, 0.3)";
            this.context.arc(userLocation[0], userLocation[1], 5 * T.getZoom(), 0, Math.PI * 2, true);
            this.context.closePath();
            this.context.fill();
            var debug = false;
            if (debug) {
                var spot, loc;
                var center = T.transformPoint(posData.center);
                var lineStart = vec2.clone(posData.center);
                var line = T.transformPoint(lineStart);
                for (var i in posData.hotspots) {
                    spot = posData.hotspots[i];
                    loc = T.transformPoint([ spot.location[0], spot.location[1] ]);
                    this.context.beginPath();
                    this.context.fillStyle = "rgba(0, 0, 200, 0.1)";
                    this.context.arc(loc[0], loc[1], spot.radius * spot.power * 5 * T.getZoom(), 0, Math.PI * 2, true);
                    this.context.closePath();
                    this.context.fill();
                    this.context.beginPath();
                    this.context.font = "12px Arial";
                    var id = spot.id.split(".");
                    this.context.fillStyle = "green";
                    this.context.fillText(" #" + id[1] + "." + id[2] + " " + Math.floor(spot.pullValue * 100) / 100 + " " + spot.strength.length, loc[0], loc[1]);
                }
            }
            this.context.fill();
        }
        if (this.wayfinder.getKioskNode() && this.wayfinder.getKioskNode().position2d) {
            var yahPosition = T.transformPoint(this.wayfinder.getKioskNode().position2d);
            var width = this.yahSize * T.getZoom();
            if (this.wayfinder.acquiringLocation) {
                this.drawLocationAnimation(yahPosition, width / 4);
                this.damage();
            } else {
                if (this.yahPulseAnimation) {
                    var pulsePos = [ yahPosition[0], yahPosition[1] - width / 2 ];
                    this.drawPulseAnimation(pulsePos, width / 4);
                    this.damage();
                }
                if (this.wayfinder.options.drawKioskIcon && this.wayfinder.getKioskNode() !== false) {
                    if (this.wayfinder.yahImage && this.wayfinder.getKioskNode().floor.id == this.wayfinder.getCurrentFloor().id) {
                        var yahImage = this.wayfinder.yahImage;
                        var height = width / yahImage.width * yahImage.height;
                        if (this.wayfinder.options.yahRotation === 0) {
                            this.context.drawImage(yahImage, yahPosition[0] - width / 2, yahPosition[1] - height, width, height);
                        } else {
                            this.context.save();
                            this.context.translate(yahPosition[0], yahPosition[1]);
                            this.context.rotate(scope.wayfinder.options.yahRotation * Math.PI / 180);
                            this.context.drawImage(yahImage, -(width / 2), -(height / 2), width, height);
                            this.context.restore();
                        }
                    } else if (this.otherFloorSpot) {
                        this.context.beginPath();
                        this.context.fillStyle = this.yahColor.toString();
                        this.context.arc(yahPosition[0] + width / 4, yahPosition[1] + width / 4, width / 4, 0, Math.PI * 2, true);
                        this.context.closePath();
                        this.context.fill();
                    }
                }
            }
        }
        this.context.restore();
    },
    accelerateInterpolator: function(x) {
        return x * x;
    },
    decelerateInterpolator: function(x) {
        return 1 - (1 - x) * (1 - x);
    },
    drawCircle: function(loc, radius, speed, progress) {
        var ctx = this.context;
        ctx.beginPath();
        var start = this.accelerateInterpolator(progress) * speed;
        var end = this.decelerateInterpolator(progress) * speed;
        ctx.arc(loc[0], loc[1], radius, (start - .5) * Math.PI, (end - .5) * Math.PI);
        ctx.lineWidth = radius / 4;
        ctx.strokeStyle = this.yahColor.toString();
        ctx.stroke();
    },
    drawPulseCircle: function(loc, radius, speed, progress) {
        var ctx = this.context;
        var _radius = radius * this.accelerateInterpolator(progress) * speed;
        ctx.fillStyle = this.yahPulseColor.toString();
        ctx.beginPath();
        ctx.arc(loc[0], loc[1], _radius, 0, 2 * Math.PI);
        ctx.fill();
    },
    drawPulseAnimation: function(loc, radius) {
        this.pulseAnimationProgress += this.pulseAnimationDirection * .01;
        if (this.pulseAnimationProgress > 1 || this.pulseAnimationProgress < 0) {
            this.pulseAnimationDirection = -1 * this.pulseAnimationDirection;
        }
        this.drawPulseCircle(loc, radius, 5, this.pulseAnimationProgress);
    },
    drawLocationAnimation: function(loc, radius) {
        this.locationAnimationProgress += .01;
        if (this.locationAnimationProgress > 1) {
            this.locationAnimationProgress = 0;
        }
        this.drawCircle(loc, radius, 4, this.locationAnimationProgress);
        this.drawCircle(loc, radius / 2, 2, this.locationAnimationProgress);
    }
});

var DebugRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(5);
        this.yahSize = 30;
        this.foundBeacons = {};
    },
    render: function(rect) {
        var scope = this;
        var T = this.wayfinder.map.getTransformer();
        var debugBeacons = this.wayfinder.options.debugBeacons;
        this.context.save();
        if (debugBeacons && this.wayfinder.mobileLogic) {
            var beacons = this.wayfinder.mobileLogic.mobileData.ibeacons;
            var _found = this.wayfinder.device.locationManager ? this.wayfinder.device.locationManager.locator.foundBeacons : {};
            var found = Object.assign(_found, this.foundBeacons);
            this.foundBeacons = found;
            var spot, loc, beacon;
            for (var i in beacons) {
                beacon = beacons[i];
                spot = this.wayfinder.nodes[parseInt(beacon.node_id)];
                if (spot && this.wayfinder.map.getCurrentFloor().id === spot.floor.id) {
                    loc = T.transformPoint(spot.position2d);
                    if (spot.position2d) {
                        this.context.beginPath();
                        if (found[parseInt(spot.id)]) {
                            this.context.fillStyle = "rgba(0, 200, 0, 0.9)";
                        } else {
                            this.context.fillStyle = "rgba(0, 0, 200, 0.9)";
                        }
                        this.context.arc(loc[0], loc[1], 8 * T.getZoom(), 0, Math.PI * 2, true);
                        this.context.closePath();
                        this.context.fill();
                        this.context.font = 7 * T.getZoom() + "px Arial";
                        var id = spot.id.split(".");
                        this.context.fillStyle = "white";
                        this.context.fillText(beacon.major + "." + beacon.minor, loc[0] - 7 * T.getZoom(), loc[1] + 2 * T.getZoom());
                    }
                }
            }
        }
        this.context.restore();
    }
});

var POIsOverlayRenderer2D = Renderer2D.extend({
    init: function() {
        this._super(4);
    },
    render: function(rect) {
        var deHighlightPOIs = this.wayfinder.settings.getBoolean("poi.dehighlight.enabled", false) && this.wayfinder.map.highlights.length > 0;
        var dehighlightColor = this.wayfinder.settings.getColor("poi.dehighlight.color", "#888");
        var floor = this.wayfinder.map.getCurrentFloor();
        var scope = this;
        if (!floor) return;
        var T = this.wayfinder.map.getTransformer();
        this.context.save();
        if (floor.nodes) {
            for (var i = 0; i < floor.nodes.length; i++) {
                if (floor.nodes[i].pois.length === 0) continue;
                var poi = false;
                var overlays, overlay, overlayHighlightColor, overlayColor, overlayColorBorder, overlayBorderWith, overlayColorFromGroup, overlayRenderAll;
                var debug = false;
                for (var j = 0; j < floor.nodes[i].pois.length; j++) {
                    poi = floor.nodes[i].pois[j];
                    highlighted = this.isPOIinHighlights(poi);
                    overlayRenderAll = this.wayfinder.settings.getBoolean("poi.2d.overlay-render-all", false, poi);
                    if ((highlighted || overlayRenderAll) && poi.id in scope.wayfinder.overlays) {
                        overlays = scope.wayfinder.overlays[poi.id];
                        if (overlays && overlays.length > 0) {
                            overlayHighlightColor = this.wayfinder.settings.getColor("poi.2d.overlay.color", this.wayfinder.options.overlayHighlightColor, poi);
                            overlayColor = this.wayfinder.settings.getColor("poi.2d.overlay.color-background", "#cccccc", poi);
                            overlayColorFromGroup = this.wayfinder.settings.getBoolean("poi.2d.overlay-group-color", false, poi);
                            overlayColorBorder = this.wayfinder.settings.getColor("poi.2d.overlay.color-border", "#cccccc", poi);
                            overlayBorderWith = this.wayfinder.settings.getInt("poi.2d.overlay-border-with", 0, poi);
                            color = overlayColor;
                            for (var o in overlays) {
                                overlay = overlays[o];
                                if (!highlighted && deHighlightPOIs) {
                                    color = dehighlightColor;
                                } else if (!highlighted && overlayColorFromGroup && poi && poi.getGroups()) {
                                    var group = poi.getGroups()[0];
                                    if (group && group.getColor()) {
                                        color = group.getColor().toString();
                                    }
                                } else if (deHighlightPOIs && highlighted && overlayColorFromGroup) {
                                    var group = poi.getGroups()[0];
                                    if (group && group.getColor()) {
                                        color = group.getColor().toString();
                                    }
                                } else if (highlighted) {
                                    color = overlayHighlightColor;
                                } else {
                                    color = overlayColor;
                                }
                                scope.renderPOIOverlay(overlay, color, overlayBorderWith, overlayColorBorder, debug);
                            }
                        }
                    }
                }
            }
        }
        this.context.restore();
    },
    isPOIinHighlights: function(poi) {
        for (var i in this.wayfinder.map.highlights) {
            if (this.wayfinder.map.highlights[i].id == poi.id) {
                return true;
            }
        }
        return false;
    },
    renderPOIOverlay: function(overlay, color, borderWidth, borderColor, debug) {
        if (overlay && overlay.polygon && overlay.polygon.length > 3 && color) {
            var T = this.wayfinder.map.getTransformer();
            var pt = T.transformPoint(overlay.polygon[0]);
            this.context.strokeStyle = borderColor;
            this.context.lineWidth = borderWidth;
            this.context.fillStyle = color;
            this.context.beginPath();
            this.context.moveTo(pt[0], pt[1]);
            for (var i = 0; i < overlay.polygon.length; i++) {
                pt = T.transformPoint(overlay.polygon[i]);
                this.context.lineTo(pt[0], pt[1]);
            }
            this.context.fillStyle = color;
            this.context.stroke();
            this.context.closePath();
            this.context.fill();
        }
    },
    rotateVector: function(vec, ang) {
        ang = -ang * (Math.PI / 180);
        var cos = Math.cos(ang);
        var sin = Math.sin(ang);
        return vec2.fromValues(Math.round(1e4 * (vec[0] * cos - vec[1] * sin)) / 1e4, Math.round(1e4 * (vec[0] * sin + vec[1] * cos)) / 1e4);
    },
    renderPolygon: function(polygon, color, angle) {
        var T = this.wayfinder.map.getTransformer();
        var pt = T.transformPoint(vec2.fromValues(polygon[0][0], polygon[0][1]));
        this.context.fillStyle = color;
        this.context.beginPath();
        if (angle) {
            pt = T.rotatePoint(pt, angle);
        }
        this.context.moveTo(pt[0], pt[1]);
        for (var i = 0; i < polygon.length; i++) {
            pt = T.transformPoint(vec2.set(pt, polygon[i][0], polygon[i][1]));
            if (angle) {
                pt = T.rotatePoint(pt, angle);
            }
            this.context.lineTo(pt[0], pt[1]);
        }
        this.context.closePath();
        this.context.fill();
    }
});

var Wayfinder2DRendering = Class.extend({
    init: function(wayfinder, canvas) {
        this.wayfinder = wayfinder;
        this.context = null;
        this.damaged = true;
        this.renderers = [];
        if (wayfinder && wayfinder instanceof Wayfinder) {
            this.wayfinder = wayfinder;
        }
        if (canvas) {
            this.context = canvas.getContext("2d");
        }
    },
    damage: function(renderer) {
        this.damaged = true;
    },
    undamage: function(renderer) {
        this.damaged = false;
    },
    damageAll: function() {
        for (var i = 0; i < this.renderers.length; i++) {
            this.renderers[i].damage();
        }
    },
    render: function() {
        if (this.damaged) {
            this.damaged = false;
            var T = this.wayfinder.map.getTransformer();
            var rect = new Rectangle(T.getX(), T.getY(), T.getUnzoomedViewWidth(), T.getUnzoomedViewHeight());
            for (var i = 0; i < this.renderers.length; i++) {
                if (this.renderers[i] && this.renderers[i].enabled) {
                    this.renderers[i].render(rect);
                }
            }
        }
    },
    add: function(renderer) {
        if (!(renderer instanceof Renderer2D)) return false;
        renderer.setContext(this.context);
        renderer.setWayfinder(this.wayfinder);
        renderer.setParent(this);
        for (var i = 0; i < this.renderers.length; i++) {
            if (renderer.renderQueue < this.renderers[i].renderQueue) {
                this.renderers.splice(i, 0, renderer);
                renderer.onAdd();
                return true;
            }
        }
        this.renderers.push(renderer);
        renderer.onAdd();
        return true;
    },
    updateRenderers: function() {
        for (var i = 0; i < this.renderers.length; i++) {
            this.renderers[i].setContext(this.context);
        }
    }
});

var Map2D = Class.extend({
    init: function(wayfinder) {
        this.wayfinder = wayfinder;
        this.highlights = [];
        this.displaying = [];
        this.LODImages = [];
        this.onUpdateCallback = null;
        this.renderAll = false;
        this.renderOnlyBase = false;
        this.renderCycle = null;
        this.renderInterval = 22;
        this.padding = this.wayfinder.options.zoomPadding;
        this.mapClickAll = this.wayfinder.settings.getBoolean("poi.2d.map-click-all", false);
        this.onPOIClick = false;
        this.renderer;
        this.wayfinder.cbOnPositionUpdate = ClassCallback(this, this.onPositionUpdate);
        this.emptyMap = new Image();
        this.emptyMap.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAQAAAAD+Fb1AAAAAmJLR0QAfPM+HiUAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfnCAwKIxQU11MpAAAAC0lEQVQI12NgIAwAACQAAS4ecaAAAAAASUVORK5CYII=";
    },
    setup: function() {
        this.renderer = new Wayfinder2DRendering(this.wayfinder, this.wayfinder.logic.getCanvas());
        this.mapMover = new Map2DMover(this.wayfinder.logic.getCanvas(), this.wayfinder.options, ClassCallback(this, this.update));
        var panX = this.wayfinder.settings.getFloat("kiosk.2d.default-pan-x", 0);
        var panY = this.wayfinder.settings.getFloat("kiosk.2d.default-pan-y", 0);
        this.mapMover.cbOnClick = ClassCallback(this, this.onClick);
        this.mapMover.cbOnLongClick = ClassCallback(this, this.onLongClick);
        this.getTransformer().setOffset(panX, panY);
        this.pathRenderer = new PathRenderer2D();
        this.floorRenderer = new FloorRenderer2D();
        this.poisRenderer = new POIsRenderer2D();
        this.poisOverlayRenderer = new POIsOverlayRenderer2D();
        this.extrasRenderer = new ExtrasRenderer2D();
        this.debugRenderer = new DebugRenderer2D();
        this.addRenderers();
    },
    updateCanvas: function(canvas) {
        this.renderer.context = canvas.getContext("2d");
        this.renderer.updateRenderers();
        this.mapMover.view = canvas;
        this.mapMover.bindEvents();
    },
    start: function() {
        var me = this;
        this.renderAll = true;
        var render = function() {
            me.renderer.render();
            me.renderCycle = requestAnimFrame(render, this.renderInterval);
        };
        this.renderCycle = requestAnimFrame(render, this.renderInterval);
    },
    addLODImage: function(floor_id, lod, x, y, image) {
        if (this.LODImages) {
            if (!this.LODImages[floor_id]) {
                this.LODImages[floor_id] = [];
            }
            if (!this.LODImages[floor_id][lod]) {
                this.LODImages[floor_id][lod] = [];
            }
            if (!this.LODImages[floor_id][lod][x]) {
                this.LODImages[floor_id][lod][x] = [];
            }
            if (!this.LODImages[floor_id][lod][x][y]) {
                this.LODImages[floor_id][lod][x][y] = [];
            }
            this.LODImages[floor_id][lod][x][y] = image;
        }
    },
    getLODImage: function(floor_id, lod, x, y) {
        if (this.LODImages[floor_id] && this.LODImages[floor_id][lod] && this.LODImages[floor_id][lod][x] && this.LODImages[floor_id][lod][x][y]) {
            return this.LODImages[floor_id][lod][x][y];
        }
        return false;
    },
    getContainerNeededLevel: function() {
        var lod = 0;
        var size = Math.max(this.getTransformer().getZoomedMapWidth(), this.getTransformer().getZoomedMapHeight()) * this.getTransformer().getViewScale();
        var tmpLOD = Math.floor(size / this.wayfinder.options.mapSize[0]);
        lod = Math.min(tmpLOD, this.wayfinder.options.maxLOD);
        return lod;
    },
    getMaxLODLevel: function(floor_id) {
        var level = 0;
        if (this.LODImages[floor_id]) {
            for (var i = 0; i <= this.wayfinder.options.maxLOD; i++) {
                if (this.LODImages[floor_id][i] && this.LODImages[floor_id][i].length == Math.pow(2, i) && this.imagesInLevel(floor_id, i) == Math.pow(4, i)) {
                    level = i;
                }
            }
            level = Math.max(0, Math.min(level, this.wayfinder.options.maxLOD));
        }
        return level;
    },
    imagesInLevel: function(floor_id, lod) {
        var count = 0;
        if (this.LODImages[floor_id] && this.LODImages[floor_id][lod]) {
            for (var x in this.LODImages[floor_id][lod]) {
                if (this.LODImages[floor_id][lod][x]) {
                    count += this.LODImages[floor_id][lod][x].length;
                }
            }
        }
        return count;
    },
    addRenderers: function() {
        this.renderer.add(this.floorRenderer);
        this.renderer.add(this.poisOverlayRenderer);
        this.renderer.add(this.poisRenderer);
        this.renderer.add(this.pathRenderer);
        this.renderer.add(this.extrasRenderer);
        this.renderer.add(this.debugRenderer);
    },
    onPositionUpdate: function() {
        var currentPosition = this.wayfinder.geolocation.currentPosition;
        var currentGeoPosition = this.wayfinder.geolocation.currentGeoPosition;
        console.log("=== Position Update ===");
        console.log("Geo.pos: (" + currentGeoPosition[0] + ", " + currentGeoPosition[1] + ")", currentGeoPosition);
        console.log("Map.pos: (" + currentPosition[0] + ", " + currentPosition[1] + ")", currentPosition);
        var nearestNode;
        if (currentPosition[0] === undefined) nearestNode = this.findNearestNodeOnFloor(this.getCurrentFloor(), vec2.fromValues(currentPosition.x, currentPosition.y)); else nearestNode = this.findNearestNodeOnFloor(this.getCurrentFloor(), currentPosition);
        if (nearestNode !== false) {
            this.wayfinder.kiosk = nearestNode;
        }
        this.update(true);
    },
    onClick: function(position) {
        var floor = this.getCurrentFloor();
        if (floor) {
            var pt = position;
            var maxDist = this.wayfinder.settings.getFloat("poi.activation.radius", this.wayfinder.options.poiRadius);
            var poiMaxDist = maxDist;
            var foundPOIs = [];
            var lastDist = Infinity;
            var curDist = Infinity;
            var poi;
            var node;
            if (this.wayfinder.options.debugMouseLocation) {
                this.floorRenderer.debugPoint = pt;
            }
            for (var i in floor.nodes) {
                node = floor.nodes[i];
                if (typeof node !== "object" || node.pois.length === 0) continue;
                for (var j = 0; j < node.pois.length; j++) {
                    poi = node.pois[j];
                    if (!poi.getShowInMenu()) continue;
                    curDist = vec2.distance(pt, node.position2d);
                    if (this.wayfinder.overlays[poi.id]) {
                        for (var o in this.wayfinder.overlays[poi.id]) {
                            if (typeof this.wayfinder.overlays[poi.id][o] === "object" && this.wayfinder.overlays[poi.id][o].contains(pt)) {
                                foundPOIs.push(poi);
                                curDist = 0;
                                if (!this.mapClickAll) continue;
                            }
                        }
                    }
                    if (poi.isAlwaysVisible()) {
                        poiMaxDist = this.wayfinder.settings.getFloat("poi.2d.icon-size", maxDist, poi);
                    } else {
                        poiMaxDist = maxDist;
                    }
                    if (curDist < poiMaxDist) {
                        if (curDist < lastDist) {
                            foundPOIs.unshift(poi);
                            lastDist = curDist;
                        } else {
                            foundPOIs.push(poi);
                        }
                        if (!this.mapClickAll) continue;
                    }
                }
            }
            if (foundPOIs.length > 0) {
                var pos = vec2.scale(vec2.create(), position, 1 / this.getTransformer().getViewScale());
                this.openPOI(foundPOIs[0], pos);
                this.wayfinder.events.trigger("map-click", foundPOIs[0], pos, foundPOIs);
            } else {
                this.wayfinder.events.trigger("map-touch", pos);
            }
        }
    },
    openPOI: function(poi, position) {
        this.clearHighlights();
        this.clearDisplaying();
        if (this.wayfinder.settings.getBoolean("poi.highlight", true, poi)) {
            this.highlights.push(poi);
        }
        if (this.wayfinder.settings.getBoolean("poi.2d.display-names-always", true, poi)) {
            this.displaying.push(poi);
        }
        this.pathRenderer.clearPath();
        this.update(true);
        if (this.onPOIClick && typeof this.onPOIClick === "function") {
            this.onPOIClick(poi, position);
        }
    },
    onLongClick: function(position) {
        if (this.wayfinder.options.enableUserYAHSetting) {
            var pt = this.getTransformer().inverseTransformPoint(position);
            var node = this.findNearestNodeOnFloor(this.getCurrentFloor(), pt);
            if (node !== false) {
                this.wayfinder.kiosk = node;
                this.update(true);
            }
        }
    },
    update: function(redrawAll) {
        if (!this.wayfinder.paused) {
            if (this.wayfinder.options.enableLOD) {
                this.checkLODLevels();
            }
            this.redraw();
            this.wayfinder.events.trigger("map-update", redrawAll);
        }
    },
    resize: function(canvas, width, height, scale) {
        canvas.setAttribute("width", width * scale + "px");
        canvas.setAttribute("height", height * scale + "px");
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        if (this.getTransformer()) {
            var transformer = this.getTransformer();
            transformer.setViewSize(vec2.fromValues(width * scale, height * scale));
            transformer.setViewScale(scale);
            transformer.setZoom(transformer.getZoom());
            this.update(true);
        }
    },
    getTransformer: function() {
        if (this.mapMover) return this.mapMover.mapTransformer; else {
            return false;
        }
    },
    getCurrentFloor: function() {
        return this.wayfinder.getCurrentFloor();
    },
    fitPathInView: function(path) {
        if (path === false) return;
        var bounds = path.getBounds();
        var T = this.getTransformer();
        var padding = vec2.fromValues(this.padding, this.padding);
        var paddedSize = vec2.add(vec2.create(), bounds.size, padding);
        var newZoom = -1;
        if (bounds.size[0] > bounds.size[1]) {
            newZoom = T.getViewWidth() / paddedSize[0];
            if (newZoom < T.getZoom() || this.wayfinder.options.pathZoomIn) T.setZoom(newZoom);
        } else {
            newZoom = T.getViewHeight() / paddedSize[1];
            if (newZoom < T.getZoom() || this.wayfinder.options.pathZoomIn) T.setZoom(newZoom);
        }
        T.setPosition(bounds.min[0] - (T.getUnzoomedViewWidth() / 2 - bounds.size[0] / 2), bounds.min[1] - (T.getUnzoomedViewHeight() / 2 - bounds.size[1] / 2));
    },
    fitPOIInView: function(poi) {
        if (poi === false) return;
        var overlay = this.wayfinder.overlays[poi.id];
        var bounds = [ 0, 0, 0, 0 ];
        if (overlay && overlay.length > 0) {
            bounds = overlay[0].getBounds();
        } else {
            bounds = [ poi.getNode().position2d[0], poi.getNode().position2d[1], 1, 1 ];
        }
        var T = this.getTransformer();
        var paddedBounds = [ Math.max(bounds[0] - this.padding, 0), Math.max(bounds[1] - this.padding, 0), Math.min(bounds[2] + this.padding * 2, T.getMapWidth()), Math.min(bounds[3] + this.padding * 2, T.getMapHeight()) ];
        if (bounds[2] > bounds[3]) T.setZoom(Math.min(T.getZoom(), T.getViewWidth() / paddedBounds[2])); else T.setZoom(Math.min(T.getZoom(), T.getViewHeight() / paddedBounds[3]));
        var pos = T.getPosition();
        var deltaX = 0;
        var deltaY = 0;
        deltaX = Math.min(0, paddedBounds[0] - pos[0]);
        deltaY = Math.min(0, paddedBounds[1] - pos[1]);
        deltaX = Math.max(deltaX, paddedBounds[0] + paddedBounds[2] - pos[0] - T.getViewWidth());
        deltaY = Math.max(deltaY, paddedBounds[1] + paddedBounds[3] - pos[1] - T.getViewHeight());
        T.setPosition(pos[0] + deltaX, pos[1] + deltaY);
    },
    fitMultiplePOIsInView: function(pois, _maxZoom) {
        if (pois === false) return;
        var T = this.getTransformer();
        var poi = false;
        var minX = 1024;
        var minY = 1024;
        var maxX = 0;
        var maxY = 0;
        var maxZoom = typeof _maxZoom !== "undefined" ? _maxZoom : T.zoomRange[1];
        if (this.wayfinder.kiosk) {
            maxX = this.wayfinder.kiosk.position2d[0];
            maxY = this.wayfinder.kiosk.position2d[1];
        }
        var overlay = false;
        for (var i = 0; i < pois.length; i++) {
            poi = pois[i];
            if (poi && poi.getNode()) {
                overlay = this.wayfinder.overlays[poi.id];
                if (overlay && overlay.length > 0 && overlay[0].getBounds() && overlay[0].getBounds()[0] < 1024 && overlay[0].getBounds()[1] < 1024) {
                    minX = Math.min(minX, overlay[0].getBounds()[0]);
                    minY = Math.min(minY, overlay[0].getBounds()[1]);
                    maxX = Math.max(maxX, overlay[0].getBounds()[0] + overlay[0].getBounds()[2]);
                    maxY = Math.max(maxY, overlay[0].getBounds()[1] + overlay[0].getBounds()[3]);
                } else if (poi.getNode().position2d) {
                    minX = Math.min(minX, poi.getNode().position2d[0]);
                    minY = Math.min(minY, poi.getNode().position2d[1]);
                    maxX = Math.max(maxX, poi.getNode().position2d[0]);
                    maxY = Math.max(maxY, poi.getNode().position2d[1]);
                }
            }
        }
        var bounds = [ minX, minY, maxX - minX, maxY - minY ];
        bounds[0] = Math.max(1, bounds[0] - this.padding);
        bounds[1] = Math.max(1, bounds[1] - this.padding);
        bounds[2] = Math.min(T.mapSize[0], bounds[2] + this.padding * 2);
        bounds[3] = Math.min(T.mapSize[1], bounds[3] + this.padding * 2);
        var zoom = T.getViewWidth() / bounds[2];
        zoom = Math.min(zoom, T.getViewHeight() / bounds[3]);
        zoom = Math.min(maxZoom, zoom);
        T.setZoom(zoom);
        T.setPosition(bounds[0] - (T.getUnzoomedViewWidth() / 2 - bounds[2] / 2), bounds[1] - (T.getUnzoomedViewHeight() / 2 - bounds[3] / 2));
    },
    center: function(offsetX, offsetY) {
        var T = this.getTransformer();
        if (T) T.center();
    },
    checkLODLevels: function() {
        if (this.getCurrentFloor()) {
            var floorID = this.getCurrentFloor().id;
            var currentMaxLOD = this.getMaxLODLevel(floorID);
            var neededLODLevel = this.getContainerNeededLevel();
            var isLODLoading = this.isLODLoading(floorID, neededLODLevel);
            var isLODLoaded = this.isLODLoaded(floorID, neededLODLevel);
            if (isLODLoaded) {
                this.floorRenderer.setLOD(neededLODLevel);
            } else {
                this.floorRenderer.setLOD(currentMaxLOD);
            }
            if (!isLODLoading) {
                this.preloadNextLODLevel(floorID, neededLODLevel);
            }
        }
    },
    isLODLoading: function(level, lod) {
        if (this.LODImages[level] && this.LODImages[level][lod]) {
            return true;
        }
        return false;
    },
    isLODLoaded: function(level, lod) {
        if (this.LODImages[level] && this.LODImages[level][lod]) {
            if (this.LODImages[level][lod] && this.LODImages[level][lod].length == Math.pow(2, lod) && this.imagesInLevel(level, lod) == Math.pow(4, lod)) {
                return true;
            }
        }
        return false;
    },
    getCurrentLOD: function(level, x, y) {
        if (level > -1) {
            var img = this.getLODImage(this.getCurrentFloor().id, level, x, y);
            if (img) {
                return img;
            }
        }
        return false;
    },
    preloadNextLODLevel: function(floor, level) {
        if (floor && level <= this.wayfinder.options.maxLOD) {
            var scope = this;
            var tiles = Math.pow(2, level);
            if (!this.LODImages[floor]) this.LODImages[floor] = [];
            if (!this.LODImages[floor][level]) this.LODImages[floor][level] = [];
            var setImages = function(data) {
                var params = [];
                for (var i in data) {
                    params = i.split("_");
                    scope.addLODImage(params[0], params[1], params[2], params[3], data[i]);
                }
                scope.afterPreload(floor, level);
            };
            var urls = {};
            for (var x = 0; x < tiles; x++) {
                for (var y = 0; y < tiles; y++) {
                    urls[floor + "_" + level + "_" + x + "_" + y] = {
                        url: WayfinderAPI.getURL("2d", "lod", [ floor, level, x, y ]),
                        type: "image"
                    };
                }
            }
            Logistics.getMultiple(urls, setImages);
        }
    },
    afterPreload: function(floor, level) {
        this.update(true);
    },
    setHighlights: function(_highlights) {
        for (var i in _highlights) this.highlights.push(_highlights[i]);
    },
    clearHighlights: function() {
        this.highlights = [];
    },
    setDisplaying: function(_displaying) {
        for (var i in _displaying) this.displaying.push(_displaying[i]);
    },
    clearDisplaying: function() {
        this.displaying = [];
    },
    findNearestNodeOnFloor: function(floor, position, hasNeighbours) {
        if (!(floor instanceof Floor)) return false;
        var min = Infinity;
        var node = false;
        var _node;
        for (var i in floor.nodes) {
            _node = floor.nodes[i];
            if (_node.neighbours && !(_node.neighbours.length > 0)) {
                continue;
            }
            var d = vec2.distance(position, _node.position2d);
            if (d < min) {
                node = _node;
                min = d;
            }
        }
        return node;
    },
    setZoom: function(percentage) {
        var T = this.getTransformer();
        T.setZoomPercentage(percentage);
    },
    zoomIn: function() {
        this.mapMover.mapTransformer.zoomIn();
    },
    zoomOut: function() {
        this.mapMover.mapTransformer.zoomOut();
    },
    redraw: function() {
        if (this.renderer) {
            this.renderer.damage();
        }
    },
    getPOILocationOnMap: function(poi) {
        return this.poisRenderer.getPOILocationOnMap(poi);
    },
    getPOIOverlayLocationOnMap: function(poi) {
        return this.poisRenderer.getPOIOverlayLocationOnMap(poi);
    },
    onMapUpdate: function() {
        this.wayfinder.events.trigger("map-update", redrawAll);
    }
});

var Map2DFallback = Map2D.extend({
    init: function(wayfinder) {
        this.wayfinder = false;
        if (wayfinder instanceof Wayfinder) this.wayfinder = wayfinder;
        this.currentFloorID = 0;
        this.highlights = new Array();
        this.LODImages = new Array();
        this.onPOIClick = false;
        this.wayfinder.cbOnPositionUpdate = ClassCallback(this, this.onPositionUpdate);
        this.map = $("<div id='" + this.wayfinder.options.map + "_fallback''></div>");
        $("#" + this.wayfinder.options.map).parent().append(this.map);
        this.map.text("Your browser does not support this application. Please upgrade your browser.");
    },
    update: function() {
        if (this.currentFloorID > 0) {
            var img = this.getCurrentLOD(this.currentFloorID, 0, 0);
            log(this.currentFloorID, img);
            if (img) {
                this.map.append(img);
            }
        }
    },
    fitPathInView: function() {},
    fitMultiplePOIsInView: function() {},
    resize: function(width, height) {},
    zoomIn: function() {},
    zoomOut: function() {},
    addRenderers: function() {},
    redraw: function() {}
});

var Map2DMover = Class.extend({
    init: function(view, options, cbUpdate) {
        this.view = view;
        this.options = options;
        this.cbUpdate = cbUpdate;
        this.cbOnClick = false;
        this.cbOnLongClick = false;
        this.mouseDelta = vec2.create();
        this.mouseDown = false;
        this.mouseDelta = vec2.create();
        this.smoothPanning = true;
        this.dragTimeout = null;
        this.panInterval = 10;
        this.panSensitivity = .3;
        this.lastPinch = 0;
        this.rendering = false;
        this.lastDraw = -1;
        this.waitForFullRedraw = 300;
        this.fullRedrawTimer = null;
        this._dragVec = vec2.create();
        this.zeroVec = vec2.create();
        this.hammer = null;
        this.setup();
    },
    setup: function() {
        this.mapTransformer = new Map2DTransformer(vec2.fromValues(this.options.mapSize[0], this.options.mapSize[1]), vec2.fromValues(this.view.offsetWidth, this.view.offsetHeight), true, this.options);
        if (!this.options.disableMap2DMovement) {
            this.bindEvents();
        } else {}
    },
    bindEvents: function() {
        this.hammer = new Hammer(this.view);
        this.hammer.get("pinch").set({
            enable: true
        });
        this.hammer.on("pinch", ClassCallback(this, this.onPinch));
        this.hammer.on("hold", ClassCallback(this, this.onHold));
        this.hammer.on("tap", ClassCallback(this, this.onTap));
        this.hammer.on("release", ClassCallback(this, this.stop));
        this.hammer.on("pan", ClassCallback(this, this.onDrag));
        this.hammer.on("panend", ClassCallback(this, this.onEndDrag));
        this.hammer.on("panstart", ClassCallback(this, this.onStartDrag));
        this.bindMouseWheel(ClassCallback(this, this.onWheel));
    },
    stop: function(event) {
        var me = this;
        this.cbUpdate(true);
        this.lastPinch = 0;
        this.mouseDelta = vec2.create();
    },
    getRelativeMousePosition: function(v) {
        var left = this.view.getBoundingClientRect().left + document.body.scrollLeft;
        var top = this.view.getBoundingClientRect().top + document.body.scrollTop;
        var translatePoint = vec2.sub(vec2.create(), v, vec2.fromValues(left, top));
        translatePoint = this.mapTransformer.inverseTransformPoint(translatePoint);
        return translatePoint;
    },
    bindMouseWheel: function(callback) {
        if (this.view.addEventListener) {
            this.view.addEventListener("mousewheel", callback, false);
            this.view.addEventListener("DOMMouseScroll", callback, false);
        } else {
            this.view.attachEvent("onmousewheel", callback);
        }
    },
    onStartDrag: function(event) {
        this.stop();
        this.mouseDelta = vec2.fromValues(event.deltaX, event.deltaY);
    },
    onDrag: function(event) {
        event.preventDefault();
        if (!this.rendering && event.type == "pan") {
            var v = vec2.fromValues(event.deltaX, event.deltaY);
            vec2.scale(v, v, this.mapTransformer.getViewScale());
            var me = this;
            var panVector = vec2.sub(this._dragVec, this.mouseDelta, v);
            this.pan(panVector, false);
            this.mouseDelta = v;
        }
    },
    pan: function(panVector, redrawAll) {
        this.rendering = true;
        if (typeof redrawAll === "undefined") redrawAll = true;
        if (this.options.map2DRotation !== 0) {
            var len = vec2.len(panVector);
            panVector = this.mapTransformer.rotatePointAroundCenter(panVector, this.zeroVec, -this.options.map2DRotation);
            vec2.normalize(panVector, panVector);
            vec2.scale(panVector, panVector, len);
        }
        this.mapTransformer.move(panVector);
        if (this.cbUpdate && typeof this.cbUpdate === "function") {
            this.cbUpdate(redrawAll);
            this.lastDraw = new Date().getTime();
        }
        if (this.fullRedrawTimer === null) {
            this.fullRedrawTimer = setTimeout(ClassCallback(this, this.checkFullDraw), this.waitForFullRedraw);
        }
        this.rendering = false;
    },
    checkFullDraw: function() {
        var time = new Date().getTime();
        if (this.lastDraw > 0 && time - this.lastDraw > this.waitForFullRedraw) {
            if (typeof this.cbUpdate === "function") {
                this.cbUpdate(true);
            }
            this.fullRedrawTimer = null;
            this.lastDraw = -1;
        } else if (this.lastDraw !== -1) {
            this.fullRedrawTimer = setTimeout(ClassCallback(this, this.checkFullDraw), this.waitForFullRedraw);
        }
    },
    onEndDrag: function(event) {
        if (event !== undefined && event.type === "panend") {
            event.preventDefault();
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            var velocity = vec2.fromValues(event.velocityX, event.velocityY);
            if (this.smoothPanning && vec2.sqrLen(velocity) > .3) {
                var dragLength = vec2.fromValues(event.deltaX, event.deltaY);
                vec2.sub(dragLength, this.mouseDelta, dragLength);
                var smoothDistance = vec2.create();
                vec2.multiply(smoothDistance, dragLength, velocity);
                var me = this;
                var smoothScrollTimer = function() {
                    var distance = vec2.create();
                    vec2.div(distance, smoothDistance, vec2.fromValues(13, 13));
                    vec2.sub(smoothDistance, smoothDistance, distance);
                    var len = vec2.sqrLen(distance);
                    if (len > 3) {
                        if (me.timeout) clearTimeout(me.timeout);
                        me.timeout = setTimeout(smoothScrollTimer, me.panInterval);
                        if (!this.rendering) {
                            var v = vec2.negate(vec2.create(), distance);
                            me.pan(v, false);
                        }
                    } else {
                        me.pan(vec2.create(), true);
                        me.lastDraw = -1;
                    }
                };
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(smoothScrollTimer, this.panInterval);
            }
            this.mouseDelta = vec2.create();
            this.pan(vec2.create(), true);
            this.lastDraw = -1;
        }
    },
    onHold: function(event) {
        if (this.cbOnLongClick && typeof this.cbOnLongClick === "function") {
            this.cbOnLongClick(vec2.fromValues(event.center.x, event.center.y));
        }
    },
    onTap: function(event) {
        event.preventDefault();
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.cbOnClick && typeof this.cbOnClick === "function") {
            this.cbOnClick(this.getRelativeMousePosition(vec2.fromValues(event.center.x, event.center.y)));
        }
    },
    onWheel: function(event) {
        event = window.event || event;
        if (event.preventDefault) event.preventDefault(); else event.returnValue = false;
        var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
        var sign = function(a) {
            if (a < 0) return -1;
            if (a > 0) return 1;
            return 0;
        };
        var direction = 0;
        if (typeof delta != "undefined") direction = sign(delta); else if (typeof event.detail != "undefined") direction = -sign(event.detail);
        if (direction > 0) this.mapTransformer.zoomIn(); else if (direction < 0) this.mapTransformer.zoomOut(); else return;
        if (this.cbUpdate && typeof this.cbUpdate === "function") {
            this.cbUpdate(true);
        }
    },
    onPinch: function(event) {
        event.preventDefault();
        if (!this.rendering && event) {
            if (this.lastPinch === 0) {
                this.lastPinch = this.mapTransformer.getZoom();
            }
            var scale = this.lastPinch * event.scale;
            this.pinch(scale);
        }
    },
    pinch: function(scale) {
        this.rendering = true;
        if (scale !== 0) {
            this.mapTransformer.setZoom(scale);
            if (this.cbUpdate && typeof this.cbUpdate === "function") {
                this.cbUpdate(true);
            }
        }
        this.rendering = false;
    },
    onDoubleTap: function(event) {
        var center = event.center;
        var newZoom = this.mapTransformer.getZoom() + this.mapTransformer.getZoomStep() * 2;
        var v = vec2.create();
        vec2.sub(v, vec2.fromValues(center.pageX, center.pageY), vec2.fromValues(this.view.getBoundingClientRect().left, this.view.getBoundingClientRect().top));
        var v2 = this.mapTransformer.inverseTransformPoint(center.pageX, center.pageY);
        this.mapTransformer.setPosition(v2.x, v2.y);
        if (this.cbUpdate && typeof this.cbUpdate === "function") {
            this.cbUpdate(true);
        }
    },
    onZoomInPressed: function(event) {
        this.mapTransformer.zoomIn();
        if (this.cbUpdate && typeof this.cbUpdate === "function") {
            this.cbUpdate(true);
        }
        this.zoomTimer = setTimeout(ClassCallback(this, this.onZoomInPressed), this.zoomInterval);
    },
    onZoomOutPressed: function(event) {
        this.mapTransformer.zoomOut();
        if (this.cbUpdate && typeof this.cbUpdate === "function") {
            this.cbUpdate(true);
        }
        this.zoomTimer = setTimeout(ClassCallback(this, this.onZoomOutPressed), this.zoomInterval);
    },
    onZoomEnd: function() {
        if (this.zoomTimer !== false) {
            clearTimeout(this.zoomTimer);
            this.zoomTimer = false;
        }
        if (this.cbUpdate && typeof this.cbUpdate === "function") {
            this.cbUpdate(true);
        }
    },
    viewScale: function() {
        var view = vec2.fromValues(this.view.offsetWidth, this.view.offsetHeight);
        var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName("body")[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight;
        var win = vec2.fromValues(x, y);
        return vec2.sqrLen(view) / vec2.sqrLen(win);
    }
});

var Map2DTransformer = Class.extend({
    init: function(_mapSize, _viewSize, _centering, _options) {
        this.position = vec2.create();
        this.zoom = 1;
        this.options = _options;
        this.maxRange = _options ? _options.maxLOD + 1 : 3;
        this.mapSize = _mapSize;
        this.viewSize = _viewSize;
        this.viewScale = 1;
        this.zoomRange = vec2.fromValues(.1, 3 * this.viewScale);
        this.zoomSteps = this.maxRange * 10;
        this.centering = _centering !== undefined ? _centering : true;
        this.offsetX = 0;
        this.offsetY = 0;
        this.padding = this.options.pathZoomPadding !== undefined ? this.options.pathZoomPadding : 0;
        this.centerIfZoomedOut();
        this.cbOnZoomChange = null;
    },
    getPosition: function() {
        return this.position;
    },
    getViewSize: function() {
        return this.viewSize;
    },
    getViewScale: function() {
        return this.viewScale;
    },
    getMapPosition: function() {
        return vec2.negate(vec2.create(), this.position);
    },
    getZoomedMapPosition: function() {
        return vec2.negate(vec2.create(), this.getZoomedPosition());
    },
    getZoomedPosition: function() {
        return vec2.scale(vec2.create(), this.position, this.zoom);
    },
    getX: function() {
        return this.position[0];
    },
    getY: function() {
        return this.position[1];
    },
    getZoomedX: function() {
        return this.position[0] * this.zoom;
    },
    getZoomedY: function() {
        return this.position[1] * this.zoom;
    },
    getZoom: function() {
        return this.zoom;
    },
    getZoomRange: function() {
        return (this.zoomRange[1] * this.viewScale - this.zoomRange[0]) / this.zoomSteps;
    },
    getZoomStep: function() {
        return (this.zoomRange[1] - this.zoomRange[0]) / this.zoomSteps;
    },
    setOffset: function(offsetX, offsetY) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    },
    setPosition: function(_x, _y) {
        this.position[0] = _x;
        this.position[1] = _y;
        this.position[0] = Math.min(this.position[0], this.getMapWidth() - this.getUnzoomedViewWidth());
        this.position[1] = Math.min(this.position[1], this.getMapHeight() - this.getUnzoomedViewHeight());
        this.position[0] = Math.max(this.position[0], 0);
        this.position[1] = Math.max(this.position[1], 0);
        this.centerIfZoomedOut();
    },
    setZoomedPosition: function(x, y) {
        this.setPosition(x / this.getZoom(), y / this.getZoom());
    },
    move: function(delta) {
        this.setPosition(this.position[0] + delta[0] / this.getZoom(), this.position[1] + delta[1] / this.getZoom());
    },
    setViewSize: function(_viewSize) {
        this.viewSize = _viewSize;
        var minLen = Math.min(this.viewSize[0], this.viewSize[1]);
        var maxLen = Math.max(this.viewSize[0], this.viewSize[1]);
        this.zoomRange[0] = minLen / this.mapSize[0];
        this.zoomRange[1] = Math.max(this.options.maxLOD, this.options.maxLOD * 2 * (this.mapSize[0] / maxLen));
    },
    setViewScale: function(_viewScale) {
        this.viewScale = _viewScale;
    },
    setZoom: function(_zoom) {
        if (isNaN(_zoom)) {
            console.warn("setZoom: Is not a number", _zoom);
            return;
        }
        var oldZoomWidth = this.getUnzoomedViewWidth();
        var oldZoomHeight = this.getUnzoomedViewHeight();
        this.zoom = _zoom;
        if (this.zoom < this.zoomRange[0]) this.zoom = this.zoomRange[0];
        if (this.zoom > this.zoomRange[1] * this.viewScale) this.zoom = this.zoomRange[1] * this.viewScale;
        var viewWidthDelta = this.getUnzoomedViewWidth() - oldZoomWidth;
        var viewHeightDelta = this.getUnzoomedViewHeight() - oldZoomHeight;
        this.setPosition(this.getX() - viewWidthDelta / 2, this.getY() - viewHeightDelta / 2);
        this.centerIfZoomedOut();
        if (typeof this.cbOnZoomChange === "function") {
            var zoomPercentage = (this.zoomRange[1] - this.zoom) / (this.zoomRange[1] - this.zoomRange[0]);
            this.cbOnZoomChange(zoomPercentage);
        }
    },
    setZoomPercentage: function(percentage) {
        var zoom = this.zoomRange[1] - (this.zoomRange[1] - this.zoomRange[0]) * (1 - percentage);
        this.setZoom(zoom);
    },
    center: function() {
        if (this.centering) {
            this.position[0] = -((this.getUnzoomedViewWidth() - this.getMapWidth()) / 2) - this.offsetX;
            this.position[1] = -((this.getUnzoomedViewHeight() - this.getMapHeight()) / 2) + this.offsetY;
        }
    },
    centerIfZoomedOut: function() {
        if (!this.centering) return;
        if (this.getUnzoomedViewWidth() >= this.getMapWidth()) this.position[0] = -((this.getUnzoomedViewWidth() - this.getMapWidth()) / 2) - this.offsetX;
        if (this.getUnzoomedViewHeight() >= this.getMapHeight()) this.position[1] = -((this.getUnzoomedViewHeight() - this.getMapHeight()) / 2) + this.offsetY;
    },
    zoomIn: function() {
        this.setZoom(this.getZoom() + this.getZoomStep());
    },
    zoomOut: function() {
        this.setZoom(this.getZoom() - this.getZoomStep());
    },
    zoomToFit: function() {
        if (this.mapSize[0] > this.mapSize[1]) this.zoom = this.viewSize[0] / this.mapSize[0]; else this.zoom = this.viewSize[1] / this.mapSize[1];
        if (this.getZoomedMapHeight() > this.getViewHeight()) this.zoom = Math.min(this.viewSize[0], this.viewSize[1]) / Math.min(this.mapSize[0], this.mapSize[1]);
        this.setZoom(this.zoom);
    },
    getMapWidth: function() {
        return this.mapSize[0];
    },
    getMapHeight: function() {
        return this.mapSize[1];
    },
    getZoomedMapWidth: function() {
        return this.mapSize[0] * this.zoom;
    },
    getZoomedMapHeight: function() {
        return this.mapSize[1] * this.zoom;
    },
    getViewWidth: function() {
        return this.viewSize[0];
    },
    getViewHeight: function() {
        return this.viewSize[1];
    },
    getUnzoomedViewWidth: function() {
        return this.viewSize[0] / this.zoom;
    },
    getUnzoomedViewHeight: function() {
        return this.viewSize[1] / this.zoom;
    },
    transformPoint: function(point) {
        var translatedPoint = vec2.add(vec2.create(), this.getZoomedMapPosition(), vec2.scale(vec2.create(), point, this.zoom));
        if (this.options.map2DRotation !== 0) {
            return this.rotatePointAroundCenter(translatedPoint, vec2.fromValues(this.getViewWidth() / 2, this.getViewHeight() / 2), this.options.map2DRotation);
        }
        return translatedPoint;
    },
    inverseTransformPoint: function(point) {
        if (this.options.map2DRotation !== 0) {
            var center = vec2.fromValues(this.getViewWidth() / (2 * this.getViewScale()), this.getViewHeight() / (2 * this.getViewScale()));
            point = this.rotatePointAroundCenter(point, center, -this.options.map2DRotation);
        }
        vec2.scale(point, point, this.getViewScale());
        vec2.add(point, point, this.getZoomedPosition());
        vec2.scale(point, point, 1 / this.zoom);
        return point;
    },
    inverseScale: function(point) {
        return vec2.scale(vec2.create(), point, 1 / this.getViewScale());
    },
    getDrawingArea: function() {
        return vec2.add(vec2.create(), this.viewSize, this.getZoomedPosition());
    },
    rotatePoint: function(point, angle) {
        var x = point[0] * Math.cos(angle) - point[1] * Math.sin(angle);
        var y = point[1] * Math.cos(angle) + point[0] * Math.sin(angle);
        return vec2.fromValues(x, y);
    },
    rotatePointAroundCenter: function(point, center, angle) {
        angle = angle * Math.PI / 180;
        return vec2.fromValues(Math.cos(angle) * (point[0] - center[0]) - Math.sin(angle) * (point[1] - center[1]) + center[0], Math.sin(angle) * (point[0] - center[0]) + Math.cos(angle) * (point[1] - center[1]) + center[1]);
    }
});

var Path2D = Class.extend({
    init: function() {
        this.nodes = [];
    },
    isEmpty: function() {
        if (this.nodes.length === 0) return true;
        return false;
    },
    getBounds: function(fnTransform) {
        var bounds = {
            min: vec2.create(),
            max: vec2.create(),
            center: vec2.create(),
            size: vec2.create()
        };
        if (this.nodes.length > 0) {
            bounds.min[0] = this.nodes[0].position2d[0];
            bounds.min[1] = this.nodes[0].position2d[1];
            bounds.max[0] = this.nodes[0].position2d[0];
            bounds.max[1] = this.nodes[0].position2d[1];
            for (var i = 1; i < this.nodes.length; i++) {
                var x = this.nodes[i].position2d[0];
                var y = this.nodes[i].position2d[1];
                if (x < bounds.min[0]) bounds.min[0] = x;
                if (y < bounds.min[1]) bounds.min[1] = y;
                if (x > bounds.max[0]) bounds.max[0] = x;
                if (y > bounds.max[1]) bounds.max[1] = y;
            }
        }
        if (fnTransform && typeof fnTransform === "function") {
            bounds.min = fnTransform(bounds.min);
            bounds.max = fnTransform(bounds.max);
        }
        bounds.size[0] = bounds.max[0] - bounds.min[0];
        bounds.size[1] = bounds.max[1] - bounds.min[1];
        bounds.center[0] = bounds.min[0] + bounds.size[0] / 2;
        bounds.center[1] = bounds.min[1] + bounds.size[1] / 2;
        return bounds;
    },
    getDistance: function() {
        var length = 0;
        if (this.nodes.length == 0) {
            return length;
        }
        var last = this.nodes[0];
        for (var i = 1, len = this.nodes.length; i < len; i++) {
            length += vec2.dist(last.position2d, this.nodes[i].position2d);
            length += last.weight;
            last = this.nodes[i];
        }
        return length;
    }
});

var PathFinder2D = Class.extend({
    init: function(nodes) {
        this.nodes = nodes;
        this.Infinity = Infinity;
        this.reset();
    },
    reset: function() {
        this.dist = {};
        this.previous = {};
        this.Q = [];
        this.searched = {};
    },
    getNodeWithSmallestDistance: function() {
        var min = Infinity;
        var index = 0;
        for (var i = 0; i < this.Q.length; i++) {
            if (this.dist[this.Q[i]] < min) {
                min = this.dist[this.Q[i]];
                index = i;
            }
        }
        return index;
    },
    isSearched: function(node_id) {
        return node_id in this.searched;
    },
    decreaseKey: function(node_id) {
        var index = 0;
        for (;index < this.Q.length; index++) {
            if (this.Q[index] == node_id) break;
        }
        for (var i = index - 1; i > 0; i--) {
            if (this.dist[this.Q[index]] < this.dist[this.Q[i]]) {
                var tmp = this.Q[i];
                this.Q[i] = this.Q[index];
                this.Q[index] = tmp;
                index = i;
            } else break;
        }
    },
    distanceBetween: function(a, b) {
        if (a && a.position && b && b.position) {
            var weight = 0;
            if (a.floor_id != b.floor_id) {
                weight = .1;
            }
            return vec3.len(vec3.fromValues(b.position[0] - a.position[0], b.position[1] - a.position[1], b.position[2] - a.position[2])) + weight;
        } else {
            return Infinity;
        }
    },
    find: function(source, dest, options) {
        this.reset();
        if (!(source in this.nodes) || !(dest in this.nodes)) return false;
        for (var i in this.nodes) {
            if (options && options.ignoreTypes && options.ignoreTypes.indexOf(this.nodes[i].type) > -1) {
                continue;
            }
            this.dist[i] = this.Infinity;
            this.previous[i] = null;
            this.Q.push(i);
        }
        this.dist[source] = 0;
        while (this.Q.length > 0) {
            var nodeIndex = this.getNodeWithSmallestDistance();
            var u = this.Q[nodeIndex];
            if (this.dist[u] == this.Infinity) {
                break;
            }
            this.Q.splice(nodeIndex, 1);
            this.searched[u] = true;
            if (u == dest) {
                var path = new Path2D();
                u = dest;
                while (this.previous[u] !== null) {
                    path.nodes.push(this.nodes[u]);
                    u = this.previous[u];
                }
                path.nodes.push(this.nodes[source]);
                path.nodes.reverse();
                return path;
            }
            for (var i = 0; i < this.nodes[u].neighbours.length; i++) {
                var neighbour = this.nodes[u].neighbours[i];
                if (this.isSearched(neighbour.id)) continue;
                var alt = this.dist[u] + this.distanceBetween(this.nodes[u], neighbour) + neighbour.weight;
                if (alt < this.dist[neighbour.id]) {
                    this.dist[neighbour.id] = alt;
                    this.previous[neighbour.id] = u;
                    this.decreaseKey(neighbour.id);
                }
            }
        }
        return false;
    },
    pathToText: function(path) {
        var p2t = [];
        var node = null;
        var step = null;
        var a, b = null;
        var angle = 0;
        if (path.length > 2) {
            step = {};
            if (nodes[path[0]] && nodes[path[0]].rotation) {
                var kioskAngle = nodes[path[0]].rotation[1];
                b = vec2.subtract(vec2.create(), vec2.fromValues(nodes[path[0]].position[0], nodes[path[0]].position[2]), vec2.fromValues(nodes[path[1]].position[0], nodes[path[1]].position[2]));
                b = vec2.normalize(b, b);
                angle = Math.round(Math.acos(vec2.dot(b, vec2.fromValues(0, 1))) * (180 / Math.PI));
                angle += kioskAngle;
                if (angle < 0) {
                    angle = 360 + angle;
                }
                p2t.push({
                    angle: angle,
                    distance: 0
                });
                angle = 0;
            }
            for (var i = 0; i < path.length; i++) {
                if (i < path.length - 1) {
                    step = {};
                    a = nodes[path[i]];
                    b = nodes[path[i + 1]];
                    step.distance = Math.round(distanceBetween(path[i], path[i + 1]));
                    if (i < path.length - 2) {
                        angle = calc2Dangle(nodes[path[i]].position, nodes[path[i + 1]].position, nodes[path[i + 2]].position);
                        step.angle = angle;
                    } else step.angle = 0;
                    if (nodes[path[i]].floor && nodes[path[i + 1]].floor && nodes[path[i]].floor.index != nodes[path[i + 1]].floor.index) {
                        step.go_to_floor = nodes[path[i + 1]].floor.id;
                    }
                    if (nodes[path[i]].type) step.type = nodes[path[i]].type;
                    step.aNode = a;
                    step.bNode = b;
                    p2t.push(step);
                }
            }
        }
        return p2t;
    }
});

var LocationProvider = Class.extend({
    init: function(device) {
        this.device = device;
        this.locator;
    },
    setLocator: function(locator) {
        this.locator = locator;
    },
    setDevice: function(device) {
        this.device = device;
    },
    start: function() {},
    stop: function() {},
    push: function(reading) {}
});

var LocationManager = Class.extend({
    init: function(wayfinder) {
        this.wayfinder = wayfinder;
        this.locator = new Locator(this);
        this.providers = {};
        this.timer;
        this.time = 1500;
        this.locateCount = 0;
        this.currentLocation = false;
        console.log("LocationManager");
    },
    cbOnLocationChange: function(location) {},
    addProvider: function() {
        if (arguments.length > 0) {
            function construct(constructor, args) {
                function F() {
                    return constructor.apply(this, args);
                }
                F.prototype = constructor.prototype;
                return new F();
            }
            var args = Array.prototype.slice.call(arguments);
            var type = args.shift();
            var klass = args.shift();
            var provider = construct(klass, args);
            provider.setLocator(this.locator);
            provider.setDevice(this.wayfinder.device);
            this.providers[type] = provider;
        } else {
            console.warn("LocationManager", "Provider not given");
        }
    },
    hasProvider: function(type) {
        return this.providers[type];
    },
    calculate: function() {
        this.locator.calculate();
        if (this.locateCount > 0) {
            this.time = 1e3;
        }
        this.timer = setTimeout(ClassCallback(this, this.calculate), this.time);
    },
    start: function(callback) {
        console.log("start");
        for (var i in this.providers) {
            this.providers[i].start();
        }
        this.timer = setTimeout(ClassCallback(this, this.calculate), this.time);
    },
    isStarted: function() {
        return this.timer;
    },
    stop: function() {
        try {
            for (var i in this.providers) {
                this.providers[i].stop();
            }
        } catch (err) {
            console.log("Beacon provides failed to stop", err);
        }
        clearTimeout(this.timer);
    },
    locationChange: function(_location) {
        this.currentLocation = _location;
        this.locateCount++;
        if (typeof this.cbOnLocationChange == "function") {
            this.cbOnLocationChange(_location, this.locateCount);
        }
        if (this.locateCount == 1) {
            this.wayfinder.events.trigger("location-success");
        }
    },
    getCurrentPosition: function() {
        return this.currentLocation;
    },
    getFailCount: function() {
        return this.locator.failCount;
    },
    pushReading: function(type, reading) {
        var provider = this.providers[type];
        if (provider) {
            provider.push(reading);
        }
    }
});

var GeolocationProvider = LocationProvider.extend({
    init: function(device) {
        this._super(device);
        this.wayfinder = device.wayfinder;
        this.buildingLocation = {
            latitude: 0,
            longitude: 0,
            direction: 0,
            scale: 1
        };
        this.cbOnPositionUpdate = false;
        this.currentPosition = vec2.create();
        this.currentGeoPosition = vec2.create();
        this.positionWatch = false;
        this.mapImageSize = 2048;
        this.mapLODLevels = 2;
        this.mapSize = Math.floor(this.mapImageSize / Math.pow(2, this.mapLODLevels - 1));
        this.timeoutCount = 0;
        this.epsg = "EPSG:2958";
    },
    getUTMZone: function(longitude) {
        return Math.floor((longitude + 180) / 6) + 1;
    },
    getCurrentPosition: function() {
        return this.currentPosition;
    },
    setBuildingLocation: function(location) {
        this.buildingLocation.latitude = parseFloat(location.latitude);
        this.buildingLocation.longitude = parseFloat(location.longitude);
        this.buildingLocation.direction = parseFloat(location.direction);
        this.buildingLocation.scale = parseFloat(location.scale);
    },
    getBuildingPosition: function(loc) {
        return vec2.fromValues(loc.latitude, loc.longitude);
    },
    getBuildingPositionUTM: function(pos) {
        Proj4js.defs[this.epsg] = "+proj=utm +zone=" + this.getUTMZone(pos[1]) + " +ellps=GRS80 +units=m +no_defs";
        var proj = new Proj4js.Proj(this.epsg);
        return Proj4jsToVector(Proj4js.transform(Proj4js.WGS84, proj, VectorToProj4js(pos)));
    },
    setPosition: function(position) {
        var buildingLocation = this.getBuildingPosition(this.wayfinder.building.location);
        var direction = this.wayfinder.building.location.direction;
        this.currentGeoPosition[0] = parseFloat(position.coords.latitude);
        this.currentGeoPosition[1] = parseFloat(position.coords.longitude);
        Proj4js.defs[this.epsg] = "+proj=utm +zone=" + this.getUTMZone(this.currentGeoPosition[1]) + " +ellps=GRS80 +units=m +no_defs";
        var proj = new Proj4js.Proj(this.epsg);
        var size = this.wayfinder.building.location.scale * this.mapSize;
        var p0 = this.getBuildingPositionUTM(buildingLocation);
        var origin = VectorToProj4js(p0);
        var p1 = Proj4js.transform(proj, Proj4js.WGS84, new Proj4js.Point(origin.x + size, origin.y));
        var p2 = Proj4js.transform(proj, Proj4js.WGS84, new Proj4js.Point(origin.x + size, origin.y - size));
        var p3 = Proj4js.transform(proj, Proj4js.WGS84, new Proj4js.Point(origin.x, origin.y - size));
        p1 = RotateGeo(buildingLocation, Proj4jsToVector(p1), direction);
        p2 = RotateGeo(buildingLocation, Proj4jsToVector(p2), direction);
        p3 = RotateGeo(buildingLocation, Proj4jsToVector(p3), direction);
        p1 = Proj4jsToVector(Proj4js.transform(Proj4js.WGS84, proj, VectorToProj4js(p1)));
        p2 = Proj4jsToVector(Proj4js.transform(Proj4js.WGS84, proj, VectorToProj4js(p2)));
        p3 = Proj4jsToVector(Proj4js.transform(Proj4js.WGS84, proj, VectorToProj4js(p3)));
        var userPosition = Proj4jsToVector(Proj4js.transform(Proj4js.WGS84, proj, VectorToProj4js(this.currentGeoPosition)));
        this.currentPosition = vec2.create();
        var v0 = vec2.sub(vec2.create(), p3, p0);
        var v1 = vec2.sub(vec2.create(), p3, p2);
        var v2 = vec2.sub(vec2.create(), p1, p2);
        var v3 = vec2.sub(vec2.create(), p1, p0);
        var sp0 = vec2.sub(vec2.create(), userPosition, p0);
        var sp2 = vec2.sub(vec2.create(), userPosition, p2);
        if (vec2.dot(v0, sp0) >= 0 && vec2.dot(v1, sp2) >= 0 && vec2.dot(v2, sp2) >= 0 && vec2.dot(v3, sp0) >= 0) {
            var projX = ProjectToLine(p0, p1, userPosition);
            var projY = ProjectToLine(p0, p3, userPosition);
            var offsetX = vec2.len(vec2.sub(vec2.create(), projX, p0)) / vec2.len(vec2.sub(vec2.create(), p1, p0));
            var offsetY = vec2.len(vec2.sub(vec2.create(), projY, p0)) / vec2.len(vec2.sub(vec2.create(), p3, p0));
            this.currentPosition[0] = offsetX * this.mapSize;
            this.currentPosition[1] = offsetY * this.mapSize;
            this.locator.push(position.timestamp, "gps", [ this.currentPosition[0], this.currentPosition[1] ], position.coords.accuracy, 10, wayfinder.getCurrentFloor(), 0);
        } else {
            console.log("User position is outside the map rectangle", {
                coords: [ sp0, sp2 ]
            });
        }
    },
    start: function() {
        if (!navigator.geolocation) return;
        console.log("GeolocationProvider.start", this.wayfinder);
        this.setBuildingLocation(this.wayfinder.building.location);
        var scope = this;
        this.positionWatch = navigator.geolocation.watchPosition(ClassCallback(this, this.setPosition), function(error) {
            if (error.code == error.TIMEOUT) {
                scope.timeoutCount++;
                return;
            }
            new UserMessage("location_unavailable", "warning", scope.wayfinder);
            navigator.geolocation.clearWatch(scope.positionWatch);
            scope.positionWatch = false;
            this.locator.onProviderFailed("User position failed", error);
        }, {
            maximumAge: 3e3,
            timeout: 6e3,
            frequency: 3e3,
            enableHighAccuracy: true
        });
    },
    stopPositionWatch: function() {
        navigator.geolocation.clearWatch(this.positionWatch);
    }
});

var Locator = Class.extend({
    init: function(manager) {
        this.manager = manager;
        this.beacons = {};
        this.foundBeacons = {};
        this.lastLocation;
        this.lowBeaconCount = 0;
        this.SMALL = 1e-10;
        this.floors = [];
        this.failCount = 0;
    },
    onProviderFailed: function(message, data) {
        console.log("Location provider failed", message, data);
        this.manager.wayfinder.events.trigger("location-failed");
    },
    onProviderInitialSuccess: function() {
        this.manager.wayfinder.events.trigger("location-success");
    },
    push: function(id, type, location, strength, radius, floor, node) {
        console.log("New beacon reading", id, type, location, strength, radius);
        if (!location) {
            console.log("No location given for", id);
            return;
        }
        if (!radius) radius = 50;
        if (!this.beacons[id]) {
            this.beacons[id] = {
                id: id,
                type: type,
                location: location,
                radius: radius,
                strength: [],
                floor: floor,
                node: node
            };
        }
        if (node && node.id) {
            this.foundBeacons[node.id] = {
                id: id,
                type: type,
                location: location,
                radius: radius,
                strength: [],
                floor: floor,
                node: node
            };
        }
        this.beacons[id].strength.push(strength);
    },
    shallowCopyOBJ: function(source) {
        var target = {};
        for (var i in source) {
            if (source.hasOwnProperty(i)) {
                target[i] = source[i];
            }
        }
        return target;
    },
    median: function(numbers) {
        var median = 0, numsLen = numbers.length;
        numbers.sort();
        if (numsLen % 2 === 0) {
            median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
        } else if (numsLen == 1) {
            return numbers[0] * .9;
        } else {
            median = numbers[(numsLen - 1) / 2];
        }
        return median;
    },
    distance: function(p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    },
    circleCircleIntersection: function(p1, p2) {
        var d = this.distance(p1, p2), r1 = p1.radius, r2 = p2.radius;
        if (d >= r1 + r2 || d <= Math.abs(r1 - r2)) {
            return [];
        }
        var a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(r1 * r1 - a * a), x0 = p1.x + a * (p2.x - p1.x) / d, y0 = p1.y + a * (p2.y - p1.y) / d, rx = -(p2.y - p1.y) * (h / d), ry = -(p2.x - p1.x) * (h / d);
        return [ {
            x: x0 + rx,
            y: y0 - ry
        }, {
            x: x0 - rx,
            y: y0 + ry
        } ];
    },
    containedInCircles: function(point, circles) {
        for (var i = 0; i < circles.length; ++i) {
            if (this.distance(point, circles[i]) > circles[i].radius + this.SMALL) {
                return false;
            }
        }
        return true;
    },
    getCenter: function(points) {
        var center = {
            x: 0,
            y: 0
        };
        for (var i = 0; i < points.length; ++i) {
            center.x += points[i].x;
            center.y += points[i].y;
        }
        center.x /= points.length;
        center.y /= points.length;
        return center;
    },
    getIntersectionPoints: function(circles) {
        var ret = [];
        for (var i = 0; i < circles.length; ++i) {
            console.log("getIntersectionPoints", circles[i]);
            for (var j = i + 1; j < circles.length; ++j) {
                var intersect = this.circleCircleIntersection(circles[i], circles[j]);
                for (var k = 0; k < intersect.length; ++k) {
                    var p = intersect[k];
                    p.parentIndex = [ i, j ];
                    ret.push(p);
                }
            }
        }
        return ret;
    },
    calculateArea: function(points) {
        var area = 0, i, j, point1, point2;
        for (i = 0, j = points.length - 1; i < points.length; j = i, i++) {
            point1 = points[i].location;
            point2 = points[j].location;
            area += point1[0] * point2[1];
            area -= point1[1] * point2[0];
        }
        area /= 2;
        return area;
    },
    calculateCenter2: function(points) {
        var x = 0, y = 0, i, j, f, point1, point2;
        for (i = 0, j = points.length - 1; i < points.length; j = i, i++) {
            point1 = points[i].location;
            point2 = points[j].location;
            if (point1 && point2) {
                f = point1[0] * point2[1] - point2[0] * point1[1];
                x += (point1[0] + point2[0]) * f;
                y += (point1[1] + point2[1]) * f;
            } else {
                console.log("no location", points[i]);
            }
        }
        f = this.calculateArea(points) * 6;
        return [ x / f, y / f ];
    },
    calculateCenter: function(points) {
        var total = vec2.create();
        for (var i = 0; i < points.length; i++) {
            vec2.add(total, total, points[i].location);
        }
        return vec2.divide(total, total, vec2.fromValues(points.length, points.length));
    },
    calculateDistanceFromCentre: function(centre, poing) {},
    triangleArea: function(vertexA, vertexB, vertexC) {
        return Math.abs(((vertexA.x - vertexC.x) * (vertexB.y - vertexA.y) - (vertexA.x - vertexB.x) * (vertexC.y - vertexA.y)) * .5);
    },
    listTriples: function(N) {
        var fn = function(n, src, got, all) {
            if (n == 0) {
                if (got.length > 0) {
                    all[all.length] = got;
                }
                return;
            }
            for (var j = 0; j < src.length; j++) {
                fn(n - 1, src.slice(j + 1), got.concat([ src[j] ]), all);
            }
            return;
        };
        var triples = [];
        var indices = Array.apply(null, {
            length: N
        }).map(Number.call, Number);
        fn(3, indices, [], triples);
        return triples;
    },
    isInTriangle: function(newPoint, vertexA, vertexB, vertexC) {
        var v0 = [ vertexC.x - vertexA.x, vertexC.y - vertexA.y ];
        var v1 = [ vertexB.x - vertexA.x, vertexB.y - vertexA.y ];
        var v2 = [ newPoint.x - vertexA.x, newPoint.y - vertexA.y ];
        var dot00 = v0[0] * v0[0] + v0[1] * v0[1];
        var dot01 = v0[0] * v1[0] + v0[1] * v1[1];
        var dot02 = v0[0] * v2[0] + v0[1] * v2[1];
        var dot11 = v1[0] * v1[0] + v1[1] * v1[1];
        var dot12 = v1[0] * v2[0] + v1[1] * v2[1];
        var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
        return u >= 0 && v >= 0 && u + v < 1;
    },
    barycentricInterpolate: function(newPoint, vertexA, vertexB, vertexC) {
        var area = this.triangleArea(vertexA, vertexB, vertexC);
        var sub_area_1 = this.triangleArea(newPoint, vertexB, vertexC);
        var sub_area_2 = this.triangleArea(vertexA, newPoint, vertexC);
        var sub_area_3 = this.triangleArea(vertexA, vertexB, newPoint);
        return (sub_area_1 * vertexA.v + sub_area_2 * vertexB.v + sub_area_3 * vertexC.v) / area;
    },
    interpolate: function(newPoint, data) {
        var triangles = this.listTriples(data.length);
        var smallest_triangle_area = Number.MAX_VALUE;
        var smallest_triangle;
        for (t in triangles) {
            var vertexA = data[triangles[t][0]];
            var vertexB = data[triangles[t][1]];
            var vertexC = data[triangles[t][2]];
            var in_triangle = this.isInTriangle(newPoint, vertexA, vertexB, vertexC);
            if (in_triangle) {
                if (this.triangleArea(vertexA, vertexB, vertexC) < smallest_triangle_area) {
                    smallest_triangle = [ vertexA, vertexB, vertexC ];
                }
            }
        }
        return smallest_triangle ? this.barycentricInterpolate(newPoint, smallest_triangle[0], smallest_triangle[1], smallest_triangle[2]) : "Interpolation failed: newPoint isn't in a triangle";
    },
    findBarycentricCoordindate: function(p1, p2, p3) {
        var total = p1.pullValue + p2.pullValue + p3.pullValue;
        var loc = vec2.create();
        var _p2 = vec2.create();
        var _p3 = vec2.create();
        vec2.scale(loc, p1.location, p1.pullValue / total);
        vec2.scale(_p2, p2.location, p2.pullValue / total);
        vec2.scale(_p3, p3.location, p3.pullValue / total);
        vec2.add(loc, loc, _p2);
        vec2.add(loc, loc, _p3);
        return {
            location: loc,
            pullValue: Math.min(p1.pullValue, p2.pullValue, p3.pullValue)
        };
    },
    findLocation: function(data) {
        var _data = data.slice();
        var _newP = false;
        var i = 0;
        while (_data.length >= 3) {
            _newP = this.findBarycentricCoordindate(_data[0], _data[1], _data[2]);
            _data.splice(0, 2);
            _data.unshift(_newP);
        }
        return _newP;
    },
    calcStrength: function(beacon) {
        beacon.calcStrength = this.median(beacon.strength);
        beacon.calcRadius = beacon.calcStrength * beacon.radius;
        return beacon;
    },
    calculateLowPos: function() {
        var keys = Object.keys(this.beacons);
        console.log("Calculating backup location. Found beacons:", keys.length);
        if (keys.length > 1) {
            var a = this.calcStrength(this.beacons[keys[0]]);
            var b = this.calcStrength(this.beacons[keys[1]]);
            a.pullValue = a.calcStrength / (a.calcStrength + b.calcStrength) * 1 / (parseFloat(a.radius) / (parseFloat(a.radius) + parseFloat(b.radius)));
            b.pullValue = b.calcStrength / (a.calcStrength + b.calcStrength) * 1 / (parseFloat(b.radius) / (parseFloat(a.radius) + parseFloat(b.radius)));
            var dist = vec2.add(vec2.create(), a.location, b.location);
            var pull = a.pullValue / (a.pullValue + b.pullValue);
            var _dist = vec2.scale(vec2.create(), dist, pull);
            this.manager.locationChange({
                location: _dist,
                center: _dist,
                strength: 1,
                radius: 1,
                hotspots: [],
                floor: a.floor
            });
        } else {
            var beacon = this.beacons[keys[0]];
            if (WF_DEBUG) {
                console.log("Single position", beacon);
            }
            this.manager.locationChange({
                location: beacon.location,
                center: beacon.location,
                strength: 1,
                radius: 1,
                hotspots: [],
                floor: beacon.floor
            });
        }
    },
    clearBeacons: function() {
        this.beacons = {};
        this.foundBeacons = {};
    },
    calcFloor: function(floor, beacons) {
        this.floors.push(floor.index);
        if (this.floors.length > 3) {
            this.floors.shift();
        }
        var sum = 0;
        for (var i = 0; i < this.floors.length; i++) {
            sum += this.floors[i];
        }
        var index = Math.round(sum / this.floors.length);
        var _floor = false;
        for (var j = 0; j < beacons.length; j++) {
            if (beacons[j].floor.index == index) {
                return beacons[j].floor;
            }
        }
        return floor;
    },
    calculate: function() {
        var count = Object.keys(this.beacons).length;
        if (count < 3) {
            if (count > 0) {
                if (this.lowBeaconCount > 3) {
                    this.calculateLowPos();
                    this.clearBeacons();
                    this.lowBeaconCount = 0;
                    this.failCount--;
                }
                this.lowBeaconCount++;
            } else {
                this.failCount++;
            }
            console.info("Not enough beacons", count, "/", 3);
            return;
        } else {
            this.failCount = 0;
        }
        this.lowBeaconCount = 0;
        var _beacons = this.shallowCopyOBJ(this.beacons);
        this.beacons = {};
        var strength = 1;
        var totalStrength = 0;
        var radius = 0;
        var radiuses = [];
        var __beacons = [];
        for (var i in _beacons) {
            _beacons[i] = this.calcStrength(_beacons[i]);
            totalStrength += _beacons[i].calcStrength;
            strength = (strength + _beacons[i].calcStrength) / 2;
            radius += parseFloat(_beacons[i].radius);
            radiuses.push(parseFloat(_beacons[i].radius));
            __beacons.push(_beacons[i]);
        }
        var totalDist = 0;
        var center = this.calculateCenter(__beacons);
        var data = [];
        for (var i = 0; i < __beacons.length; i++) {
            __beacons[i].distance = vec2.dist(vec2.create(), center, __beacons[i].location);
            __beacons[i].pullValue = __beacons[i].calcStrength / totalStrength * 1 / (__beacons[i].radius / radius);
            totalDist += __beacons[i].distance;
        }
        __beacons.sort(function(a, b) {
            return a.pullValue - b.pullValue;
        });
        var pos = this.findLocation(__beacons);
        if (center && !isNaN(pos.location[0]) && !isNaN(pos.location[1])) {
            var floor = this.calcFloor(__beacons[__beacons.length - 1].floor, __beacons);
            this.clearBeacons();
            this.push("last.l.v", "last", pos.location, pos.pullValue / __beacons.length, radius / __beacons.length, floor);
            this.manager.locationChange({
                location: pos.location,
                center: center,
                strength: strength,
                radius: radius,
                hotspots: __beacons,
                floor: floor
            });
        }
    }
});

function Proj4jsToVector(p) {
    return vec2.fromValues(p.y, p.x);
}

function VectorToProj4js(p) {
    return new Proj4js.Point(p[1], p[0]);
}

function DegToRad(deg) {
    return deg / 180 * Math.PI;
}

function RadToDeg(rad) {
    return rad / Math.PI * 180;
}

function RotateGeo(origin, point, angle) {
    var rad = DegToRad(angle);
    return vec2.fromValues(origin[0] + (Math.sin(rad) * (point[1] - origin[1]) * Math.abs(Math.cos(DegToRad(origin[0]))) + Math.cos(rad) * (point[0] - origin[0])), origin[1] + (Math.cos(rad) * (point[1] - origin[1]) - Math.sin(rad) * (point[0] - origin[0]) / Math.abs(Math.cos(DegToRad(origin[0])))));
}

function ProjectToLine(lineStart, lineEnd, point) {
    var m = (lineEnd[1] - lineStart[1]) / (lineEnd[0] - lineStart[0]);
    if (Math.abs(m) === Infinity) {
        m = 1;
    }
    var b = lineStart[1] - m * lineStart[0];
    var x = (m * point[1] + point[0] - m * b) / (m * m + 1);
    var y = (m * m * point[1] + m * point[0] + b) / (m * m + 1);
    return vec2.fromValues(x, y);
}

var Proj4js = {
    defaultDatum: "WGS84",
    transform: function(a, c, b) {
        if (!a.readyToUse) return this.reportError("Proj4js initialization for:" + a.srsCode + " not yet complete"), 
        b;
        if (!c.readyToUse) return this.reportError("Proj4js initialization for:" + c.srsCode + " not yet complete"), 
        b;
        if (a.datum && c.datum && ((a.datum.datum_type == Proj4js.common.PJD_3PARAM || a.datum.datum_type == Proj4js.common.PJD_7PARAM) && "WGS84" != c.datumCode || (c.datum.datum_type == Proj4js.common.PJD_3PARAM || c.datum.datum_type == Proj4js.common.PJD_7PARAM) && "WGS84" != a.datumCode)) {
            var d = Proj4js.WGS84;
            this.transform(a, d, b);
            a = d;
        }
        "enu" != a.axis && this.adjust_axis(a, !1, b);
        "longlat" == a.projName ? (b.x *= Proj4js.common.D2R, b.y *= Proj4js.common.D2R) : (a.to_meter && (b.x *= a.to_meter, 
        b.y *= a.to_meter), a.inverse(b));
        a.from_greenwich && (b.x += a.from_greenwich);
        b = this.datum_transform(a.datum, c.datum, b);
        c.from_greenwich && (b.x -= c.from_greenwich);
        "longlat" == c.projName ? (b.x *= Proj4js.common.R2D, b.y *= Proj4js.common.R2D) : (c.forward(b), 
        c.to_meter && (b.x /= c.to_meter, b.y /= c.to_meter));
        "enu" != c.axis && this.adjust_axis(c, !0, b);
        return b;
    },
    datum_transform: function(a, c, b) {
        if (a.compare_datums(c) || a.datum_type == Proj4js.common.PJD_NODATUM || c.datum_type == Proj4js.common.PJD_NODATUM) return b;
        if (a.es != c.es || a.a != c.a || a.datum_type == Proj4js.common.PJD_3PARAM || a.datum_type == Proj4js.common.PJD_7PARAM || c.datum_type == Proj4js.common.PJD_3PARAM || c.datum_type == Proj4js.common.PJD_7PARAM) a.geodetic_to_geocentric(b), 
        (a.datum_type == Proj4js.common.PJD_3PARAM || a.datum_type == Proj4js.common.PJD_7PARAM) && a.geocentric_to_wgs84(b), 
        (c.datum_type == Proj4js.common.PJD_3PARAM || c.datum_type == Proj4js.common.PJD_7PARAM) && c.geocentric_from_wgs84(b), 
        c.geocentric_to_geodetic(b);
        return b;
    },
    adjust_axis: function(a, c, b) {
        for (var d = b.x, e = b.y, f = b.z || 0, g, i, h = 0; 3 > h; h++) if (!c || !(2 == h && void 0 === b.z)) switch (0 == h ? (g = d, 
        i = "x") : 1 == h ? (g = e, i = "y") : (g = f, i = "z"), a.axis[h]) {
          case "e":
            b[i] = g;
            break;

          case "w":
            b[i] = -g;
            break;

          case "n":
            b[i] = g;
            break;

          case "s":
            b[i] = -g;
            break;

          case "u":
            void 0 !== b[i] && (b.z = g);
            break;

          case "d":
            void 0 !== b[i] && (b.z = -g);
            break;

          default:
            return alert("ERROR: unknow axis (" + a.axis[h] + ") - check definition of " + a.projName), 
            null;
        }
        return b;
    },
    reportError: function() {},
    extend: function(a, c) {
        a = a || {};
        if (c) for (var b in c) {
            var d = c[b];
            void 0 !== d && (a[b] = d);
        }
        return a;
    },
    Class: function() {
        for (var a = function() {
            this.initialize.apply(this, arguments);
        }, c = {}, b, d = 0; d < arguments.length; ++d) b = "function" == typeof arguments[d] ? arguments[d].prototype : arguments[d], 
        Proj4js.extend(c, b);
        a.prototype = c;
        return a;
    },
    bind: function(a, c) {
        var b = Array.prototype.slice.apply(arguments, [ 2 ]);
        return function() {
            var d = b.concat(Array.prototype.slice.apply(arguments, [ 0 ]));
            return a.apply(c, d);
        };
    },
    scriptName: "proj4js-compressed.js",
    defsLookupService: "http://spatialreference.org/ref",
    libPath: null,
    getScriptLocation: function() {
        if (this.libPath) return this.libPath;
        for (var a = this.scriptName, c = a.length, b = document.getElementsByTagName("script"), d = 0; d < b.length; d++) {
            var e = b[d].getAttribute("src");
            if (e) {
                var f = e.lastIndexOf(a);
                if (-1 < f && f + c == e.length) {
                    this.libPath = e.slice(0, -c);
                    break;
                }
            }
        }
        return this.libPath || "";
    },
    loadScript: function(a, c, b, d) {
        var e = document.createElement("script");
        e.defer = !1;
        e.type = "text/javascript";
        e.id = a;
        e.src = a;
        e.onload = c;
        e.onerror = b;
        e.loadCheck = d;
        /MSIE/.test(navigator.userAgent) && (e.onreadystatechange = this.checkReadyState);
        document.getElementsByTagName("head")[0].appendChild(e);
    },
    checkReadyState: function() {
        if ("loaded" == this.readyState) if (this.loadCheck()) this.onload(); else this.onerror();
    }
};

Proj4js.Proj = Proj4js.Class({
    readyToUse: !1,
    title: null,
    projName: null,
    units: null,
    datum: null,
    x0: 0,
    y0: 0,
    localCS: !1,
    queue: null,
    initialize: function(a, c) {
        this.srsCodeInput = a;
        this.queue = [];
        c && this.queue.push(c);
        if (0 <= a.indexOf("GEOGCS") || 0 <= a.indexOf("GEOCCS") || 0 <= a.indexOf("PROJCS") || 0 <= a.indexOf("LOCAL_CS")) this.parseWKT(a), 
        this.deriveConstants(), this.loadProjCode(this.projName); else {
            if (0 == a.indexOf("urn:")) {
                var b = a.split(":");
                if (("ogc" == b[1] || "x-ogc" == b[1]) && "def" == b[2] && "crs" == b[3]) a = b[4] + ":" + b[b.length - 1];
            } else 0 == a.indexOf("http://") && (b = a.split("#"), b[0].match(/epsg.org/) ? a = "EPSG:" + b[1] : b[0].match(/RIG.xml/) && (a = "IGNF:" + b[1]));
            this.srsCode = a.toUpperCase();
            0 == this.srsCode.indexOf("EPSG") ? (this.srsCode = this.srsCode, this.srsAuth = "epsg", 
            this.srsProjNumber = this.srsCode.substring(5)) : 0 == this.srsCode.indexOf("IGNF") ? (this.srsCode = this.srsCode, 
            this.srsAuth = "IGNF", this.srsProjNumber = this.srsCode.substring(5)) : 0 == this.srsCode.indexOf("CRS") ? (this.srsCode = this.srsCode, 
            this.srsAuth = "CRS", this.srsProjNumber = this.srsCode.substring(4)) : (this.srsAuth = "", 
            this.srsProjNumber = this.srsCode);
            this.loadProjDefinition();
        }
    },
    loadProjDefinition: function() {
        if (Proj4js.defs[this.srsCode]) this.defsLoaded(); else {
            var a = Proj4js.getScriptLocation() + "defs/" + this.srsAuth.toUpperCase() + this.srsProjNumber + ".js";
            Proj4js.loadScript(a, Proj4js.bind(this.defsLoaded, this), Proj4js.bind(this.loadFromService, this), Proj4js.bind(this.checkDefsLoaded, this));
        }
    },
    loadFromService: function() {
        Proj4js.loadScript(Proj4js.defsLookupService + "/" + this.srsAuth + "/" + this.srsProjNumber + "/proj4js/", Proj4js.bind(this.defsLoaded, this), Proj4js.bind(this.defsFailed, this), Proj4js.bind(this.checkDefsLoaded, this));
    },
    defsLoaded: function() {
        this.parseDefs();
        this.loadProjCode(this.projName);
    },
    checkDefsLoaded: function() {
        return Proj4js.defs[this.srsCode] ? !0 : !1;
    },
    defsFailed: function() {
        Proj4js.reportError("failed to load projection definition for: " + this.srsCode);
        Proj4js.defs[this.srsCode] = Proj4js.defs.WGS84;
        this.defsLoaded();
    },
    loadProjCode: function(a) {
        if (Proj4js.Proj[a]) this.initTransforms(); else {
            var c = Proj4js.getScriptLocation() + "projCode/" + a + ".js";
            Proj4js.loadScript(c, Proj4js.bind(this.loadProjCodeSuccess, this, a), Proj4js.bind(this.loadProjCodeFailure, this, a), Proj4js.bind(this.checkCodeLoaded, this, a));
        }
    },
    loadProjCodeSuccess: function(a) {
        Proj4js.Proj[a].dependsOn ? this.loadProjCode(Proj4js.Proj[a].dependsOn) : this.initTransforms();
    },
    loadProjCodeFailure: function(a) {
        Proj4js.reportError("failed to find projection file for: " + a);
    },
    checkCodeLoaded: function(a) {
        return Proj4js.Proj[a] ? !0 : !1;
    },
    initTransforms: function() {
        Proj4js.extend(this, Proj4js.Proj[this.projName]);
        this.init();
        this.readyToUse = !0;
        if (this.queue) for (var a; a = this.queue.shift(); ) a.call(this, this);
    },
    wktRE: /^(\w+)\[(.*)\]$/,
    parseWKT: function(a) {
        if (a = a.match(this.wktRE)) {
            var c = a[1], b = a[2].split(","), d;
            d = "TOWGS84" == c.toUpperCase() ? c : b.shift();
            d = d.replace(/^\"/, "");
            d = d.replace(/\"$/, "");
            for (var a = [], e = 0, f = "", g = 0; g < b.length; ++g) {
                for (var i = b[g], h = 0; h < i.length; ++h) "[" == i.charAt(h) && ++e, 
                "]" == i.charAt(h) && --e;
                f += i;
                0 === e ? (a.push(f), f = "") : f += ",";
            }
            switch (c) {
              case "LOCAL_CS":
                this.projName = "identity";
                this.localCS = !0;
                this.srsCode = d;
                break;

              case "GEOGCS":
                this.projName = "longlat";
                this.geocsCode = d;
                this.srsCode || (this.srsCode = d);
                break;

              case "PROJCS":
                this.srsCode = d;
                break;

              case "PROJECTION":
                this.projName = Proj4js.wktProjections[d];
                break;

              case "DATUM":
                this.datumName = d;
                break;

              case "LOCAL_DATUM":
                this.datumCode = "none";
                break;

              case "SPHEROID":
                this.ellps = d;
                this.a = parseFloat(a.shift());
                this.rf = parseFloat(a.shift());
                break;

              case "PRIMEM":
                this.from_greenwich = parseFloat(a.shift());
                break;

              case "UNIT":
                this.units = d;
                this.unitsPerMeter = parseFloat(a.shift());
                break;

              case "PARAMETER":
                c = d.toLowerCase();
                b = parseFloat(a.shift());
                switch (c) {
                  case "false_easting":
                    this.x0 = b;
                    break;

                  case "false_northing":
                    this.y0 = b;
                    break;

                  case "scale_factor":
                    this.k0 = b;
                    break;

                  case "central_meridian":
                    this.long0 = b * Proj4js.common.D2R;
                    break;

                  case "latitude_of_origin":
                    this.lat0 = b * Proj4js.common.D2R;
                }
                break;

              case "TOWGS84":
                this.datum_params = a;
                break;

              case "AXIS":
                c = d.toLowerCase();
                b = a.shift();
                switch (b) {
                  case "EAST":
                    b = "e";
                    break;

                  case "WEST":
                    b = "w";
                    break;

                  case "NORTH":
                    b = "n";
                    break;

                  case "SOUTH":
                    b = "s";
                    break;

                  case "UP":
                    b = "u";
                    break;

                  case "DOWN":
                    b = "d";
                    break;

                  default:
                    b = " ";
                }
                this.axis || (this.axis = "enu");
                switch (c) {
                  case "x":
                    this.axis = b + this.axis.substr(1, 2);
                    break;

                  case "y":
                    this.axis = this.axis.substr(0, 1) + b + this.axis.substr(2, 1);
                    break;

                  case "z":
                    this.axis = this.axis.substr(0, 2) + b;
                }
            }
            for (g = 0; g < a.length; ++g) this.parseWKT(a[g]);
        }
    },
    parseDefs: function() {
        this.defData = Proj4js.defs[this.srsCode];
        var a, c;
        if (this.defData) {
            for (var b = this.defData.split("+"), d = 0; d < b.length; d++) switch (c = b[d].split("="), 
            a = c[0].toLowerCase(), c = c[1], a.replace(/\s/gi, "")) {
              case "title":
                this.title = c;
                break;

              case "proj":
                this.projName = c.replace(/\s/gi, "");
                break;

              case "units":
                this.units = c.replace(/\s/gi, "");
                break;

              case "datum":
                this.datumCode = c.replace(/\s/gi, "");
                break;

              case "nadgrids":
                this.nagrids = c.replace(/\s/gi, "");
                break;

              case "ellps":
                this.ellps = c.replace(/\s/gi, "");
                break;

              case "a":
                this.a = parseFloat(c);
                break;

              case "b":
                this.b = parseFloat(c);
                break;

              case "rf":
                this.rf = parseFloat(c);
                break;

              case "lat_0":
                this.lat0 = c * Proj4js.common.D2R;
                break;

              case "lat_1":
                this.lat1 = c * Proj4js.common.D2R;
                break;

              case "lat_2":
                this.lat2 = c * Proj4js.common.D2R;
                break;

              case "lat_ts":
                this.lat_ts = c * Proj4js.common.D2R;
                break;

              case "lon_0":
                this.long0 = c * Proj4js.common.D2R;
                break;

              case "alpha":
                this.alpha = parseFloat(c) * Proj4js.common.D2R;
                break;

              case "lonc":
                this.longc = c * Proj4js.common.D2R;
                break;

              case "x_0":
                this.x0 = parseFloat(c);
                break;

              case "y_0":
                this.y0 = parseFloat(c);
                break;

              case "k_0":
                this.k0 = parseFloat(c);
                break;

              case "k":
                this.k0 = parseFloat(c);
                break;

              case "r_a":
                this.R_A = !0;
                break;

              case "zone":
                this.zone = parseInt(c, 10);
                break;

              case "south":
                this.utmSouth = !0;
                break;

              case "towgs84":
                this.datum_params = c.split(",");
                break;

              case "to_meter":
                this.to_meter = parseFloat(c);
                break;

              case "from_greenwich":
                this.from_greenwich = c * Proj4js.common.D2R;
                break;

              case "pm":
                c = c.replace(/\s/gi, "");
                this.from_greenwich = Proj4js.PrimeMeridian[c] ? Proj4js.PrimeMeridian[c] : parseFloat(c);
                this.from_greenwich *= Proj4js.common.D2R;
                break;

              case "axis":
                c = c.replace(/\s/gi, ""), 3 == c.length && -1 != "ewnsud".indexOf(c.substr(0, 1)) && -1 != "ewnsud".indexOf(c.substr(1, 1)) && -1 != "ewnsud".indexOf(c.substr(2, 1)) && (this.axis = c);
            }
            this.deriveConstants();
        }
    },
    deriveConstants: function() {
        "@null" == this.nagrids && (this.datumCode = "none");
        if (this.datumCode && "none" != this.datumCode) {
            var a = Proj4js.Datum[this.datumCode];
            a && (this.datum_params = a.towgs84 ? a.towgs84.split(",") : null, this.ellps = a.ellipse, 
            this.datumName = a.datumName ? a.datumName : this.datumCode);
        }
        this.a || Proj4js.extend(this, Proj4js.Ellipsoid[this.ellps] ? Proj4js.Ellipsoid[this.ellps] : Proj4js.Ellipsoid.WGS84);
        this.rf && !this.b && (this.b = (1 - 1 / this.rf) * this.a);
        if (0 === this.rf || Math.abs(this.a - this.b) < Proj4js.common.EPSLN) this.sphere = !0, 
        this.b = this.a;
        this.a2 = this.a * this.a;
        this.b2 = this.b * this.b;
        this.es = (this.a2 - this.b2) / this.a2;
        this.e = Math.sqrt(this.es);
        this.R_A && (this.a *= 1 - this.es * (Proj4js.common.SIXTH + this.es * (Proj4js.common.RA4 + this.es * Proj4js.common.RA6)), 
        this.a2 = this.a * this.a, this.b2 = this.b * this.b, this.es = 0);
        this.ep2 = (this.a2 - this.b2) / this.b2;
        this.k0 || (this.k0 = 1);
        this.axis || (this.axis = "enu");
        this.datum = new Proj4js.datum(this);
    }
});

Proj4js.Proj.longlat = {
    init: function() {},
    forward: function(a) {
        return a;
    },
    inverse: function(a) {
        return a;
    }
};

Proj4js.Proj.identity = Proj4js.Proj.longlat;

Proj4js.defs = {
    WGS84: "+title=long/lat:WGS84 +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees",
    "EPSG:4326": "+title=long/lat:WGS84 +proj=longlat +a=6378137.0 +b=6356752.31424518 +ellps=WGS84 +datum=WGS84 +units=degrees",
    "EPSG:4269": "+title=long/lat:NAD83 +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees",
    "EPSG:3875": "+title= Google Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"
};

Proj4js.defs["EPSG:3785"] = Proj4js.defs["EPSG:3875"];

Proj4js.defs.GOOGLE = Proj4js.defs["EPSG:3875"];

Proj4js.defs["EPSG:900913"] = Proj4js.defs["EPSG:3875"];

Proj4js.defs["EPSG:102113"] = Proj4js.defs["EPSG:3875"];

Proj4js.common = {
    PI: 3.141592653589793,
    HALF_PI: 1.5707963267948966,
    TWO_PI: 6.283185307179586,
    FORTPI: .7853981633974483,
    R2D: 57.29577951308232,
    D2R: .017453292519943295,
    SEC_TO_RAD: 484813681109536e-20,
    EPSLN: 1e-10,
    MAX_ITER: 20,
    COS_67P5: .3826834323650898,
    AD_C: 1.0026,
    PJD_UNKNOWN: 0,
    PJD_3PARAM: 1,
    PJD_7PARAM: 2,
    PJD_GRIDSHIFT: 3,
    PJD_WGS84: 4,
    PJD_NODATUM: 5,
    SRS_WGS84_SEMIMAJOR: 6378137,
    SIXTH: .16666666666666666,
    RA4: .04722222222222222,
    RA6: .022156084656084655,
    RV4: .06944444444444445,
    RV6: .04243827160493827,
    msfnz: function(a, c, b) {
        a *= c;
        return b / Math.sqrt(1 - a * a);
    },
    tsfnz: function(a, c, b) {
        b *= a;
        b = Math.pow((1 - b) / (1 + b), .5 * a);
        return Math.tan(.5 * (this.HALF_PI - c)) / b;
    },
    phi2z: function(a, c) {
        for (var b = .5 * a, d, e = this.HALF_PI - 2 * Math.atan(c), f = 0; 15 >= f; f++) if (d = a * Math.sin(e), 
        d = this.HALF_PI - 2 * Math.atan(c * Math.pow((1 - d) / (1 + d), b)) - e, 
        e += d, 1e-10 >= Math.abs(d)) return e;
        alert("phi2z has NoConvergence");
        return -9999;
    },
    qsfnz: function(a, c) {
        var b;
        return 1e-7 < a ? (b = a * c, (1 - a * a) * (c / (1 - b * b) - .5 / a * Math.log((1 - b) / (1 + b)))) : 2 * c;
    },
    asinz: function(a) {
        1 < Math.abs(a) && (a = 1 < a ? 1 : -1);
        return Math.asin(a);
    },
    e0fn: function(a) {
        return 1 - .25 * a * (1 + a / 16 * (3 + 1.25 * a));
    },
    e1fn: function(a) {
        return .375 * a * (1 + .25 * a * (1 + .46875 * a));
    },
    e2fn: function(a) {
        return .05859375 * a * a * (1 + .75 * a);
    },
    e3fn: function(a) {
        return a * a * a * (35 / 3072);
    },
    mlfn: function(a, c, b, d, e) {
        return a * e - c * Math.sin(2 * e) + b * Math.sin(4 * e) - d * Math.sin(6 * e);
    },
    srat: function(a, c) {
        return Math.pow((1 - a) / (1 + a), c);
    },
    sign: function(a) {
        return 0 > a ? -1 : 1;
    },
    adjust_lon: function(a) {
        return a = Math.abs(a) < this.PI ? a : a - this.sign(a) * this.TWO_PI;
    },
    adjust_lat: function(a) {
        return a = Math.abs(a) < this.HALF_PI ? a : a - this.sign(a) * this.PI;
    },
    latiso: function(a, c, b) {
        if (Math.abs(c) > this.HALF_PI) return +Number.NaN;
        if (c == this.HALF_PI) return Number.POSITIVE_INFINITY;
        if (c == -1 * this.HALF_PI) return -1 * Number.POSITIVE_INFINITY;
        b *= a;
        return Math.log(Math.tan((this.HALF_PI + c) / 2)) + a * Math.log((1 - b) / (1 + b)) / 2;
    },
    fL: function(a, c) {
        return 2 * Math.atan(a * Math.exp(c)) - this.HALF_PI;
    },
    invlatiso: function(a, c) {
        var b = this.fL(1, c), d = 0, e = 0;
        do {
            d = b, e = a * Math.sin(d), b = this.fL(Math.exp(a * Math.log((1 + e) / (1 - e)) / 2), c);
        } while (1e-12 < Math.abs(b - d));
        return b;
    },
    sinh: function(a) {
        a = Math.exp(a);
        return (a - 1 / a) / 2;
    },
    cosh: function(a) {
        a = Math.exp(a);
        return (a + 1 / a) / 2;
    },
    tanh: function(a) {
        a = Math.exp(a);
        return (a - 1 / a) / (a + 1 / a);
    },
    asinh: function(a) {
        return (0 <= a ? 1 : -1) * Math.log(Math.abs(a) + Math.sqrt(a * a + 1));
    },
    acosh: function(a) {
        return 2 * Math.log(Math.sqrt((a + 1) / 2) + Math.sqrt((a - 1) / 2));
    },
    atanh: function(a) {
        return Math.log((a - 1) / (a + 1)) / 2;
    },
    gN: function(a, c, b) {
        c *= b;
        return a / Math.sqrt(1 - c * c);
    },
    pj_enfn: function(a) {
        var c = [];
        c[0] = this.C00 - a * (this.C02 + a * (this.C04 + a * (this.C06 + a * this.C08)));
        c[1] = a * (this.C22 - a * (this.C04 + a * (this.C06 + a * this.C08)));
        var b = a * a;
        c[2] = b * (this.C44 - a * (this.C46 + a * this.C48));
        b *= a;
        c[3] = b * (this.C66 - a * this.C68);
        c[4] = b * a * this.C88;
        return c;
    },
    pj_mlfn: function(a, c, b, d) {
        b *= c;
        c *= c;
        return d[0] * a - b * (d[1] + c * (d[2] + c * (d[3] + c * d[4])));
    },
    pj_inv_mlfn: function(a, c, b) {
        for (var d = 1 / (1 - c), e = a, f = Proj4js.common.MAX_ITER; f; --f) {
            var g = Math.sin(e), i = 1 - c * g * g, i = (this.pj_mlfn(e, g, Math.cos(e), b) - a) * i * Math.sqrt(i) * d, e = e - i;
            if (Math.abs(i) < Proj4js.common.EPSLN) return e;
        }
        Proj4js.reportError("cass:pj_inv_mlfn: Convergence error");
        return e;
    },
    C00: 1,
    C02: .25,
    C04: .046875,
    C06: .01953125,
    C08: .01068115234375,
    C22: .75,
    C44: .46875,
    C46: .013020833333333334,
    C48: .007120768229166667,
    C66: .3645833333333333,
    C68: .005696614583333333,
    C88: .3076171875
};

Proj4js.datum = Proj4js.Class({
    initialize: function(a) {
        this.datum_type = Proj4js.common.PJD_WGS84;
        a.datumCode && "none" == a.datumCode && (this.datum_type = Proj4js.common.PJD_NODATUM);
        if (a && a.datum_params) {
            for (var c = 0; c < a.datum_params.length; c++) a.datum_params[c] = parseFloat(a.datum_params[c]);
            if (0 != a.datum_params[0] || 0 != a.datum_params[1] || 0 != a.datum_params[2]) this.datum_type = Proj4js.common.PJD_3PARAM;
            if (3 < a.datum_params.length && (0 != a.datum_params[3] || 0 != a.datum_params[4] || 0 != a.datum_params[5] || 0 != a.datum_params[6])) this.datum_type = Proj4js.common.PJD_7PARAM, 
            a.datum_params[3] *= Proj4js.common.SEC_TO_RAD, a.datum_params[4] *= Proj4js.common.SEC_TO_RAD, 
            a.datum_params[5] *= Proj4js.common.SEC_TO_RAD, a.datum_params[6] = a.datum_params[6] / 1e6 + 1;
        }
        a && (this.a = a.a, this.b = a.b, this.es = a.es, this.ep2 = a.ep2, this.datum_params = a.datum_params);
    },
    compare_datums: function(a) {
        return this.datum_type != a.datum_type || this.a != a.a || 5e-11 < Math.abs(this.es - a.es) ? !1 : this.datum_type == Proj4js.common.PJD_3PARAM ? this.datum_params[0] == a.datum_params[0] && this.datum_params[1] == a.datum_params[1] && this.datum_params[2] == a.datum_params[2] : this.datum_type == Proj4js.common.PJD_7PARAM ? this.datum_params[0] == a.datum_params[0] && this.datum_params[1] == a.datum_params[1] && this.datum_params[2] == a.datum_params[2] && this.datum_params[3] == a.datum_params[3] && this.datum_params[4] == a.datum_params[4] && this.datum_params[5] == a.datum_params[5] && this.datum_params[6] == a.datum_params[6] : this.datum_type == Proj4js.common.PJD_GRIDSHIFT || a.datum_type == Proj4js.common.PJD_GRIDSHIFT ? (alert("ERROR: Grid shift transformations are not implemented."), 
        !1) : !0;
    },
    geodetic_to_geocentric: function(a) {
        var c = a.x, b = a.y, d = a.z ? a.z : 0, e, f, g;
        if (b < -Proj4js.common.HALF_PI && b > -1.001 * Proj4js.common.HALF_PI) b = -Proj4js.common.HALF_PI; else if (b > Proj4js.common.HALF_PI && b < 1.001 * Proj4js.common.HALF_PI) b = Proj4js.common.HALF_PI; else if (b < -Proj4js.common.HALF_PI || b > Proj4js.common.HALF_PI) return Proj4js.reportError("geocent:lat out of range:" + b), 
        null;
        c > Proj4js.common.PI && (c -= 2 * Proj4js.common.PI);
        f = Math.sin(b);
        g = Math.cos(b);
        e = this.a / Math.sqrt(1 - this.es * f * f);
        b = (e + d) * g * Math.cos(c);
        c = (e + d) * g * Math.sin(c);
        d = (e * (1 - this.es) + d) * f;
        a.x = b;
        a.y = c;
        a.z = d;
        return 0;
    },
    geocentric_to_geodetic: function(a) {
        var c, b, d, e, f, g, i, h, j, k, l = a.x;
        d = a.y;
        var m = a.z ? a.z : 0;
        c = Math.sqrt(l * l + d * d);
        b = Math.sqrt(l * l + d * d + m * m);
        if (1e-12 > c / this.a) {
            if (l = 0, 1e-12 > b / this.a) return;
        } else l = Math.atan2(d, l);
        d = m / b;
        e = c / b;
        f = 1 / Math.sqrt(1 - this.es * (2 - this.es) * e * e);
        i = e * (1 - this.es) * f;
        h = d * f;
        k = 0;
        do {
            k++, g = this.a / Math.sqrt(1 - this.es * h * h), b = c * i + m * h - g * (1 - this.es * h * h), 
            g = this.es * g / (g + b), f = 1 / Math.sqrt(1 - g * (2 - g) * e * e), 
            g = e * (1 - g) * f, f *= d, j = f * i - g * h, i = g, h = f;
        } while (1e-24 < j * j && 30 > k);
        c = Math.atan(f / Math.abs(g));
        a.x = l;
        a.y = c;
        a.z = b;
        return a;
    },
    geocentric_to_geodetic_noniter: function(a) {
        var c = a.x, b = a.y, d = a.z ? a.z : 0, e, f, g, i, h, c = parseFloat(c), b = parseFloat(b), d = parseFloat(d);
        h = !1;
        if (0 != c) e = Math.atan2(b, c); else if (0 < b) e = Proj4js.common.HALF_PI; else if (0 > b) e = -Proj4js.common.HALF_PI; else if (h = !0, 
        e = 0, 0 < d) f = Proj4js.common.HALF_PI; else if (0 > d) f = -Proj4js.common.HALF_PI; else return;
        g = c * c + b * b;
        c = Math.sqrt(g);
        b = d * Proj4js.common.AD_C;
        g = Math.sqrt(b * b + g);
        b /= g;
        g = c / g;
        b = d + this.b * this.ep2 * b * b * b;
        i = c - this.a * this.es * g * g * g;
        g = Math.sqrt(b * b + i * i);
        b /= g;
        g = i / g;
        i = this.a / Math.sqrt(1 - this.es * b * b);
        d = g >= Proj4js.common.COS_67P5 ? c / g - i : g <= -Proj4js.common.COS_67P5 ? c / -g - i : d / b + i * (this.es - 1);
        !1 == h && (f = Math.atan(b / g));
        a.x = e;
        a.y = f;
        a.z = d;
        return a;
    },
    geocentric_to_wgs84: function(a) {
        if (this.datum_type == Proj4js.common.PJD_3PARAM) a.x += this.datum_params[0], 
        a.y += this.datum_params[1], a.z += this.datum_params[2]; else if (this.datum_type == Proj4js.common.PJD_7PARAM) {
            var c = this.datum_params[3], b = this.datum_params[4], d = this.datum_params[5], e = this.datum_params[6], f = e * (d * a.x + a.y - c * a.z) + this.datum_params[1], c = e * (-b * a.x + c * a.y + a.z) + this.datum_params[2];
            a.x = e * (a.x - d * a.y + b * a.z) + this.datum_params[0];
            a.y = f;
            a.z = c;
        }
    },
    geocentric_from_wgs84: function(a) {
        if (this.datum_type == Proj4js.common.PJD_3PARAM) a.x -= this.datum_params[0], 
        a.y -= this.datum_params[1], a.z -= this.datum_params[2]; else if (this.datum_type == Proj4js.common.PJD_7PARAM) {
            var c = this.datum_params[3], b = this.datum_params[4], d = this.datum_params[5], e = this.datum_params[6], f = (a.x - this.datum_params[0]) / e, g = (a.y - this.datum_params[1]) / e, e = (a.z - this.datum_params[2]) / e;
            a.x = f + d * g - b * e;
            a.y = -d * f + g + c * e;
            a.z = b * f - c * g + e;
        }
    }
});

Proj4js.Point = Proj4js.Class({
    initialize: function(a, c, b) {
        "object" == typeof a ? (this.x = a[0], this.y = a[1], this.z = a[2] || 0) : "string" == typeof a && "undefined" == typeof c ? (a = a.split(","), 
        this.x = parseFloat(a[0]), this.y = parseFloat(a[1]), this.z = parseFloat(a[2]) || 0) : (this.x = a, 
        this.y = c, this.z = b || 0);
    },
    clone: function() {
        return new Proj4js.Point(this.x, this.y, this.z);
    },
    toString: function() {
        return "x=" + this.x + ",y=" + this.y;
    },
    toShortString: function() {
        return this.x + ", " + this.y;
    }
});

Proj4js.PrimeMeridian = {
    greenwich: 0,
    lisbon: -9.131906111111,
    paris: 2.337229166667,
    bogota: -74.080916666667,
    madrid: -3.687938888889,
    rome: 12.452333333333,
    bern: 7.439583333333,
    jakarta: 106.807719444444,
    ferro: -17.666666666667,
    brussels: 4.367975,
    stockholm: 18.058277777778,
    athens: 23.7163375,
    oslo: 10.722916666667
};

Proj4js.Ellipsoid = {
    MERIT: {
        a: 6378137,
        rf: 298.257,
        ellipseName: "MERIT 1983"
    },
    SGS85: {
        a: 6378136,
        rf: 298.257,
        ellipseName: "Soviet Geodetic System 85"
    },
    GRS80: {
        a: 6378137,
        rf: 298.257222101,
        ellipseName: "GRS 1980(IUGG, 1980)"
    },
    IAU76: {
        a: 6378140,
        rf: 298.257,
        ellipseName: "IAU 1976"
    },
    airy: {
        a: 6377563.396,
        b: 6356256.91,
        ellipseName: "Airy 1830"
    },
    "APL4.": {
        a: 6378137,
        rf: 298.25,
        ellipseName: "Appl. Physics. 1965"
    },
    NWL9D: {
        a: 6378145,
        rf: 298.25,
        ellipseName: "Naval Weapons Lab., 1965"
    },
    mod_airy: {
        a: 6377340.189,
        b: 6356034.446,
        ellipseName: "Modified Airy"
    },
    andrae: {
        a: 6377104.43,
        rf: 300,
        ellipseName: "Andrae 1876 (Den., Iclnd.)"
    },
    aust_SA: {
        a: 6378160,
        rf: 298.25,
        ellipseName: "Australian Natl & S. Amer. 1969"
    },
    GRS67: {
        a: 6378160,
        rf: 298.247167427,
        ellipseName: "GRS 67(IUGG 1967)"
    },
    bessel: {
        a: 6377397.155,
        rf: 299.1528128,
        ellipseName: "Bessel 1841"
    },
    bess_nam: {
        a: 6377483.865,
        rf: 299.1528128,
        ellipseName: "Bessel 1841 (Namibia)"
    },
    clrk66: {
        a: 6378206.4,
        b: 6356583.8,
        ellipseName: "Clarke 1866"
    },
    clrk80: {
        a: 6378249.145,
        rf: 293.4663,
        ellipseName: "Clarke 1880 mod."
    },
    CPM: {
        a: 6375738.7,
        rf: 334.29,
        ellipseName: "Comm. des Poids et Mesures 1799"
    },
    delmbr: {
        a: 6376428,
        rf: 311.5,
        ellipseName: "Delambre 1810 (Belgium)"
    },
    engelis: {
        a: 6378136.05,
        rf: 298.2566,
        ellipseName: "Engelis 1985"
    },
    evrst30: {
        a: 6377276.345,
        rf: 300.8017,
        ellipseName: "Everest 1830"
    },
    evrst48: {
        a: 6377304.063,
        rf: 300.8017,
        ellipseName: "Everest 1948"
    },
    evrst56: {
        a: 6377301.243,
        rf: 300.8017,
        ellipseName: "Everest 1956"
    },
    evrst69: {
        a: 6377295.664,
        rf: 300.8017,
        ellipseName: "Everest 1969"
    },
    evrstSS: {
        a: 6377298.556,
        rf: 300.8017,
        ellipseName: "Everest (Sabah & Sarawak)"
    },
    fschr60: {
        a: 6378166,
        rf: 298.3,
        ellipseName: "Fischer (Mercury Datum) 1960"
    },
    fschr60m: {
        a: 6378155,
        rf: 298.3,
        ellipseName: "Fischer 1960"
    },
    fschr68: {
        a: 6378150,
        rf: 298.3,
        ellipseName: "Fischer 1968"
    },
    helmert: {
        a: 6378200,
        rf: 298.3,
        ellipseName: "Helmert 1906"
    },
    hough: {
        a: 6378270,
        rf: 297,
        ellipseName: "Hough"
    },
    intl: {
        a: 6378388,
        rf: 297,
        ellipseName: "International 1909 (Hayford)"
    },
    kaula: {
        a: 6378163,
        rf: 298.24,
        ellipseName: "Kaula 1961"
    },
    lerch: {
        a: 6378139,
        rf: 298.257,
        ellipseName: "Lerch 1979"
    },
    mprts: {
        a: 6397300,
        rf: 191,
        ellipseName: "Maupertius 1738"
    },
    new_intl: {
        a: 6378157.5,
        b: 6356772.2,
        ellipseName: "New International 1967"
    },
    plessis: {
        a: 6376523,
        rf: 6355863,
        ellipseName: "Plessis 1817 (France)"
    },
    krass: {
        a: 6378245,
        rf: 298.3,
        ellipseName: "Krassovsky, 1942"
    },
    SEasia: {
        a: 6378155,
        b: 6356773.3205,
        ellipseName: "Southeast Asia"
    },
    walbeck: {
        a: 6376896,
        b: 6355834.8467,
        ellipseName: "Walbeck"
    },
    WGS60: {
        a: 6378165,
        rf: 298.3,
        ellipseName: "WGS 60"
    },
    WGS66: {
        a: 6378145,
        rf: 298.25,
        ellipseName: "WGS 66"
    },
    WGS72: {
        a: 6378135,
        rf: 298.26,
        ellipseName: "WGS 72"
    },
    WGS84: {
        a: 6378137,
        rf: 298.257223563,
        ellipseName: "WGS 84"
    },
    sphere: {
        a: 6370997,
        b: 6370997,
        ellipseName: "Normal Sphere (r=6370997)"
    }
};

Proj4js.Datum = {
    WGS84: {
        towgs84: "0,0,0",
        ellipse: "WGS84",
        datumName: "WGS84"
    },
    GGRS87: {
        towgs84: "-199.87,74.79,246.62",
        ellipse: "GRS80",
        datumName: "Greek_Geodetic_Reference_System_1987"
    },
    NAD83: {
        towgs84: "0,0,0",
        ellipse: "GRS80",
        datumName: "North_American_Datum_1983"
    },
    NAD27: {
        nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
        ellipse: "clrk66",
        datumName: "North_American_Datum_1927"
    },
    potsdam: {
        towgs84: "606.0,23.0,413.0",
        ellipse: "bessel",
        datumName: "Potsdam Rauenberg 1950 DHDN"
    },
    carthage: {
        towgs84: "-263.0,6.0,431.0",
        ellipse: "clark80",
        datumName: "Carthage 1934 Tunisia"
    },
    hermannskogel: {
        towgs84: "653.0,-212.0,449.0",
        ellipse: "bessel",
        datumName: "Hermannskogel"
    },
    ire65: {
        towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
        ellipse: "mod_airy",
        datumName: "Ireland 1965"
    },
    nzgd49: {
        towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
        ellipse: "intl",
        datumName: "New Zealand Geodetic Datum 1949"
    },
    OSGB36: {
        towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
        ellipse: "airy",
        datumName: "Airy 1830"
    }
};

Proj4js.WGS84 = new Proj4js.Proj("WGS84");

Proj4js.Datum.OSB36 = Proj4js.Datum.OSGB36;

Proj4js.wktProjections = {
    "Lambert Tangential Conformal Conic Projection": "lcc",
    Mercator: "merc",
    "Popular Visualisation Pseudo Mercator": "merc",
    Mercator_1SP: "merc",
    Transverse_Mercator: "tmerc",
    "Transverse Mercator": "tmerc",
    "Lambert Azimuthal Equal Area": "laea",
    "Universal Transverse Mercator System": "utm"
};

Proj4js.Proj.aea = {
    init: function() {
        Math.abs(this.lat1 + this.lat2) < Proj4js.common.EPSLN ? Proj4js.reportError("aeaInitEqualLatitudes") : (this.temp = this.b / this.a, 
        this.es = 1 - Math.pow(this.temp, 2), this.e3 = Math.sqrt(this.es), this.sin_po = Math.sin(this.lat1), 
        this.cos_po = Math.cos(this.lat1), this.con = this.t1 = this.sin_po, this.ms1 = Proj4js.common.msfnz(this.e3, this.sin_po, this.cos_po), 
        this.qs1 = Proj4js.common.qsfnz(this.e3, this.sin_po, this.cos_po), this.sin_po = Math.sin(this.lat2), 
        this.cos_po = Math.cos(this.lat2), this.t2 = this.sin_po, this.ms2 = Proj4js.common.msfnz(this.e3, this.sin_po, this.cos_po), 
        this.qs2 = Proj4js.common.qsfnz(this.e3, this.sin_po, this.cos_po), this.sin_po = Math.sin(this.lat0), 
        this.cos_po = Math.cos(this.lat0), this.t3 = this.sin_po, this.qs0 = Proj4js.common.qsfnz(this.e3, this.sin_po, this.cos_po), 
        this.ns0 = Math.abs(this.lat1 - this.lat2) > Proj4js.common.EPSLN ? (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1) : this.con, 
        this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1, this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0);
    },
    forward: function(a) {
        var c = a.x, b = a.y;
        this.sin_phi = Math.sin(b);
        this.cos_phi = Math.cos(b);
        var b = Proj4js.common.qsfnz(this.e3, this.sin_phi, this.cos_phi), b = this.a * Math.sqrt(this.c - this.ns0 * b) / this.ns0, d = this.ns0 * Proj4js.common.adjust_lon(c - this.long0), c = b * Math.sin(d) + this.x0, b = this.rh - b * Math.cos(d) + this.y0;
        a.x = c;
        a.y = b;
        return a;
    },
    inverse: function(a) {
        var c, b, d;
        a.x -= this.x0;
        a.y = this.rh - a.y + this.y0;
        0 <= this.ns0 ? (c = Math.sqrt(a.x * a.x + a.y * a.y), b = 1) : (c = -Math.sqrt(a.x * a.x + a.y * a.y), 
        b = -1);
        d = 0;
        0 != c && (d = Math.atan2(b * a.x, b * a.y));
        b = c * this.ns0 / this.a;
        c = (this.c - b * b) / this.ns0;
        1e-10 <= this.e3 ? (b = 1 - .5 * (1 - this.es) * Math.log((1 - this.e3) / (1 + this.e3)) / this.e3, 
        b = 1e-10 < Math.abs(Math.abs(b) - Math.abs(c)) ? this.phi1z(this.e3, c) : 0 <= c ? .5 * Proj4js.common.PI : -.5 * Proj4js.common.PI) : b = this.phi1z(this.e3, c);
        d = Proj4js.common.adjust_lon(d / this.ns0 + this.long0);
        a.x = d;
        a.y = b;
        return a;
    },
    phi1z: function(a, c) {
        var b, d, e, f, g = Proj4js.common.asinz(.5 * c);
        if (a < Proj4js.common.EPSLN) return g;
        for (var i = a * a, h = 1; 25 >= h; h++) if (b = Math.sin(g), d = Math.cos(g), 
        e = a * b, f = 1 - e * e, b = .5 * f * f / d * (c / (1 - i) - b / f + .5 / a * Math.log((1 - e) / (1 + e))), 
        g += b, 1e-7 >= Math.abs(b)) return g;
        Proj4js.reportError("aea:phi1z:Convergence error");
        return null;
    }
};

Proj4js.Proj.sterea = {
    dependsOn: "gauss",
    init: function() {
        Proj4js.Proj.gauss.init.apply(this);
        this.rc ? (this.sinc0 = Math.sin(this.phic0), this.cosc0 = Math.cos(this.phic0), 
        this.R2 = 2 * this.rc, this.title || (this.title = "Oblique Stereographic Alternative")) : Proj4js.reportError("sterea:init:E_ERROR_0");
    },
    forward: function(a) {
        var c, b, d, e;
        a.x = Proj4js.common.adjust_lon(a.x - this.long0);
        Proj4js.Proj.gauss.forward.apply(this, [ a ]);
        c = Math.sin(a.y);
        b = Math.cos(a.y);
        d = Math.cos(a.x);
        e = this.k0 * this.R2 / (1 + this.sinc0 * c + this.cosc0 * b * d);
        a.x = e * b * Math.sin(a.x);
        a.y = e * (this.cosc0 * c - this.sinc0 * b * d);
        a.x = this.a * a.x + this.x0;
        a.y = this.a * a.y + this.y0;
        return a;
    },
    inverse: function(a) {
        var c, b, d, e;
        a.x = (a.x - this.x0) / this.a;
        a.y = (a.y - this.y0) / this.a;
        a.x /= this.k0;
        a.y /= this.k0;
        (e = Math.sqrt(a.x * a.x + a.y * a.y)) ? (d = 2 * Math.atan2(e, this.R2), 
        c = Math.sin(d), b = Math.cos(d), d = Math.asin(b * this.sinc0 + a.y * c * this.cosc0 / e), 
        c = Math.atan2(a.x * c, e * this.cosc0 * b - a.y * this.sinc0 * c)) : (d = this.phic0, 
        c = 0);
        a.x = c;
        a.y = d;
        Proj4js.Proj.gauss.inverse.apply(this, [ a ]);
        a.x = Proj4js.common.adjust_lon(a.x + this.long0);
        return a;
    }
};

function phi4z(a, c, b, d, e, f, g, i, h) {
    var j, k, l, m, n, o, h = f;
    for (o = 1; 15 >= o; o++) if (j = Math.sin(h), l = Math.tan(h), i = l * Math.sqrt(1 - a * j * j), 
    k = Math.sin(2 * h), m = c * h - b * k + d * Math.sin(4 * h) - e * Math.sin(6 * h), 
    n = c - 2 * b * Math.cos(2 * h) + 4 * d * Math.cos(4 * h) - 6 * e * Math.cos(6 * h), 
    j = 2 * m + i * (m * m + g) - 2 * f * (i * m + 1), l = a * k * (m * m + g - 2 * f * m) / (2 * i), 
    i = 2 * (f - m) * (i * n - 2 / k) - 2 * n, j /= l + i, h += j, 1e-10 >= Math.abs(j)) return h;
    Proj4js.reportError("phi4z: No convergence");
    return null;
}

function e4fn(a) {
    var c;
    c = 1 + a;
    a = 1 - a;
    return Math.sqrt(Math.pow(c, c) * Math.pow(a, a));
}

Proj4js.Proj.poly = {
    init: function() {
        0 == this.lat0 && (this.lat0 = 90);
        this.temp = this.b / this.a;
        this.es = 1 - Math.pow(this.temp, 2);
        this.e = Math.sqrt(this.es);
        this.e0 = Proj4js.common.e0fn(this.es);
        this.e1 = Proj4js.common.e1fn(this.es);
        this.e2 = Proj4js.common.e2fn(this.es);
        this.e3 = Proj4js.common.e3fn(this.es);
        this.ml0 = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
    },
    forward: function(a) {
        var c, b, d, e, f;
        d = a.y;
        b = Proj4js.common.adjust_lon(a.x - this.long0);
        1e-7 >= Math.abs(d) ? (f = this.x0 + this.a * b, c = this.y0 - this.a * this.ml0) : (c = Math.sin(d), 
        b = Math.cos(d), d = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, d), 
        e = Proj4js.common.msfnz(this.e, c, b), b = c, f = this.x0 + this.a * e * Math.sin(b) / c, 
        c = this.y0 + this.a * (d - this.ml0 + e * (1 - Math.cos(b)) / c));
        a.x = f;
        a.y = c;
        return a;
    },
    inverse: function(a) {
        var c, b;
        a.x -= this.x0;
        a.y -= this.y0;
        c = this.ml0 + a.y / this.a;
        if (1e-7 >= Math.abs(c)) c = a.x / this.a + this.long0, b = 0; else {
            c = c * c + a.x / this.a * (a.x / this.a);
            c = phi4z(this.es, this.e0, this.e1, this.e2, this.e3, this.al, c, void 0, b);
            if (1 != c) return c;
            c = Proj4js.common.adjust_lon(Proj4js.common.asinz(NaN * a.x / this.a) / Math.sin(b) + this.long0);
        }
        a.x = c;
        a.y = b;
        return a;
    }
};

Proj4js.Proj.equi = {
    init: function() {
        this.x0 || (this.x0 = 0);
        this.y0 || (this.y0 = 0);
        this.lat0 || (this.lat0 = 0);
        this.long0 || (this.long0 = 0);
    },
    forward: function(a) {
        var c = a.y, b = this.x0 + this.a * Proj4js.common.adjust_lon(a.x - this.long0) * Math.cos(this.lat0), c = this.y0 + this.a * c;
        this.t1 = b;
        this.t2 = Math.cos(this.lat0);
        a.x = b;
        a.y = c;
        return a;
    },
    inverse: function(a) {
        a.x -= this.x0;
        a.y -= this.y0;
        var c = a.y / this.a;
        Math.abs(c) > Proj4js.common.HALF_PI && Proj4js.reportError("equi:Inv:DataError");
        var b = Proj4js.common.adjust_lon(this.long0 + a.x / (this.a * Math.cos(this.lat0)));
        a.x = b;
        a.y = c;
    }
};

Proj4js.Proj.merc = {
    init: function() {
        this.lat_ts && (this.k0 = this.sphere ? Math.cos(this.lat_ts) : Proj4js.common.msfnz(this.es, Math.sin(this.lat_ts), Math.cos(this.lat_ts)));
    },
    forward: function(a) {
        var c = a.x, b = a.y;
        if (90 < b * Proj4js.common.R2D && -90 > b * Proj4js.common.R2D && 180 < c * Proj4js.common.R2D && -180 > c * Proj4js.common.R2D) return Proj4js.reportError("merc:forward: llInputOutOfRange: " + c + " : " + b), 
        null;
        if (Math.abs(Math.abs(b) - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN) return Proj4js.reportError("merc:forward: ll2mAtPoles"), 
        null;
        if (this.sphere) c = this.x0 + this.a * this.k0 * Proj4js.common.adjust_lon(c - this.long0), 
        b = this.y0 + this.a * this.k0 * Math.log(Math.tan(Proj4js.common.FORTPI + .5 * b)); else var d = Math.sin(b), b = Proj4js.common.tsfnz(this.e, b, d), c = this.x0 + this.a * this.k0 * Proj4js.common.adjust_lon(c - this.long0), b = this.y0 - this.a * this.k0 * Math.log(b);
        a.x = c;
        a.y = b;
        return a;
    },
    inverse: function(a) {
        var c = a.x - this.x0, b = a.y - this.y0;
        if (this.sphere) b = Proj4js.common.HALF_PI - 2 * Math.atan(Math.exp(-b / this.a * this.k0)); else if (b = Math.exp(-b / (this.a * this.k0)), 
        b = Proj4js.common.phi2z(this.e, b), -9999 == b) return Proj4js.reportError("merc:inverse: lat = -9999"), 
        null;
        c = Proj4js.common.adjust_lon(this.long0 + c / (this.a * this.k0));
        a.x = c;
        a.y = b;
        return a;
    }
};

Proj4js.Proj.utm = {
    dependsOn: "tmerc",
    init: function() {
        this.zone ? (this.lat0 = 0, this.long0 = (6 * Math.abs(this.zone) - 183) * Proj4js.common.D2R, 
        this.x0 = 5e5, this.y0 = this.utmSouth ? 1e7 : 0, this.k0 = .9996, Proj4js.Proj.tmerc.init.apply(this), 
        this.forward = Proj4js.Proj.tmerc.forward, this.inverse = Proj4js.Proj.tmerc.inverse) : Proj4js.reportError("utm:init: zone must be specified for UTM");
    }
};

Proj4js.Proj.eqdc = {
    init: function() {
        this.mode || (this.mode = 0);
        this.temp = this.b / this.a;
        this.es = 1 - Math.pow(this.temp, 2);
        this.e = Math.sqrt(this.es);
        this.e0 = Proj4js.common.e0fn(this.es);
        this.e1 = Proj4js.common.e1fn(this.es);
        this.e2 = Proj4js.common.e2fn(this.es);
        this.e3 = Proj4js.common.e3fn(this.es);
        this.sinphi = Math.sin(this.lat1);
        this.cosphi = Math.cos(this.lat1);
        this.ms1 = Proj4js.common.msfnz(this.e, this.sinphi, this.cosphi);
        this.ml1 = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat1);
        0 != this.mode ? (Math.abs(this.lat1 + this.lat2) < Proj4js.common.EPSLN && Proj4js.reportError("eqdc:Init:EqualLatitudes"), 
        this.sinphi = Math.sin(this.lat2), this.cosphi = Math.cos(this.lat2), this.ms2 = Proj4js.common.msfnz(this.e, this.sinphi, this.cosphi), 
        this.ml2 = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2), 
        this.ns = Math.abs(this.lat1 - this.lat2) >= Proj4js.common.EPSLN ? (this.ms1 - this.ms2) / (this.ml2 - this.ml1) : this.sinphi) : this.ns = this.sinphi;
        this.g = this.ml1 + this.ms1 / this.ns;
        this.ml0 = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
        this.rh = this.a * (this.g - this.ml0);
    },
    forward: function(a) {
        var c = a.x, b = this.a * (this.g - Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, a.y)), d = this.ns * Proj4js.common.adjust_lon(c - this.long0), c = this.x0 + b * Math.sin(d), b = this.y0 + this.rh - b * Math.cos(d);
        a.x = c;
        a.y = b;
        return a;
    },
    inverse: function(a) {
        a.x -= this.x0;
        a.y = this.rh - a.y + this.y0;
        var c, b;
        0 <= this.ns ? (b = Math.sqrt(a.x * a.x + a.y * a.y), c = 1) : (b = -Math.sqrt(a.x * a.x + a.y * a.y), 
        c = -1);
        var d = 0;
        0 != b && (d = Math.atan2(c * a.x, c * a.y));
        c = this.phi3z(this.g - b / this.a, this.e0, this.e1, this.e2, this.e3);
        d = Proj4js.common.adjust_lon(this.long0 + d / this.ns);
        a.x = d;
        a.y = c;
        return a;
    },
    phi3z: function(a, c, b, d, e) {
        var f, g;
        f = a;
        for (var i = 0; 15 > i; i++) if (g = (a + b * Math.sin(2 * f) - d * Math.sin(4 * f) + e * Math.sin(6 * f)) / c - f, 
        f += g, 1e-10 >= Math.abs(g)) return f;
        Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations");
        return null;
    }
};

Proj4js.Proj.tmerc = {
    init: function() {
        this.e0 = Proj4js.common.e0fn(this.es);
        this.e1 = Proj4js.common.e1fn(this.es);
        this.e2 = Proj4js.common.e2fn(this.es);
        this.e3 = Proj4js.common.e3fn(this.es);
        this.ml0 = this.a * Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
    },
    forward: function(a) {
        var c = a.y, b = Proj4js.common.adjust_lon(a.x - this.long0), d, e;
        d = Math.sin(c);
        var f = Math.cos(c);
        if (this.sphere) {
            var g = f * Math.sin(b);
            if (1e-10 > Math.abs(Math.abs(g) - 1)) return Proj4js.reportError("tmerc:forward: Point projects into infinity"), 
            93;
            e = .5 * this.a * this.k0 * Math.log((1 + g) / (1 - g));
            d = Math.acos(f * Math.cos(b) / Math.sqrt(1 - g * g));
            0 > c && (d = -d);
            c = this.a * this.k0 * (d - this.lat0);
        } else {
            e = f * b;
            var b = Math.pow(e, 2), f = this.ep2 * Math.pow(f, 2), g = Math.tan(c), i = Math.pow(g, 2);
            d = 1 - this.es * Math.pow(d, 2);
            d = this.a / Math.sqrt(d);
            c = this.a * Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, c);
            e = this.k0 * d * e * (1 + b / 6 * (1 - i + f + b / 20 * (5 - 18 * i + Math.pow(i, 2) + 72 * f - 58 * this.ep2))) + this.x0;
            c = this.k0 * (c - this.ml0 + d * g * b * (.5 + b / 24 * (5 - i + 9 * f + 4 * Math.pow(f, 2) + b / 30 * (61 - 58 * i + Math.pow(i, 2) + 600 * f - 330 * this.ep2)))) + this.y0;
        }
        a.x = e;
        a.y = c;
        return a;
    },
    inverse: function(a) {
        var c, b, d, e;
        if (this.sphere) {
            b = Math.exp(a.x / (this.a * this.k0));
            var f = .5 * (b - 1 / b);
            d = this.lat0 + a.y / (this.a * this.k0);
            e = Math.cos(d);
            c = Math.sqrt((1 - e * e) / (1 + f * f));
            b = Proj4js.common.asinz(c);
            0 > d && (b = -b);
            c = 0 == f && 0 == e ? this.long0 : Proj4js.common.adjust_lon(Math.atan2(f, e) + this.long0);
        } else {
            var f = a.x - this.x0, g = a.y - this.y0;
            b = c = (this.ml0 + g / this.k0) / this.a;
            for (e = 0; ;e++) {
                d = (c + this.e1 * Math.sin(2 * b) - this.e2 * Math.sin(4 * b) + this.e3 * Math.sin(6 * b)) / this.e0 - b;
                b += d;
                if (Math.abs(d) <= Proj4js.common.EPSLN) break;
                if (6 <= e) return Proj4js.reportError("tmerc:inverse: Latitude failed to converge"), 
                95;
            }
            if (Math.abs(b) < Proj4js.common.HALF_PI) {
                c = Math.sin(b);
                d = Math.cos(b);
                var i = Math.tan(b);
                e = this.ep2 * Math.pow(d, 2);
                var g = Math.pow(e, 2), h = Math.pow(i, 2), j = Math.pow(h, 2);
                c = 1 - this.es * Math.pow(c, 2);
                var k = this.a / Math.sqrt(c);
                c = k * (1 - this.es) / c;
                var f = f / (k * this.k0), l = Math.pow(f, 2);
                b -= k * i * l / c * (.5 - l / 24 * (5 + 3 * h + 10 * e - 4 * g - 9 * this.ep2 - l / 30 * (61 + 90 * h + 298 * e + 45 * j - 252 * this.ep2 - 3 * g)));
                c = Proj4js.common.adjust_lon(this.long0 + f * (1 - l / 6 * (1 + 2 * h + e - l / 20 * (5 - 2 * e + 28 * h - 3 * g + 8 * this.ep2 + 24 * j))) / d);
            } else b = Proj4js.common.HALF_PI * Proj4js.common.sign(g), c = this.long0;
        }
        a.x = c;
        a.y = b;
        return a;
    }
};

Proj4js.defs.GOOGLE = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs";

Proj4js.defs["EPSG:900913"] = Proj4js.defs.GOOGLE;

Proj4js.Proj.gstmerc = {
    init: function() {
        var a = this.b / this.a;
        this.e = Math.sqrt(1 - a * a);
        this.lc = this.long0;
        this.rs = Math.sqrt(1 + this.e * this.e * Math.pow(Math.cos(this.lat0), 4) / (1 - this.e * this.e));
        var a = Math.sin(this.lat0), c = Math.asin(a / this.rs), b = Math.sin(c);
        this.cp = Proj4js.common.latiso(0, c, b) - this.rs * Proj4js.common.latiso(this.e, this.lat0, a);
        this.n2 = this.k0 * this.a * Math.sqrt(1 - this.e * this.e) / (1 - this.e * this.e * a * a);
        this.xs = this.x0;
        this.ys = this.y0 - this.n2 * c;
        this.title || (this.title = "Gauss Schreiber transverse mercator");
    },
    forward: function(a) {
        var c = a.y, b = this.rs * (a.x - this.lc), c = this.cp + this.rs * Proj4js.common.latiso(this.e, c, Math.sin(c)), d = Math.asin(Math.sin(b) / Proj4js.common.cosh(c)), d = Proj4js.common.latiso(0, d, Math.sin(d));
        a.x = this.xs + this.n2 * d;
        a.y = this.ys + this.n2 * Math.atan(Proj4js.common.sinh(c) / Math.cos(b));
        return a;
    },
    inverse: function(a) {
        var c = a.x, b = a.y, d = Math.atan(Proj4js.common.sinh((c - this.xs) / this.n2) / Math.cos((b - this.ys) / this.n2)), c = Math.asin(Math.sin((b - this.ys) / this.n2) / Proj4js.common.cosh((c - this.xs) / this.n2)), c = Proj4js.common.latiso(0, c, Math.sin(c));
        a.x = this.lc + d / this.rs;
        a.y = Proj4js.common.invlatiso(this.e, (c - this.cp) / this.rs);
        return a;
    }
};

Proj4js.Proj.ortho = {
    init: function() {
        this.sin_p14 = Math.sin(this.lat0);
        this.cos_p14 = Math.cos(this.lat0);
    },
    forward: function(a) {
        var c, b, d, e, f;
        b = a.y;
        d = Proj4js.common.adjust_lon(a.x - this.long0);
        c = Math.sin(b);
        b = Math.cos(b);
        e = Math.cos(d);
        f = this.sin_p14 * c + this.cos_p14 * b * e;
        if (0 < f || Math.abs(f) <= Proj4js.common.EPSLN) var g = 1 * this.a * b * Math.sin(d), i = this.y0 + 1 * this.a * (this.cos_p14 * c - this.sin_p14 * b * e); else Proj4js.reportError("orthoFwdPointError");
        a.x = g;
        a.y = i;
        return a;
    },
    inverse: function(a) {
        var c, b, d, e;
        a.x -= this.x0;
        a.y -= this.y0;
        c = Math.sqrt(a.x * a.x + a.y * a.y);
        c > this.a + 1e-7 && Proj4js.reportError("orthoInvDataError");
        b = Proj4js.common.asinz(c / this.a);
        d = Math.sin(b);
        e = Math.cos(b);
        b = this.long0;
        Math.abs(c);
        d = Proj4js.common.asinz(e * this.sin_p14 + a.y * d * this.cos_p14 / c);
        c = Math.abs(this.lat0) - Proj4js.common.HALF_PI;
        Math.abs(c) <= Proj4js.common.EPSLN && (b = 0 <= this.lat0 ? Proj4js.common.adjust_lon(this.long0 + Math.atan2(a.x, -a.y)) : Proj4js.common.adjust_lon(this.long0 - Math.atan2(-a.x, a.y)));
        Math.sin(d);
        a.x = b;
        a.y = d;
        return a;
    }
};

Proj4js.Proj.krovak = {
    init: function() {
        this.a = 6377397.155;
        this.es = .006674372230614;
        this.e = Math.sqrt(this.es);
        this.lat0 || (this.lat0 = .863937979737193);
        this.long0 || (this.long0 = .4334234309119251);
        this.k0 || (this.k0 = .9999);
        this.s45 = .785398163397448;
        this.s90 = 2 * this.s45;
        this.fi0 = this.lat0;
        this.e2 = this.es;
        this.e = Math.sqrt(this.e2);
        this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2));
        this.uq = 1.04216856380474;
        this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
        this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
        this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
        this.k1 = this.k0;
        this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
        this.s0 = 1.37008346281555;
        this.n = Math.sin(this.s0);
        this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
        this.ad = this.s90 - this.uq;
    },
    forward: function(a) {
        var c, b, d;
        b = a.y;
        d = Proj4js.common.adjust_lon(a.x - this.long0);
        c = Math.pow((1 + this.e * Math.sin(b)) / (1 - this.e * Math.sin(b)), this.alfa * this.e / 2);
        c = 2 * (Math.atan(this.k * Math.pow(Math.tan(b / 2 + this.s45), this.alfa) / c) - this.s45);
        b = -d * this.alfa;
        d = Math.asin(Math.cos(this.ad) * Math.sin(c) + Math.sin(this.ad) * Math.cos(c) * Math.cos(b));
        c = this.n * Math.asin(Math.cos(c) * Math.sin(b) / Math.cos(d));
        d = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(d / 2 + this.s45), this.n);
        a.y = d * Math.cos(c) / 1;
        a.x = d * Math.sin(c) / 1;
        this.czech && (a.y *= -1, a.x *= -1);
        return a;
    },
    inverse: function(a) {
        var c, b, d;
        c = a.x;
        a.x = a.y;
        a.y = c;
        this.czech && (a.y *= -1, a.x *= -1);
        c = Math.sqrt(a.x * a.x + a.y * a.y);
        b = Math.atan2(a.y, a.x) / Math.sin(this.s0);
        d = 2 * (Math.atan(Math.pow(this.ro0 / c, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
        c = Math.asin(Math.cos(this.ad) * Math.sin(d) - Math.sin(this.ad) * Math.cos(d) * Math.cos(b));
        b = Math.asin(Math.cos(d) * Math.sin(b) / Math.cos(c));
        a.x = this.long0 - b / this.alfa;
        b = c;
        var e = d = 0;
        do {
            a.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(c / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(b)) / (1 - this.e * Math.sin(b)), this.e / 2)) - this.s45), 
            1e-10 > Math.abs(b - a.y) && (d = 1), b = a.y, e += 1;
        } while (0 == d && 15 > e);
        return 15 <= e ? (Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations"), 
        null) : a;
    }
};

Proj4js.Proj.somerc = {
    init: function() {
        var a = this.lat0;
        this.lambda0 = this.long0;
        var c = Math.sin(a), b = this.a, d = 1 / this.rf, d = 2 * d - Math.pow(d, 2), e = this.e = Math.sqrt(d);
        this.R = this.k0 * b * Math.sqrt(1 - d) / (1 - d * Math.pow(c, 2));
        this.alpha = Math.sqrt(1 + d / (1 - d) * Math.pow(Math.cos(a), 4));
        this.b0 = Math.asin(c / this.alpha);
        this.K = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)) - this.alpha * Math.log(Math.tan(Math.PI / 4 + a / 2)) + this.alpha * e / 2 * Math.log((1 + e * c) / (1 - e * c));
    },
    forward: function(a) {
        var c = Math.log(Math.tan(Math.PI / 4 - a.y / 2)), b = this.e / 2 * Math.log((1 + this.e * Math.sin(a.y)) / (1 - this.e * Math.sin(a.y))), b = 2 * (Math.atan(Math.exp(-this.alpha * (c + b) + this.K)) - Math.PI / 4), d = this.alpha * (a.x - this.lambda0), c = Math.atan(Math.sin(d) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(d))), b = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(d));
        a.y = this.R / 2 * Math.log((1 + Math.sin(b)) / (1 - Math.sin(b))) + this.y0;
        a.x = this.R * c + this.x0;
        return a;
    },
    inverse: function(a) {
        for (var c = (a.x - this.x0) / this.R, b = 2 * (Math.atan(Math.exp((a.y - this.y0) / this.R)) - Math.PI / 4), d = Math.asin(Math.cos(this.b0) * Math.sin(b) + Math.sin(this.b0) * Math.cos(b) * Math.cos(c)), c = this.lambda0 + Math.atan(Math.sin(c) / (Math.cos(this.b0) * Math.cos(c) - Math.sin(this.b0) * Math.tan(b))) / this.alpha, b = 0, e = d, f = -1e3, g = 0; 1e-7 < Math.abs(e - f); ) {
            if (20 < ++g) {
                Proj4js.reportError("omercFwdInfinity");
                return;
            }
            b = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + d / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(e)) / 2));
            f = e;
            e = 2 * Math.atan(Math.exp(b)) - Math.PI / 2;
        }
        a.x = c;
        a.y = e;
        return a;
    }
};

Proj4js.Proj.stere = {
    ssfn_: function(a, c, b) {
        c *= b;
        return Math.tan(.5 * (Proj4js.common.HALF_PI + a)) * Math.pow((1 - c) / (1 + c), .5 * b);
    },
    TOL: 1e-8,
    NITER: 8,
    CONV: 1e-10,
    S_POLE: 0,
    N_POLE: 1,
    OBLIQ: 2,
    EQUIT: 3,
    init: function() {
        this.phits = this.lat_ts ? this.lat_ts : Proj4js.common.HALF_PI;
        var a = Math.abs(this.lat0);
        this.mode = Math.abs(a) - Proj4js.common.HALF_PI < Proj4js.common.EPSLN ? 0 > this.lat0 ? this.S_POLE : this.N_POLE : a > Proj4js.common.EPSLN ? this.OBLIQ : this.EQUIT;
        this.phits = Math.abs(this.phits);
        if (this.es) {
            var c;
            switch (this.mode) {
              case this.N_POLE:
              case this.S_POLE:
                Math.abs(this.phits - Proj4js.common.HALF_PI) < Proj4js.common.EPSLN ? this.akm1 = 2 * this.k0 / Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e)) : (a = Math.sin(this.phits), 
                this.akm1 = Math.cos(this.phits) / Proj4js.common.tsfnz(this.e, this.phits, a), 
                a *= this.e, this.akm1 /= Math.sqrt(1 - a * a));
                break;

              case this.EQUIT:
                this.akm1 = 2 * this.k0;
                break;

              case this.OBLIQ:
                a = Math.sin(this.lat0), c = 2 * Math.atan(this.ssfn_(this.lat0, a, this.e)) - Proj4js.common.HALF_PI, 
                a *= this.e, this.akm1 = 2 * this.k0 * Math.cos(this.lat0) / Math.sqrt(1 - a * a), 
                this.sinX1 = Math.sin(c), this.cosX1 = Math.cos(c);
            }
        } else switch (this.mode) {
          case this.OBLIQ:
            this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0);

          case this.EQUIT:
            this.akm1 = 2 * this.k0;
            break;

          case this.S_POLE:
          case this.N_POLE:
            this.akm1 = Math.abs(this.phits - Proj4js.common.HALF_PI) >= Proj4js.common.EPSLN ? Math.cos(this.phits) / Math.tan(Proj4js.common.FORTPI - .5 * this.phits) : 2 * this.k0;
        }
    },
    forward: function(a) {
        var c = a.x, c = Proj4js.common.adjust_lon(c - this.long0), b = a.y, d, e;
        if (this.sphere) {
            var f, g, i;
            f = Math.sin(b);
            g = Math.cos(b);
            i = Math.cos(c);
            c = Math.sin(c);
            switch (this.mode) {
              case this.EQUIT:
                e = 1 + g * i;
                e <= Proj4js.common.EPSLN && Proj4js.reportError("stere:forward:Equit");
                e = this.akm1 / e;
                d = e * g * c;
                e *= f;
                break;

              case this.OBLIQ:
                e = 1 + this.sinph0 * f + this.cosph0 * g * i;
                e <= Proj4js.common.EPSLN && Proj4js.reportError("stere:forward:Obliq");
                e = this.akm1 / e;
                d = e * g * c;
                e *= this.cosph0 * f - this.sinph0 * g * i;
                break;

              case this.N_POLE:
                i = -i, b = -b;

              case this.S_POLE:
                Math.abs(b - Proj4js.common.HALF_PI) < this.TOL && Proj4js.reportError("stere:forward:S_POLE"), 
                e = this.akm1 * Math.tan(Proj4js.common.FORTPI + .5 * b), d = c * e, 
                e *= i;
            }
        } else {
            i = Math.cos(c);
            c = Math.sin(c);
            f = Math.sin(b);
            var h;
            if (this.mode == this.OBLIQ || this.mode == this.EQUIT) h = 2 * Math.atan(this.ssfn_(b, f, this.e)), 
            g = Math.sin(h - Proj4js.common.HALF_PI), h = Math.cos(h);
            switch (this.mode) {
              case this.OBLIQ:
                b = this.akm1 / (this.cosX1 * (1 + this.sinX1 * g + this.cosX1 * h * i));
                e = b * (this.cosX1 * g - this.sinX1 * h * i);
                d = b * h;
                break;

              case this.EQUIT:
                b = 2 * this.akm1 / (1 + h * i);
                e = b * g;
                d = b * h;
                break;

              case this.S_POLE:
                b = -b, i = -i, f = -f;

              case this.N_POLE:
                d = this.akm1 * Proj4js.common.tsfnz(this.e, b, f), e = -d * i;
            }
            d *= c;
        }
        a.x = d * this.a + this.x0;
        a.y = e * this.a + this.y0;
        return a;
    },
    inverse: function(a) {
        var c = (a.x - this.x0) / this.a, b = (a.y - this.y0) / this.a, d, e, f, g = d = 0, i, h = f = 0;
        if (this.sphere) {
            g = Math.sqrt(c * c + b * b);
            h = 2 * Math.atan(g / this.akm1);
            f = Math.sin(h);
            h = Math.cos(h);
            d = 0;
            switch (this.mode) {
              case this.EQUIT:
                e = Math.abs(g) <= Proj4js.common.EPSLN ? 0 : Math.asin(b * f / g);
                if (0 != h || 0 != c) d = Math.atan2(c * f, h * g);
                break;

              case this.OBLIQ:
                e = Math.abs(g) <= Proj4js.common.EPSLN ? this.phi0 : Math.asin(h * this.sinph0 + b * f * this.cosph0 / g);
                h -= this.sinph0 * Math.sin(e);
                if (0 != h || 0 != c) d = Math.atan2(c * f * this.cosph0, h * g);
                break;

              case this.N_POLE:
                b = -b;

              case this.S_POLE:
                e = Math.abs(g) <= Proj4js.common.EPSLN ? this.phi0 : Math.asin(this.mode == this.S_POLE ? -h : h), 
                d = 0 == c && 0 == b ? 0 : Math.atan2(c, b);
            }
            a.x = Proj4js.common.adjust_lon(d + this.long0);
            a.y = e;
        } else {
            i = Math.sqrt(c * c + b * b);
            switch (this.mode) {
              case this.OBLIQ:
              case this.EQUIT:
                d = 2 * Math.atan2(i * this.cosX1, this.akm1);
                f = Math.cos(d);
                e = Math.sin(d);
                g = 0 == i ? Math.asin(f * this.sinX1) : Math.asin(f * this.sinX1 + b * e * this.cosX1 / i);
                d = Math.tan(.5 * (Proj4js.common.HALF_PI + g));
                c *= e;
                b = i * this.cosX1 * f - b * this.sinX1 * e;
                h = Proj4js.common.HALF_PI;
                f = .5 * this.e;
                break;

              case this.N_POLE:
                b = -b;

              case this.S_POLE:
                d = -i / this.akm1, g = Proj4js.common.HALF_PI - 2 * Math.atan(d), 
                h = -Proj4js.common.HALF_PI, f = -.5 * this.e;
            }
            for (i = this.NITER; i--; g = e) if (e = this.e * Math.sin(g), e = 2 * Math.atan(d * Math.pow((1 + e) / (1 - e), f)) - h, 
            Math.abs(g - e) < this.CONV) return this.mode == this.S_POLE && (e = -e), 
            d = 0 == c && 0 == b ? 0 : Math.atan2(c, b), a.x = Proj4js.common.adjust_lon(d + this.long0), 
            a.y = e, a;
        }
    }
};

Proj4js.Proj.nzmg = {
    iterations: 1,
    init: function() {
        this.A = [];
        this.A[1] = .6399175073;
        this.A[2] = -.1358797613;
        this.A[3] = .063294409;
        this.A[4] = -.02526853;
        this.A[5] = .0117879;
        this.A[6] = -.0055161;
        this.A[7] = .0026906;
        this.A[8] = -.001333;
        this.A[9] = 67e-5;
        this.A[10] = -34e-5;
        this.B_re = [];
        this.B_im = [];
        this.B_re[1] = .7557853228;
        this.B_im[1] = 0;
        this.B_re[2] = .249204646;
        this.B_im[2] = .003371507;
        this.B_re[3] = -.001541739;
        this.B_im[3] = .04105856;
        this.B_re[4] = -.10162907;
        this.B_im[4] = .01727609;
        this.B_re[5] = -.26623489;
        this.B_im[5] = -.36249218;
        this.B_re[6] = -.6870983;
        this.B_im[6] = -1.1651967;
        this.C_re = [];
        this.C_im = [];
        this.C_re[1] = 1.3231270439;
        this.C_im[1] = 0;
        this.C_re[2] = -.577245789;
        this.C_im[2] = -.007809598;
        this.C_re[3] = .508307513;
        this.C_im[3] = -.112208952;
        this.C_re[4] = -.15094762;
        this.C_im[4] = .18200602;
        this.C_re[5] = 1.01418179;
        this.C_im[5] = 1.64497696;
        this.C_re[6] = 1.9660549;
        this.C_im[6] = 2.5127645;
        this.D = [];
        this.D[1] = 1.5627014243;
        this.D[2] = .5185406398;
        this.D[3] = -.03333098;
        this.D[4] = -.1052906;
        this.D[5] = -.0368594;
        this.D[6] = .007317;
        this.D[7] = .0122;
        this.D[8] = .00394;
        this.D[9] = -.0013;
    },
    forward: function(a) {
        for (var c = 1e-5 * ((a.y - this.lat0) / Proj4js.common.SEC_TO_RAD), b = a.x - this.long0, d = 1, e = 0, f = 1; 10 >= f; f++) d *= c, 
        e += this.A[f] * d;
        for (var c = e, d = 1, g = 0, i = 0, h = 0, f = 1; 6 >= f; f++) e = d * c - g * b, 
        g = g * c + d * b, d = e, i = i + this.B_re[f] * d - this.B_im[f] * g, h = h + this.B_im[f] * d + this.B_re[f] * g;
        a.x = h * this.a + this.x0;
        a.y = i * this.a + this.y0;
        return a;
    },
    inverse: function(a) {
        for (var c = (a.y - this.y0) / this.a, b = (a.x - this.x0) / this.a, d = 1, e = 0, f, g = 0, i = 0, h = 1; 6 >= h; h++) f = d * c - e * b, 
        e = e * c + d * b, d = f, g = g + this.C_re[h] * d - this.C_im[h] * e, i = i + this.C_im[h] * d + this.C_re[h] * e;
        for (d = 0; d < this.iterations; d++) {
            var j = g, k = i, l;
            f = c;
            e = b;
            for (h = 2; 6 >= h; h++) l = j * g - k * i, k = k * g + j * i, j = l, 
            f += (h - 1) * (this.B_re[h] * j - this.B_im[h] * k), e += (h - 1) * (this.B_im[h] * j + this.B_re[h] * k);
            for (var j = 1, k = 0, m = this.B_re[1], n = this.B_im[1], h = 2; 6 >= h; h++) l = j * g - k * i, 
            k = k * g + j * i, j = l, m += h * (this.B_re[h] * j - this.B_im[h] * k), 
            n += h * (this.B_im[h] * j + this.B_re[h] * k);
            i = m * m + n * n;
            g = (f * m + e * n) / i;
            i = (e * m - f * n) / i;
        }
        c = g;
        b = 1;
        g = 0;
        for (h = 1; 9 >= h; h++) b *= c, g += this.D[h] * b;
        h = this.lat0 + 1e5 * g * Proj4js.common.SEC_TO_RAD;
        a.x = this.long0 + i;
        a.y = h;
        return a;
    }
};

Proj4js.Proj.mill = {
    init: function() {},
    forward: function(a) {
        var c = a.y, b = this.x0 + this.a * Proj4js.common.adjust_lon(a.x - this.long0), c = this.y0 + 1.25 * this.a * Math.log(Math.tan(Proj4js.common.PI / 4 + c / 2.5));
        a.x = b;
        a.y = c;
        return a;
    },
    inverse: function(a) {
        a.x -= this.x0;
        a.y -= this.y0;
        var c = Proj4js.common.adjust_lon(this.long0 + a.x / this.a), b = 2.5 * (Math.atan(Math.exp(.8 * a.y / this.a)) - Proj4js.common.PI / 4);
        a.x = c;
        a.y = b;
        return a;
    }
};

Proj4js.Proj.gnom = {
    init: function() {
        this.sin_p14 = Math.sin(this.lat0);
        this.cos_p14 = Math.cos(this.lat0);
        this.infinity_dist = 1e3 * this.a;
        this.rc = 1;
    },
    forward: function(a) {
        var c, b, d, e, f;
        b = a.y;
        d = Proj4js.common.adjust_lon(a.x - this.long0);
        c = Math.sin(b);
        b = Math.cos(b);
        e = Math.cos(d);
        f = this.sin_p14 * c + this.cos_p14 * b * e;
        0 < f || Math.abs(f) <= Proj4js.common.EPSLN ? (d = this.x0 + 1 * this.a * b * Math.sin(d) / f, 
        c = this.y0 + 1 * this.a * (this.cos_p14 * c - this.sin_p14 * b * e) / f) : (Proj4js.reportError("orthoFwdPointError"), 
        d = this.x0 + this.infinity_dist * b * Math.sin(d), c = this.y0 + this.infinity_dist * (this.cos_p14 * c - this.sin_p14 * b * e));
        a.x = d;
        a.y = c;
        return a;
    },
    inverse: function(a) {
        var c, b, d, e;
        a.x = (a.x - this.x0) / this.a;
        a.y = (a.y - this.y0) / this.a;
        a.x /= this.k0;
        a.y /= this.k0;
        (c = Math.sqrt(a.x * a.x + a.y * a.y)) ? (e = Math.atan2(c, this.rc), b = Math.sin(e), 
        d = Math.cos(e), e = Proj4js.common.asinz(d * this.sin_p14 + a.y * b * this.cos_p14 / c), 
        c = Math.atan2(a.x * b, c * this.cos_p14 * d - a.y * this.sin_p14 * b), 
        c = Proj4js.common.adjust_lon(this.long0 + c)) : (e = this.phic0, c = 0);
        a.x = c;
        a.y = e;
        return a;
    }
};

Proj4js.Proj.sinu = {
    init: function() {
        this.sphere ? (this.n = 1, this.es = this.m = 0, this.C_y = Math.sqrt((this.m + 1) / this.n), 
        this.C_x = this.C_y / (this.m + 1)) : this.en = Proj4js.common.pj_enfn(this.es);
    },
    forward: function(a) {
        var c, b;
        c = a.x;
        b = a.y;
        c = Proj4js.common.adjust_lon(c - this.long0);
        if (this.sphere) {
            if (this.m) for (var d = this.n * Math.sin(b), e = Proj4js.common.MAX_ITER; e; --e) {
                var f = (this.m * b + Math.sin(b) - d) / (this.m + Math.cos(b));
                b -= f;
                if (Math.abs(f) < Proj4js.common.EPSLN) break;
            } else b = 1 != this.n ? Math.asin(this.n * Math.sin(b)) : b;
            c = this.a * this.C_x * c * (this.m + Math.cos(b));
            b *= this.a * this.C_y;
        } else d = Math.sin(b), e = Math.cos(b), b = this.a * Proj4js.common.pj_mlfn(b, d, e, this.en), 
        c = this.a * c * e / Math.sqrt(1 - this.es * d * d);
        a.x = c;
        a.y = b;
        return a;
    },
    inverse: function(a) {
        var c, b;
        a.x -= this.x0;
        a.y -= this.y0;
        if (this.sphere) a.y /= this.C_y, c = this.m ? Math.asin((this.m * a.y + Math.sin(a.y)) / this.n) : 1 != this.n ? Math.asin(Math.sin(a.y) / this.n) : a.y, 
        b = a.x / (this.C_x * (this.m + Math.cos(a.y))); else {
            c = Proj4js.common.pj_inv_mlfn(a.y / this.a, this.es, this.en);
            var d = Math.abs(c);
            d < Proj4js.common.HALF_PI ? (d = Math.sin(c), b = this.long0 + a.x * Math.sqrt(1 - this.es * d * d) / (this.a * Math.cos(c)), 
            b = Proj4js.common.adjust_lon(b)) : d - Proj4js.common.EPSLN < Proj4js.common.HALF_PI && (b = this.long0);
        }
        a.x = b;
        a.y = c;
        return a;
    }
};

Proj4js.Proj.vandg = {
    init: function() {
        this.R = 6370997;
    },
    forward: function(a) {
        var c = a.y, b = Proj4js.common.adjust_lon(a.x - this.long0);
        Math.abs(c);
        var d = Proj4js.common.asinz(2 * Math.abs(c / Proj4js.common.PI));
        (Math.abs(b) <= Proj4js.common.EPSLN || Math.abs(Math.abs(c) - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN) && Math.tan(.5 * d);
        var e = .5 * Math.abs(Proj4js.common.PI / b - b / Proj4js.common.PI), f = e * e, g = Math.sin(d), d = Math.cos(d), d = d / (g + d - 1), g = d * (2 / g - 1), g = g * g, f = Proj4js.common.PI * this.R * (e * (d - g) + Math.sqrt(f * (d - g) * (d - g) - (g + f) * (d * d - g))) / (g + f);
        0 > b && (f = -f);
        b = this.x0 + f;
        f = Math.abs(f / (Proj4js.common.PI * this.R));
        c = 0 <= c ? this.y0 + Proj4js.common.PI * this.R * Math.sqrt(1 - f * f - 2 * e * f) : this.y0 - Proj4js.common.PI * this.R * Math.sqrt(1 - f * f - 2 * e * f);
        a.x = b;
        a.y = c;
        return a;
    },
    inverse: function(a) {
        var c, b, d, e, f, g, i, h;
        a.x -= this.x0;
        a.y -= this.y0;
        h = Proj4js.common.PI * this.R;
        c = a.x / h;
        d = a.y / h;
        e = c * c + d * d;
        f = -Math.abs(d) * (1 + e);
        b = f - 2 * d * d + c * c;
        g = -2 * f + 1 + 2 * d * d + e * e;
        h = d * d / g + (2 * b * b * b / g / g / g - 9 * f * b / g / g) / 27;
        i = (f - b * b / 3 / g) / g;
        f = 2 * Math.sqrt(-i / 3);
        h = 3 * h / i / f;
        1 < Math.abs(h) && (h = 0 <= h ? 1 : -1);
        h = Math.acos(h) / 3;
        b = 0 <= a.y ? (-f * Math.cos(h + Proj4js.common.PI / 3) - b / 3 / g) * Proj4js.common.PI : -(-f * Math.cos(h + Proj4js.common.PI / 3) - b / 3 / g) * Proj4js.common.PI;
        Math.abs(c);
        c = Proj4js.common.adjust_lon(this.long0 + Proj4js.common.PI * (e - 1 + Math.sqrt(1 + 2 * (c * c - d * d) + e * e)) / 2 / c);
        a.x = c;
        a.y = b;
        return a;
    }
};

Proj4js.Proj.cea = {
    init: function() {},
    forward: function(a) {
        var c = a.y, b = this.x0 + this.a * Proj4js.common.adjust_lon(a.x - this.long0) * Math.cos(this.lat_ts), c = this.y0 + this.a * Math.sin(c) / Math.cos(this.lat_ts);
        a.x = b;
        a.y = c;
        return a;
    },
    inverse: function(a) {
        a.x -= this.x0;
        a.y -= this.y0;
        var c = Proj4js.common.adjust_lon(this.long0 + a.x / this.a / Math.cos(this.lat_ts)), b = Math.asin(a.y / this.a * Math.cos(this.lat_ts));
        a.x = c;
        a.y = b;
        return a;
    }
};

Proj4js.Proj.eqc = {
    init: function() {
        this.x0 || (this.x0 = 0);
        this.y0 || (this.y0 = 0);
        this.lat0 || (this.lat0 = 0);
        this.long0 || (this.long0 = 0);
        this.lat_ts || (this.lat_ts = 0);
        this.title || (this.title = "Equidistant Cylindrical (Plate Carre)");
        this.rc = Math.cos(this.lat_ts);
    },
    forward: function(a) {
        var c = a.y, b = Proj4js.common.adjust_lon(a.x - this.long0), c = Proj4js.common.adjust_lat(c - this.lat0);
        a.x = this.x0 + this.a * b * this.rc;
        a.y = this.y0 + this.a * c;
        return a;
    },
    inverse: function(a) {
        var c = a.y;
        a.x = Proj4js.common.adjust_lon(this.long0 + (a.x - this.x0) / (this.a * this.rc));
        a.y = Proj4js.common.adjust_lat(this.lat0 + (c - this.y0) / this.a);
        return a;
    }
};

Proj4js.Proj.cass = {
    init: function() {
        this.sphere || (this.en = Proj4js.common.pj_enfn(this.es), this.m0 = Proj4js.common.pj_mlfn(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en));
    },
    C1: .16666666666666666,
    C2: .008333333333333333,
    C3: .041666666666666664,
    C4: .3333333333333333,
    C5: .06666666666666667,
    forward: function(a) {
        var c, b, d = a.x, e = a.y, d = Proj4js.common.adjust_lon(d - this.long0);
        this.sphere ? (c = Math.asin(Math.cos(e) * Math.sin(d)), b = Math.atan2(Math.tan(e), Math.cos(d)) - this.phi0) : (this.n = Math.sin(e), 
        this.c = Math.cos(e), b = Proj4js.common.pj_mlfn(e, this.n, this.c, this.en), 
        this.n = 1 / Math.sqrt(1 - this.es * this.n * this.n), this.tn = Math.tan(e), 
        this.t = this.tn * this.tn, this.a1 = d * this.c, this.c *= this.es * this.c / (1 - this.es), 
        this.a2 = this.a1 * this.a1, c = this.n * this.a1 * (1 - this.a2 * this.t * (this.C1 - (8 - this.t + 8 * this.c) * this.a2 * this.C2)), 
        b -= this.m0 - this.n * this.tn * this.a2 * (.5 + (5 - this.t + 6 * this.c) * this.a2 * this.C3));
        a.x = this.a * c + this.x0;
        a.y = this.a * b + this.y0;
        return a;
    },
    inverse: function(a) {
        a.x -= this.x0;
        a.y -= this.y0;
        var c = a.x / this.a, b = a.y / this.a;
        if (this.sphere) this.dd = b + this.lat0, b = Math.asin(Math.sin(this.dd) * Math.cos(c)), 
        c = Math.atan2(Math.tan(c), Math.cos(this.dd)); else {
            var d = Proj4js.common.pj_inv_mlfn(this.m0 + b, this.es, this.en);
            this.tn = Math.tan(d);
            this.t = this.tn * this.tn;
            this.n = Math.sin(d);
            this.r = 1 / (1 - this.es * this.n * this.n);
            this.n = Math.sqrt(this.r);
            this.r *= (1 - this.es) * this.n;
            this.dd = c / this.n;
            this.d2 = this.dd * this.dd;
            b = d - this.n * this.tn / this.r * this.d2 * (.5 - (1 + 3 * this.t) * this.d2 * this.C3);
            c = this.dd * (1 + this.t * this.d2 * (-this.C4 + (1 + 3 * this.t) * this.d2 * this.C5)) / Math.cos(d);
        }
        a.x = Proj4js.common.adjust_lon(this.long0 + c);
        a.y = b;
        return a;
    }
};

Proj4js.Proj.gauss = {
    init: function() {
        var a = Math.sin(this.lat0), c = Math.cos(this.lat0), c = c * c;
        this.rc = Math.sqrt(1 - this.es) / (1 - this.es * a * a);
        this.C = Math.sqrt(1 + this.es * c * c / (1 - this.es));
        this.phic0 = Math.asin(a / this.C);
        this.ratexp = .5 * this.C * this.e;
        this.K = Math.tan(.5 * this.phic0 + Proj4js.common.FORTPI) / (Math.pow(Math.tan(.5 * this.lat0 + Proj4js.common.FORTPI), this.C) * Proj4js.common.srat(this.e * a, this.ratexp));
    },
    forward: function(a) {
        var c = a.x, b = a.y;
        a.y = 2 * Math.atan(this.K * Math.pow(Math.tan(.5 * b + Proj4js.common.FORTPI), this.C) * Proj4js.common.srat(this.e * Math.sin(b), this.ratexp)) - Proj4js.common.HALF_PI;
        a.x = this.C * c;
        return a;
    },
    inverse: function(a) {
        for (var c = a.x / this.C, b = a.y, d = Math.pow(Math.tan(.5 * b + Proj4js.common.FORTPI) / this.K, 1 / this.C), e = Proj4js.common.MAX_ITER; 0 < e; --e) {
            b = 2 * Math.atan(d * Proj4js.common.srat(this.e * Math.sin(a.y), -.5 * this.e)) - Proj4js.common.HALF_PI;
            if (1e-14 > Math.abs(b - a.y)) break;
            a.y = b;
        }
        if (!e) return Proj4js.reportError("gauss:inverse:convergence failed"), 
        null;
        a.x = c;
        a.y = b;
        return a;
    }
};

Proj4js.Proj.omerc = {
    init: function() {
        this.mode || (this.mode = 0);
        this.lon1 || (this.lon1 = 0, this.mode = 1);
        this.lon2 || (this.lon2 = 0);
        this.lat2 || (this.lat2 = 0);
        var a = 1 - Math.pow(this.b / this.a, 2);
        Math.sqrt(a);
        this.sin_p20 = Math.sin(this.lat0);
        this.cos_p20 = Math.cos(this.lat0);
        this.con = 1 - this.es * this.sin_p20 * this.sin_p20;
        this.com = Math.sqrt(1 - a);
        this.bl = Math.sqrt(1 + this.es * Math.pow(this.cos_p20, 4) / (1 - a));
        this.al = this.a * this.bl * this.k0 * this.com / this.con;
        Math.abs(this.lat0) < Proj4js.common.EPSLN ? this.el = this.d = this.ts = 1 : (this.ts = Proj4js.common.tsfnz(this.e, this.lat0, this.sin_p20), 
        this.con = Math.sqrt(this.con), this.d = this.bl * this.com / (this.cos_p20 * this.con), 
        this.f = 0 < this.d * this.d - 1 ? 0 <= this.lat0 ? this.d + Math.sqrt(this.d * this.d - 1) : this.d - Math.sqrt(this.d * this.d - 1) : this.d, 
        this.el = this.f * Math.pow(this.ts, this.bl));
        0 != this.mode ? (this.g = .5 * (this.f - 1 / this.f), this.gama = Proj4js.common.asinz(Math.sin(this.alpha) / this.d), 
        this.longc -= Proj4js.common.asinz(this.g * Math.tan(this.gama)) / this.bl, 
        this.con = Math.abs(this.lat0), this.con > Proj4js.common.EPSLN && Math.abs(this.con - Proj4js.common.HALF_PI) > Proj4js.common.EPSLN ? (this.singam = Math.sin(this.gama), 
        this.cosgam = Math.cos(this.gama), this.sinaz = Math.sin(this.alpha), this.cosaz = Math.cos(this.alpha), 
        this.u = 0 <= this.lat0 ? this.al / this.bl * Math.atan(Math.sqrt(this.d * this.d - 1) / this.cosaz) : -(this.al / this.bl) * Math.atan(Math.sqrt(this.d * this.d - 1) / this.cosaz)) : Proj4js.reportError("omerc:Init:DataError")) : (this.sinphi = Math.sin(this.at1), 
        this.ts1 = Proj4js.common.tsfnz(this.e, this.lat1, this.sinphi), this.sinphi = Math.sin(this.lat2), 
        this.ts2 = Proj4js.common.tsfnz(this.e, this.lat2, this.sinphi), this.h = Math.pow(this.ts1, this.bl), 
        this.l = Math.pow(this.ts2, this.bl), this.f = this.el / this.h, this.g = .5 * (this.f - 1 / this.f), 
        this.j = (this.el * this.el - this.l * this.h) / (this.el * this.el + this.l * this.h), 
        this.p = (this.l - this.h) / (this.l + this.h), this.dlon = this.lon1 - this.lon2, 
        this.dlon < -Proj4js.common.PI && (this.lon2 -= 2 * Proj4js.common.PI), 
        this.dlon > Proj4js.common.PI && (this.lon2 += 2 * Proj4js.common.PI), this.dlon = this.lon1 - this.lon2, 
        this.longc = .5 * (this.lon1 + this.lon2) - Math.atan(this.j * Math.tan(.5 * this.bl * this.dlon) / this.p) / this.bl, 
        this.dlon = Proj4js.common.adjust_lon(this.lon1 - this.longc), this.gama = Math.atan(Math.sin(this.bl * this.dlon) / this.g), 
        this.alpha = Proj4js.common.asinz(this.d * Math.sin(this.gama)), Math.abs(this.lat1 - this.lat2) <= Proj4js.common.EPSLN ? Proj4js.reportError("omercInitDataError") : this.con = Math.abs(this.lat1), 
        this.con <= Proj4js.common.EPSLN || Math.abs(this.con - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN ? Proj4js.reportError("omercInitDataError") : Math.abs(Math.abs(this.lat0) - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN && Proj4js.reportError("omercInitDataError"), 
        this.singam = Math.sin(this.gam), this.cosgam = Math.cos(this.gam), this.sinaz = Math.sin(this.alpha), 
        this.cosaz = Math.cos(this.alpha), this.u = 0 <= this.lat0 ? this.al / this.bl * Math.atan(Math.sqrt(this.d * this.d - 1) / this.cosaz) : -(this.al / this.bl) * Math.atan(Math.sqrt(this.d * this.d - 1) / this.cosaz));
    },
    forward: function(a) {
        var c, b, d, e, f;
        d = a.x;
        b = a.y;
        c = Math.sin(b);
        e = Proj4js.common.adjust_lon(d - this.longc);
        d = Math.sin(this.bl * e);
        Math.abs(Math.abs(b) - Proj4js.common.HALF_PI) > Proj4js.common.EPSLN ? (c = Proj4js.common.tsfnz(this.e, b, c), 
        c = this.el / Math.pow(c, this.bl), f = .5 * (c - 1 / c), c = (f * this.singam - d * this.cosgam) / (.5 * (c + 1 / c)), 
        b = Math.cos(this.bl * e), 1e-7 > Math.abs(b) ? d = this.al * this.bl * e : (d = this.al * Math.atan((f * this.cosgam + d * this.singam) / b) / this.bl, 
        0 > b && (d += Proj4js.common.PI * this.al / this.bl))) : (c = 0 <= b ? this.singam : -this.singam, 
        d = this.al * b / this.bl);
        Math.abs(Math.abs(c) - 1) <= Proj4js.common.EPSLN && Proj4js.reportError("omercFwdInfinity");
        e = .5 * this.al * Math.log((1 - c) / (1 + c)) / this.bl;
        d -= this.u;
        c = this.y0 + d * this.cosaz - e * this.sinaz;
        a.x = this.x0 + e * this.cosaz + d * this.sinaz;
        a.y = c;
        return a;
    },
    inverse: function(a) {
        var c, b, d, e;
        a.x -= this.x0;
        a.y -= this.y0;
        c = a.x * this.cosaz - a.y * this.sinaz;
        d = a.y * this.cosaz + a.x * this.sinaz;
        d += this.u;
        b = Math.exp(-this.bl * c / this.al);
        c = .5 * (b - 1 / b);
        b = .5 * (b + 1 / b);
        d = Math.sin(this.bl * d / this.al);
        e = (d * this.cosgam + c * this.singam) / b;
        Math.abs(Math.abs(e) - 1) <= Proj4js.common.EPSLN ? (c = this.longc, e = 0 <= e ? Proj4js.common.HALF_PI : -Proj4js.common.HALF_PI) : (b = 1 / this.bl, 
        e = Math.pow(this.el / Math.sqrt((1 + e) / (1 - e)), b), e = Proj4js.common.phi2z(this.e, e), 
        c = this.longc - Math.atan2(c * this.cosgam - d * this.singam, b) / this.bl, 
        c = Proj4js.common.adjust_lon(c));
        a.x = c;
        a.y = e;
        return a;
    }
};

Proj4js.Proj.lcc = {
    init: function() {
        this.lat2 || (this.lat2 = this.lat0);
        this.k0 || (this.k0 = 1);
        if (Math.abs(this.lat1 + this.lat2) < Proj4js.common.EPSLN) Proj4js.reportError("lcc:init: Equal Latitudes"); else {
            var a = this.b / this.a;
            this.e = Math.sqrt(1 - a * a);
            var a = Math.sin(this.lat1), c = Math.cos(this.lat1), c = Proj4js.common.msfnz(this.e, a, c), b = Proj4js.common.tsfnz(this.e, this.lat1, a), d = Math.sin(this.lat2), e = Math.cos(this.lat2), e = Proj4js.common.msfnz(this.e, d, e), d = Proj4js.common.tsfnz(this.e, this.lat2, d), f = Proj4js.common.tsfnz(this.e, this.lat0, Math.sin(this.lat0));
            this.ns = Math.abs(this.lat1 - this.lat2) > Proj4js.common.EPSLN ? Math.log(c / e) / Math.log(b / d) : a;
            this.f0 = c / (this.ns * Math.pow(b, this.ns));
            this.rh = this.a * this.f0 * Math.pow(f, this.ns);
            this.title || (this.title = "Lambert Conformal Conic");
        }
    },
    forward: function(a) {
        var c = a.x, b = a.y;
        if (!(90 >= b && -90 <= b && 180 >= c && -180 <= c)) return Proj4js.reportError("lcc:forward: llInputOutOfRange: " + c + " : " + b), 
        null;
        var d = Math.abs(Math.abs(b) - Proj4js.common.HALF_PI);
        if (d > Proj4js.common.EPSLN) b = Proj4js.common.tsfnz(this.e, b, Math.sin(b)), 
        b = this.a * this.f0 * Math.pow(b, this.ns); else {
            d = b * this.ns;
            if (0 >= d) return Proj4js.reportError("lcc:forward: No Projection"), 
            null;
            b = 0;
        }
        c = this.ns * Proj4js.common.adjust_lon(c - this.long0);
        a.x = this.k0 * b * Math.sin(c) + this.x0;
        a.y = this.k0 * (this.rh - b * Math.cos(c)) + this.y0;
        return a;
    },
    inverse: function(a) {
        var c, b, d, e = (a.x - this.x0) / this.k0, f = this.rh - (a.y - this.y0) / this.k0;
        0 < this.ns ? (c = Math.sqrt(e * e + f * f), b = 1) : (c = -Math.sqrt(e * e + f * f), 
        b = -1);
        d = 0;
        0 != c && (d = Math.atan2(b * e, b * f));
        if (0 != c || 0 < this.ns) {
            if (b = 1 / this.ns, c = Math.pow(c / (this.a * this.f0), b), c = Proj4js.common.phi2z(this.e, c), 
            -9999 == c) return null;
        } else c = -Proj4js.common.HALF_PI;
        d = Proj4js.common.adjust_lon(d / this.ns + this.long0);
        a.x = d;
        a.y = c;
        return a;
    }
};

Proj4js.Proj.laea = {
    S_POLE: 1,
    N_POLE: 2,
    EQUIT: 3,
    OBLIQ: 4,
    init: function() {
        var a = Math.abs(this.lat0);
        this.mode = Math.abs(a - Proj4js.common.HALF_PI) < Proj4js.common.EPSLN ? 0 > this.lat0 ? this.S_POLE : this.N_POLE : Math.abs(a) < Proj4js.common.EPSLN ? this.EQUIT : this.OBLIQ;
        if (0 < this.es) switch (this.qp = Proj4js.common.qsfnz(this.e, 1), this.mmf = .5 / (1 - this.es), 
        this.apa = this.authset(this.es), this.mode) {
          case this.N_POLE:
          case this.S_POLE:
            this.dd = 1;
            break;

          case this.EQUIT:
            this.rq = Math.sqrt(.5 * this.qp);
            this.dd = 1 / this.rq;
            this.xmf = 1;
            this.ymf = .5 * this.qp;
            break;

          case this.OBLIQ:
            this.rq = Math.sqrt(.5 * this.qp), a = Math.sin(this.lat0), this.sinb1 = Proj4js.common.qsfnz(this.e, a) / this.qp, 
            this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1), this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * a * a) * this.rq * this.cosb1), 
            this.ymf = (this.xmf = this.rq) / this.dd, this.xmf *= this.dd;
        } else this.mode == this.OBLIQ && (this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0));
    },
    forward: function(a) {
        var c, b, d = a.x, e = a.y, d = Proj4js.common.adjust_lon(d - this.long0);
        if (this.sphere) {
            var f, g, i;
            i = Math.sin(e);
            g = Math.cos(e);
            f = Math.cos(d);
            switch (this.mode) {
              case this.OBLIQ:
              case this.EQUIT:
                b = this.mode == this.EQUIT ? 1 + g * f : 1 + this.sinph0 * i + this.cosph0 * g * f;
                if (b <= Proj4js.common.EPSLN) return Proj4js.reportError("laea:fwd:y less than eps"), 
                null;
                b = Math.sqrt(2 / b);
                c = b * g * Math.sin(d);
                b *= this.mode == this.EQUIT ? i : this.cosph0 * i - this.sinph0 * g * f;
                break;

              case this.N_POLE:
                f = -f;

              case this.S_POLE:
                if (Math.abs(e + this.phi0) < Proj4js.common.EPSLN) return Proj4js.reportError("laea:fwd:phi < eps"), 
                null;
                b = Proj4js.common.FORTPI - .5 * e;
                b = 2 * (this.mode == this.S_POLE ? Math.cos(b) : Math.sin(b));
                c = b * Math.sin(d);
                b *= f;
            }
        } else {
            var h = g = 0, j = 0;
            f = Math.cos(d);
            d = Math.sin(d);
            i = Math.sin(e);
            i = Proj4js.common.qsfnz(this.e, i);
            if (this.mode == this.OBLIQ || this.mode == this.EQUIT) g = i / this.qp, 
            h = Math.sqrt(1 - g * g);
            switch (this.mode) {
              case this.OBLIQ:
                j = 1 + this.sinb1 * g + this.cosb1 * h * f;
                break;

              case this.EQUIT:
                j = 1 + h * f;
                break;

              case this.N_POLE:
                j = Proj4js.common.HALF_PI + e;
                i = this.qp - i;
                break;

              case this.S_POLE:
                j = e - Proj4js.common.HALF_PI, i = this.qp + i;
            }
            if (Math.abs(j) < Proj4js.common.EPSLN) return Proj4js.reportError("laea:fwd:b < eps"), 
            null;
            switch (this.mode) {
              case this.OBLIQ:
              case this.EQUIT:
                j = Math.sqrt(2 / j);
                b = this.mode == this.OBLIQ ? this.ymf * j * (this.cosb1 * g - this.sinb1 * h * f) : (j = Math.sqrt(2 / (1 + h * f))) * g * this.ymf;
                c = this.xmf * j * h * d;
                break;

              case this.N_POLE:
              case this.S_POLE:
                0 <= i ? (c = (j = Math.sqrt(i)) * d, b = f * (this.mode == this.S_POLE ? j : -j)) : c = b = 0;
            }
        }
        a.x = this.a * c + this.x0;
        a.y = this.a * b + this.y0;
        return a;
    },
    inverse: function(a) {
        a.x -= this.x0;
        a.y -= this.y0;
        var c = a.x / this.a, b = a.y / this.a, d;
        if (this.sphere) {
            var e = 0, f, g = 0;
            f = Math.sqrt(c * c + b * b);
            d = .5 * f;
            if (1 < d) return Proj4js.reportError("laea:Inv:DataError"), null;
            d = 2 * Math.asin(d);
            if (this.mode == this.OBLIQ || this.mode == this.EQUIT) g = Math.sin(d), 
            e = Math.cos(d);
            switch (this.mode) {
              case this.EQUIT:
                d = Math.abs(f) <= Proj4js.common.EPSLN ? 0 : Math.asin(b * g / f);
                c *= g;
                b = e * f;
                break;

              case this.OBLIQ:
                d = Math.abs(f) <= Proj4js.common.EPSLN ? this.phi0 : Math.asin(e * this.sinph0 + b * g * this.cosph0 / f);
                c *= g * this.cosph0;
                b = (e - Math.sin(d) * this.sinph0) * f;
                break;

              case this.N_POLE:
                b = -b;
                d = Proj4js.common.HALF_PI - d;
                break;

              case this.S_POLE:
                d -= Proj4js.common.HALF_PI;
            }
            c = 0 == b && (this.mode == this.EQUIT || this.mode == this.OBLIQ) ? 0 : Math.atan2(c, b);
        } else {
            d = 0;
            switch (this.mode) {
              case this.EQUIT:
              case this.OBLIQ:
                c /= this.dd;
                b *= this.dd;
                g = Math.sqrt(c * c + b * b);
                if (g < Proj4js.common.EPSLN) return a.x = 0, a.y = this.phi0, a;
                f = 2 * Math.asin(.5 * g / this.rq);
                e = Math.cos(f);
                c *= f = Math.sin(f);
                this.mode == this.OBLIQ ? (d = e * this.sinb1 + b * f * this.cosb1 / g, 
                b = g * this.cosb1 * e - b * this.sinb1 * f) : (d = b * f / g, b = g * e);
                break;

              case this.N_POLE:
                b = -b;

              case this.S_POLE:
                d = c * c + b * b;
                if (!d) return a.x = 0, a.y = this.phi0, a;
                d = 1 - d / this.qp;
                this.mode == this.S_POLE && (d = -d);
            }
            c = Math.atan2(c, b);
            d = this.authlat(Math.asin(d), this.apa);
        }
        a.x = Proj4js.common.adjust_lon(this.long0 + c);
        a.y = d;
        return a;
    },
    P00: .3333333333333333,
    P01: .17222222222222222,
    P02: .10257936507936508,
    P10: .06388888888888888,
    P11: .0664021164021164,
    P20: .016415012942191543,
    authset: function(a) {
        var c, b = [];
        b[0] = a * this.P00;
        c = a * a;
        b[0] += c * this.P01;
        b[1] = c * this.P10;
        c *= a;
        b[0] += c * this.P02;
        b[1] += c * this.P11;
        b[2] = c * this.P20;
        return b;
    },
    authlat: function(a, c) {
        var b = a + a;
        return a + c[0] * Math.sin(b) + c[1] * Math.sin(b + b) + c[2] * Math.sin(b + b + b);
    }
};

Proj4js.Proj.aeqd = {
    init: function() {
        this.sin_p12 = Math.sin(this.lat0);
        this.cos_p12 = Math.cos(this.lat0);
    },
    forward: function(a) {
        var c = a.x, b, d = Math.sin(a.y), e = Math.cos(a.y), c = Proj4js.common.adjust_lon(c - this.long0), f = Math.cos(c), g = this.sin_p12 * d + this.cos_p12 * e * f;
        if (Math.abs(Math.abs(g) - 1) < Proj4js.common.EPSLN) {
            if (b = 1, 0 > g) {
                Proj4js.reportError("aeqd:Fwd:PointError");
                return;
            }
        } else b = Math.acos(g), b /= Math.sin(b);
        a.x = this.x0 + this.a * b * e * Math.sin(c);
        a.y = this.y0 + this.a * b * (this.cos_p12 * d - this.sin_p12 * e * f);
        return a;
    },
    inverse: function(a) {
        a.x -= this.x0;
        a.y -= this.y0;
        var c = Math.sqrt(a.x * a.x + a.y * a.y);
        if (c > 2 * Proj4js.common.HALF_PI * this.a) Proj4js.reportError("aeqdInvDataError"); else {
            var b = c / this.a, d = Math.sin(b), b = Math.cos(b), e = this.long0, f;
            if (Math.abs(c) <= Proj4js.common.EPSLN) f = this.lat0; else {
                f = Proj4js.common.asinz(b * this.sin_p12 + a.y * d * this.cos_p12 / c);
                var g = Math.abs(this.lat0) - Proj4js.common.HALF_PI;
                Math.abs(g) <= Proj4js.common.EPSLN ? e = 0 <= this.lat0 ? Proj4js.common.adjust_lon(this.long0 + Math.atan2(a.x, -a.y)) : Proj4js.common.adjust_lon(this.long0 - Math.atan2(-a.x, a.y)) : (g = b - this.sin_p12 * Math.sin(f), 
                Math.abs(g) < Proj4js.common.EPSLN && Math.abs(a.x) < Proj4js.common.EPSLN || (Math.atan2(a.x * d * this.cos_p12, g * c), 
                e = Proj4js.common.adjust_lon(this.long0 + Math.atan2(a.x * d * this.cos_p12, g * c))));
            }
            a.x = e;
            a.y = f;
            return a;
        }
    }
};

Proj4js.Proj.moll = {
    init: function() {},
    forward: function(a) {
        for (var c = a.y, b = Proj4js.common.adjust_lon(a.x - this.long0), d = c, e = Proj4js.common.PI * Math.sin(c), f = 0; ;f++) {
            var g = -(d + Math.sin(d) - e) / (1 + Math.cos(d)), d = d + g;
            if (Math.abs(g) < Proj4js.common.EPSLN) break;
            50 <= f && Proj4js.reportError("moll:Fwd:IterationError");
        }
        d /= 2;
        Proj4js.common.PI / 2 - Math.abs(c) < Proj4js.common.EPSLN && (b = 0);
        c = .900316316158 * this.a * b * Math.cos(d) + this.x0;
        d = 1.4142135623731 * this.a * Math.sin(d) + this.y0;
        a.x = c;
        a.y = d;
        return a;
    },
    inverse: function(a) {
        var c;
        a.x -= this.x0;
        c = a.y / (1.4142135623731 * this.a);
        .999999999999 < Math.abs(c) && (c = .999999999999);
        c = Math.asin(c);
        var b = Proj4js.common.adjust_lon(this.long0 + a.x / (.900316316158 * this.a * Math.cos(c)));
        b < -Proj4js.common.PI && (b = -Proj4js.common.PI);
        b > Proj4js.common.PI && (b = Proj4js.common.PI);
        c = (2 * c + Math.sin(2 * c)) / Proj4js.common.PI;
        1 < Math.abs(c) && (c = 1);
        c = Math.asin(c);
        a.x = b;
        a.y = c;
        return a;
    }
};
