import { Global } from "@emotion/react";

const Fonts = () => {
  return (
    <Global
      styles={`
        @font-face {
            font-family: "Azonix";
            src: url("./assets/fonts/azonix.otf") format("opentype");
        }
    `}
    />
  );
};

export default Fonts;
