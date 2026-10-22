<script>
    export let visible = false;
    export let text = "";
</script>

{#if visible}
    <div
        class="wf-path-text wt-absolute wt-top-4 wt-left-1/2 wt-ml-[-25%] wt-py-4 wt-px-8"
    >
        {text}
    </div>
{/if}

<style>
.wf-path-text {
    color: var(--wf-secondary-content);
    background-color: var(--wf-secondary-color);
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
}
</style>
