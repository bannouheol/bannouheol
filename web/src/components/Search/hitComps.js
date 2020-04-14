/** @jsx jsx */
import { jsx, Grid, Box, Text } from "theme-ui"
import { Fragment } from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "../Link"
import Img from "gatsby-image"
import { translateRaw } from "../../lib/helpers"

export const ProductHit = (clickHandler, language) => ({ hit }) => {
  const allLanguages = ["br", "fr"]
  const {
    slug: { current: slug },
    collection,
    defaultProductVariant: {
      price: { formatted: price },
    },
  } = translateRaw(hit, language)

  const otherLanguage = allLanguages.filter((lang) => lang !== language)[0]
  const productPath = `/${collection.slug.current}/${slug}`
  const collectionPath = `/${collection.slug.current}`
  return (
    <Grid gap={2} columns={["120px auto"]} m={2}>
      <Box>
        <Link to={productPath} onClick={clickHandler}>
          <Img
            fluid={hit.defaultProductVariant.images[0].asset.fluid}
            sx={{ variant: "images.card", maxWidth: "120px" }}
          />
        </Link>
      </Box>
      <Box sx={{ fontSize: 1 }}>
        <Link to={productPath} onClick={clickHandler}>
          <h4>
            <Highlight attribute={`_rawTitle.${language}`} hit={hit} tagName="mark" />
          </h4>
        </Link>
        <Text>
          <Link to={productPath} onClick={clickHandler}>
            <Highlight attribute={`_rawTitle.${otherLanguage}`} hit={hit} tagName="mark" />
          </Link>
        </Text>
        <Text>
          <Link to={collectionPath} onClick={clickHandler}>
            <Highlight attribute={`collection._rawTitle.${language}`} hit={hit} tagName="mark" />
          </Link>
        </Text>
        <Text>{price}</Text>
      </Box>
    </Grid>
  )
}

export const PostHit = (clickHandler) => ({ hit }) => (
  <div>
    <Link to={`/blog` + hit.slug} onClick={clickHandler}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <div>
      &nbsp;
      <Highlight attribute="date" hit={hit} tagName="mark" />
      &emsp; &nbsp;
      {hit.tags.map((tag, index) => (
        <Fragment key={tag}>
          {index > 0 && `, `}
          {tag}
        </Fragment>
      ))}
    </div>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)
