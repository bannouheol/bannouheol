/** @jsx jsx */

import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { mapEdgesToNodes } from "../../lib/helpers"
import { Link } from "../Link"
import { jsx, Grid, Box, Flex, Heading } from "theme-ui"
import { MenuLink } from "./MenuLink"

const Header = ({ siteTitle }) => {
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
  const nodes = mapEdgesToNodes(data.categories)
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
        p: 4,
        width: "100%",
        display: "flex",
        alignItems: "center",
        variant: "layout.header",
      }}
    >
      <Grid gap={2} columns={[2, "1fr 2fr"]}>
        <Box>
          <Heading as="h1">
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </Heading>
          <div sx={{ color: "#000", fontSize: 1 }}>{t("subtitle")}</div>
        </Box>
        <Box>
          {categories.map((c) => (
            <MenuLink key={c.id} to={`/${c._rawSlug[language].current}`}>
              {c._rawTitle[language]}
            </MenuLink>
          ))}
          <MenuLink to="/blog">Actualité</MenuLink>
        </Box>
      </Grid>
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
