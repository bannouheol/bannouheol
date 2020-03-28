import React from "react"
import Img from "gatsby-image"
import { Link } from "../Link"
import { useTranslation } from "react-i18next"
import { Card, Text } from "theme-ui"

export const PostPreview = ({ node }) => {
  const { t } = useTranslation("common", "blog")
  const { title, slug, image, categories } = node
  return (
    <Card
      sx={{
        maxWidth: 256,
      }}
    >
      {image && <Img fluid={image.asset.fluid} />}
      <Text>
        <Link to={`/${t("blog:slug")}/${slug.translate}`}>
          {title.translate}
        </Link>
        {t("blog:posted_in")}
        {categories
          .map((c) => (
            <Link
              to={`/${t("blog:slug")}/${t("blog:category_slug")}/${
                c.slug.translate
              }`}
            >
              {c.title.translate}
            </Link>
          ))
          .reduce((acc, el) => {
            return acc === null ? [el] : [...acc, ", ", el]
          }, null)}
      </Text>
    </Card>
  )
}
