// theme.js
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/aldrich";

// Custom theme
const theme = extendTheme({
  colors: {
    primary: "#00FFCC",
    secondary: "#1DB954",
    background: "#1E1E1E",
    textPrimary: "#FFFFFF",
    textSecondary: "#B3B3B3",
    messageOutgoing: "#00FFCC",
    messageIncoming: "#333333",
    statusOnline: "#00FF00",
    statusAway: "#FFFF00",
    statusBusy: "#FF0000",
    statusOffline: "#808080",
  },
  fonts: {
    heading: "'Aldrich', sans-serif",
    body: "'Azonix','Roboto', sans-serif",
  },
  styles: {
    global: {
      "html, body": {
        background: "background",
        color: "#FFFFFF",
      },
      "*, *::before, &::after": {
        boxSizing: "border-box",
      },
    },
  },
});

export default theme;
