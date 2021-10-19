<script>
    import Decimal from 'decimal.js';

    import { nilakantha, leibniz, wallis } from './algorithms';
    
    const pi = '3.1415926535897932384626433832795028841971693993751';
    const precision = 50;
    const iterations = 1000000;

    Decimal.set({ precision });

    const nilakanthaGenerator = nilakantha();
    const leibnizGenerator = leibniz();
    const wallisGenerator = wallis();
    
    const nilakanthaList = [];
    const leibnizList = [];
    const wallisList = [];

    for (let it = 0; it < iterations; ++it) {
        nilakanthaList.push(nilakanthaGenerator.next().value);
        leibnizList.push(leibnizGenerator.next().value);
        wallisList.push(wallisGenerator.next().value);
    }

    console.log({
        ni: nilakanthaList[nilakanthaList.length - 1],
        le: leibnizList[leibnizList.length - 1],
        wa: wallisList[wallisList.length - 1],
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
	