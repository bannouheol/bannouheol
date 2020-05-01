/** @jsx jsx */
import { jsx, Card, Text, Box } from 'theme-ui'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'
//import { Categories } from "./Categories"
import { Link } from '../Link'
import { translateRaw } from '../../lib/helpers'
import { AddToCart } from './AddToCart'

export const ProductPreview = (product) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('common')

  graphql`
    fragment productPreviewFields on SanityProduct {
      id
      _rawTitle
      _rawSlug
      reference: ref
      collection {
        _rawTitle
        _rawSlug
      }
      images: defaultProductVariant {
        images {
          asset {
            fluid(maxWidth: 300) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
      ...productFeatureFields
    }
  `
  const {
    id,
    title,
    slug,
    collection,
    images,
    productFeature: { inStock, resupplyingDate, ...productFeature },
  } = translateRaw(product, language)
  const productLink = `/${collection.slug.current}/${slug.current}`
  const resupplying = resupplyingDate ? true : false
  return (
    <Card
      sx={{
        maxWidth: 300,
      }}
    >
      <div>
        <div>
          {images && images.images[0] && images.images[0].asset && (
            <Link to={productLink}>
              <Img fluid={images.images[0].asset.fluid} sx={{ variant: 'images.card' }} />
            </Link>
          )}
        </div>
        <Box p={1}>
          <Link to={productLink} sx={{ variant: 'links.product' }}>
            {title}
          </Link>
          <Text sx={{ color: 'textMuted' }}>{collection.title}</Text>

          {(inStock || resupplying) && productFeature.price && <Text>{productFeature.price.formatted}</Text>}

          {inStock && <Text sx={{ color: 'secondary', display: 'inline-block', mr: 2 }}>{t('shop:in_stock')}</Text>}
          {resupplying && <Text sx={{ color: 'orange', display: 'inline-block', mr: 2 }}>{t('shop:resupplying')}</Text>}
          {inStock && (
            <AddToCart
              id={id}
              title={title}
              price={productFeature.price.value}
              url={`/${language}/${collection.slug.current}/${slug.current}`}
              description={collection.title}
              image={product.images.images && product.images.images[0].asset.fluid.src}
              discrete="true"
            />
          )}
        </Box>
      </div>
    </Card>
  )
}
