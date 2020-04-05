/** @jsx jsx */
import { jsx, Grid, Styled, Text, Box, Divider } from "theme-ui"
import PortableText from "../PortableText"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import path from "path"
import { useTranslation } from "react-i18next"
//import { Categories } from "./Categories"
import { Link } from "../Link"
import { translateRaw } from "../../lib/helpers"
import { BookFeature } from "./BookFeature"
import { ProfilePreview } from "./ProfilePreview"
import { AddToCart } from "./AddToCart"
import Sticky from "react-sticky-el"
import { FaFacebookSquare, FaTwitterSquare, FaPinterestSquare } from "react-icons/fa"

export const Product = (product) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("common")
  graphql`
    fragment productFields on SanityProduct {
      ...productPreviewFields
      _rawBody
      reference: ref
      categories {
        id
        _rawTitle
        _rawSlug
        parent: parentCategory {
          _rawSlug
        }
      }
      traductors {
        ...profilePreviewFields
      }
      bookFeature {
        ...bookFeatureFields
      }
      releaseDate
    }
  `

  const { id, title, slug, body, collection, categories, traductors, bookFeature, reference, defaultProductVariant, releaseDate } = translateRaw(product, language)

  return (
    <article>
      <Grid gap={2} columns={[1, 2, "4fr 6fr 3fr"]}>
        {defaultProductVariant &&
          defaultProductVariant.images &&
          defaultProductVariant.images.map((i) => (
            <Box key={i.asset.fluid.src}>
              <Img fluid={i.asset.fluid} />
            </Box>
          ))}
        <Box sx={{ p: 2, mb: 2 }}>
          <Styled.h1>{title}</Styled.h1>
          <h2>
            <Link to={`/${collection.slug.current}`}>{collection.title}</Link>
          </h2>
          <p>
            <br />
            Catégories : {` `}
            {categories &&
              categories
                .map((c) => {
                  c["path"] = path.join("/", c.parent === null ? `` : c.parent.slug.current, c.slug.current)
                  return (
                    <Link key={c.id} to={c.path}>
                      {c.title}
                    </Link>
                  )
                })
                .reduce((acc, el) => {
                  return acc === null ? [el] : [...acc, ", ", el]
                }, null)}
          </p>
          {language === "fr" && <p>Titre breton : {product._rawTitle.br}</p>}
          {language === "br" && (
            <p>
              {t("Titre original")} : {product._rawTitle.fr}
            </p>
          )}
          {body && <PortableText blocks={body} />}
        </Box>
        <Box>
          <Sticky>
            <Box sx={{ variant: "boxes.important" }}>
              {defaultProductVariant.inStock && <div sx={{ mb: 1, fontSize: 3 }}>{defaultProductVariant.price.formatted}</div>}
              {defaultProductVariant.inStock && <div sx={{ mb: 3, fontSize: 1, color: "secondary" }}>En stock</div>}
              {defaultProductVariant.inStock && (
                <AddToCart
                  id={id}
                  title={title}
                  price={defaultProductVariant.price.value}
                  url={`/${collection.slug}/${slug}`}
                  description={`${collection.title} - ${reference}`}
                  image={defaultProductVariant.images && defaultProductVariant.images[0].asset.fluid.src}
                />
              )}
              {!defaultProductVariant.inStock && <Text>{t("shop:out_of_stock")}</Text>}
              <p sx={{ fontSize: 1 }}>Livraison offerte à partir de 10€, en 3 jours chez vous</p>
              <Divider sx={{ my: 3 }} />
              <Box>
                Partager sur : <FaFacebookSquare /> <FaTwitterSquare /> <FaPinterestSquare />
              </Box>
            </Box>
          </Sticky>
        </Box>
      </Grid>
      <Box>
        {traductors.length > 0 && (
          <Box>
            Traducteurs :{` `}
            {traductors.map((t) => (
              <ProfilePreview key={t.id} {...t} showAvatar={false} />
            ))}
          </Box>
        )}
        <BookFeature {...bookFeature} />

        <aside>{releaseDate && <p>{t("shop:released_on", { date: new Date(releaseDate) })}</p>}</aside>
      </Box>
    </article>
  )
}
