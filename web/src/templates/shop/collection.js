/** @jsx jsx */

import { Layout } from "../../components/Layout"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { toPlainText } from "../../lib/helpers"
import PortableText from "../../components/PortableText"
import { useTranslation } from "react-i18next"
import { Products } from "../../components/Shop/Products"
import { mapEdgesToNodes } from "../../lib/helpers"
import { jsx, Grid } from "theme-ui"

const CollectionPage = (props) => {
  const { data, errors } = props
  const { collection, products } = data
  const {
    t,
    i18n: { language },
  } = useTranslation("common")
  const productNodes = mapEdgesToNodes(products)
  const fullTitle = t("x_in_breton", { x: collection.title.translate })
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {collection && (
        <SEO
          title={fullTitle}
          description={
            collection._rawDescription &&
            collection._rawDescription[language] &&
            toPlainText(collection._rawDescription[language])
          }
          //image={product.image}
        />
      )}
      {errors && <GraphQLErrorList errors={errors} />}

      {collection && <h1>{fullTitle}</h1>}
      {collection &&
        collection._rawDescription &&
        collection._rawDescription[language] && (
          <PortableText blocks={collection._rawDescription[language]} />
        )}

      {productNodes && productNodes.length > 0 && (
        <Grid width={[128, 128, 128]}>
          <Products nodes={productNodes} />
        </Grid>
      )}
    </Layout>
  )
}

export const query = graphql`
  fragment collectionFields on SanityCollection {
    id
    title {
      translate(language: $language)
    }
    _rawDescription
  }
  query Collection($collection: String, $language: String) {
    collection: sanityCollection(id: { eq: $collection }) {
      ...collectionFields
    }
    products: allSanityProduct(
      filter: { collection: { id: { eq: $collection } } }
      sort: { order: DESC, fields: releaseDate }
    ) {
      edges {
        node {
          title {
            translate(language: $language)
          }
          slug {
            translate(language: $language)
          }
          collection {
            title {
              translate(language: $language)
            }
            slug {
              translate(language: $language)
            }
          }
          defaultProductVariant {
            images {
              asset {
                fluid(maxWidth: 800) {
                  ...GatsbySanityImageFluid
                }
              }
            }
            inStock
            price {
              formatted
            }
          }
        }
      }
    }
  }
`

export default CollectionPage
