<script>
    import { fade } from 'svelte/transition';
    
    import { cookieConsent } from './cookie-store';
</script>

<article out:fade="{{ duration: 250 }}" class="cookie-banner sm:max-w-sm">
    <h3 class="mb-1 font-medium">Cookie Consent</h3>
    <p class="text-sm mb-2">I use cookies to measure the performance of the web through Google Analytics.</p>
    <div class="flex flex-row justify-end text-sm">
        <button on:click={cookieConsent.accept} class="action hover:bg-green-300 mr-2">Accept</button>
        <button on:click={cookieConsent.decline} class="action hover:bg-red-300">Reject</button>
    </div>
</article>

<style lang="postcss">
    .cookie-banner {
        @apply fixed bg-gray-800 text-gray-300 bottom-1 right-1 p-3 rounded-sm;
        width: calc(100% - 8px);
    }

    .action {
        @apply px-2 py-1 bg-gray-300 text-gray-800 font-medium transition-colors duration-200 rounded-sm;
    }
</style>