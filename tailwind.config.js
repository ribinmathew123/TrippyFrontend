import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {

   
    extend: {
      colors: {
        primary: "#F9A826",
      },
      fontFamily: {
        // display: ["Nunito", "sans-serif",'Imperial Script' ,'cursive','Poppins'], 

"Imperial":['Imperial Script'],
"Poppins":['Poppins'],
        "Lexend":['Lexend Deca']
       
      },
    },
  },
  plugins: [],
});
