import React from "react"
import i18next from "i18next"
import * as ReactI18next from "react-i18next"
import { Helmet } from "react-helmet"
import * as moment from "moment"

export const AlternateLinksContext = React.createContext([])

export function wrapPageElement({ element, props }) {
  const i18n = i18next
    .createInstance({
      debug: process.env.DEBUG,
      lng: props.pageContext.language,
      interpolation: {
        escapeValue: false,
        format: function (value, format, _lng) {
          if (value instanceof Date) return moment(value).format(format)
          return value
        },
      },
      initImmediate: false,
      resources: props.pageContext.i18nResources,
    })
    .use(ReactI18next.initReactI18next)
  // noinspection JSIgnoredPromiseFromCall
  i18n.init()
  return (
    <ReactI18next.I18nextProvider i18n={i18n}>
      <AlternateLinksContext.Provider value={props.pageContext && props.pageContext.alternateLinks}>
        {
          <Helmet htmlAttributes={{ lang: `${props.pageContext ? `${props.pageContext.language}-FR` : ""}` }}>
            {props.pageContext &&
              props.pageContext.alternateLinks &&
              props.pageContext.alternateLinks.map((link) => (
                <link key={link.language} rel="alternate" hrefLang={link.language} href={link.path} />
              ))}
            {props.pageContext && props.pageContext.canonicalUrl && (
              <link rel="canonical" href={props.pageContext.canonicalUrl} />
            )}
            {props.pageContext && props.pageContext.canonicalUrl && (
              <meta property="og:url" content={props.pageContext.canonicalUrl} />
            )}
            {props.pageContext.language && <meta property="og:locale" content={`${props.pageContext.language}_FR`} />}
            {props.pageContext &&
              props.pageContext.alternateLinks &&
              props.pageContext.alternateLinks.map((link) => {
                return link.language !== props.pageContext.language ? (
                  <meta key={link.language} property="og:locale:alternate" content={`${link.language}_FR`} />
                ) : null
              })}
            <link rel="dns-prefetch" href="//cdn.sanity.io/" />
            <link ref="dns-prefetch" href="https://www.youtube.com/" />
          </Helmet>
        }
        {element}
      </AlternateLinksContext.Provider>
    </ReactI18next.I18nextProvider>
  )
}
