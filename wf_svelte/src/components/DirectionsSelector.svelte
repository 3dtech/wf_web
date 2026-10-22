<script>
    import { createEventDispatcher } from "svelte";
    import { getDirectionsLabels } from "../lib/directions.js";

    /** @type {Array<{ id: string, name: string }>} */
    export let pois = [];
    export let labels = getDirectionsLabels("en");
    export let error = "";
    export let closable = false;
    let start = "";
    let end = "";
    let avoidStairs = false;
    const dispatch = createEventDispatcher();

    $: if (start && !pois.some((poi) => poi.id === start)) start = "";
    $: if (end && !pois.some((poi) => poi.id === end)) end = "";
    $: canSubmit = Boolean(start && end && start !== end);

    function submit() {
        if (canSubmit) dispatch("route", { start, end, avoidStairs });
    }
</script>

<form class="wf-directions" on:submit|preventDefault={submit} on:change={() => dispatch("change")}>
    <div class="wf-directions-header">
        <h2>{labels.title}</h2>
        {#if closable}
            <button type="button" class="wp-element-button wf-btn wf-directions-close wt-p-2"
                aria-label={labels.close} on:click={() => dispatch("close")}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
            </button>
        {/if}
    </div>
    <label class="wf-directions-field">
        <span class="wt-sr-only">{labels.start}</span>
        <select bind:value={start} required disabled={!pois.length}>
            <option value="" disabled>{labels.start}</option>
            {#each pois as poi (poi.id)}
                <option value={poi.id} disabled={poi.id === end}>{poi.name}</option>
            {/each}
        </select>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
    </label>
    <label class="wf-directions-field">
        <span class="wt-sr-only">{labels.end}</span>
        <select bind:value={end} required disabled={!pois.length}>
            <option value="" disabled>{labels.end}</option>
            {#each pois as poi (poi.id)}
                <option value={poi.id} disabled={poi.id === start}>{poi.name}</option>
            {/each}
        </select>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
    </label>
    <label class="wf-directions-accessibility">
        <input type="checkbox" bind:checked={avoidStairs} />
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none" />
            <path d="m11 8 1 6h5l3 6M12 10h5M8 12a6 6 0 1 0 7 8" />
        </svg>
        <span>{labels.avoidStairs}</span>
    </label>
    {#if !pois.length}<p role="status">{labels.empty}</p>{/if}
    {#if error}<p role="alert">{error}</p>{/if}
    <button class="wp-element-button wf-btn wf-directions-submit wt-w-full wt-p-2 wt-text-sm" type="submit" disabled={!canSubmit}>{labels.submit}</button>
</form>

<style>
    .wf-directions {
        flex-shrink: 0;
        margin: 0;
        padding: 24px;
        border-radius: 16px;
        background: var(--wf-secondary-color);
        color: var(--wf-secondary-content);
        box-shadow: 0 4px 20px rgb(0 0 0 / 12%);
    }

    .wf-directions-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 20px;
    }

    h2 {
        margin: 0;
        color: inherit;
        font-size: 24px;
        font-weight: 600;
        line-height: 1.3;
    }

    .wf-directions-field {
        position: relative;
        display: block;
        margin-bottom: 12px;
    }

    select {
        appearance: none;
        width: 100%;
        min-height: 58px;
        box-sizing: border-box;
        padding: 14px 44px 14px 16px;
        border: 1px solid var(--wf-neutral-color);
        border-radius: 6px;
        box-shadow: 0 3px 5px rgb(0 0 0 / 10%);
        background: var(--wf-secondary-color);
        color: var(--wf-secondary-content);
        font: inherit;
        font-size: 18px;
        font-weight: 500;
        text-overflow: ellipsis;
        cursor: pointer;
    }

    svg {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .wf-directions-field svg {
        position: absolute;
        right: 14px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
    }

    .wf-directions-accessibility {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 22px 0;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.4;
        cursor: pointer;
    }

    input {
        width: 21px;
        height: 21px;
        flex-shrink: 0;
        margin: 0;
        accent-color: var(--wf-active-color);
        cursor: pointer;
    }

    button:disabled, select:disabled { opacity: 0.55; cursor: not-allowed; }
    :is(select, input, button):focus-visible { outline: 2px solid var(--wf-active-color); outline-offset: 3px; }
    p { margin: 0 0 16px; font-size: 14px; }

    @media (max-width: 500px) {
        .wf-directions { padding: 20px; }
    }
</style>
