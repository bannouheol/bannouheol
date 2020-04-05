/** @jsx jsx */

import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { Link } from "../Link"
import Img from "gatsby-image"
import { useTranslation } from "react-i18next"
import { translateRaw } from "../../lib/helpers"

export const ProfilePreview = ({ _rawTitle, _rawSlug, avatar, showAvatar = true }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("common")

  const [title, slug] = translateRaw([_rawTitle, _rawSlug], language)

  graphql`
    fragment profilePreviewFields on SanityProfile {
      id
      _rawTitle
      _rawSlug
      avatar {
        asset {
          fluid(maxWidth: 300) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  `

  return (
    <Link to={`/${t("shop:profile_slug")}/${slug.current}`}>
      {avatar && showAvatar && <Img fluid={avatar.asset.fluid} sx={{ variant: "images.avatar" }} />}
      {title}
    </Link>
  )
}
