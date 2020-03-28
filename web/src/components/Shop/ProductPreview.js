/** @jsx jsx */

import { jsx, Card, Text, Box } from "theme-ui"
import Img from "gatsby-image"
//import { useTranslation } from "react-i18next"
//import { Categories } from "./Categories"
import { Link } from "../Link"

export const ProductPreview = ({ node, showPrice = true }) => {
  /*const {
    t,
    i18n: { language },
  } = useTranslation("common", "shop")
  */
  const { title, slug, collection, categories, defaultProductVariant } = node
  const productLink = `/${collection.slug.translate}/${slug.translate}`
  return (
    <Card
      sx={{
        maxWidth: 200,
      }}
    >
      <div>
        <div>
          {defaultProductVariant &&
            defaultProductVariant.images[0] &&
            defaultProductVariant.images[0].asset && (
              <Link to={productLink}>
                <Img
                  fluid={defaultProductVariant.images[0].asset.fluid}
                  sx={{ variant: "images.card" }}
                />
              </Link>
            )}
        </div>
        <Box p={1}>
          <Link to={productLink} sx={{ variant: "links.nav" }}>
            {title.translate}
          </Link>
          <Text>{collection.title.translate}</Text>
          <Text>{showPrice && defaultProductVariant.price.formatted}</Text>
        </Box>
      </div>
    </Card>
  )
}

/*
{categories &&
  categories
    .map((c) => (
      <Link to={`/${c.slug.translate}`}>{c.title.translate}</Link>
    ))
    .reduce((acc, el) => {
      return acc === null ? [el] : [...acc, ", ", el]
    }, null)}
    */
