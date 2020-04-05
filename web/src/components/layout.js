/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import { Header } from "./Header"
import { FooterFirst } from "./FooterFirst"
import { FooterSecond } from "./FooterSecond"

export const Layout = ({ children, pageContext: { language, alternateLinks }, mainP = 3 }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          siteTitle: title
          siteUrl: url
        }
      }
    }
  `)
  const {
    site: { siteMetadata },
  } = data
  const alternateLink =
    alternateLinks && alternateLinks.length > 0
      ? alternateLinks.reduce((acc, el) => {
          return el.language !== language ? el : acc
        }, null)
      : null
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        variant: "layout.root",
      }}
    >
      <Header {...siteMetadata} alternateLink={alternateLink} />

      <main
        sx={{
          width: "100%",
          variant: "layout.main",
          p: mainP,
        }}
      >
        {children}
      </main>
      <footer
        sx={{
          variant: "layout.footerWrap",
        }}
      >
        <FooterFirst />
        <FooterSecond {...siteMetadata} />
      </footer>
    </div>
  )
}
