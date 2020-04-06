/** @jsx jsx */

import { jsx, Grid } from "theme-ui"
//import { useTranslation } from "react-i18next"
import { ProductPreview } from "./ProductPreview"

export const Products = ({ nodes }) => {
  //const { t } = useTranslation("common", "shop")
  return (
    <Grid columns={[1, 2, 3, 6]}>
      {nodes && nodes.map((product) => <ProductPreview key={product.id} {...product} />)}
    </Grid>
  )
}
