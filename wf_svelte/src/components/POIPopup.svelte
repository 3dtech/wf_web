<script>
    import { createEventDispatcher, tick } from "svelte";
    const dispatch = createEventDispatcher();
    /** @type {any} */
    export let popupPOI = null;
    export let popupVisible = false;
    export let language = "en";
    export let showPathButton = true;
    export let showAccessibilityPathButton = false;
    export let showWebsiteButton = false;
    export let showPathTrans = "";
    export let showAccessibilityPathTrans = "";
    export let showWebsiteTrans = "";
    /** @type {{ left: number, top: number, offset: number } | null} */
    export let position = null;
    /** @type {HTMLDivElement} */
    let popupElement;
    $: updatePosition(position, popupVisible, popupPOI, language);
    /** @param {typeof position} nextPosition
     * @param {boolean} visible
     * @param {any} poi
     * @param {string} currentLanguage */
    async function updatePosition(nextPosition, visible, poi, currentLanguage) {
        await tick();
        if (!popupElement || !nextPosition || !visible || !poi) return;
        const { left, top, offset } = nextPosition;
        popupElement.style.left = left + "px";
        popupElement.style.top = top - offset + "px";
        popupElement.style.marginTop = -(popupElement.clientHeight / 2) + "px";
        popupElement.style.marginLeft = -(popupElement.clientWidth / 2) + "px";
        popupElement.classList.remove("wf-pin-up", "wf-pin-left", "wf-pin-right");
        if (top < 155 / 2) {
            popupElement.style.marginTop = -offset * 2 + "px";
            popupElement.classList.add("wf-pin-up");
        }
        if (left < 155 / 2) {
            popupElement.style.marginLeft = -left + "px";
            popupElement.classList.add("wf-pin-left");
        }
    }
</script>

<div id="poi-popup" bind:this={popupElement}>
    {#if popupPOI && popupVisible}
        <div class="poi-popup-content">
            <span class="title"
                >{popupPOI.getName(language)}</span
            >
            {#if popupPOI.web}
                <a href={popupPOI.web}>
                    <button class="wp-element-button wt-flex wt-gap-4 wt-items-center">
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info wt-w-[1.5em] wt-h-[1.5em]"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>

                        <span data-translation-element="info"
                            >Info</span
                        >
                    </button>
                </a>
            {/if}
            {#if showPathButton}
                <button
                    class="wp-element-button wf-btn wt-flex wt-gap-2 wt-items-center"
                    on:click={() => dispatch("route")}
                >
                    <span data-translation-element="show_path"
                        >{showPathTrans}</span
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        class="wf-icon wf-path"
                        ><path
                            style="fill: currentColor"
                            d="M160 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM126.5 199.3c-1 .4-1.9 .8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.2-40.5l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9L281 232.7l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L68.7 398z"
                        /></svg
                    >
                </button>
            {/if}
            {#if showAccessibilityPathButton}
                <button
                    class="wp-element-button wf-btn wt-flex wt-gap-2 wt-items-center"
                    on:click={() => dispatch("accessibleroute")}
                >
                    <span
                        data-translation-element="show_accessibility_path"
                        >{showAccessibilityPathTrans}</span
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        class="wf-icon wf-path"
                        ><path
                            style="fill: currentColor"
                            d="M496.101 385.669l14.227 28.663c3.929 7.915.697 17.516-7.218 21.445l-65.465 32.886c-16.049 7.967-35.556 1.194-43.189-15.055L331.679 320H192c-15.925 0-29.426-11.71-31.679-27.475C126.433 55.308 128.38 70.044 128 64c0-36.358 30.318-65.635 67.052-63.929 33.271 1.545 60.048 28.905 60.925 62.201.868 32.933-23.152 60.423-54.608 65.039l4.67 32.69H336c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H215.182l4.572 32H352a32 32 0 0 1 28.962 18.392L438.477 396.8l36.178-18.349c7.915-3.929 17.517-.697 21.446 7.218zM311.358 352h-24.506c-7.788 54.204-54.528 96-110.852 96-61.757 0-112-50.243-112-112 0-41.505 22.694-77.809 56.324-97.156-3.712-25.965-6.844-47.86-9.488-66.333C45.956 198.464 0 261.963 0 336c0 97.047 78.953 176 176 176 71.87 0 133.806-43.308 161.11-105.192L311.358 352z"
                        /></svg
                    >
                </button>
            {/if}
             {#if showWebsiteButton && popupPOI.getAttribute("website-url")}
                <a href={popupPOI.getAttribute("website-url")?.value} target="_blank">
                    <button
                    class="wp-element-button wf-btn wt-flex wt-gap-2 wt-items-center"
                >
                    <svg class="wf-icon wt-w-2em wt-h-2em" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    <span data-translation-element="show_website">{showWebsiteTrans}</span>
                </button>
            </a>
            {/if}
        </div>
        <div class="pin-down"></div>
    {/if}
</div>
<style>
svg.wf-icon { height: 1rem; width: auto; display: inline-block; --color1: "red"; }

#poi-popup {
    position: absolute;
    top: 0;
    left: 0;
    width: 160px;
    text-align: center;
    margin-top: -30px;
    margin-left: -80px;
    transform-origin: top;
    cursor: pointer;

    animation-name: bounce-2;
    animation-duration: 0.5s;
    animation-iteration-count: 2;
    animation-timing-function: ease;
}

#poi-popup .poi-popup-content {
    background-color: #fff;
    padding: 11px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
}

#poi-popup button {
    border: 1px solid #e0e0df;
    font-size: 14px;
    padding: 8px;
    width: 100%;
    margin-top: 11px;
}

#poi-popup .wf-icon {
    margin-top: -2px;
    width: 18px;
    height: 18px;
    margin-right: 4px;
}

@keyframes bounce-2 {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0);
    }
}

#poi-popup a {
    width: 100%;
    font-size: 0.8rem;
    font-weight: 400;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
    color: #3c4d58;
}

@keyframes bounce-left {
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(2px);
    }
    50% {
        transform: translateX(0);
    }
    75% {
        transform: translateX(-2px);
    }
    100% {
        transform: translateX(0);
    }
}

.pin-down {
    background-color: white !important;
    transform: rotate(45deg);
    width: 10px;
    height: 10px;
    left: 50%;
    margin-left: -5px;
    position: relative;
    bottom: 5px;
    margin-top: -1px;
    z-index: 0;
}
</style>
