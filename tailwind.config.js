/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            maxWidth: {
                '100px': '100px'
            }
        },
    },
    plugins: [],
}
