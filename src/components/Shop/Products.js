/** @jsx jsx */

import { jsx, Grid } from "theme-ui"
//import { useTranslation } from "react-i18next"
import { ProductPreview } from "./ProductPreview"

export const Products = ({ nodes, ...props }) => {
  //const { t } = useTranslation("common", "shop")
  return (
    <Grid columns={[2, 3, 4, 6]} {...props}>
      {nodes && nodes.map((product) => <ProductPreview key={product.id} {...product} />)}
    </Grid>
  )
}
