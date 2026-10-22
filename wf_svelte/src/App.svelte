<script>
    import { onMount } from "svelte";
    import "./app.css";
    import LocationSidebar from "./components/LocationSidebar.svelte";
    import MapControls from "./components/MapControls.svelte";
    import POIPopup from "./components/POIPopup.svelte";
    import PathMessage from "./components/PathMessage.svelte";
    import IconDefinitions from "./components/IconDefinitions.svelte";
    import { readOptions, hasOption } from "./lib/options.js";
    import { makeGroup, makePOI } from "./lib/poiModels.js";
    import { createWayfinderRuntime } from "./lib/wayfinderRuntime.js";

    export const prerender = true;
    /** @type {Record<string, any>} */
    export let options = {};
    /** @type {Record<string, any>} */
    export let settings = {};
    const WF_OPTIONS = options;
    const WF_SETTINGS = settings;
    const configuration = readOptions(WF_OPTIONS);
    const { menu, enablePopup, showPathButton,
        showWebsiteButton, showAccessibilityPathButton, align,
        customClasses, maxHeight, enableCompass, parentGroup, parentSet } = configuration;
    let pathTextEnabled = false;
    let showPathText = false;
    let pathText = "";
    let pathTextTime = 0;
    let enableLocate = false;
    let locateEnabled = false;
    let compassRotating = false;
    let language = "en";
    const mainContainer = document.getElementById("wf_app");
    /** @type {HTMLCanvasElement} */
    let mapContainer;
    /** @type {LocationSidebar | undefined} */
    let sidebar;
    /** @type {{ left: number, top: number, offset: number } | null} */
    let popupPosition = null;
    if (hasOption(WF_OPTIONS.color_active)) {
        mainContainer?.style.setProperty("--wf-active-color", WF_OPTIONS.color_active);
    }

    /** @type {Array<[number, string]>} */
    let floors = [];
    /** @type {any[]} */
    let groups = [];

    /** @type {any} */
    let popupPOI = null;
    let popupVisible = false;
    let showPathTrans = "";
    let showWebsiteTrans = "";
    let showAccessibilityPathTrans = "";
    let activeFloor = -1;

    /** @type {any} */
    let wayfinder;
    const runtime = createWayfinderRuntime();

    /** @param {string} name @param {Record<string, any>} [detail] */
    function dispatchLifecycleEvent(name, detail = {}) {
        mainContainer?.dispatchEvent(
            new CustomEvent(name, {
                bubbles: true,
                detail: { wayfinder, ...detail },
            }),
        );
    }

    /** @param {any} instance */
    function mount(instance) {
        wayfinder = instance;
        const { Logistics, WayfinderAPI } = /** @type {any} */ (window);
        runtime.on("data-loaded", () => {
            Logistics.getImage(
                WayfinderAPI.getURL("images", "getMedium", [530]),
                function (/** @type {any} */ img) {
                    wayfinder.yahImage = img;
                },
            );
            floors = [];
            if (typeof WF_SETTINGS === "object") {
                wayfinder.settings.override(WF_SETTINGS);
            }

            language = wayfinder.getLanguage();
            wayfinder.building.getSortedFloors().forEach((/** @type {any} */ floor) => {
                if (floor.getShowInMenu()) {
                    floors.push([floor.id, floor.getName(language)]);
                }
            });

            groups = [];
            var mainGroups = [];

            if (parentGroup !== "") {
                console.log('Showing parent group with slug', parentGroup);
                var parent = wayfinder.getGroupWithSlug(parentGroup);
                if (typeof parent === "object") {
                    mainGroups = parent.getChildren().map((/** @type {number} */ id) => {
                        return wayfinder.poiGroups[id];
                    });
                }
            } else {
                mainGroups = wayfinder.getMainGroups();
            }

            Object.values(mainGroups).forEach((group) => {
                if (group.getShowInMenu() && (!group.parent || parentSet && group.getName(language))) {
                    groups.push(makeGroup(group, wayfinder.getPOIGroups(), language));
                }
            });

            wayfinder.translator.translate(language);
            showPathTrans = wayfinder.translator.get("show_path");
            showWebsiteTrans = wayfinder.translator.get("show_website");
            showAccessibilityPathTrans = wayfinder.translator.get(
                "show_accessibility_path",
            );
            pathTextTime =
                wayfinder.settings.getInt("path.message.duration", 5) * 1000;

            dispatchLifecycleEvent("wf:data-loaded");
        });

        runtime.on(
            "floor-change-before",
            (currentFloor, nextFloor, destinationFloor) => {
                if (pathTextEnabled) {
                    pathText = wayfinder.translator.get("go_to_floor", [
                        destinationFloor.getName(wayfinder.getLanguage()),
                        currentFloor.getName(wayfinder.getLanguage()),
                        nextFloor.getName(wayfinder.getLanguage()),
                    ]);
                    showPathText = true;
                }
            },
        );

        runtime.on("floor-change", (floor) => {
            activeFloor = floor.id;

            if (popupPOI && popupPOI.floor !== floor) {
                hidePopup();
            } else if (popupPOI) {
                showPopup(popupPOI);
            }

            if (showPathText) {
                runtime.setTimeout(() => {
                    showPathText = false;
                }, pathTextTime);
            }
        });

        runtime.on("map-click", (poi) => {
            console.log("map-click", poi);
            runtime.setTimeout(() => {
                showPopup(poi);
            }, 300);
        });

        runtime.on("zoom-change", function () {
            hidePopup();
        });

        runtime.on("zoom-change", function () {
            hidePopup();
        });

        runtime.on("map-touch", function () {
            console.log("map-touch");
            hidePopup();
        });

        runtime.on("map-update", function () {
            console.log("map-update");
            if (popupPOI && popupVisible) {
                showPopup(popupPOI);
            }
        });

        runtime.on("language-change", () => {
            language = wayfinder.getLanguage();
        });

        runtime.on("display", (poi) => {
            runtime.setTimeout(() => {
                showPopup(poi);
            }, 500);
        });

        runtime.on("map-ready", (event) => {
            dispatchLifecycleEvent("wf:map-ready", { event });
        });

        runtime.on("location-success", function (location) {
            if (location) {
                wayfinder.showFloor(location.floor);
            }

            locateEnabled = true;

            if (wayfinder.logic.path && wayfinder.logic.path.toText) {
                var key = "location-path-start";
                pathText = wayfinder.translator.get(key, [
                    "",
                    wayfinder.logic.path.toText.distance + "m",
                ]);
                if (pathText !== key) {
                    showPathText = true;

                    runtime.setTimeout(() => {
                        showPathText = false;
                    }, pathTextTime);
                }
            }

            if (hasOption(WF_OPTIONS.navigate_button)) {
                enableLocate = WF_OPTIONS.navigate_button == "true";
            }
        });

        runtime.on("location-change", function (location) {
            if (location && location.floor && locateEnabled) {
                wayfinder.showFloor(location.floor);
            }
        });

        runtime.on("path-start", function () {
            pathTextEnabled = true;

            if (wayfinder.logic.path && wayfinder.logic.path.toText) {
                var key = "location-path-start";
                pathText = wayfinder.translator.get(key, [
                    "",
                    wayfinder.logic.path.toText.distance + "m",
                ]);
                if (pathText !== key) {
                    showPathText = true;

                    runtime.setTimeout(() => {
                        showPathText = false;
                    }, pathTextTime);
                }
            }

            if (wayfinder.logic.path && wayfinder.logic.path.fromText) {
                locateEnabled = true;
            }
        });

        runtime.on("path-step", function (step) {
            console.log("step", step);
        });

        runtime.on("path-finished", function () {
            if (location) {
                runtime.setTimeout(() => {
                    wayfinder.showFloor(wayfinder.getKioskNode().floor);
                }, pathTextTime);
            }
        });

        runtime.on("location-path-step", function (step) {
            if (pathTextEnabled) {
                var key = "path-" + step.type + "-" + step[step.type];
                pathText = wayfinder.translator.get(key);
                if (pathText !== key) {
                    showPathText = true;
                }

                runtime.setTimeout(() => {
                    showPathText = false;
                }, pathTextTime);
            }
        });

        runtime.on("location-path-finished", function (step) {
            if (pathTextEnabled) {
                var key = "path-arrived";
                pathText = wayfinder.translator.get(key);
                if (pathText !== key) {
                    showPathText = true;
                }

                runtime.setTimeout(() => {
                    showPathText = false;
                }, pathTextTime);
            }
        });
    }

    onMount(() => {
        runtime.start(configuration, WF_OPTIONS, mount);
        return () => runtime.destroy();
    });

    /** @param {number} floorId */
    function showFloor(floorId) {
        wayfinder.showFloor(wayfinder.building.floors[floorId]);
        return null;
    }

    /** @param {any} poiOrId */
    export function openPOI(poiOrId) {
        const poi =
            typeof poiOrId === "object"
                ? poiOrId
                : wayfinder?.pois[poiOrId];

        if (poi) {
            wayfinder.display(poi);
            showPopup(poi);
            sidebar?.close();
            wayfinder.setLanguage(language);
            scrollToView();
            return true;
        }

        return false;
    }

    function scrollToView() {
        if (!mapContainer) return;

        var pad = 20;
        const rect = mapContainer.getBoundingClientRect();
        const isVisible =
            rect.top >= -pad &&
            rect.left >= -pad &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) +
                    pad &&
            rect.right <=
                (window.innerWidth || document.documentElement.clientWidth) +
                    pad;

        if (!isVisible) {
            mapContainer.scrollIntoView({ behavior: "smooth" });
        }
    }

    /** @param {any} poi */
    function showPopup(poi) {
        popupPOI = poi;
        if (poi) {
            const position = wayfinder.getScreenPosition(poi);
            popupPosition = position ? {
                left: position[0], top: position[1],
                offset: wayfinder.settings.getFloat("poi.2d.icon-size", 24, poi) + 10,
            } : null;
            popupVisible = Boolean(position);
        }
    }

    function hidePopup() {
        popupVisible = false;
    }

    /** @param {string} keyword */
    function searchPOIs(keyword) {
        return wayfinder.search.search(keyword).slice(0, 15).map((/** @type {any} */ poi) => makePOI(poi, language));
    }

    function showPath() {
        if (wayfinder && popupPOI) {
            runtime.setTimeout(() => {
                wayfinder.showPath(popupPOI.getNode(), popupPOI, {
                    toText: true,
                });
                popupPOI = null;
            });
        }
    }

    function showAccessibilityPath() {
        if (wayfinder && popupPOI) {
            runtime.setTimeout(() => {
                wayfinder.showPath(popupPOI.getNode(), popupPOI, {
                    toText: true,
                    ignoreTypes: ["escalator", "stairs"],
                });
                popupPOI = null;
            });
        }
    }

    function toggleCompass() {
        if (wayfinder) {
            compassRotating = !compassRotating;
            wayfinder.toggleCompassRotating(compassRotating);
        }
    }

    function locateUser() {
        locateEnabled = !locateEnabled;
    }
</script>

<IconDefinitions />
<div
    id="wf_container"
    class="wf-appcontainer wt-w-full wt-flex wt-flex-col-reverse md:wt-flex-row wf-items-stretch {customClasses}"
    style="max-height: {maxHeight}vh;"
>
    {#if menu}
        <LocationSidebar bind:this={sidebar} {groups} {enablePopup} {searchPOIs}
            on:poiselect={(event) => openPOI(event.detail)} />
    {/if}
    <div class="wf-map-container wt-grow">
        <div class="wf-map wt-w-full wt-relative sm:wt-flex">
            <div class="map-wrapper wt-w-full wt-h-full">
                <canvas bind:this={mapContainer} id="map" width="400" height="300"></canvas>
            </div>
            <MapControls {floors} {activeFloor} {align} {enableCompass}
                {compassRotating} {enableLocate} {locateEnabled}
                on:floorselect={(event) => showFloor(event.detail)}
                on:compasstoggle={toggleCompass} on:locationtoggle={locateUser} />
            <PathMessage visible={showPathText && pathTextEnabled} text={pathText} />
            {#if enablePopup}
                <POIPopup {popupPOI} {popupVisible} {language} position={popupPosition}
                    {showPathButton} {showAccessibilityPathButton} {showWebsiteButton}
                    {showPathTrans} {showAccessibilityPathTrans} {showWebsiteTrans}
                    on:route={showPath} on:accessibleroute={showAccessibilityPath} />
            {/if}
        </div>
    </div>
    <div
        class="wt-right-0 md:wt-right-4 wt-left-0 md:wt-left-4 wt-hidden"
    ></div>
</div>

<style>
.wf-appcontainer .wf-map {
    height: 100%;
    flex: 1;
    padding: 0;
}

.wf-map-container {
    width: 100%;
    flex-grow: 1;
}

.wf-icon-puhkealad {
    width: 136px !important;
    margin: 8px !important;
}

.ting-header {
    border-bottom: 1px solid #e0dfdf;
    padding: 8px 16px;
    font-size: 14px;
}

.wf-map-container canvas {
    width: 100%;
    height: 100%;
    flex-grow: 1;
}

/* Smartphones in portrait keep the stacked mobile layout. */
@media (max-width: 500px) {

    :global(#wf_app) {
        overflow: visible;
    }

    .wf-entry-content {
        padding: 2em 1em !important;
    }

    .wf-appcontainer {
        flex-wrap: nowrap;
        flex-direction: column-reverse !important;
        flex-shrink: 0;
    }

    .wf-appcontainer > :global(div) {
        flex-direction: column-reverse;
        flex-grow: 1;
    }

    .wf-map-container {
        width: 100%;
        padding-bottom: 0;
    }

    .wf-appcontainer .wf-map {
        width: auto !important;
        flex-grow: 1;
        padding-bottom: 1em;
        display: flex;
        position: relative;
        align-items: flex-start;
    }

}

@media only screen and (min-width: 1280px) {

    .wf-appcontainer {
        min-height: 720px;
        box-sizing: border-box;
    }

}
</style>
