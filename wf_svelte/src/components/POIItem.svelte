<li class="{active ? 'wf-active' : ''}">
    <label class="wf-menu-label"  on:click={openPOI(poi.id)}>{ poi.name }</label>
</li>

<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let poi;
    export let active = false;

    function openPOI (id) {
        dispatch('clicked', id);
    }
</script>