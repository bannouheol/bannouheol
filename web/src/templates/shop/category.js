/** @jsx jsx */

import { jsx, Grid } from "theme-ui"
import { Layout } from "../../components/Layout"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { toPlainText } from "../../lib/helpers"
import PortableText from "../../components/PortableText"
import { useTranslation } from "react-i18next"
import { Products } from "../../components/Shop/Products"
import { mapEdgesToNodes } from "../../lib/helpers"

const CategoryPage = (props) => {
  const { data, errors } = props
  //const category = data && data.category
  const { category, products } = data
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const productNodes = mapEdgesToNodes(products)
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {category && (
        <SEO
          title={category.title.translate || t("Titre inconnu")}
          description={
            category._rawDescription &&
            category._rawDescription[language] &&
            toPlainText(category._rawDescription[language])
          }
          //image={product.image}
        />
      )}
      {errors && <GraphQLErrorList errors={errors} />}

      {category && <h1>{category.title.translate}</h1>}
      {category &&
        category._rawDescription &&
        category._rawDescription[language] && (
          <PortableText blocks={category._rawDescription[language]} />
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
  fragment categoryFields on SanityCategory {
    id
    title {
      translate(language: $language)
    }
    _rawDescription
    parentCategory {
      title {
        translate(language: $language)
      }
      slug {
        translate(language: $language)
      }
    }
  }
  query Category($category: String, $language: String) {
    category: sanityCategory(id: { eq: $category }) {
      ...categoryFields
    }
    products: allSanityProduct(
      filter: { categories: { elemMatch: { id: { eq: $category } } } }
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
          categories {
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

export default CategoryPage
