/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./**/*.html'],
    theme: {
        fontFamily: {
            sans: [
                '"Noto Sans Display"',
                '"Helvetica Neue"',
                'Helvetica',
                'Arial',
                'sans-serif'],
            serif: [
                '"Noto Serif"',
                'Georgia',
                'Cambria',
                '"Times New Roman"',
                'Times',
                'serif'],
            mono: [
                'monospace',
            ],
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
