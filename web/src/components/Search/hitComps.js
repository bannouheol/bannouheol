/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fragment } from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "../Link"
import Img from "gatsby-image"
import { translateRaw } from "../../lib/helpers"

export const ProductHit = (clickHandler, language) => ({ hit }) => {
  const {
    slug: { current: slug },
    collection,
  } = translateRaw(hit, language)
  return (
    <div>
      <Link to={`/${collection.slug.current}/${slug}`} onClick={clickHandler}>
        <h4>
          <Highlight attribute={`_rawTitle.${language}`} hit={hit} tagName="mark" />
        </h4>
      </Link>
      <Img fluid={hit.defaultProductVariant.images[0].asset.fluid} sx={{ variant: "images.card" }} />
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
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
