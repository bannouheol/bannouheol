/** @jsx jsx */

import { jsx } from "theme-ui"
import { Link } from "./Link"
import { useTranslation } from "react-i18next"

export const Footer = ({ siteTitle, siteUrl }) => {
  const {
    t,
    //i18n: { language },
  } = useTranslation("common")
  return (
    <footer
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        p: 2,
        variant: "layout.footer",
      }}
    >
      <Link to="/" sx={{ variant: "styles.navlink", p: 2 }}>
        {t("Accueil")}
      </Link>
      <Link to={`/${t("blog:slug")}`} sx={{ variant: "styles.navlink", p: 2 }}>
        Blog
      </Link>
      <div sx={{ mx: "auto" }} />
      <div sx={{ p: 2 }}>
        © {new Date().getFullYear()} <a href={siteUrl}>{siteTitle}</a>
      </div>
    </footer>
  )
}
