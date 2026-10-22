<script>
    import { createEventDispatcher, tick } from "svelte";
    const dispatch = createEventDispatcher();
    /** @type {Array<[number, string]>} */
    export let floors = [];
    export let activeFloor = -1;
    export let align = "left";
    export let enableCompass = false;
    export let compassRotating = false;
    export let enableLocate = false;
    export let locateEnabled = false;
    /** @type {HTMLDivElement} */
    let floorsContainer;
    $: scrollFloorsToBottom(floors);
    /** @param {Array<[number, string]>} floorList */
    async function scrollFloorsToBottom(floorList) {
        await tick();
        if (floorsContainer && floorList.length) {
            floorsContainer.scrollTop = floorsContainer.scrollHeight;
        }
    }
</script>

<div
    class="wf-map-buttons wt-flex wt-flex-col wt-gap-12 {align ==
    'left'
        ? 'wt-right-0 md:wt-right-4'
        : 'wt-left-0 md:wt-left-4'}"
>
    <div
        id="wf-floors"
        class="wt-overflow-y-auto"
        bind:this={floorsContainer}
    >
        {#each floors as [id, floor]}
            <button
                class="wp-element-button {id == activeFloor
                    ? 'wf-active'
                    : ''}"
                on:click={() => dispatch("floorselect", id)}>{floor}</button
            >
        {/each}
    </div>
    <div id="wf-additional-buttons">
        {#if enableCompass}
            <button
                id="wf-compass-button"
                class="wp-element-button {compassRotating
                    ? 'wf-active'
                    : ''} "
                on:click={() => dispatch("compasstoggle")}
                title="Enable location"
            >
                <svg class="wf-icon wt-h-12" viewBox="0 0 16 19">
                    <use xlink:href="#icon-compass" />
                </svg>
            </button>
        {/if}

        {#if enableLocate}
            <button
                id="wf-locate-button"
                class="wp-element-button {locateEnabled
                    ? 'wf-active'
                    : ''} "
                on:click={() => dispatch("locationtoggle")}
                title="Enable location"
            >
                {#if locateEnabled}
                    <svg
                        class="wf-icon wt-h-12"
                        viewBox="0 0 16 19"
                    >
                        <use xlink:href="#icon-explore" />
                    </svg>
                {:else}
                    <svg
                        class="wf-icon wt-h-12"
                        viewBox="0 0 16 19"
                    >
                        <use xlink:href="#icon-navigate" />
                    </svg>
                {/if}
            </button>
        {/if}
    </div>
</div>

<style>
svg.wf-icon { height: 1rem; width: auto; display: inline-block; --color1: "red"; }

.wf-map-buttons {
    position: absolute;
    top: 15%;
    bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    max-height: calc(70% - 1rem);
    min-height: 0;
    padding-bottom: 1rem;
}

#wf-floors {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
}

#wf-floors > button {
    flex: 0 0 auto;
}

#wf-additional-buttons {
    flex: 0 0 auto;
    margin-top: 0.5rem;
}

.wf-map-buttons button {
    font-size: 18px;
    margin-bottom: 4px;
    display: block;
    text-align: center;
    cursor: pointer;
    color: #343847;
    border: 1px solid #e0e0df;
    background-color: #fff;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 3rem;
    height: 3rem;
    display: flex;
}

.wf-map-buttons button.wf-active {
    background-color: var(--wf-active-color);
    transition: background-color 0.5s ease;
    color: var(--wf-active-content);
}

/* Smartphones in portrait keep the stacked mobile layout. */
@media (max-width: 500px) {

    .wf-map-buttons {
        top: 4rem;
        bottom: 4rem;
    }

    .wf-map-buttons button {
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
    }

    .wf-map-buttons svg {
        height: 32px !important;
        width: auto;
    }

}

@media (pointer: coarse) and (orientation: landscape) and (max-height: 500px) {

    .wf-map-buttons {
        top: 0;
        bottom: 0;
        max-height: 100%;
    }

}
</style>
