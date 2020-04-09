/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import PortableText from "../PortableText"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { translateRaw } from "../../lib/helpers"
import { Categories } from "./Categories"
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
  const { title, image, body, publishedAt, categories } = translateRaw(post, language)
  return (
    <article>
      {image && image.asset && (
        <div>
          <Img fluid={image.asset.fluid} />
        </div>
      )}
      <div>
        <div>
          <Styled.h1>{title}</Styled.h1>
          {body && <PortableText blocks={body} />}
        </div>
        <aside>
          {publishedAt && <div>{t("blog:posted_at", { date: new Date(publishedAt) })}</div>}
          {categories && <Categories nodes={categories} />}
        </aside>
      </div>
    </article>
  )
}

/*

      
      */
