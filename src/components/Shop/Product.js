/** @jsx jsx */
import { jsx, Grid, Flex, Styled, Text, Box, Divider } from "theme-ui"
import PortableText from "../PortableText"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import path from "path"
import { useTranslation, Trans } from "react-i18next"
import { Link } from "../Link"
import { translateRaw } from "../../lib/helpers"
import { BookFeature } from "./BookFeature"
import { ProductFeature } from "./ProductFeature"
import { ProfilePreview } from "./ProfilePreview"
import { AddToCart } from "./AddToCart"
import { FaFacebookSquare, FaTwitterSquare, FaPinterestSquare } from "react-icons/fa"
import { SRLWrapper } from "simple-react-lightbox"
import YouTube from "react-youtube"
import getVideoId from "get-video-id"

export const Product = (product) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("common")
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl: url
        }
      }
    }
  `)
  const {
    site: {
      siteMetadata: { siteUrl },
    },
  } = data
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
      ...bookFeatureFields
      releaseDate
      minimumAge
      youtubeVideos {
        url
      }
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
    productFeature,
    releaseDate,
    minimumAge,
    youtubeVideos,
  } = translateRaw(product, language)
  const inStock = productFeature.inStock

  const thumbs = product.images.images.map((i) => i.asset.fluid)
  const image = thumbs.shift()

  const productPath = `/${language}/${collection.slug.current}/${slug.current}`

  return (
    <article>
      <Grid gap={2} columns={[1, 2, "4fr 6fr 4fr", "4fr 6fr 3fr"]} className="boundary-element">
        <Box sx={{ order: 0 }}>
          {image && <Img fluid={image} />}
          {thumbs && (
            <SRLWrapper>
              <Grid gap={3} width={[64]}>
                {thumbs.map((i) => (
                  <Img key={i.src} fluid={i} data-attribute="SRL" />
                ))}
              </Grid>
            </SRLWrapper>
          )}
          {youtubeVideos &&
            youtubeVideos.length > 0 &&
            youtubeVideos.map((video) => {
              const { id } = getVideoId(video.url)
              return (
                id && (
                  <YouTube
                    videoId={id}
                    opts={{
                      width: "100%",
                    }}
                    sx={{ mt: 3 }}
                  />
                )
              )
            })}
        </Box>
        <Box
          sx={{
            p: 2,
            mb: 2,
            order: [1, 2, 1],
            gridColumnStart: ["auto", 1, "auto"],
            gridColumnEnd: ["auto", 4, "auto"],
          }}
        >
          <Styled.h1>{title}</Styled.h1>
          <Box sx={{ lineHeight: 2 }}>
            {t("shop:collection")} :{" "}
            <h2 sx={{ display: "inline-block", fontSize: 1, m: 0 }}>
              <Link sx={{ p: 1, bg: "light", borderRadius: 8 }} to={`/${collection.slug.current}`}>
                {collection.title}
              </Link>
            </h2>{" "}
            {t("shop:categories")} :{" "}
            {categories &&
              categories
                .map((c) => {
                  c["path"] = path.join("/", c.parent === null ? `` : c.parent.slug.current, c.slug.current)
                  return (
                    <h3 sx={{ display: "inline-block", fontSize: 1, m: 0 }}>
                      <Link key={c.id} to={c.path} sx={{ p: 1, bg: "light", borderRadius: 8 }}>
                        {c.title}
                      </Link>
                    </h3>
                  )
                })
                .reduce((acc, el) => {
                  return acc === null ? [el] : [...acc, " - ", el]
                }, null)}
          </Box>
          {body && <PortableText blocks={body} />}
          <Box mt={2}>
            {language === "fr" && (
              <Text>
                {t("shop:title_in_brezhoneg")} : {product._rawTitle.br}
              </Text>
            )}
            {language === "br" && (
              <Text>
                {t("shop:original_title")} : {product._rawTitle.fr}
              </Text>
            )}
            <ProductFeature {...productFeature} />
            <BookFeature {...bookFeature} />
            {traductors.length > 0 && (
              <Box>
                {t("shop:traductors")} :{` `}
                {traductors
                  .map((t) => <ProfilePreview key={t.id} {...t} showAvatar={false} />)
                  .reduce((acc, el) => {
                    return acc === null ? [el] : [...acc, ", ", el]
                  }, null)}
              </Box>
            )}

            {releaseDate && <p>{t("shop:released_on", { date: new Date(releaseDate) })}</p>}
            {minimumAge && <p>{t("shop:minimum_age", { minimum_age: minimumAge })}</p>}
          </Box>
        </Box>
        <Box sx={{ order: [2, 1, 2], mb: [4, 0] }}>
          <Box sx={{ variant: "boxes.important" }}>
            <Grid gap={2} columns={["1fr 2fr", 1]} sx={{ alignItems: "center", justifyContent: "center" }}>
              <Box>
                {inStock && <div sx={{ mb: 1, fontSize: 3 }}>{productFeature.price.formatted}</div>}
                <div sx={{ mb: [0, 3], fontSize: 1, color: inStock ? "secondary" : "tomato" }}>
                  {inStock ? t("shop:in_stock") : t("shop:out_of_stock")}
                </div>
              </Box>
              {inStock && (
                <AddToCart
                  id={id}
                  title={title}
                  price={productFeature.price.value}
                  url={productPath}
                  description={collection.title}
                  image={product.images.images && product.images.images[0].asset.fluid.src}
                />
              )}
            </Grid>
            <Text sx={{ fontSize: 1, mt: 2 }}>
              <Trans i18nKey="shop:free_shipping_message">
                <span sx={{ color: "tomato" }}>Livraison offerte</span> à partir de 10€, en 3 jours chez vous
              </Trans>
            </Text>
            <Divider sx={{ my: 3 }} />
            <Flex sx={{ alignItems: "center", color: "textMuted" }}>
              {t("share_on")} :{" "}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}${productPath}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: "flex" }}
              >
                <FaFacebookSquare size={24} sx={{ ml: 1, color: "light" }} />
              </a>{" "}
              <a
                href={`https://twitter.com/intent/tweet?text=${siteUrl}${productPath}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: "flex" }}
              >
                <FaTwitterSquare size={24} sx={{ ml: 1, color: "light" }} />
              </a>{" "}
              <a
                href={`https://pinterest.com/pin/create/button/?url=${siteUrl}${productPath}&media=&description=`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: "flex" }}
              >
                <FaPinterestSquare size={24} sx={{ ml: 1, color: "light" }} />
              </a>
            </Flex>
          </Box>
        </Box>
      </Grid>
    </article>
  )
}