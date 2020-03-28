import React from "react"
import { Layout } from "../../components/Layout"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { Product } from "../../components/Shop/Product"
//import { toPlainText } from "../../lib/helpers"

const ProductPage = (props) => {
  const { data, errors } = props
  const product = data && data.product
  const { title, defaultProductVariant } = product
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {product && (
        <SEO
          title={title.translate || "Untitled"}
          //description={toPlainText(post._rawExcerpt)}
          image={
            defaultProductVariant.images &&
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
    title {
      translate(language: $language)
    }
    slug {
      translate(language: $language)
    }
    reference: ref
    _rawBody
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
    traductor {
      ...personPreviewFields
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
