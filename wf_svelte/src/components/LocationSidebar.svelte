<script>
    import { createEventDispatcher } from "svelte";
    import Menu from "./Menu.svelte";
    import SearchResults from "./SearchResults.svelte";
    const dispatch = createEventDispatcher();
    /** @type {any[]} */
    export let groups = [];
    export let enablePopup = true;
    export let menuEnabled = true;
    export let directionsEnabled = false;
    /** @type {(keyword: string) => any[]} */
    export let searchPOIs = () => [];
    let searchVisible = false;
    let groupsVisible = false;
    let search = { keyword: "", results: /** @type {any[]} */ ([]) };
    function searchPOI() {
        if (search.keyword && search.keyword.length >= 2) {
            search.results = searchPOIs(search.keyword);
            searchVisible = true;
            groupsVisible = true;
        }
    }
    function clearSearch() {
        searchVisible = false;
        search.results = [];
        search.keyword = "";
    }
    function showMenu() { groupsVisible = true; }
    function hideMenu() { groupsVisible = false; }
    export function close() { hideMenu(); }
</script>

<div
    class="wf-menu sm:wt-w-full wt-mb-4 wt-basis-1/3 wt-grow-0 wt-flex wt-flex-col"
    class:wf-with-directions={directionsEnabled}
    class:wf-directions-only={!menuEnabled}
>
    {#if menuEnabled}
    <div class="sm:wt-visible">
        <label
            for="poi-search"
            id="wf-search-label"
            class="wt-hidden sm:wt-block"
            data-translation-element="web-search-label"
            >Otsi kaupluse või brändi järgi</label
        >
        <div class="poi-search-container">
            <input
                class="wt-w-full"
                id="poi-search"
                bind:value={search.keyword}
                on:change={searchPOI}
                on:input={searchPOI}
                placeholder=""
                data-translation-attributes="placeholder"
                data-translation-attribute-placeholder="web-search-placeholder"
            />
            {#if !searchVisible}
                <svg
                    id="wf-search-icon"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M11.1667 17.8333C14.8486 17.8333 17.8333 14.8486 17.8333 11.1667C17.8333 7.48477 14.8486 4.5 11.1667 4.5C7.48477 4.5 4.5 7.48477 4.5 11.1667C4.5 14.8486 7.48477 17.8333 11.1667 17.8333Z"
                        fill="none"
                        stroke="#6A747B"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M19.5 19.5L15.875 15.875"
                        stroke="#6A747B"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            {/if}
            {#if searchVisible}
                <button
                    type="button"
                    class="search-clear"
                    aria-label="Clear search"
                    on:click={clearSearch}
                >
                    <svg class="wf-icon" viewBox="0 0 16 19">
                        <path
                            d="m 0,14.5449 h 20.569799 v 2.05698 H 0 Z"
                            transform="rotate(-45 0 14.5449)"
                        />
                        <path
                            transform="rotate(-135 14.5454 16)"
                            d="m 14.5454,16 h 20.569799 v 2.05698 H 14.5454 Z"
                        />
                    </svg>
                </button>
            {/if}
        </div>
        <slot name="directions" />
        <div class="wf-groups-button">
            <button
                class="wp-element-button"
                type="button"
                aria-expanded={groupsVisible}
                on:click={groupsVisible ? hideMenu : showMenu}
            >
                <span data-translation-element="web-categories"
                    >Categories</span
                >
                <svg class="wf-icon" viewBox="0 0 14 8" aria-hidden="true">
                    <path
                        d="M1 1L7 7L13 1"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    </div>
    <div
        id="wf-menu-content"
        class="wf-groups wt-overflow-hidden md:wt-overflow-y-auto wt-grow {groupsVisible
            ? 'wf-active'
            : ''}"
    >
        <div id="wf-search-items-container">
            <button
                type="button"
                class="wf-menu-header hidden"
                on:click={clearSearch}
            >
                <span data-translation-element="web-search-header"
                    >Otsi kauplust</span
                >
                <svg class="wf-icon" viewBox="0 0 16 19" aria-hidden="true">
                    <use xlink:href="#icon-clear" />
                </svg>
            </button>
            <ul id="wf-search-items" class="wf-accordion"></ul>
        </div>
        <div id="wf-menu-items-container">
            <button
                type="button"
                class="wf-menu-header wf-mobile-menu-header wt-flex wt-items-center wt-justify-between sm:wt-hidden"
                on:click={hideMenu}
            >
                <span data-translation-element="web-category-header"
                    >Sorteeri kategooria järgi</span
                >
                <svg class="wf-icon" viewBox="0 0 16 19" aria-hidden="true">
                    <use xlink:href="#icon-clear" />
                </svg>
            </button>
            {#if !searchVisible}
                <Menu {groups} on:poiclicked={(event) => dispatch("poiselect", event.detail)}></Menu>
            {/if}
            {#if searchVisible}
                <SearchResults
                    results={search.results}
                    on:poiclicked={(event) => dispatch("poiselect", event.detail)}
                ></SearchResults>
            {/if}
        </div>
    </div>
    <!-- POI info -->
    {#if !enablePopup}
        <div class="wt-absolute wt-top-0 wt-left-0 wt-w-full wt-h-full">
            POI
        </div>
    {/if}
    {/if}
    {#if !menuEnabled}<slot name="directions" />{/if}
</div>

<style>
svg.wf-icon { height: 1rem; width: auto; display: inline-block; --color1: "red"; }

.wf-menu-header {
    padding: 12px;
    border: 0;
    width: 100%;
    background: transparent;
    text-align: left;
}

.wf-mobile-menu-header {
    background: #ccc;
}

.wf-menu-header .wf-icon,
.wf-mobile-menu-header .wf-icon {
    height: 22px;
    font-size: 16px;
    line-height: 24px;
}

.wf-menu {
    padding: 0;
    padding-right: 0.5rem;
    margin-bottom: 0;
    overflow: hidden;
    min-width: 0;
}

    .wf-menu:global(.wf-hide) {
    display: none;
}

.poi-search-container {
    padding-bottom: 12px;
    position: relative;
}

#wf-search-label {
    font-size: 16px;
    margin-top: 12px;
}

.poi-search-container input {
    width: 100%;
    padding-left: 12px;
    padding-right: 32px;
    line-height: 1.8;
    padding-top: 7px;
    padding-bottom: 7px;
    border: 1px solid #a7a9ac;
    box-sizing: border-box;
}

.poi-search-container input:focus {
    outline: none;
}

.search-clear {
    position: absolute;
    top: 12px;
    right: 12px;
    border: 0;
    padding: 0;
    background: transparent;
    line-height: 0;
    cursor: pointer;
}

.poi-search-container #wf-search-icon {
    position: absolute;
    top: 8px;
    right: 0.8rem;
    color: #3c4d58;
    height: 24px;
    width: auto;
}

#wf-menu-items-container,
#wf-search-items-container {
    display: none;
    flex-direction: column;
    justify-content: flex-start;
}

    :global(.wf-search) #wf-search-items-container {
    display: flex;
}

.wf-groups #wf-menu-items-container {
    display: flex;
    overflow: auto;
}

.wf-groups-button {
    display: none;
}

.wf-groups-button > button[aria-expanded="true"] > .wf-icon {
    transform: rotate(90deg);
    transition: transform 0.5s ease;
}

.wf-groups-button > button {
    width: 100%;
    line-height: 1.75;
    padding: 7px 12px;
    border: none;
    border: 1px solid #a7a9ac;
    color: #231f20;
    color: var(--wf-active-content, #231f20);
    position: relative;
}

.wf-groups-button > button > .wf-icon {
    position: absolute;
    right: 18px;
    top: 50%;
    height: 12px;
    margin-top: -6px;
}

.wf-groups-button > button:focus {
    outline: none;
}

@media (min-width: 768px) {
    .wf-menu.wf-directions-only { display: none; }
}

@media (max-width: 767px) {
    :global(#wf_container) > .wf-menu.wf-with-directions {
        flex: 0 0 auto;
        flex-direction: column;
        height: auto;
        position: relative;
        overflow: visible;
    }
}

/* Smartphones in portrait keep the stacked mobile layout. */
@media (max-width: 500px) {

    /* Styles */
    .wf-menu {
        width: 100%;
        flex-basis: auto !important;
        height: 4rem;
        box-sizing: border-box;
        margin-bottom: 0;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        padding-bottom: calc(0.5rem + env(safe-area-inset-bottom, 0px));
        position: sticky;
        top: 0;
        z-index: 50;
        background: #fff;
        box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.08);
    }

    .wf-groups-button {
        display: block;
    }

    #wf-menu-content {
        position: fixed;
        z-index: 99;
        top: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        min-height: 29rem;
        background-color: #fff;
        padding-bottom: 2rem;
        transition: top 0.3s ease-out;
        opacity: 0;
        display: flex;
        flex-direction: column;
    }

    #wf-menu-content.wf-active {
        top: 49%;
        opacity: 1;
    }

        :global(.wf-search) #wf-search-items-container .wf-menu-header {
        flex-basis: 32px;
        flex-grow: 0;
        flex-shrink: 1;
    }

    .wf-groups #wf-menu-items-container .wf-menu-header {
        flex-basis: 32px;
        flex-grow: 0;
        flex-shrink: 1;
    }

    :global(#wf-menu-items) {
        padding-bottom: 2em;
    }

}

@media (pointer: coarse) and (orientation: landscape) and (max-height: 500px) {

    #wf-search-label {
        display: none;
    }

    :global(#wf-menu-items) {
        margin-top: 0;
    }

}
</style>
