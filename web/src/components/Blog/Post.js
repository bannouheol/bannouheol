/** @jsx jsx */
import { jsx, Styled, Flex } from "theme-ui"
import React from "react"
import PortableText from "../PortableText"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { translateRaw } from "../../lib/helpers"
import { CategoryPreview } from "./CategoryPreview"
import { IoIosArrowDroprightCircle } from "react-icons/io"
//import { Link } from "../Link"

export const Post = (nonExtensiblePost) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  graphql`
    fragment blogPostFields on SanityBlogPost {
      ...blogPostPreviewFields
      _rawBody
    }
  `
  const post = { ...nonExtensiblePost }
  const { title, excerpt, image, body, publishedAt, categories } = translateRaw(post, language)
  return (
    <article
      sx={{
        maxWidth: 640,
        mx: "auto",
      }}
    >
      <Flex
        sx={{
          alignItems: "center",
          fontSize: 0,
        }}
      >
        {publishedAt && <React.Fragment>{t("blog:posted_at", { date: new Date(publishedAt) })}</React.Fragment>}
        <IoIosArrowDroprightCircle />
        {` `}
        {categories
          .map((c) => <CategoryPreview key={c.id} {...c} />)
          .reduce((acc, el) => {
            return acc === null ? [el] : [...acc, ", ", el]
          }, null)}
      </Flex>
      <Styled.h1>{title}</Styled.h1>
      {excerpt && <div sx={{ fontSize: 3 }}>{excerpt}</div>}
      {image && image.asset && (
        <div>
          <Img fluid={image.asset.fluid} />
        </div>
      )}
      <div sx={{ mt: 3 }}>{body && <PortableText blocks={body} />}</div>
    </article>
  )
}
