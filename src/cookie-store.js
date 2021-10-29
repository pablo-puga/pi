import { writable } from 'svelte/store';

const GA_TRACKING_ID = 'G-F4YTG3EY7B';

const createCookieStore = () => {
    const initialCookieConsent = (val => {
        if (val === null || val === undefined) return undefined;
        if (val.toLocaleLowerCase() === 'true') return true;
        return false;
    })(localStorage.getItem('cookie-consent'));
    const { subscribe, set } = writable(initialCookieConsent);

    return {
        subscribe,
        accept: () => {
            localStorage.setItem('cookie-consent', 'true');
            window[`ga-disable-${GA_TRACKING_ID}`] = false;
            set(true);
        },
        decline: () => {
            localStorage.setItem('cookie-consent', 'false');
            if (window.dataLayer && Array.isArray(window.dataLayer)) window.dataLayer = [];
            window[`ga-disable-${GA_TRACKING_ID}`] = true;
            set(false);
            window.location.reload();
        },
    };
};

export const cookieConsent = createCookieStore();