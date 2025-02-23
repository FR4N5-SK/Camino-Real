/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'AzulA': '#191E3B',
        'AzulB': '#124FAA',
        'AzulC': '#1668E3',
        'RojoA': '#E61E43',
        'RojoB': '#A1122C',
        'Crema': '#F6F2E7',
        'Verde': '#57CA61',
      },
      fontFamily: {
        'Inter': ["Inter", "serif"]
      },
      backgroundImage: {
        'hotel': "url('assets/hotel.jpg')",
        'resort': "url('assets/Resort.jpg')",
        'card-plata': "url('assets/2.png')",
        'balco': "url('assets/balco.jpg')",
        'turismo': "url('assets/turismo.jpg')",
        'margarita': "url('assets/margarita.jpg')",
        'plaza': "url('assets/plaza.jpg')",
        'deporte': "url('assets/deporte.jpg')",
        'hidromasaje': "url('assets/hidromasaje.jpg')",
        'piscina': "url('assets/Piscina.jpg')",
        'gim': "url('assets/gim.jpg')"
        
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

