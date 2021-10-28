<script>
    import Decimal from 'decimal.js';
    import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

    import { fade } from 'svelte/transition';
    import { quartIn, quartOut } from 'svelte/easing';

    import Loader from './Loader.svelte';
    import FaIcon from './FaIcon.svelte';

    import { nilakantha, leibniz, wallis, viete } from './algorithms';
import { onMount } from 'svelte';

    const pi = '3.1415926535897932384626433832795028841971693993751';

    export let precision;
    export let iterations;

    Decimal.set({ precision });

    let nilakanthaList = [];
    let leibnizList = [];
    let wallisList = [];
    let vieteList = [];
    let ready = false;
    let loading = false;
    let started = false;
    let selectedIndex = Math.ceil(iterations / 2);

    const loadSeries = async () => {
        loading = true;
        started = true;

        setTimeout(() => {
            const start = new Date().getTime();
            const nilakanthaGenerator = nilakantha();
            const leibnizGenerator = leibniz();
            const wallisGenerator = wallis();
            const vieteGenerator = viete();

            for (let it = 0; it < iterations; ++it) {
                nilakanthaList.push(nilakanthaGenerator.next().value);
                leibnizList.push(leibnizGenerator.next().value);
                wallisList.push(wallisGenerator.next().value);
                vieteList.push(vieteGenerator.next().value);
            }

            nilakanthaGenerator.return(undefined);
            leibnizGenerator.return(undefined);
            wallisGenerator.return(undefined);
            vieteGenerator.return(undefined);

            nilakanthaList = nilakanthaList;
            leibnizList = leibnizList;
            wallisList = wallisList;
            vieteList = vieteList;

            console.log(`Computed in ${new Date().getTime() - start}ms`);
            
            loading = false;

            setTimeout(() => {
                ready = true;
            }, 150);
        }, 100);
    };
    onMount(loadSeries);

    const handleSelectedIndexChange = event => {
        const newIndex = parseInt(event.target.value);
        if (!Number.isInteger(newIndex)) {
            selectedIndex = selectedIndex;
            event.target.value = selectedIndex;
            return;
        }
        if (newIndex < 1) {
            selectedIndex = 1;
            event.target.value = 1;
            return;
        }
        if (newIndex > iterations) {
            selectedIndex = iterations;
            event.target.value = iterations;
            return;
        }
        selectedIndex = newIndex;
    };
</script>

<section class:section-shadow={ready} class="mt-5 sm:mt-6 md:mt-7 lg:mt-8 w-full md:w-3/4 max-w-screen-md flex flex-col items-center">
{#if ready}
    <div class="flex flex-row items-center w-full px-3 mt-1" in:fade={{ duration: 400, easing: quartIn }}>
        <span class="flex-grow-0 md:text-lg font-medium w-16 pr-2 text-right">1</span>
        <input type="range" bind:value={selectedIndex} min="1" max={iterations} class="flex-grow"/>
        <span class="flex-grow-0 md:text-lg font-medium w-16 pl-2 text-left">{iterations.toLocaleString()}</span>
    </div>
    <div class="mt-1 md:text-lg" in:fade={{ duration: 400, easing: quartIn }}>
        <label for="selected-index">Showning iteration number</label>
        <input id="selected-index" type="number" value={selectedIndex} on:change={handleSelectedIndexChange} min="1" max={iterations} step="1" class="w-20"/>
    </div>
    <table class="mt-4 lg:mt-6 md:text-lg mb-1" in:fade={{ duration: 400, easing: quartIn }}>
        <tr>
            <th class="pr-2 text-left font-medium">Real Pi value</th>
            <td class="tabular-nums tracking-wide lining-nums">{pi}</td>
        </tr>
        <tr class="mt-1">
            <th class="pr-2 text-left font-medium flex flex-row align-top">
                Viete's serie 
                <FaIcon
                    height={faQuestionCircle.icon[1]}
                    width={faQuestionCircle.icon[0]}
                    path={faQuestionCircle.icon[4]}
                    classes="text-sm ml-1 mt-1 cursor-pointer transition-color duration-200 hover:text-green-700"
                />
            </th>
            <td class="tabular-nums tracking-wide lining-nums">{vieteList[selectedIndex - 1]}</td>
        </tr>
        <tr class="mt-1">
            <th class="pr-2 text-left font-medium flex flex-row align-top">
                Nilakantha's serie 
                <FaIcon
                    height={faQuestionCircle.icon[1]}
                    width={faQuestionCircle.icon[0]}
                    path={faQuestionCircle.icon[4]}
                    classes="text-sm ml-1 mt-1 cursor-pointer transition-color duration-200 hover:text-green-700"
                />
            </th>
            <td class="tabular-nums tracking-wide lining-nums">{nilakanthaList[selectedIndex - 1]}</td>
        </tr>
        <tr class="mt-1">
            <th class="pr-2 text-left font-medium flex flex-row align-top">
                Wallis's serie 
                <FaIcon
                    height={faQuestionCircle.icon[1]}
                    width={faQuestionCircle.icon[0]}
                    path={faQuestionCircle.icon[4]}
                    classes="text-sm ml-1 mt-1 cursor-pointer transition-color duration-200 hover:text-green-700"
                />
            </th>
            <td class="tabular-nums tracking-wide lining-nums">{wallisList[selectedIndex - 1]}</td>
        </tr>
        <tr class="mt-1">
            <th class="pr-2 text-left font-medium flex flex-row align-top">
                Leibniz's serie 
                <FaIcon
                    height={faQuestionCircle.icon[1]}
                    width={faQuestionCircle.icon[0]}
                    path={faQuestionCircle.icon[4]}
                    classes="text-sm ml-1 mt-1 cursor-pointer transition-color duration-200 hover:text-green-700"
                />
            </th>
            <td class="tabular-nums tracking-wide lining-nums">{leibnizList[selectedIndex - 1]}</td>
        </tr>
    </table>
{:else if loading}
    <div class="flex flex-col items-center" out:fade={{ duration: 200, easing: quartOut }}>
        <Loader/>
        <span class="text-lg font-medium mt-2 text-gray-500 tracking-wider">Loading...</span>
    </div>
{:else if !started}
    <button class="generate-btn p-3 md:p-5" on:click={loadSeries}>
        <span class="text-lg md:text-2xl relative z-10 capitalize">Generate values</span>
    </button>
{/if}
</section>

<style lang="postcss">
    .generate-btn {
        text-rendering: geometricprecision;
        transition: opacity 300ms cubic-bezier(.694, 0, 0.335, 1),background-color 100ms cubic-bezier(.694, 0, 0.335, 1),color 100ms cubic-bezier(.694, 0, 0.335, 1);
        @apply appearance-none bg-gray-100 box-border inline-block text-base font-medium opacity-100 outline-none px-4 py-2 text-center select-none relative shadow rounded;
    }

    .generate-btn:before {
        animation: opacityFallbackOut .5s step-end forwards;
        clip-path: polygon(-1% 0, 0 0, -25% 100%, -1% 100%);
        content: "";
        transform: translateZ(0);
        transition: clip-path .5s cubic-bezier(.165, 0.84, 0.44, 1), -webkit-clip-path .5s cubic-bezier(.165, 0.84, 0.44, 1);
        @apply bg-gray-300 h-full w-full absolute left-0 top-0 rounded;
    }

    .generate-btn:hover:before {
        animation: opacityFallbackIn 0s step-start forwards;
        clip-path: polygon(0 0, 101% 0, 101% 101%, 0 101%);
    }
</style>