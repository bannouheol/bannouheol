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
import { Link } from '../../components/Link'

const CategoryPage = ({ data, errors, ...props }) => {
  const {
    //t,
    i18n: { language },
  } = useTranslation('common')
  const { products, children, category } = translateRaw(data, language)
  const productNodes = mapEdgesToNodes(products)
  const childrenNodes = mapEdgesToNodes(children)
  const fullTitle = XInBreton({ x: category.title })
  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      {category && (
        <SEO
          title={fullTitle}
          description={category.description && toPlainText(category.description)}
          image={category.image && category.image.asset && category.image.asset.fluid.src}
        />
      )}
      {errors && <GraphQLErrorList errors={errors} />}

      {category && <Styled.h1>{fullTitle}</Styled.h1>}
      {category && category.description && <PortableText blocks={category.description} />}

      {childrenNodes && (
        <div sx={{ display: 'block' }}>
          {childrenNodes.map((child) => (
            <Link
              to={`/${category.slug.current}/${child.slug.current}`}
              sx={{
                p: 3,
                mr: 3,
                mt: 1,
                bg: 'secondary',
                color: 'white',
                fontWeight: 'bold',
                display: 'inline-block',
                '&:hover': { bg: 'primary', color: 'white', textDecoration: 'none' },
              }}
            >
              <XInBreton x={child.title} />
            </Link>
          ))}
        </div>
      )}

      {productNodes && productNodes.length > 0 && <Products nodes={productNodes} sx={{ mt: 3 }} />}
    </Layout>
  )
}

export const query = graphql`
  fragment categoryFields on SanityCategory {
    id
    _rawTitle
    _rawDescription
    _rawSlug
    parentCategory {
      _rawTitle
      _rawSlug
    }
    image {
      asset {
        fluid {
          ...GatsbySanityImageFluid
        }
      }
    }
  }
  query Category($category: String) {
    category: sanityCategory(id: { eq: $category }) {
      ...categoryFields
    }
    children: allSanityCategory(filter: { parentCategory: { id: { eq: $category } } }) {
      edges {
        node {
          id
          _rawTitle
          _rawSlug
        }
      }
    }
    products: allSanityProduct(
      filter: {
        categories: { elemMatch: { id: { eq: $category } }
        slug: {
          fr: {current: {ne: null}},
          br: {current: {ne: null}}
        },
        _id: {regex: "/^(?!draft)/"}
      }
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
