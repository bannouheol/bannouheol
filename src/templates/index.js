/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { useTranslation } from 'react-i18next'
import { mapEdgesToNodes, translateRaw } from '../lib/helpers'
import { GraphQLErrorList } from '../components/GraphQLErrorList'
import { Posts } from '../components/Blog/Posts'
import { Products } from '../components/Shop/Products'
import SEO from '../components/SEO'
import PortableText from '../components/PortableText'

const IndexPage = ({ data, errors, ...props }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('common')
  if (errors) {
    return (
      <Layout {...props}>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const { homePage, posts, products } = translateRaw(data, language)
  const postNodes = posts && mapEdgesToNodes(data.posts)
  const productNodes = products && mapEdgesToNodes(products)
  return (
    <Layout {...props}>
      <SEO title={homePage.title} />
      {homePage.content && <PortableText blocks={homePage.content} />}
      <Styled.h2>{t(`shop:latest_products`)}</Styled.h2>
      {productNodes && productNodes.length > 0 && <Products nodes={productNodes} sx={{ mt: 3 }} />}
      <Styled.h2>{t(`news`)}</Styled.h2>
      {postNodes && postNodes.length > 0 && <Posts nodes={postNodes} />}
    </Layout>
  )
}

export const query = graphql`
  query IndexPageQuery {
    homePage: sanityPage(id: { eq: "2d680e01-f5d6-5dbc-889b-fcc595cbe961" }) {
      _rawTitle
      _rawContent
    }
    posts: allSanityBlogPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { publishedAt: { ne: null } }
      limit: 7
    ) {
      edges {
        node {
          ...blogPostPreviewFields
        }
      }
    }
    products: allSanityProduct(
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

export default IndexPage
