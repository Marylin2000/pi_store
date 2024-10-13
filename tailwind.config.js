/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grad_1: '#ff6b6b', // Example of a custom color
        secondary: '#3498db', // Another custom color
        accent: '#f39c12', // Additional custom color
        // Add more colors as needed
      },
      backgroundImage: {
        grad_1: 'linear-gradient(to right, #ff6b6b, #3498db)', // Define your gradient here
      },
    },
  },
  plugins: [],
}