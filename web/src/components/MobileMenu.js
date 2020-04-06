/** @jsx jsx */
import { jsx } from "theme-ui"
import { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { mapEdgesToNodes, translateRaw } from "../lib/helpers"
import { slide as Menu } from "react-burger-menu"
import { MenuContext } from "./Layout"
import { MenuLink } from "./Header/MenuLink"

export const MobileMenu = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation("common")
  const ctx = useContext(MenuContext)
  const data = useStaticQuery(graphql`
    query MobileMenuQuery {
      categories: allSanityCategory(sort: { fields: menuOrder }) {
        edges {
          node {
            ...menuCategories
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
    <Menu
      right
      width={"80%"}
      sx={{ variant: "layout.mobileMenu" }}
      customBurgerIcon={false}
      isOpen={ctx.isMenuOpen}
      onStateChange={(state) => ctx.stateChangeHandler(state)}
      pageWrapId={`page-wrap`}
    >
      <MenuLink to="/">{t("home")}</MenuLink>
      {categories.map((c) => (
        <MenuLink key={c.id} to={`/${c.slug.current}`}>
          {c.title}
        </MenuLink>
      ))}
      <MenuLink to="/blog">{t("news")}</MenuLink>
    </Menu>
  )
}
