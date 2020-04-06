/** @jsx jsx */
import { jsx, Text } from "theme-ui"
import { graphql } from "gatsby"

export const ProductFeature = ({
  //price,
  weight,
  dimensions,
  barcode: { barcode },
}) => {
  graphql`
    fragment productFeatureFields on SanityProduct {
      productFeature: defaultProductVariant {
        inStock
        price {
          value
          formatted
        }
        weight
        dimensions
        barcode {
          barcode
        }
      }
    }
  `
  return (
    <div>
      {weight && <Text>Poids : {weight}g</Text>}
      {dimensions && <Text>Dimensions : {dimensions}</Text>}
      {barcode && <Text>ISBN : {barcode}</Text>}
    </div>
  )
}
