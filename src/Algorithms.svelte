<script>
    import Decimal from 'decimal.js';

    import Loader from './Loader.svelte';

    import { nilakantha, leibniz, wallis, viete } from './algorithms';

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

    const loadSeries = async () => {
        loading = true;

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
            ready = true;
            loading = false;
        }, 10);
    };

    let selectedIndex = Math.ceil(iterations / 2);

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

<section class="mt-5">
{#if ready}
    <div>
        <span>1</span>
        <input type="range" bind:value={selectedIndex} min="1" max={iterations}/>
        <span>{iterations}</span>
    </div>
    <div>
        Showning iteration number <input type="number" value={selectedIndex} on:change={handleSelectedIndexChange} min="1" max={iterations} step="1"/>
    </div>
    <table>
        <tr>
            <td>PI</td>
            <td class="font-mono">{pi}</td>
        </tr>
        <tr>
            <td>viete</td>
            <td class="font-mono">{vieteList[selectedIndex - 1]}</td>
        </tr>
        <tr>
            <td>nilakantha</td>
            <td class="font-mono">{nilakanthaList[selectedIndex - 1]}</td>
        </tr>
        <tr>
            <td>wallis</td>
            <td class="font-mono">{wallisList[selectedIndex - 1]}</td>
        </tr>
        <tr>
            <td>leibniz</td>
            <td class="font-mono">{leibnizList[selectedIndex - 1]}</td>
        </tr>
    </table>
{:else if loading}
    <span>Loading...</span>
    <Loader/>
{:else}
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