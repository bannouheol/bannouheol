/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Layout } from "../../components/Layout"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { toPlainText, translateRaw } from "../../lib/helpers"
import PortableText from "../../components/PortableText"
import { useTranslation } from "react-i18next"
import { Products } from "../../components/Shop/Products"
import { mapEdgesToNodes } from "../../lib/helpers"

const CollectionPage = ({ data, errors, ...props }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("common")
  const { products, collection } = translateRaw(data, language)
  const productNodes = mapEdgesToNodes(products)
  const fullTitle = t("x_in_breton", { x: collection.title })
  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      {collection && (
        <SEO
          title={fullTitle}
          description={collection.description && toPlainText(collection.description)}
          //image={product.image}
        />
      )}
      {errors && <GraphQLErrorList errors={errors} />}

      {collection && <Styled.h1>{fullTitle}</Styled.h1>}
      {collection && collection.description && <PortableText blocks={collection.description} />}

      {productNodes && productNodes.length > 0 && <Products nodes={productNodes} sx={{ mt: 3 }} />}
    </Layout>
  )
}

export const query = graphql`
  fragment collectionFields on SanityCollection {
    id
    _rawTitle
    _rawDescription
  }
  query Collection($collection: String) {
    collection: sanityCollection(id: { eq: $collection }) {
      ...collectionFields
    }
    products: allSanityProduct(
      filter: { collection: { id: { eq: $collection } } }
      sort: { order: [DESC, DESC], fields: [defaultProductVariant___inStock, releaseDate] }
    ) {
      edges {
        node {
          ...productPreviewFields
        }
      }
    }
  }
`

export default CollectionPage
