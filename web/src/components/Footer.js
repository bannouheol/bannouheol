/** @jsx jsx */

import { jsx, Grid } from "theme-ui"
import { Link } from "./Link"
import { useTranslation } from "react-i18next"
import { useStaticQuery, graphql } from "gatsby"
import { mapEdgesToNodes } from "../lib/helpers"

const FooterLink = (props) => <Link sx={{ variant: "links.nav" }} {...props} />

export const Footer = ({ siteTitle, siteUrl }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("common")
  const data = useStaticQuery(graphql`
    query FooterQuery {
      collections: allSanityCollection(
        filter: { linkedInFooter: { eq: true } }
      ) {
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
    <footer
      sx={{
        variant: "layout.footer",
      }}
    >
      <Grid
        sx={{
          gridTemplateRows: "repeat(4, 32px)",
          gridTemplateColumns: ["repeat(2, 1fr)", "repeat(3, 1fr)"],
          gridAutoFlow: "column",
        }}
      >
        <FooterLink to="/">{t("Accueil")}</FooterLink>
        <FooterLink to={`/${t("blog:slug")}`}>Blog!</FooterLink>
        {collections.map((c) => (
          <FooterLink to={`/${c._rawSlug[language].current}`}>
            {t("x_in_breton", { x: c._rawTitle[language] })}
          </FooterLink>
        ))}
      </Grid>
      <div
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <FooterLink to="/cgv">CGV</FooterLink>
        <div sx={{ mx: 1 }} />
        <FooterLink to="/mentions-legales">Mentions légales</FooterLink>
        <div sx={{ mx: 1 }} />© {new Date().getFullYear()}
        {` `}
        <a href={siteUrl} sx={{ variant: "links.nav" }}>
          {siteTitle}
        </a>
      </div>
    </footer>
  )
}
