/** @type {Record<string, string>} */
const scriptURLs = {
    "2d": "https://wayfinder-cdn.com/js/dist/2d/VERSION/Wayfinder2D.debug.js",
    mobile: "https://wayfinder-cdn.com/js/dist/mobile/VERSION/WayfinderMobile.debug.js",
    "3d": "https://wayfinder-cdn.com/js/dist/3d/VERSION/Wayfinder3D.debug.js",
    frak: "https://wayfinder-cdn.com/js/dist/3d/VERSION/frak2.debug.js",
};

export function createWayfinderRuntime() {
    /** @type {any} */
    let wayfinder;
    let destroyed = false;
    let flutterReady = false;
    /** @type {Set<ReturnType<typeof setTimeout>>} */
    const timers = new Set();
    /** @type {HTMLScriptElement[]} */
    const scripts = [];
    /** @type {Array<{ name: string, handler: (...args: any[]) => void }>} */
    const subscriptions = [];
    /** @type {Record<string, any>} */
    const globals = window;

    /** @param {() => void} callback @param {number} [delay] */
    function schedule(callback, delay) {
        const timer = setTimeout(() => {
            timers.delete(timer);
            if (!destroyed) callback();
        }, delay);
        timers.add(timer);
        return timer;
    }

    /** @param {string} name @param {(...args: any[]) => void} handler */
    function on(name, handler) {
        const guardedHandler = (/** @type {any[]} */ ...args) => {
            if (!destroyed) handler(...args);
        };
        wayfinder.events.on(name, guardedHandler);
        subscriptions.push({ name, handler: guardedHandler });
    }

    function markFlutterReady() {
        flutterReady = true;
    }

    /** @param {string[]} urls @param {string} version @param {() => void} ready */
    function loadNext(urls, version, ready) {
        if (destroyed) return;
        const url = urls.shift();
        if (!url) {
            schedule(ready, 300);
            return;
        }
        const script = document.createElement("script");
        script.onload = () => loadNext(urls, version, ready);
        script.onerror = () => {
            if (!destroyed) console.error("Unable to load Wayfinder script:", script.src);
        };
        script.src = url.replace("VERSION", version);
        scripts.push(script);
        document.head.appendChild(script);
    }

    /** @param {ReturnType<import('./options.js').readOptions>} configuration
     * @param {Record<string, any>} options
     * @param {(instance: any) => void} ready */
    function start(configuration, options, ready) {
        const { type, mobile, version, project, showYah } = configuration;
        const urls = [];
        if (configuration.loadScripts) {
            if (type === "3d") urls.push(scriptURLs.frak);
            urls.push(scriptURLs[type]);
            if (mobile) urls.push(scriptURLs.mobile);
        }
        window.addEventListener("flutterInAppWebViewPlatformReady", markFlutterReady);
        loadNext(urls, version, () => {
            const constructorName = mobile
                ? (type === "2d" ? "WayfinderMobile2D" : "WayfinderMobile3D")
                : (type === "2d" ? "Wayfinder2D" : "Wayfinder3D");
            wayfinder = new globals[constructorName]();
            globals.wayfinder = wayfinder;
            for (const [name, value] of Object.entries(options)) {
                if (Object.prototype.hasOwnProperty.call(wayfinder.options, name)) {
                    wayfinder.options[name] = value == "false" ? false : value == "true" ? true : value;
                }
            }
            wayfinder.options.drawKioskIcon = showYah;
            const api = globals.WayfinderAPI;
            api.LOCATION = options.api === "cdn" ? api.CDN_LOCATION
                : options.api === "live" ? api.LIVE_LOCATION
                : options.api === "custom" ? options.api : api.LOCATION;
            wayfinder.open(project);
            on("any", (event) => {
                if (flutterReady && globals.flutter_inappwebview) {
                    globals.flutter_inappwebview.callHandler("wayfinderEvent", event);
                }
            });
            ready(wayfinder);
        });
    }

    function destroy() {
        destroyed = true;
        window.removeEventListener("flutterInAppWebViewPlatformReady", markFlutterReady);
        for (const timer of timers) clearTimeout(timer);
        timers.clear();
        for (const script of scripts) {
            script.onload = null;
            script.onerror = null;
            script.remove();
        }
        for (const { name, handler } of subscriptions) {
            if (typeof wayfinder.events.off === "function") wayfinder.events.off(name, handler);
        }
    }

    return { start, on, setTimeout: schedule, destroy };
}
