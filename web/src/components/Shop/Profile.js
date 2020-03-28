/** @jsx jsx */

import React from "react"
import { jsx, Grid } from "theme-ui"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import PortableText from "../PortableText"
import { Products } from "./Products"
import { useTranslation } from "react-i18next"
import { translateRaw } from "../../lib/helpers"

export const Profile = ({ _rawTitle, _rawBio, avatar, products }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const [title, bio] = translateRaw([_rawTitle, _rawBio], language)
  graphql`
    fragment profileFields on SanityProfile {
      ...profilePreviewFields
      _rawBio
    }
  `
  return (
    <>
      <h1>{title}</h1>
      {avatar && (
        <Img fluid={avatar.asset.fluid} sx={{ variant: "images.avatar" }} />
      )}
      {bio && <PortableText blocks={bio} />}
      <h2>{t("shop:involvement")}</h2>
      {products && products.length > 0 && (
        <Grid width={[128, 128, 128]}>
          <Products nodes={products} />
        </Grid>
      )}
    </>
  )
}
