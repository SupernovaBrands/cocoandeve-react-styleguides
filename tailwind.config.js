/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '992px',
      xl: '1260px',
      xxl: '1440px',
    },
    container: {
      center: true,
      screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1200px',
        xxl: '1200px',
      },
      padding: {
        DEFAULT: '7.5px',
        lg: '15px',
      },
    },
    colors: {
      'black': '#000',
      'body': '#151515',
      'primary': '#D62E55',
      'primary-darken': '#991e3b',
      'primary-light': '#F5DADF',
      'primary-light-second': '#FAE6EA',
      'primary-dark': '#B22D4B',
      'secondary': '#00635B',
      'secondary-light': '#E0F0E9',
      'secondary-dark': '#BEDFD1',
      'sh-purple': '#993366',
      'sh-purple-light': '#FFEFFF',
      'purple-light': '#FFEFFF',
      'bali-bod-blue': '#213E7B',
      'bali-bod-blue-light': '#bec5d8',
      'sh-orange': '#FF9900',
      'sh-orange-light': '#FCF6E4',
      'green-light': '#00B67A',
      'yellow-light': '#f9eeca',
      'yellow-dark': '#F4DF9C',
      'pink-light': '#FFF2F4',
      'pink-product': '#FFF4F6',
      'suncare-blue': '#3880DE',
      'skincare-orange': '#E85862',
      'skincare-orange-dark': '#E22B38',
      'skin-peach': '#F2D4D7',
      'body-color': '#151515',
      'gray-100': '#FAF9F9',
      'gray-400': '#F5F5F5',
      'gray-500': '#A3A3A3',
      'gray-600': '#4E4E4E',
      'gray-700': '#7B7B7B',
      'gray-800': '#494949',
      'gray-900': '#e4e4e4',
      'blue': '#213E7B',
      'blue-dark': '#162A53',
      'white': '#fff',
      'light-yellow': '#F0FF5F',
      'light-blue': '#C2FAE4',
      'transparent': 'transparent',
      'dark': '#151515',
      'shade-dark': '#885757',
      'ultra-dark': '#5C2323',
      'medium': '#AA7878',
      'body-light': '#f6e4ef',
      'placeholder': '#cecece',
    },
    fontFamily: {
      sans: ['var(--font-sofia)'],
    },
    fontSize: {
      xs: ['0.75rem', '0.938rem'], //font size 12px, line height 15px
      sm: ['0.875rem', '1.094rem'], //14px, 17.5px
      base: ['1rem', '1.25rem'], // 16px, 20px
      lg: ['1.25rem', '1.563rem'], //20px, 25px
      xl: ['1.5rem', '1.875rem'], //24px, 30px
      '2xl': ['2rem', '2.5rem'], //32px, 40px
      '3xl': ['2.625rem', '3.281rem'], //42px, 52px
      hero: ['4.5em', '1.25em'], //72px, 90px
    },
    spacing: {
      25: '5px',
      1: '10px',
      2: '20px',
      3: '30px',
      4: '40px',
      5: '60px',
      12: '12px',
      g: '15px',
      h1: '8px',
      hg: '7.5px',
      0: 0,
      '1em': '1em',
    },
    borderRadius: {
      'none': '0',
      'DEFAULT': '0.5em',
      'full': '9999px',
      'h': '0.25em',
    },
    extend: {
      lineHeight: {
        base: '1.25rem',
      },
    },
  },
  plugins: [],
}
