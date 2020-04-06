/** @jsx jsx */
import { jsx, Box, Grid, Flex, Text, Badge, Input } from "theme-ui"
import { useTranslation } from "react-i18next"
import { Link } from "../Link"
import { IoMdBasket, IoMdSearch } from "react-icons/io"
import { FaLanguage } from "react-icons/fa"

export const HeaderSecond = ({ alternateLink }) => {
  const {
    t,
    //i18n: { language },
  } = useTranslation("common")

  return (
    <Grid
      sx={{
        variant: "layout.headerSecond",
        gridColumnStart: [1, 1, 1, 3],
        gridColumnEnd: [3, 4, 4, 4],
        order: [0, 0, 0, 2],
        gridTemplateColumns: ["repeat(3, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)", "repeat(2, 1fr)"],
        gap: 0,
        color: "text",
        fontSize: [0, 1, 2],
        pl: [1, 3],
        pr: [1, 3],
        py: [1, 1, 1, 0],
      }}
    >
      <Flex sx={{ alignItems: "center" }}>
        <Flex pr={1}>
          <FaLanguage size={32} />
        </Flex>
        {alternateLink && (
          <Link
            to={alternateLink.path}
            i18nPrefixed={false}
            sx={{
              color: `bluebird`,
            }}
          >
            {alternateLink.language === "br" && t("br")}
            {alternateLink.language === "fr" && t("fr")}
          </Link>
        )}
      </Flex>
      <button
        className="snipcart-checkout"
        sx={{
          border: 0,
          p: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          bg: "transparent",
          fontSize: "inherit",
          fontFamily: "inherit",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box pr={2}>
          <IoMdBasket size={32} />
          <Badge variant="circle" ml={-3} mt={-3}>
            <span className="snipcart-items-count"></span>
          </Badge>
        </Box>
        <Text>Mon panier</Text>
      </button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gridColumnStart: [3, 3, 3, 1],
          gridColumnEnd: [4, 4, 4, 3],
        }}
      >
        <IoMdSearch size={32} />
        <Input
          type="search"
          placeholder="Rechercher"
          autocomplete="off"
          sx={{ variant: "inputs.shadow", width: "full" }}
        />
      </Box>
    </Grid>
  )
}
