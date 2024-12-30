const selectFieldSx = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#F97316", // Border color
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
  "& .MuiSelect-select": {
    color: "white", // Text color inside select
    backgroundColor: "transparent", // Background color
  },
  "& .MuiOutlinedInput-input": {
    color: "white", // Text color
  },
  "& .MuiSvgIcon-root": {
    color: "white", // Dropdown arrow color
  },
};

const menuPropsStyles = {
  PaperProps: {
    sx: {
      backgroundColor: "#282A2B", // Dropdown background color
      color: "white", // Text color
    },
  },
  MenuListProps: {
    sx: {
      "& .MuiMenuItem-root": {
        "&:hover": {
          backgroundColor: "#F97316", // Hover background color
          color: "white", // Hover text color
        },
        "&.Mui-selected": {
          backgroundColor: "#F97316", // Selected background color
          color: "white", // Selected text color
          "&:hover": {
            backgroundColor: "#F97316", // Prevent hover color change when selected
          },
        },
      },
    },
  },
};

export { selectFieldSx, menuPropsStyles };
