<script>
    import Algorithms from './Algorithms.svelte';

    const precision = 50;
    const iterations = 100000;
</script>

<main class="flex flex-col items-center font-sans text-gray-800 pt-4 sm:pt-8 md:pt-16 lg:pt-32">
    <article class="px-3 md:px-2 lg:px-0 md:w-3/4 max-w-screen-md text-center">
        <h1 class="page-title">Pi Convergence</h1>
        <h2 class="page-subtitle">Showcase of different algorithms' convergence</h2>
        <p class="text-base md:text-lg mt-2 sm:mt-4 md:mt-6 transition ease-linear duration-150">
            This is a showcase of the convergence of different infinite series in the calculus of number Pi (π).
            For this example, {iterations.toLocaleString()} different values are calculated for each formula with a precision of {precision}.
        </p>
        <p class="text-base md:text-lg mt-1 transition ease-linear duration-150">
            You can see the evolution of different series by adjusting the slider below (or manually entering the iteration number) once the values are generated.
        </p>
    </article>
    <Algorithms {iterations} {precision}/>
</main>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .page-title {
        @apply text-2xl font-medium sm:text-3xl md:text-4xl lg:text-5xl lg:font-bold filter drop-shadow transition ease-linear duration-150;
    }

    .page-subtitle {
        @apply mt-1 sm:mt-2 md:mt-3 lg:mt-4 text-lg sm:text-xl md:text-2xl lg:font-medium transition ease-linear duration-150;
    }
</style>
	