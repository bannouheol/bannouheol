/** @jsx jsx */
import { jsx, Box } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { mapEdgesToNodes, translateRaw } from "../../lib/helpers"
import { MenuLink } from "./MenuLink"

export const HeaderMenu = () => {
  const {
    //t,
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
    <Box
      sx={{
        variant: "layout.headerFirst",
        alignItems: "center",
        justifyContent: "space-evenly",
        gridColumnStart: [1, 1, 1, 2],
        gridColumnEnd: [3, 4, 4, 3],
        order: [2, 2, 2, 1],
        p: [2, 2, 0],
        pt: [1, 0, 0],
        fontSize: [0, 1, 2],
        display: ["none", "flex"],
      }}
    >
      {categories.map((c) => (
        <MenuLink key={c.id} to={`/${c.slug.current}`}>
          {c.title}
        </MenuLink>
      ))}
      <MenuLink to="/blog">Actualité</MenuLink>
    </Box>
  )
}
