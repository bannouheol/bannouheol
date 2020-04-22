/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'
import { truncateString } from '../lib/helpers'
import { useTranslation } from 'react-i18next'

const SEO = ({ title, description, image, product, article }) => {
  const {
    //t,
    i18n: { language },
  } = useTranslation()
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            url
          }
        }
      }
    `
  )
  const { pathname } = useLocation()

  const seo = {
    title: title && (title.length <= 60 ? `${title} — ${siteMetadata.title}` : title),
    description: truncateString(description || siteMetadata.description, 147),
    image: image ? image : `${siteMetadata.url}/bannouheol.png`,
    url: pathname && `${siteMetadata.url}${pathname}`,
  }

  return (
    <Helmet>
      {seo.title && (
        <title itemProp="name" lang={`${language}-FR`}>
          {seo.title}
        </title>
      )}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && <meta name="description" content={seo.description} />}
      {seo.description && <meta property="og:description" content={seo.description} />}
      {seo.description && <meta name="twitter:description" content={seo.description} />}
      {seo.image && <meta name="image" content={seo.image} />}
      {seo.image && <meta property="og:image" content={seo.image} />}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
      )}
      <meta name="twitter:card" content="summary_large_image" />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {(product ? true : null) && <meta property="og:type" content="product" />}
      {!product && !article && <meta property="og:type" content="website" />}
      {siteMetadata.author && <meta name="twitter:creator" content={siteMetadata.author} />}
    </Helmet>
  )
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
  product: false,
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
  article: PropTypes.bool,
  product: PropTypes.bool,
}

export default SEO
