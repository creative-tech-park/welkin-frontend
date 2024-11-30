/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'index.html',
    'src/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
    theme: {
      container:{
          // you can configure the container to be centered
          center: true,
          // default breakpoints but with 40px removed
          screens: {
            sm: '600px',
            md: '728px',
            lg: '984px',
            xl: '1210px',
            '2xl': '1496px',
          },
      },
      extend: {
          fontFamily: {
            sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'], // Add Roboto as the default sans font
          },
        colors: {
          primary: {
            "50": "#e6edea",
            "100": "#ccdad5",
            "200": "#99b5ac",
            "300": "#669182",
            "400": "#336c59",
            "500": "#00472f",
            "600": "#003926",
            "700": "#002b1c",
            "800": "#001c13",
            "900": "#000e09"
          },
          secondary: {
            "50": "#fdfbf0",
            "100": "#fcf7e1",
            "200": "#f8f0c3",
            "300": "#f5e8a6",
            "400": "#f1e188",
            "500": "#eed96a",
            "600": "#beae55",
            "700": "#8f8240",
            "800": "#5f572a",
            "900": "#302b15"
          },
          hover: {
            "50": "#e8ecec",
            "100": "#d0d9d8",
            "200": "#a1b3b1",
            "300": "#728c8b",
            "400": "#436664",
            "500": "#14403d",
            "600": "#103331",
            "700": "#0c2625",
            "800": "#081a18",
            "900": "#040d0c"
          }
        }
      },
    },
    plugins: [
        require('flowbite/plugin')
    ],
}

