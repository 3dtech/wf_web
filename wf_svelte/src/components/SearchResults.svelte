<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import PoiItem from "./POIItem.svelte";
    export let results;
    let currentPOI = -1;

    function openPOI(e) {
        currentPOI = e.detail;
        dispatch('poiclicked', e.detail);
    }

</script>
<ul id="wf-search-items" class="wf-list wf-accordion wf-group-items">
    {#each results as poi}
        <PoiItem poi={poi} on:clicked={openPOI} active={poi.id == currentPOI}></PoiItem>
    {/each}
</ul>