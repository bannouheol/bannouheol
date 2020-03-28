//import { tailwind } from "@theme-ui/presets"
import { base } from "@theme-ui/presets"
import "../fonts/fonts.css"

export default {
  ...base,
  colors: {
    text: "#111",
    background: "#fff",
    primary: "#3e92cc",
    secondary: "#db504a",
  },
  fonts: {
    body: '"Work Sans", sans-serif',
    heading: '"Comics", sans-serif',
  },
  styles: {
    ...base.styles,
    h1: {
      fontFamily: '"Comics", sans-serif',
    },
  },
  layout: {
    header: {
      color: "white",
      bg: "primary",
    },
    footer: {
      color: "white",
      bg: "primary",
    },
  },

  cards: {
    primary: {
      mb: 3,
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
      mb: 2,
    },
  },

  images: {
    card: {
      borderRadius: 5,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    },
    avatar: {
      width: 128,
      height: 128,
      borderRadius: 99999,
    },
  },

  links: {
    nav: {
      fontWeight: "bold",
      color: "inherit",
      textDecoration: "none",
      fontSize: 3,
    },
  },

  buttons: {
    padding: 10,
    primary: {
      color: "background",
      bg: "primary",
      "&:hover": {
        bg: "secondary",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
  },
}
