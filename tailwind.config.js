/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors:{
      blue:"#0d6efd",
      yellow:"#ffc107",
      green: {
        default:'#00BFA6',
        200:"#8effe9",
        600:"#028376",
      },
      red: {
        default:'#FF0000',
        200:"#ffc0c0",
        600:"#ff0000",
      },
      white: '#fff',
    }
  },
  plugins: [],
}

