/** @jsx jsx */
import {jsx, Styled} from 'theme-ui'
import {graphql} from 'gatsby'
import {Layout} from '../components/Layout'
import {useTranslation} from 'react-i18next'
import {mapEdgesToNodes, translateRaw} from '../lib/helpers'
import {GraphQLErrorList} from '../components/GraphQLErrorList'
import {Posts} from '../components/Blog/Posts'
import {Products} from '../components/Shop/Products'
import SEO from '../components/SEO'
import PortableText from '../components/PortableText'

const IndexPage = ({data, errors, ...props}) => {
  const {
    t,
    i18n: {language},
  } = useTranslation('common')
  if (errors) {
    return (
      <Layout {...props}>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const {homePage, posts, selectedProducts, latestProducts} = translateRaw(data, language)
  const postNodes = posts && mapEdgesToNodes(data.posts)
  const latestProductNodes = latestProducts && mapEdgesToNodes(latestProducts)
  const selectedProductsNodes = selectedProducts && mapEdgesToNodes(selectedProducts)
  return (
    <Layout {...props}>
      <SEO title={homePage.title} />
      {homePage.content && <PortableText blocks={homePage.content} />}
      <Styled.h2>{t(`shop:selected_products`)}</Styled.h2>
      {selectedProductsNodes && selectedProductsNodes.length > 0 && <Products nodes={selectedProductsNodes} sx={{mt: 3}} />}
      <Styled.h2>{t(`shop:latest_products`)}</Styled.h2>
      {latestProductNodes && latestProductNodes.length > 0 && <Products nodes={latestProductNodes} sx={{mt: 3}} />}
      <Styled.h2>{t(`news`)}</Styled.h2>
      {postNodes && postNodes.length > 0 && <Posts nodes={postNodes} />}
    </Layout>
  )
}

/*sort: { order: [DESC, DESC], fields: [defaultProductVariant___inStock, releaseDate] }
 */
export const query = graphql`
  query IndexPageQuery {
    homePage: sanityPage(id: {eq: "-2d680e01-f5d6-5dbc-889b-fcc595cbe961"}) {
      _rawTitle
      _rawContent
    }
    posts: allSanityBlogPost(sort: {fields: [publishedAt], order: DESC}, filter: {publishedAt: {ne: null}}, limit: 7) {
      edges {
        node {
          ...blogPostPreviewFields
        }
      }
    }
    latestProducts: allSanityProduct(
      sort: {order: [DESC, DESC], fields: [releaseDate]}
      filter: {slug: {fr: {current: {ne: null}}, br: {current: {ne: null}}}, _id: {regex: "/^(?!draft)/"}}
      limit: 12
    ) {
      edges {
        node {
          ...productPreviewFields
        }
      }
    }
    selectedProducts: allSanityProduct(
      filter: {title: {fr: {in: ["Kan ar Bed - Livre-CD", "Kan ar Bed - CD", "Le Sens de la vie", "Míp", "L'Enfant des étoiles", "L'imagier breton-anglais de Petit Ours Brun"]}}}
      sort: {order: [DESC, DESC], fields: [releaseDate]}
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
