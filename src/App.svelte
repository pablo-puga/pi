<script>
    import { faTools } from '@fortawesome/free-solid-svg-icons';
    import { faGithub } from '@fortawesome/free-brands-svg-icons';

    import Algorithms from './Algorithms.svelte';
    import CookieConsentBanner from './CookieConsentBanner.svelte';
    import FaIcon from './FaIcon.svelte';
    import Settings from './Settings.svelte';

    import { cookieConsent } from './cookie-store';
    
    const precision = 50;
    const iterations = 100000;

    $: showCookieConsentBanner = $cookieConsent === undefined;
    let displaySettings = false;
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

<main class="flex flex-col items-center font-sans text-gray-800 pt-4 sm:pt-8 md:pt-16 lg:pt-32 relative">
    {#if displaySettings}
        <Settings bind:displaySettings={displaySettings}/>
    {:else}
        <button class="settings-icon hover:text-indigo-700 hover:filter hover:drop-shadow-lg" on:click={() => (displaySettings = !displaySettings)}>
            <FaIcon path={faTools.icon[4]} width={faTools.icon[0]} height={faTools.icon[1]}/>
        </button>
    {/if}
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
    <footer class="text-center mt-14 text-sm">
        <p>Check the project code at <a class="inline-flex flex-row justify-center content-center items-center flex-nowrap whitespace-nowrap" href="https://github.com/pablo-puga/pi"><FaIcon path={faGithub.icon[4]} width={faGithub.icon[0]} height={faGithub.icon[1]}/> pablo-puga/pi</a></p>
        <p>You can also check my main site! <a href="https://pablopugaperalta.com">https://pablopugaperalta.com</a></p>
    </footer>
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

    .settings-icon {
        @apply text-gray-700 fixed top-1 right-1 w-8 h-8 text-xl transition-colors duration-200;
    }

    footer a {
        @apply text-gray-500 underline hover:text-black transition-colors duration-200;
    }
</style>
	