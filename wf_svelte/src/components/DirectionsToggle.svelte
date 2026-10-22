<script>
    import { createEventDispatcher } from "svelte";

    export let open = false;
    export let label = "Directions";
    const dispatch = createEventDispatcher();
</script>

<button
    type="button"
    class="wp-element-button wf-btn wf-directions-toggle wt-flex wt-items-center wt-gap-2 wt-p-2"
    aria-expanded={open}
    aria-controls="wf-directions-panel"
    on:click={(event) => dispatch("toggle", event.currentTarget)}
>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m15 3 6 6-6 6M21 9H9a4 4 0 0 0-4 4v8" />
    </svg>
    <span>{label}</span>
</button>
