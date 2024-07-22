export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    borderRadius: "5px",
    color: "white",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    backgroundColor: "white", //
    cursor: "pointer",
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#1a2d37",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      width: "100%",
      background: "#fff",
      ":hover": {
        backgroundColor: "#000000",
        color: "#fff",
        cursor: "pointer",
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: "#000000",
      maxWidth: "14rem",
      border: "2px solid #000000",
      borderRadius: "5px",
      boxShadow: "2px 2px 2px 2px rgba(0,0,0);",
    };
  },

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#1a2d37",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
    };
  },
};
