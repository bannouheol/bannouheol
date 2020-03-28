import React from "react"
import { Layout } from "../../components/Layout"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { Product } from "../../components/Shop/Product"
import { useTranslation } from "react-i18next"
import { toPlainText, translateRaw } from "../../lib/helpers"

const ProductPage = ({ data: { product }, errors }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const { _rawTitle, _rawBody, defaultProductVariant } = product
  const [title, body] = translateRaw([_rawTitle, _rawBody], language)

  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {product && (
        <SEO
          title={title || "Untitled"}
          description={body && toPlainText(body)}
          image={
            defaultProductVariant.images &&
            defaultProductVariant.images[0] &&
            defaultProductVariant.images[0].asset.fluid.src
          }
        />
      )}
      {errors && <GraphQLErrorList errors={errors} />}

      {product && <Product {...product} />}
    </Layout>
  )
}

export const query = graphql`
  fragment productFields on SanityProduct {
    id
    _rawTitle
    _rawSlug
    _rawBody
    reference: ref
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
        value
        formatted
      }
    }
    traductors {
      ...profilePreviewFields
    }
    bookFeature {
      ...bookFeatureFields
    }
    collection {
      title {
        translate(language: $language)
      }
      slug {
        translate(language: $language)
      }
    }
    releaseDate
  }
  query Product($product: String, $language: String) {
    product: sanityProduct(id: { eq: $product }) {
      ...productFields
    }
  }
`

export default ProductPage
