/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "../Link"
import { useTranslation } from "react-i18next"
import { translateRaw } from "../../lib/helpers"
import { graphql } from "gatsby"

export const CategoryPreview = (data) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  graphql`
    fragment blogCategoryPreviewFields on SanityBlogCategory {
      id
      _rawTitle
      _rawSlug
    }
  `

  const { title, slug } = translateRaw(data, language)

  return <Link to={`/${t("blog:slug")}/${t("blog:category_slug")}/${slug.current}`}>{title}</Link>
}
