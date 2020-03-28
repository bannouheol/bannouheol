import React from "react"
//import { useTranslation } from "react-i18next"
import { ProductPreview } from "./ProductPreview"

export const Products = ({ nodes, showPrice = true }) => {
  //const { t } = useTranslation("common", "shop")
  return (
    <>
      {nodes &&
        nodes.map((product) => (
          <ProductPreview
            key={product.id}
            node={product}
            showPrice={showPrice}
          />
        ))}
    </>
  )
}
