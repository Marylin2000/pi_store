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
        grad_1: 'linear-gradient(to right, #ff6b6b, #3498db)', // Original gradient
        grad_2: 'linear-gradient(45deg, #f39c12, #e74c3c)', // Diagonal warm orange to red
        grad_3: 'linear-gradient(135deg, #16a085, #2ecc71)', // Reverse diagonal teal to green
        grad_4: 'linear-gradient(90deg, #8e44ad, #2980b9)', // Horizontal purple to blue
        grad_5: 'linear-gradient(180deg, #e67e22, #f1c40f)', // Vertical orange to yellow
        grad_6: 'linear-gradient(225deg, #c0392b, #d35400)', // Reverse diagonal deep red to orange
        grad_7: 'linear-gradient(270deg, #2980b9, #3498db)', // Horizontal reversed blue shades
        grad_8: 'linear-gradient(60deg, #34495e, #2c3e50)', // Slight diagonal navy to blue-gray
        grad_9: 'linear-gradient(120deg, #9b59b6, #8e44ad)', // Angled lavender to deep purple
        grad_10: 'linear-gradient(30deg, #1abc9c, #16a085)', // Slight diagonal light to dark teal
        grad_11: 'linear-gradient(150deg, #2ecc71, #27ae60)', // Angled bright to darker green
      },
    },
  },
  plugins: [],
}
