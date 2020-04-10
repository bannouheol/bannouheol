/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui"
import { Layout } from "../../components/Layout"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { Product } from "../../components/Shop/Product"
import { Products } from "../../components/Shop/Products"
import { Posts } from "../../components/Blog/Posts"
import { useTranslation } from "react-i18next"
import { mapEdgesToNodes, toPlainText, translateRaw } from "../../lib/helpers"

const ProductPage = ({ data, errors, ...props }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("common")
  const { product, sameCollectionProducts, blogPosts } = translateRaw(data, language)
  const sameCollectionProductNodes = mapEdgesToNodes(sameCollectionProducts)
  const blogPostsNodes = mapEdgesToNodes(blogPosts)
  const fullTitle = [product.title, t("x_in_breton", { x: product.collection.title })].join(`, `)
  const image = product.images.images && product.images.images[0] && product.images.images[0].asset.fluid.src
  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      {product && <SEO title={fullTitle} description={product.body && toPlainText(product.body)} image={image} />}
      {errors && <GraphQLErrorList errors={errors} />}

      {product && <Product {...product} />}
      {sameCollectionProductNodes && sameCollectionProductNodes.length > 0 && (
        <Box mt={3}>
          <Styled.h4>Dans la collection {product.collection.title}</Styled.h4>
          <Products nodes={sameCollectionProductNodes} />
        </Box>
      )}
      {blogPostsNodes && blogPostsNodes.length > 0 && (
        <Box mt={3}>
          <Styled.h4>On en parle sur le blog</Styled.h4>
          <Posts nodes={blogPostsNodes} />
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
    blogPosts: allSanityBlogPost(filter: { products: { elemMatch: { id: { eq: $product } } } }) {
      edges {
        node {
          ...blogPostPreviewFields
        }
      }
    }
  }
`

export default ProductPage
