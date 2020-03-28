/** @jsx jsx */

import { jsx, Box } from "theme-ui"
import { graphql } from "gatsby"
import { Link } from "../Link"
import Img from "gatsby-image"
import { useTranslation } from "react-i18next"

export const PersonPreview = ({ title, slug, avatar, showAvatar = true }) => {
  const { t } = useTranslation()

  graphql`
    fragment personPreviewFields on SanityPerson {
      id
      title
      slug {
        current
      }
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
    <Box>
      <Link to={`/${t("shop:person_slug")}/${slug.current}`}>
        {avatar && showAvatar && (
          <Img fluid={avatar.asset.fluid} sx={{ variant: "images.avatar" }} />
        )}
        {title}
      </Link>
    </Box>
  )
}
