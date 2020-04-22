/** @jsx jsx */
import { jsx, Text } from "theme-ui"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"

export const ProductFeature = ({
  //price,
  weight,
  dimensions,
  barcode,
}) => {
  const {
    t,
    //i18n: { language },
  } = useTranslation("common")
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
      {weight && (
        <Text>
          {t("shop:weight")} : {weight}g
        </Text>
      )}
      {dimensions && (
        <Text>
          {t("shop:dimensions")} : {dimensions}
        </Text>
      )}
      {barcode && (
        <Text>
          {t("shop:isbn")} : {barcode.barcode}
        </Text>
      )}
    </div>
  )
}
