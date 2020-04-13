/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Header } from "./Header/Header"
import { FooterFirst } from "./FooterFirst"
import { FooterSecond } from "./FooterSecond"
import { MobileMenu } from "./MobileMenu"
import SimpleReactLightbox from "simple-react-lightbox"

const allLanguages = ["br", "fr"]

export const MenuContext = React.createContext(false)

export const Layout = ({ children, pageContext: { language, alternateLinks, ...pageContext }, mainP = 3 }) => {
  const [menuOpenState, setMenuOpenState] = useState(false)
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
  let alternateLink =
    alternateLinks &&
    alternateLinks.length > 0 &&
    alternateLinks.reduce((acc, el) => {
      return el.language !== language ? el : acc
    }, null)
  if (alternateLink === null)
    alternateLink = allLanguages.reduce((acc, el) => {
      return el !== language ? { language: el, path: `/${el}/` } : acc
    }, null)

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen: menuOpenState,
        toggleMenu: () => setMenuOpenState(!menuOpenState),
        stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen),
      }}
    >
      <MobileMenu />
      <div
        id={`app`}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          variant: "layout.root",
        }}
      >
        <SimpleReactLightbox>
          <Header {...siteMetadata} {...pageContext} language={language} alternateLink={alternateLink} />

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
        </SimpleReactLightbox>
      </div>
    </MenuContext.Provider>
  )
}
