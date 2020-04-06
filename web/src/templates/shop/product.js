/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui"
import { Layout } from "../../components/Layout"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { Product } from "../../components/Shop/Product"
import { Products } from "../../components/Shop/Products"
import { useTranslation } from "react-i18next"
import { mapEdgesToNodes, toPlainText, translateRaw } from "../../lib/helpers"

const ProductPage = ({ data, errors, ...props }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("common")
  const { product, sameCollectionProducts } = translateRaw(data, language)
  const sameCollectionProductNodes = mapEdgesToNodes(sameCollectionProducts)
  const fullTitle = [product.title, t("x_in_breton", { x: product.collection.title })].join(`, `)
  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      {product && (
        <SEO
          title={fullTitle}
          description={product.body && toPlainText(product.body)}
          image={
            product.defaultProductVariant.images &&
            product.defaultProductVariant.images[0] &&
            product.defaultProductVariant.images[0].asset.fluid.src
          }
        />
      )}
      {errors && <GraphQLErrorList errors={errors} />}

      {product && <Product {...product} />}
      {sameCollectionProductNodes && sameCollectionProductNodes.length > 0 && (
        <Box>
          <Styled.h4>Dans la même collection</Styled.h4>
          <Products nodes={sameCollectionProductNodes} />
        </Box>
      )}
    </Layout>
  )
}

export const query = graphql`
  query Product($product: String, $collection: String) {
    product: sanityProduct(id: { eq: $product }) {
      ...productFields
    }
    sameCollectionProducts: allSanityProduct(
      filter: { id: { ne: $product }, collection: { id: { eq: $collection } } }
      sort: { order: [DESC, DESC], fields: [defaultProductVariant___inStock, releaseDate] }
      limit: 6
    ) {
      edges {
        node {
          ...productPreviewFields
        }
      }
    }
  }
`

export default ProductPage
