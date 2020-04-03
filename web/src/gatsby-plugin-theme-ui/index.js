//import { tailwind } from "@theme-ui/presets"
import { tailwind as base } from "@theme-ui/presets"
import "../fonts/fonts.css"
import footerWave from "../images/footer-wave.svg"

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
    hr: {
      background: "rgba(255,255,255,0.125)",
      border: 0,
      height: "1px",
    },
    a: {
      color: "secondary",
    },
  },
  layout: {
    header: {
      color: "white",
      bg: "primary",
    },
    footerWrap: {
      fontSize: 0,
      color: "white",
      "::before": {
        content: '""',
        display: "flex",
        height: [75, 105],
        background: `transparent url(${footerWave}) no-repeat center 2px`,
        backgroundSize: "cover",
        position: "relative",
        flexWrap: "wrap",
      },
    },
    footerFirst: {
      heading: {
        fontFamily: "Work Sans",
      },
      color: "white",
      bg: "bluebird",
      p: 4,
      display: "flex",
      flexWrap: "wrap",
    },
    footerSecond: {
      bg: "secondary",
      p: 4,
      display: "flex",
      flexWrap: "wrap",
    },
  },
  boxes: {
    important: {
      zIndex: 90000,
      p: 4,
      m: [0, 2],
      bg: "grey",
      color: "background",
      fontWeight: "bold",
      boxShadow: "0px 10px 10px rgba(0, 0, 0, .125)",
      display: "inline-block",
      //borderRadius: 10,
      width: "100%",
    },
  },
  cards: {
    primary: {
      mb: 3,
      "&:hover": {
        transition: "transform .5s ease",
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
        transition: "all 0.2s ease",
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
    header: {
      fontWeight: "bold",
      color: "inherit",
      textDecoration: "none",
      fontSize: "inherit",
      mx: 1,
      p: 2,
      borderRadius: 8,
      border: "2px solid transparent",
      transition: "background-color .2s ease",
      "&:hover": {
        color: "text",
        background: "white",
        border: "2px solid white",
      },
      "&.active": {
        "&:hover": {
          color: "text",
        },
        color: "white",
        //background: "white",
        border: "2px solid white",
      },
    },
    footer: {
      color: "white",
      textDecoration: "none",
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
    primary: {
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      color: "background",
      bg: "secondary",
      "&:hover": {
        bg: "tomato",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
  },
}
