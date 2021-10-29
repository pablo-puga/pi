<script>
    import Algorithms from './Algorithms.svelte';
    import CookieConsentBanner from './CookieConsentBanner.svelte';

    import { cookieConsent } from './cookie-store';
    
    const precision = 50;
    const iterations = 100000;

    $: showCookieConsentBanner = $cookieConsent === undefined;
</script>

<svelte:head>
    {#if $cookieConsent !== false}
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-F4YTG3EY7B"></script>
    <script>
        const isProduction = () => JSON.parse(isProd);
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-F4YTG3EY7B', { debug_mode: !isProduction() });
    </script>
    {/if}
</svelte:head>

<main class="flex flex-col items-center font-sans text-gray-800 pt-4 sm:pt-8 md:pt-16 lg:pt-32">
    <article class="px-3 md:px-2 lg:px-0 md:w-3/4 max-w-screen-md text-center">
        <h1 class="page-title">Pi Convergence</h1>
        <h2 class="page-subtitle">Showcase of different algorithms' convergence</h2>
        <div class="mt-2 sm:mt-4 md:mt-6 section-shadow text-justify">
            <p class="text-base md:text-lg transition ease-linear duration-150">
                This is a showcase of the convergence of different infinite series in the calculus of number Pi (π).
                For this example, {iterations.toLocaleString()} different values are calculated with each formula and 
                then presented with a precision of {precision} to compare against the real Pi value.
            </p>
            <p class="text-base md:text-lg mt-1 transition ease-linear duration-150">
                You can see the evolution of different series by adjusting the slider below (or manually entering the iteration number) once the values are generated.
            </p>
        </div>
    </article>
    <Algorithms {iterations} {precision}/>
</main>
{#if showCookieConsentBanner}
<CookieConsentBanner/>
{/if}

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .page-title {
        @apply text-2xl font-medium sm:text-3xl md:text-4xl lg:text-5xl lg:font-bold tracking-wider filter drop-shadow transition ease-linear duration-150;
    }

    .page-subtitle {
        @apply mt-1 sm:mt-2 md:mt-3 lg:mt-4 text-lg sm:text-xl md:text-2xl lg:font-medium transition ease-linear duration-150;
    }

    .section-shadow {
        @apply md:shadow rounded p-3 bg-white;
    }
</style>
	