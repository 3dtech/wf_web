/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'wt-',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

