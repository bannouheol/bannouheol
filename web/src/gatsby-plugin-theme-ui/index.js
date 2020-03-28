//import { tailwind } from "@theme-ui/presets"
import { tailwind as base } from "@theme-ui/presets"
import "../fonts/fonts.css"

export default {
  ...base,
  colors: {
    text: "#111",
    muted: "#8189A9",
    background: "#fff",
    //primary: "#63c791",
    //secondary: "#db504a",
    primary: "#FBAF16", //https://infographic.likitimavm.com/color-palettes-for-2020/
    primaryHover: "#853F75",
    secondary: "#8ACCB1", //https://infographic.likitimavm.com/color-palettes-for-2020/
    grey: "#353B50",
    bluebird: "#89B1D8", //https://www.behr.com/consumer/inspiration/2020-color-trends/
  },
  fonts: {
    body: '"Quicksand", sans-serif',
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
      bg: "secondary",
      p: 4,
      display: "flex",
      flexWrap: "wrap",
      fontSize: 0,
    },
  },
  boxes: {
    price: {
      p: 2,
      bg: "gray",
      color: "background",
      fontWeight: "bold",
      boxShadow: "0px 10px 10px rgba(0, 0, 0, .125)",
      display: "inline-block",
      borderRadius: 10,
      fontSize: 1,
    },
  },
  cards: {
    primary: {
      mb: 3,
      "&:hover": {
        transition: "transform .5s ease-in-out",
        transform: "scale(1.01)",
        img: {},
      },
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
      "&:hover": {
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.250)",
        transition: "all 0.2s ease-in-out",
      },
    },
    avatar: {
      width: 128,
      height: 128,
      borderRadius: 99999,
    },
  },

  links: {
    ...base.links,
    nav: {
      fontWeight: "bold",
      color: "inherit",
      textDecoration: "none",
      fontSize: "inherit",
      "&:hover": {
        color: "text",
      },
      mx: 2,
    },
    product: {
      fontWeight: "bold",
      color: "black",
      textDecoration: "none",
      fontSize: 2,
      p: 0,
      m: 0,
    },
  },

  buttons: {
    padding: 10,
    primary: {
      borderRadius: 8,
      color: "background",
      bg: "primary",
      "&:hover": {
        bg: "primaryHover",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
  },
}
