<script>
    export let width;
    export let height;
    export let path;
    export let classes = '';

    const cssClass = classes ? `fa-icon ${classes}` : 'fa-icon';
</script>

<svg aria-hidden="true" class={cssClass} role="img" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
    <path fill="currentColor" d={path}/>
</svg>

<style>
    .fa-icon {
        overflow: hidden;
        width: 1em;
        height: 1em;
        display: inline-block;
    }
</style>