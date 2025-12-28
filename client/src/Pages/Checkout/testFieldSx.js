const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F97316",
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#F97316",
  },
  "& .MuiInputBase-input": {
    color: "#ffffff", // Text color
    backgroundColor: "transparent", // Ensure consistent background
    "&:-webkit-autofill": {
      backgroundColor: "transparent", // Prevent autofill background
      WebkitBoxShadow: "0 0 0 1000px #282A2B inset", // Match the surrounding background
      WebkitTextFillColor: "#ffffff", // Ensure text is visible
      transition: "background-color 5000s ease-in-out 0s", // Avoid browser overrides
    },
  },
  marginTop: "1rem",
  width: "100%",

};

export default textFieldSx;
