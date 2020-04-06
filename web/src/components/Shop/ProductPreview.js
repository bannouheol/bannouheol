/** @jsx jsx */
import { jsx, Card, Text, Box } from "theme-ui"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
//import { Categories } from "./Categories"
import { Link } from "../Link"
import { translateRaw } from "../../lib/helpers"

export const ProductPreview = (product) => {
  const {
    //t,
    i18n: { language },
  } = useTranslation("common")

  graphql`
    fragment productPreviewFields on SanityProduct {
      id
      _rawTitle
      _rawSlug
      collection {
        _rawTitle
        _rawSlug
      }
      images: defaultProductVariant {
        images {
          asset {
            fluid(maxWidth: 800) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
      ...productFeatureFields
    }
  `
  const { title, slug, collection, images, productFeature } = translateRaw(product, language)
  const productLink = `/${collection.slug.current}/${slug.current}`
  return (
    <Card
      sx={{
        maxWidth: 200,
      }}
    >
      <div>
        <div>
          {images && images.images[0] && images.images[0].asset && (
            <Link to={productLink}>
              <Img fluid={images.images[0].asset.fluid} sx={{ variant: "images.card" }} />
            </Link>
          )}
        </div>
        <Box p={1}>
          <Link to={productLink} sx={{ variant: "links.product" }}>
            {title}
          </Link>
          <Text sx={{ color: "textMuted" }}>{collection.title}</Text>

          {productFeature && productFeature.inStock && productFeature.price && (
            <Text>{productFeature.price.formatted}</Text>
          )}

          {productFeature && productFeature.inStock && <Text sx={{ color: "secondary" }}>En stock</Text>}
        </Box>
      </div>
    </Card>
  )
}
