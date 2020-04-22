/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Layout } from "../../components/Layout"
import SEO from "../../components/SEO"
import { graphql } from "gatsby"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { toPlainText, translateRaw } from "../../lib/helpers"
import PortableText from "../../components/PortableText"
import { useTranslation } from "react-i18next"
import { Products } from "../../components/Shop/Products"
import { mapEdgesToNodes } from "../../lib/helpers"

const CategoryPage = ({ data, errors, ...props }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("common")
  const { products, category } = translateRaw(data, language)
  const productNodes = mapEdgesToNodes(products)
  const fullTitle = t("x_in_breton", { x: category.title })
  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      {category && (
        <SEO
          title={fullTitle}
          description={category.description && toPlainText(category.description)}
          //image={product.image}
        />
      )}
      {errors && <GraphQLErrorList errors={errors} />}

      {category && <Styled.h1>{fullTitle}</Styled.h1>}
      {category && category.description && <PortableText blocks={category.description} />}

      {productNodes && productNodes.length > 0 && <Products nodes={productNodes} sx={{ mt: 3 }} />}
    </Layout>
  )
}

export const query = graphql`
  fragment categoryFields on SanityCategory {
    id
    _rawTitle
    _rawDescription
    parentCategory {
      _rawTitle
      _rawSlug
    }
  }
  query Category($category: String) {
    category: sanityCategory(id: { eq: $category }) {
      ...categoryFields
    }
    products: allSanityProduct(
      filter: { categories: { elemMatch: { id: { eq: $category } } } }
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

export default CategoryPage
