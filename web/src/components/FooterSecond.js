/** @jsx jsx */

import { jsx, Grid, Flex } from "theme-ui"
import { Link } from "./Link"
import { useTranslation } from "react-i18next"
import { useStaticQuery, graphql } from "gatsby"
import { mapEdgesToNodes } from "../lib/helpers"

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
    }
  `)
  const collections = mapEdgesToNodes(data.collections)
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
          <FooterLink key={c.id} to={`/${c._rawSlug[language].current}`}>
            {t("x_in_breton", { x: c._rawTitle[language] })}
          </FooterLink>
        ))}
      </Grid>
      <Flex
        sx={{
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        <FooterLink to="/">{t("Accueil")}</FooterLink>
        <FooterLink to={`/${t("blog:slug")}`}>Blog</FooterLink>
        <FooterLink to="/cgv">CGV</FooterLink>
        <FooterLink to="/mentions-legales">Mentions légales</FooterLink>
        <div sx={{ mx: 1 }} />© {new Date().getFullYear()}
        {` `}
        <a href={siteUrl} sx={{ variant: "links.nav" }}>
          {siteTitle}
        </a>
      </Flex>
    </div>
  )
}
