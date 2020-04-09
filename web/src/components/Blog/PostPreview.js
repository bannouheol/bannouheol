import React from "react"
import Img from "gatsby-image"
import { graphql, Link } from "gatsby"
import { Link as I18nLink } from "../Link"
import { useTranslation } from "react-i18next"
import { translateRaw } from "../../lib/helpers"
import { Card, Text } from "theme-ui"

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
          fluid(maxWidth: 256) {
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
  const { title, slug, image, categories, publishedAt } = translateRaw(post, postLanguage)
  //console.log(translateRaw(post, postLanguage.includes(language) ? language : postLanguage[0]))

  return (
    <Card
      sx={{
        maxWidth: 256,
      }}
    >
      {image && <Img fluid={image.asset.fluid} />}
      <Text>
        {postLanguage !== language && `[${t(postLanguage)}] `}
        <Link to={`/${postLanguage}/${t("blog:slug")}/${slug.current}`}>{title}</Link>
        {t("blog:posted_in")}
        {categories
          .map((c) => (
            <I18nLink key={c.id} to={`/${t("blog:slug")}/${t("blog:category_slug")}/${c.slug.current}`}>
              {c.title}
            </I18nLink>
          ))
          .reduce((acc, el) => {
            return acc === null ? [el] : [...acc, ", ", el]
          }, null)}
        {publishedAt}
      </Text>
    </Card>
  )
}
