/** @jsx jsx */

import { jsx, Card, Text, Box } from "theme-ui"
import Img from "gatsby-image"
//import { useTranslation } from "react-i18next"
//import { Categories } from "./Categories"
import { Link } from "../Link"

export const ProductPreview = ({
  node: { title, slug, collection, defaultProductVariant },
}) => {
  /*const {
    t,
    i18n: { language },
  } = useTranslation("common", "shop")
  */
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
          <Link to={productLink} sx={{ variant: "links.product" }}>
            {title.translate}
          </Link>
          <Text sx={{ color: "muted" }}>{collection.title.translate}</Text>

          {defaultProductVariant &&
            defaultProductVariant.inStock &&
            defaultProductVariant.price && (
              <Text>{defaultProductVariant.price.formatted}</Text>
            )}

          {defaultProductVariant && defaultProductVariant.inStock && (
            <Text sx={{ color: "secondary" }}>En stock</Text>
          )}
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
