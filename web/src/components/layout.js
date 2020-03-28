/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"

import { Header } from "./Header"
import { Footer } from "./Footer"

export const Layout = ({ children }) => {
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
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        variant: "layout.root",
      }}
    >
      <Header {...siteMetadata} />

      <main
        sx={{
          width: "100%",
          flex: "1 1 auto",
          variant: "layout.main",
        }}
      >
        <div
          sx={{
            maxWidth: 768,
            mx: "auto",
            px: 3,
            variant: "layout.container",
          }}
        >
          {children}
        </div>
      </main>
      <Footer {...siteMetadata} />
    </div>
  )
}
