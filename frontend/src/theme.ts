// theme.js
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/aldrich";
import "@fontsource-variable/genos";

// Custom theme
const theme = extendTheme({
  colors: {
    primary: "#00FFCC",
    blueV: "#5EEBFB",
    blueN: "#13F7FD",
    secondary: "#1DB954",
    greenDark: "#035829",
    greenV: "#41F794",
    background: "#1E1E1E",
    bgL: "#111622",
    black: "#121212",
    textPrimary: "#FFFFFF",
    textSecondary: "#B3B3B3",
    greyBox: "#D9D9D9",
    messageOutgoing: "#00FFCC",
    messageIncoming: "#333333",
    statusOnline: "#00FF00",
    statusAway: "#FFFF00",
    orangeV: "#F7CC41",
    statusBusy: "#FF0000",
    statusOffline: "#808080",
  },
  fonts: {
    heading: "'Genos Variable', sans-serif",
    body: "'Aldrich','Roboto', sans-serif",
  },
  styles: {
    global: {
      "html, body": {
        background: "background",
        color: "#FFFFFF",
      },
      "body, #root": {
        height: "100vh",
      },
      "*, *::before, &::after": {
        boxSizing: "border-box",
      },
    },
  },
});

export default theme;
