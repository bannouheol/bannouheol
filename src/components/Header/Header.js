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
    <div>
      <header
        sx={{
          width: "100%",
          display: "grid",
          mx: "auto",
          gridAutoFlow: "row",
          gridTemplateColumns: ["auto", "auto 5fr 2fr"],
        }}
      >
        <HeaderLogo siteTitle={siteTitle} canonicalUrl={canonicalUrl} />

        <HeaderMenu />

        <HeaderSecond alternateLink={alternateLink} />
      </header>
    </div>
  )
}
