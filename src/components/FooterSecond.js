/** @jsx jsx */

import { jsx, Grid, Flex } from 'theme-ui'
import { Link } from './Link'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import { mapEdgesToNodes, translateRaw } from '../lib/helpers'
import { XInBreton } from './XInBreton'

const FooterLink = (props) => <Link sxVariant="links.footer" {...props} />

export const FooterSecond = ({ siteTitle, siteUrl }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('common')
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
        variant: 'layout.footerSecond',
      }}
    >
      <Grid
        sx={{
          //gridTemplateRows: "repeat(4, 32px)",
          gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)'],
          gridAutoFlow: 'row',
          gap: 2,
          width: 'full',
        }}
      >
        {collections.map((c) => (
          <FooterLink key={c.id} to={`/${c.slug.current}`}>
            <XInBreton x={c.title} />
          </FooterLink>
        ))}
      </Grid>
      <Flex
        sx={{
          mt: 4,
          width: 'full',
        }}
      >
        <FooterLink to="/">{t('home')}</FooterLink>
        <a href={`https://kanarbed.bzh`} sx={{ variant: 'links.footer' }}>
          Kan ar Bed
        </a>
        <FooterLink to={`/${t('blog:slug')}`}>Blog</FooterLink>
        {pages.map((p) => (
          <FooterLink key={p.id} to={`/${p.slug.current}`}>
            {p.title}
          </FooterLink>
        ))}
        <div>
          © {new Date().getFullYear()}
          {` `}
          <a href={siteUrl} sx={{ variant: 'links.footer' }}>
            {siteTitle}
          </a>
        </div>
        <div>
          {` ◘ `}
          {t('powered_by')}{' '}
          <a
            href="https://www.gatsbyjs.org/"
            sx={{ variant: 'links.footer', p: 0 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Gatsby
          </a>{' '}
          (open-source) &amp;{' '}
          <a href="https://www.sanity.io/" sx={{ variant: 'links.footer' }} target="_blank" rel="noopener noreferrer">
            Sanity.io
          </a>
        </div>
      </Flex>
    </div>
  )
}
