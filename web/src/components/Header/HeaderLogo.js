/** @jsx jsx */
import { jsx, Box, Flex, Heading, MenuButton } from "theme-ui"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import { Link } from "../Link"

const HeaderLogo = ({ siteTitle, canonicalUrl }) => {
  const isHome = (canonicalUrl === "/fr" && true) || (canonicalUrl === "/br" && true)
  const {
    t,
    //i18n: { language },
  } = useTranslation("common")

  return (
    <Box
      sx={{
        pt: [2, 4],
        pr: [2, 3, 0],
        pb: [1, 3],
        pl: [3, 3],
        variant: "layout.headerFirst",
        display: "grid",
        gridColumnStart: [1, 1, 1, 1],
        gridColumnEnd: [3, 4, 4, 2],
        order: [1, 1, 1, 0],
        gridTemplateColumns: ["auto 48px", "auto"],
        justifyContent: "space-between",
        gap: 0,
      }}
    >
      <Flex
        sx={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Heading as={isHome && "h1"} sx={{ fontFamily: "logo", mb: 3, fontSize: 5 }}>
          <Link
            to="/"
            sx={{
              color: `white`,
              textDecoration: `none`,
              border: "3px solid",
              borderColor: "white",
              px: 3,
              py: 2,
              "&:hover": {
                textDecoration: "none",
              },
            }}
          >
            {siteTitle}
          </Link>
        </Heading>
        <Heading as={isHome && "h2"} sx={{ color: "white", fontFamily: "body", fontSize: 0 }}>
          {t("subtitle")}
        </Heading>
      </Flex>
      <Flex sx={{ display: ["flex", "none"] }}>
        <MenuButton />
      </Flex>
    </Box>
  )
}

HeaderLogo.propTypes = {
  siteTitle: PropTypes.string,
}

HeaderLogo.defaultProps = {
  siteTitle: ``,
}

export { HeaderLogo }
