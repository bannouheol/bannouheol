/** @jsx jsx */
import { jsx, Styled, Grid, Box } from "theme-ui"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import PortableText from "../PortableText"
import { Products } from "./Products"
import { useTranslation } from "react-i18next"
import { translateRaw } from "../../lib/helpers"

export const Profile = (data) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const { title, bio, avatar, products } = translateRaw(data, language)
  graphql`
    fragment profileFields on SanityProfile {
      ...profilePreviewFields
      _rawBio
    }
  `
  return (
    <div>
      <Grid gap={2} columns={[1, "1fr 4fr"]}>
        {avatar && (
          <Box sx={{ p: 4 }}>
            <Img fluid={avatar.asset.fluid} sx={{ variant: "images.avatar" }} />
          </Box>
        )}
        <Box>
          <Styled.h1>{title}</Styled.h1>
          {bio && <PortableText blocks={bio} />}
        </Box>
      </Grid>
      <h2>{t("shop:involvement")}</h2>
      {products && products.length > 0 && <Products nodes={products} />}
    </div>
  )
}
