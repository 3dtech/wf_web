<li class="wf-list-item {active ? 'wf-active' : ''}">
    <label class="wf-menu-label"  on:click={openGroup(group.id)}>{ group.name }</label>
    {#if active}
        <ul class="wf-group-items">
            {#each group.children as subgroup}
                <GroupItem group={subgroup} active={subgroup.id == currentGroup} on:clicked={openSubGroup(subgroup.id)} on:poiclicked={openPOI}></GroupItem>
            {/each}
        </ul>
        <ul class="wf-poi-list">
            {#each group.pois as poi}
                <POIItem poi={poi} on:clicked={openPOI} active={poi.id == currentPOI}></POIItem>
            {/each}
        </ul>
    {/if}
</li>

<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import GroupItem from './GroupItem.svelte';
    import POIItem from './POIItem.svelte';

    export let group;
    export let active = false;

    let currentGroup = -1;
    let currentPOI = -1;

    $: if (!active ) {
        currentGroup = -1;
        currentPOI = -1;
    }

    function openGroup (id) {
        dispatch('clicked', id);
    }

    function openSubGroup(id) {
        if (id !== currentGroup) {
            currentGroup = id;
        }
        else
            currentGroup = -1;
    }

    function openPOI (e) {
        currentPOI = e.detail;
        dispatch('poiclicked', e.detail);
    }

</script>

<style>
    
</style>