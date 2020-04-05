/** @jsx jsx */
import { jsx, Box, Flex, Styled, Text, Badge } from "theme-ui"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { mapEdgesToNodes, translateRaw } from "../../lib/helpers"
import { Link } from "../Link"
import { MenuLink } from "./MenuLink"
import { IoMdBasket } from "react-icons/io"

import { FaLanguage } from "react-icons/fa"

const Header = ({ siteTitle, alternateLink }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("common")
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      categories: allSanityCategory(sort: { fields: menuOrder }) {
        edges {
          node {
            id
            _rawTitle
            _rawSlug
            parent: parentCategory {
              id
              _rawSlug
            }
          }
        }
      }
    }
  `)
  const nodes = translateRaw(mapEdgesToNodes(data.categories), language)
  const categories = []
  nodes.forEach((node) => {
    // No parentId means top level
    if (!node.parent) return categories.push(node)

    // Insert node as child of parent in flat array
    const parentIndex = nodes.findIndex((el) => el.id === node.parent.id)
    if (!nodes[parentIndex].children) {
      return (nodes[parentIndex].children = [node])
    }

    nodes[parentIndex].children.push(node)
  })

  return (
    <header
      sx={{
        width: "100%",
        display: "grid",
        mx: "auto",
        gridAutoFlow: "row",
        gridTemplateColumns: ["auto", "auto 2fr 1fr"],
        //variant: "styles.header",
      }}
    >
      <Box
        sx={{
          pt: [3, 4],
          pr: [0, 3, 0],
          pb: [0, 3],
          pl: [0, 3],
          variant: "layout.headerFirst",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gridColumnStart: [1, 1, 1],
          gridColumnEnd: [3, 2, 2],
          order: [1, 0, 0],
        }}
      >
        <Styled.h2 sx={{ fontFamily: "logo", mb: 3 }}>
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
        </Styled.h2>
        <div sx={{ color: "white", fontSize: 0 }}>{t("subtitle")}</div>
      </Box>
      <Box
        sx={{
          variant: "layout.headerFirst",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          gridColumnStart: [1, 1, 2],
          gridColumnEnd: [3, 4, 3],
          order: [2, 2, 1],
        }}
      >
        {categories.map((c) => (
          <MenuLink key={c.id} to={`/${c.slug.current}`}>
            {c.title}
          </MenuLink>
        ))}
        <MenuLink to="/blog">Actualité</MenuLink>
      </Box>
      <Box
        sx={{
          variant: "layout.headerSecond",
          gridColumnStart: [1, 2, 3],
          gridColumnEnd: [3, 4, 4],
          order: [0, 1, 2],
          color: "text",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          pl: [0, 3, 0],
          pr: [0, 3],
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
            fontSize: "2",
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
      </Box>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export { Header }
