<script>
    import { fly } from 'svelte/transition';

    import { cookieConsent } from './cookie-store';

    export let displaySettings = false;
    $: selectedValue = $cookieConsent === undefined ? '-' : $cookieConsent ? 'yes' : 'no';

    const handleChange = event => {
        if (event.target.value.toLowerCase() === 'yes') return cookieConsent.accept();
        cookieConsent.decline();
    };
</script>

<article class="settings md:max-h-52 md:max-w-sm md:right-1 md:top-1 md:rounded-sm md:shadow-lg" out:fly="{{ x: 200, duration: 250 }}" in:fly="{{ x: 200, duration: 400 }}">
    <h2 class="text-center text-xl font-bold">Settings</h2>
    <hr class="mt-3 mb-1"/>
    <section>
        <h3 class="text-lg font-medium">Cookies</h3>
        <label class="flex flex-row justify-between items-center">
            <span class="pl-4">Allow Google Analytics</span>
            <select value={selectedValue} on:change={handleChange} class="opt-select cursor-pointer">
                <option value="-" disabled aria-disabled="true">--</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
        </label>
    </section>
    <button class="action" on:click={() => (displaySettings = false)}>
        Close
    </button>
</article>

<style lang="postcss">
    .settings {
        @apply fixed w-full h-full bg-gray-800 text-gray-300 p-4 z-50;
    }

    .opt-select {
        min-width: 100px;
        @apply ml-2 px-2 py-1 bg-gray-600 rounded transition-colors duration-200;
    }

    .opt-select:hover {
        @apply bg-gray-500;
    }

    .action {
        @apply px-4 py-1 bg-gray-600 text-gray-300 font-medium transition-colors duration-200 rounded-sm absolute bottom-4 right-4;
    }

    .action:hover {
        @apply bg-gray-500;
    }
</style>