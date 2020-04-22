/** @jsx jsx */
import { jsx, Box, Styled } from 'theme-ui'
import { Layout } from '../../components/Layout'
import SEO from '../../components/SEO'
import { graphql } from 'gatsby'
import { GraphQLErrorList } from '../../components/GraphQLErrorList'
import { Product } from '../../components/Shop/Product'
import { Products } from '../../components/Shop/Products'
import { Posts } from '../../components/Blog/Posts'
import { useTranslation } from 'react-i18next'
import { mapEdgesToNodes, toPlainText, translateRaw } from '../../lib/helpers'
import { JsonLd } from 'react-schemaorg'

const ProductPage = ({ data, errors, ...props }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('common')

  const {
    product,
    sameCollectionProducts,
    blogPosts,
    site: {
      siteMetadata: { siteUrl },
    },
  } = translateRaw(data, language)
  const sameCollectionProductNodes = mapEdgesToNodes(sameCollectionProducts)
  const blogPostsNodes = mapEdgesToNodes(blogPosts)
  const fullTitle = [product.title, t('x_in_breton', { x: product.collection.title })].join(`, `)
  const image = product.images.images && product.images.images[0] && product.images.images[0].asset.fluid.src
  const excerpt = product.body && toPlainText(product.body)
  const productPath = `/${language}/${product.collection.slug.current}/${product.slug.current}`
  const categories =
    product.categories &&
    product.categories.length > 0 &&
    product.categories
      .map((c) => c.title)
      .reduce((acc, el) => {
        return acc === null ? el : acc + ' > ' + el
      }, null)
  const inStock = product.productFeature.inStock
  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      {product && <SEO title={fullTitle} description={excerpt} image={image} product={true} />}
      {product && (
        <JsonLd
          item={{
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: fullTitle,
            category: '',
            url: siteUrl + productPath,
            image,
            description: excerpt,
            gtin: product.productFeature.barcode.barcode && product.productFeature.barcode.barcode,
            categories,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'EUR',
              price: product.productFeature.price.value,
              itemCondition: 'https://schema.org/NewCondition',
              availability: inStock ? 'http://schema.org/InStock' : 'https://schema.org/OutOfStock',
            },
          }}
        />
      )}
      {errors && <GraphQLErrorList errors={errors} />}

      {product && <Product {...product} />}
      {sameCollectionProductNodes && sameCollectionProductNodes.length > 0 && (
        <Box mt={3}>
          <Styled.h4>{t('shop:in_collection', { collection_title: product.collection.title })}</Styled.h4>
          <Products nodes={sameCollectionProductNodes} />
        </Box>
      )}
      {blogPostsNodes && blogPostsNodes.length > 0 && (
        <Box mt={3}>
          <Styled.h4>{t('blog:discussed_on_blog')}</Styled.h4>
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
    site {
      siteMetadata {
        siteUrl: url
      }
    }
  }
`

export default ProductPage
