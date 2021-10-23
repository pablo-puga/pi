<script>
    import Algorithms from './Algorithms.svelte';

    const precision = 50;
    const iterations = 100000;
</script>

<article class="p-3 md:p-2 lg:p-0 md:w-3/4 max-w-screen-md">
    <h1>Pi Convergence</h1>
    <h2>Showcase of different algorithms' convergence</h2>
    <p>
        This is a showcase of the convergence of different infinite series in the calculus of number Pi (π).
        For this example, {iterations.toLocaleString()} different values are calculated for each formula with a precision of {precision}.
    </p>
    <p>
        You can see the evolution of the series by adjusting the slider or by writting down an iteration number between 1 and {iterations.toLocaleString()}.
    </p>
</article>
<Algorithms {iterations} {precision}/>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
	