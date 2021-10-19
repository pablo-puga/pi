const config = {
    mode: 'jit',
    purge: {
        content: ['./src/**/*.{html,js,svelte,ts}', './public/index.html'],
    },

    prefix: '',

    theme: {
        extend: {},
    },

    plugins: [],

    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
};

module.exports = config;
