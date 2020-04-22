/** @jsx jsx */

import { jsx, Grid, Flex } from "theme-ui"
import { Link } from "./Link"
import { useTranslation } from "react-i18next"
import { useStaticQuery, graphql } from "gatsby"
import { mapEdgesToNodes, translateRaw } from "../lib/helpers"

const FooterLink = (props) => <Link sxVariant="links.footer" {...props} />

export const FooterSecond = ({ siteTitle, siteUrl }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("common")
  const data = useStaticQuery(graphql`
    query FooterSecondQuery {
      collections: allSanityCollection(filter: { linkedInFooter: { eq: true } }) {
        edges {
          node {
            id
            _rawTitle
            _rawSlug
          }
        }
      }
      pages: allSanityPage(filter: { createPage: { eq: true } }) {
        edges {
          node {
            id
            _rawTitle
            _rawSlug
          }
        }
      }
    }
  `)
  const [pages, collections] = translateRaw([mapEdgesToNodes(data.pages), mapEdgesToNodes(data.collections)], language)

  return (
    <div
      sx={{
        variant: "layout.footerSecond",
      }}
    >
      <Grid
        sx={{
          //gridTemplateRows: "repeat(4, 32px)",
          gridTemplateColumns: ["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"],
          gridAutoFlow: "row",
          gap: 2,
          width: "full",
        }}
      >
        {collections.map((c) => (
          <FooterLink key={c.id} to={`/${c.slug.current}`}>
            {t("x_in_breton", { x: c.title })}
          </FooterLink>
        ))}
      </Grid>
      <Flex
        sx={{
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        <FooterLink to="/">{t("home")}</FooterLink>
        <FooterLink to={`/${t("blog:slug")}`}>Blog</FooterLink>
        {pages.map((p) => (
          <FooterLink key={p.id} to={`/${p.slug.current}`}>
            {p.title}
          </FooterLink>
        ))}
        <div sx={{ mx: 1 }} />© {new Date().getFullYear()}
        {` `}
        <a href={siteUrl} sx={{ variant: "links.nav" }}>
          {siteTitle}
        </a>
      </Flex>
    </div>
  )
}
