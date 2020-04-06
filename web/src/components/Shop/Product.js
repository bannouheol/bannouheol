/** @jsx jsx */
import { jsx, Grid, Flex, Styled, Text, Box, Divider } from "theme-ui"
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

  const {
    id,
    title,
    slug,
    body,
    collection,
    categories,
    traductors,
    bookFeature,
    reference,
    defaultProductVariant,
    releaseDate,
  } = translateRaw(product, language)
  const inStock = defaultProductVariant.inStock
  return (
    <article>
      <Grid gap={2} columns={[1, 2, "4fr 6fr 4fr", "4fr 6fr 3fr"]} className="boundary-element">
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
            Collection <Link to={`/${collection.slug.current}`}>{collection.title}</Link>
          </h2>
          <p>
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
          {body && (
            <Box sx={{ my: 4 }}>
              <PortableText blocks={body} />
            </Box>
          )}
        </Box>
        <Box>
          <Box sx={{ variant: "boxes.important" }}>
            <Grid gap={2} columns={["1fr 2fr", 1]} sx={{ alignItems: "center", justifyContent: "center" }}>
              <Box>
                {inStock && <div sx={{ mb: 1, fontSize: 3 }}>{defaultProductVariant.price.formatted}</div>}
                <div sx={{ mb: [0, 3], fontSize: 1, color: inStock ? "secondary" : "tomato" }}>
                  {inStock ? "En stock" : t("shop:out_of_stock")}
                </div>
              </Box>
              {inStock && (
                <AddToCart
                  id={id}
                  title={title}
                  price={defaultProductVariant.price.value}
                  url={`/${language}/${collection.slug.current}/${slug.current}`}
                  description={`${collection.title} - ${reference}`}
                  image={defaultProductVariant.images && defaultProductVariant.images[0].asset.fluid.src}
                />
              )}
            </Grid>
            <Text sx={{ fontSize: 1, mt: 2 }}>
              <span sx={{ color: "tomato" }}>Livraison offerte</span> à partir de 10€, en 3 jours chez vous
            </Text>
            <Divider sx={{ my: 3 }} />
            <Flex sx={{ alignItems: "center" }}>
              Partager sur : <FaFacebookSquare size={24} sx={{ ml: 1 }} /> <FaTwitterSquare size={24} sx={{ ml: 1 }} />{" "}
              <FaPinterestSquare size={24} sx={{ ml: 1 }} />
            </Flex>
          </Box>
        </Box>
      </Grid>
      <Box my={4}>
        {traductors.length > 0 && (
          <Box>
            Traducteur(s) :{` `}
            {traductors
              .map((t) => <ProfilePreview key={t.id} {...t} showAvatar={false} />)
              .reduce((acc, el) => {
                return acc === null ? [el] : [...acc, ", ", el]
              }, null)}
          </Box>
        )}
        <BookFeature {...bookFeature} />

        <aside>{releaseDate && <p>{t("shop:released_on", { date: new Date(releaseDate) })}</p>}</aside>
      </Box>
    </article>
  )
}
