/** @param {any} option */
export function hasOption(option) {
    return typeof option === "string" && option !== "NA";
}

/** @param {Record<string, any>} options */
export function readOptions(options) {
    /** @param {string} name @param {string} fallback @returns {string} */
    const value = (name, fallback) => hasOption(options[name]) ? options[name] : fallback;
    /** @param {string} name @param {boolean} fallback */
    const flag = (name, fallback) => hasOption(options[name]) ? options[name] === "true" : fallback;
    const align = value("align", "left");
    return {
        type: value("maptype", "2d"),
        project: value("project", "demo"),
        mobile: options.mobile === "true",
        menu: flag("menu", true),
        enablePopup: flag("popup", true),
        showPathButton: flag("path_button", true),
        showWebsiteButton: flag("website_url_button", false),
        showAccessibilityPathButton: flag("accessibility_path_button", false),
        showYah: flag("show_yah", true),
        align,
        customClasses: value("classes", "") + (align === "right" ? "md:wt-flex-row-reverse" : ""),
        maxHeight: hasOption(options.height) ? parseInt(options.height) : 100,
        enableCompass: flag("compass_button", false),
        parentGroup: value("group", ""),
        parentSet: hasOption(options.group),
        version: value("version", "dev"),
        loadScripts: options.scripts !== "local",
    };
}
