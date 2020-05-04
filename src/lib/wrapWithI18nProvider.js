import React from 'react'
import i18next from 'i18next'
import * as ReactI18next from 'react-i18next'
import { Helmet } from 'react-helmet'
import { parseISO, format } from 'date-fns'

export const AlternateLinksContext = React.createContext([])

export function wrapPageElement({ element, props }) {
  const i18n = i18next
    .createInstance({
      debug: process.env.DEBUG,
      lng: props.pageContext.language,
      interpolation: {
        escapeValue: false,
        format: function (value, f, _lng) {
          //if (value instanceof Date)
          return format(parseISO(value), f)
          //return value
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
          <Helmet>
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
          </Helmet>
        }
        {element}
      </AlternateLinksContext.Provider>
    </ReactI18next.I18nextProvider>
  )
}
