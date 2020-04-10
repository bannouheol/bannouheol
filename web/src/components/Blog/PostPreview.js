/** @jsx jsx */
import { jsx, Box, Card, Text, Styled } from "theme-ui"
import React from "react"
import Img from "gatsby-image"
import { graphql, Link } from "gatsby"
import { useTranslation, Trans } from "react-i18next"
import { translateRaw } from "../../lib/helpers"
import { CategoryPreview } from "./CategoryPreview"
import { parseISO, format } from "date-fns"

export const PostPreview = (nonExtensiblePost) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("common", "blog")
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
          fluid(maxWidth: 640) {
            ...GatsbySanityImageFluid
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
  const { title, excerpt, slug, image, publishedAt } = translateRaw(post, postLanguage)
  const { categories } = translateRaw(post, language)
  //console.log(translateRaw(post, postLanguage.includes(language) ? language : postLanguage[0]))

  const CategoriesPreview = () => (
    <React.Fragment>
      {categories
        .map((c) => <CategoryPreview key={c.id} {...c} />)
        .reduce((acc, el) => {
          return acc === null ? [el] : [...acc, ", ", el]
        }, null)}
    </React.Fragment>
  )
  const dateSegment = format(parseISO(publishedAt), "yyyy/MM/dd")
  const postPath = `/${postLanguage}/${dateSegment}/${slug.current}`

  return (
    <Card
      sx={{
        maxWidth: 256,
      }}
    >
      {image && (
        <Link to={postPath}>
          <Img fluid={image.asset.fluid} />
        </Link>
      )}
      <Text>
        <Styled.h3>
          {postLanguage !== language && `[${t(postLanguage)}] `}
          <Link to={postPath}>{title}</Link>
        </Styled.h3>
        <Box>{excerpt}</Box>
        {publishedAt && (
          <Trans i18nKey="blog:posted_in_x_at_x">
            Posté dans <CategoriesPreview /> le {{ date: new Date(publishedAt) }}
          </Trans>
        )}
      </Text>
    </Card>
  )
}
