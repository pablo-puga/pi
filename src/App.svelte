<script>
    import Decimal from 'decimal.js';
    import { onMount } from 'svelte';

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
    let duration = 0;

    onMount(async () => {
        console.log('start');
        const start = (new Date()).getTime();
        const nilakanthaGenerator = nilakantha();
        const leibnizGenerator = leibniz();
        const wallisGenerator = wallis();
        const vietesGenerator = viete();
        
        let nilakanthaListTmp = [];
        let leibnizListTmp = [];
        let wallisListTmp = [];
        let vieteListTmp = [];

        for (let it = 0; it < iterations; ++it) {
            nilakanthaListTmp.push(nilakanthaGenerator.next().value);
            leibnizListTmp.push(leibnizGenerator.next().value);
            wallisListTmp.push(wallisGenerator.next().value);
            vieteListTmp.push(vietesGenerator.next().value);
        }

        nilakanthaGenerator.return(undefined);
        leibnizGenerator.return(undefined);
        wallisGenerator.return(undefined);
        vietesGenerator.return(undefined);

        nilakanthaList = nilakanthaListTmp;
        leibnizList = leibnizListTmp;
        wallisList = wallisListTmp;
        vieteList = vieteListTmp;

        duration = ((new Date()).getTime()) - start;
        ready = true;
        console.log('end');
    });

    $: console.log(ready, duration, {
        ni: nilakanthaList[nilakanthaList.length - 1],
        le: leibnizList[leibnizList.length - 1],
        wa: wallisList[wallisList.length - 1],
        vi: vieteList[vieteList.length - 1],
        pi
    });

	let name = 'world';
</script>

<h1>Hello {name}!</h1>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
	