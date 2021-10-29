<script>
    import { faLink, faTimes } from '@fortawesome/free-solid-svg-icons';

    import { fade } from 'svelte/transition';
    import { quadInOut } from 'svelte/easing';

    import FaIcon from './FaIcon.svelte';

    export let title = '';
    export let paragraphs = [];
    export let imageSrc = '';
    export let links = [];
    export let hideCb = undefined;
</script>

<div
    class="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-70 flex justify-center items-center z-50"
    transition:fade={{ duration: 150, easing: quadInOut }}
    on:click|self={() => { if (hideCb) hideCb() }}
>
    <article class="bg-white border border-white p-3 w-11/12 md:w-3/4 max-w-screen-md rounded bg-opacity-100 relative shadow">
        <FaIcon
            width={faTimes.icon[0]}
            height={faTimes.icon[1]}
            path={faTimes.icon[4]}
            classes="text-sm absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
            on:click={() => { if (hideCb) hideCb() }}
        />
        <h1 class="text-lg font-medium md:text-xl">{title}</h1>
        <div class="text-justify mt-3">
            {#each paragraphs as paragraph}
            <p class="mt-1">{paragraph}</p>
            {/each}
        </div>
        {#if imageSrc}
        <figure class="mt-4 flex flex-col items-center">
            <img src={imageSrc} alt={`${title} formula`}>
            <figcaption class="text-sm text-gray-500">{`${title} formula`}</figcaption>
        </figure>
        {/if}
        {#if links}
        <small class=" text-gray-500 hover:text-gray-800 mt-4">
            <ul>
                {#each links as link}
                <li class="flex flex-row items-center flex-nowrap whitespace-nowrap overflow-ellipsis overflow-hidden">
                    <FaIcon width={faLink.icon[0]} height={faLink.icon[1]} path={faLink.icon[4]} classes="text-xs"/>
                    <a href={link} class="underline ml-1">{link}</a>
                </li>
                {/each}
            </ul>
        </small>
        {/if}
    </article>
</div>