/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Layout } from '../../components/Layout'
import SEO from '../../components/SEO'
import { graphql } from 'gatsby'
import { GraphQLErrorList } from '../../components/GraphQLErrorList'
import { toPlainText, translateRaw } from '../../lib/helpers'
import PortableText from '../../components/PortableText'
import { useTranslation } from 'react-i18next'
import { Products } from '../../components/Shop/Products'
import { mapEdgesToNodes } from '../../lib/helpers'
import { XInBreton } from '../../components/XInBreton'

const CollectionPage = ({ data, errors, ...props }) => {
  const {
    //t,
    i18n: { language },
  } = useTranslation('common')
  const { products, collection } = translateRaw(data, language)
  const productNodes = mapEdgesToNodes(products)
  const fullTitle = XInBreton({ x: collection.title })
  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      {collection && (
        <SEO
          title={fullTitle}
          description={collection.description && toPlainText(collection.description)}
          image={collection.image && collection.image.asset && collection.image.asset.fluid.src}
        />
      )}
      {errors && <GraphQLErrorList errors={errors} />}

      {collection && <Styled.h1>{fullTitle}</Styled.h1>}
      {collection && collection.description && <PortableText blocks={collection.description} />}

      {productNodes && productNodes.length > 0 && <Products nodes={productNodes} sx={{ mt: 3 }} />}
    </Layout>
  )
}

export const query = graphql`
  fragment collectionFields on SanityCollection {
    id
    _rawTitle
    _rawDescription
    image {
      asset {
        fluid {
          ...GatsbySanityImageFluid
        }
      }
    }
  }
  query Collection($collection: String) {
    collection: sanityCollection(id: { eq: $collection }) {
      ...collectionFields
    }
    products: allSanityProduct(
      filter: { collection: { id: { eq: $collection } } }
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

export default CollectionPage
