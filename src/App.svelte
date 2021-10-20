<script>
    import Decimal from 'decimal.js';

    import { nilakantha, leibniz, wallis, viete } from './algorithms';
    
    const pi = '3.1415926535897932384626433832795028841971693993751';
    const precision = 50;
    const iterations = 100000;

    Decimal.set({ precision });

    let nilakanthaList = [];
    let leibnizList = [];
    let wallisList = [];
    let vieteList = [];
    let ready = false;

    const loadSeries = () => {
        const start = (new Date()).getTime();
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

        console.log(`Computed in ${((new Date()).getTime()) - start}ms`);
        ready = true;
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

<svelte:window on:load={loadSeries}></svelte:window>

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
    {#if ready}
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
    {/if}
</table>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
	