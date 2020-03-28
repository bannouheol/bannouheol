/** @jsx jsx */

import React from "react"
import { jsx, Grid } from "theme-ui"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import PortableText from "../PortableText"
import { Products } from "./Products"
import { useTranslation } from "react-i18next"

export const Person = ({ title, slug, _rawBio, avatar, products }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  graphql`
    fragment personFields on SanityPerson {
      ...personPreviewFields
      _rawBio
    }
  `
  return (
    <>
      <h1>{title}</h1>
      {avatar && (
        <Img fluid={avatar.asset.fluid} sx={{ variant: "images.avatar" }} />
      )}
      {_rawBio && _rawBio[language] && (
        <PortableText blocks={_rawBio[language]} />
      )}
      <h2>{t("shop:involvement")}</h2>
      {products && products.length > 0 && (
        <Grid width={[128, 128, 128]}>
          <Products nodes={products} showPrice={false} />
        </Grid>
      )}
    </>
  )
}
