/** @jsx jsx */
import { jsx } from "theme-ui"
//import { useTranslation } from "react-i18next"
import { HeaderLogo } from "./HeaderLogo"
import { HeaderMenu } from "./HeaderMenu"
import { HeaderSecond } from "./HeaderSecond"

export const Header = ({ siteTitle, alternateLink, canonicalUrl }) => {
  /*const {
    t,
    i18n: { language },
  } = useTranslation("common")*/

  return (
    <header
      sx={{
        width: "100%",
        display: "grid",
        mx: "auto",
        gridAutoFlow: "row",
        gridTemplateColumns: ["auto", "auto 2fr 1fr"],
      }}
    >
      <HeaderLogo siteTitle={siteTitle} canonicalUrl={canonicalUrl} />

      <HeaderMenu />

      <HeaderSecond alternateLink={alternateLink} />
    </header>
  )
}
