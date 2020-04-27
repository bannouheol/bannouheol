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
import { add, format } from 'date-fns'

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
  const { title, images, body, collection, slug, categories, productFeature, releaseDate } = product
  const sameCollectionProductNodes = mapEdgesToNodes(sameCollectionProducts)
  const blogPostsNodes = mapEdgesToNodes(blogPosts)
  const fullTitle = [title, t('x_in_breton', { x: collection.title })].join(`, `)
  const image = images.images && images.images[0] && images.images[0].asset.fluid.src
  const excerpt = body && toPlainText(body)
  const productPath = `/${language}/${collection.slug.current}/${slug.current}`
  const categoriesReduced =
    categories &&
    categories.length > 0 &&
    categories
      .map((c) => c.title)
      .reduce((acc, el) => {
        return acc === null ? el : acc + ' > ' + el
      }, null)
  const inStock = productFeature && productFeature.inStock
  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      {product && <SEO title={fullTitle} description={excerpt} image={image} product={true} />}
      {product && (
        <JsonLd
          item={{
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: title,
            url: siteUrl + productPath,
            image,
            description: excerpt ? excerpt : fullTitle,
            gtin13: productFeature && productFeature.barcode && productFeature.barcode.barcode,
            category: categoriesReduced,
            releaseDate,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'EUR',
              priceValidUntil: format(add(new Date(), { years: 1 }), 'yyyy-MM-dd'),
              price: productFeature.price.value,
              itemCondition: 'https://schema.org/NewCondition',
              availability: inStock ? 'http://schema.org/InStock' : 'https://schema.org/OutOfStock',
              url: siteUrl + productPath,
            },
            brand: {
              '@type': 'Brand',
              name: collection.title,
            },
            sku: inStock ? 10 : 0,
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
    blogPosts: allSanityBlogPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { products: { elemMatch: { id: { eq: $product } } } }
    ) {
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
