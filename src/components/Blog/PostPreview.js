/** @jsx jsx */
import { jsx, Box, Card, Text, Styled } from 'theme-ui'
import React from 'react'
import Img from 'gatsby-image'
import { graphql, Link } from 'gatsby'
import { useTranslation, Trans } from 'react-i18next'
import { translateRaw, truncateString } from '../../lib/helpers'
import { CategoryPreview } from './CategoryPreview'
import TextTruncate from 'react-text-truncate'

export const PostPreview = (nonExtensiblePost) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('common', 'blog')
  graphql`
    fragment blogPostPreviewFields on SanityBlogPost {
      id
      publishedAt
      _rawSlug
      _rawTitle
      _rawExcerpt
      postLanguages: language
      image {
        asset {
          fixed(width: 350, height: 200) {
            ...GatsbySanityImageFixed
          }
        }
      }
      categories {
        id
        _rawTitle
        _rawSlug
      }
    }
  `

  const post = { ...nonExtensiblePost } // bugfix: the intial post is not extensible so it can't be passed to translateRaw()

  const { postLanguages } = post
  const postLanguage = postLanguages.includes(language) ? language : postLanguages[0]
  const { title, excerpt, slug, image, publishedAt } = translateRaw(post, language)
  const { categories } = translateRaw(post, language)

  const CategoriesPreview = () => (
    <React.Fragment>
      {categories
        .map((c) => <CategoryPreview key={c.id} {...c} />)
        .reduce((acc, el) => {
          return acc === null ? [el] : [...acc, ', ', el]
        }, null)}
    </React.Fragment>
  )

  const postPath = `/${language}/${slug.current}`

  return (
    <Card
      sx={{
        maxWidth: 256,
      }}
    >
      {image && (
        <Link to={postPath}>
          <Img fixed={image.asset.fixed} sx={{ maxWidth: '100%' }} />
        </Link>
      )}
      <Text sx={{ px: 2 }}>
        <Styled.h3>
          {postLanguage !== language && `[${t(postLanguage)}] `}
          <Link to={postPath}>{title}</Link>
        </Styled.h3>
        <Box><TextTruncate
    line={7}
    element="span"
    truncateText="…"
    text={excerpt}
/></Box>
        {publishedAt && (
          <Box sx={{ mt: 2, fontSize: 0 }}>
            <Trans i18nKey="blog:posted_in_x_at_x">
              Posté dans <CategoriesPreview /> le {{ date: publishedAt }}
            </Trans>
          </Box>
        )}
      </Text>
    </Card>
  )
}
