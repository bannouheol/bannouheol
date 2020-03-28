/** @jsx jsx */

import { jsx, Text } from "theme-ui"
import { graphql } from "gatsby"
import { ProfilePreview } from "./ProfilePreview"

export const BookFeature = ({
  numberOfPages,
  illustrators,
  authors,
  scriptwriters,
}) => {
  const _ = graphql`
    fragment bookFeatureFields on SanityBookFeature {
      numberOfPages
      illustrators {
        ...profilePreviewFields
      }
      authors {
        ...profilePreviewFields
      }
      scriptwriters {
        ...profilePreviewFields
      }
    }
  `
  return (
    <Text>
      Nombre de pages : {numberOfPages}
      <br />
      Illustrateur(s) : {profilesPreviewer(illustrators)}
      <br />
      Auteur(s) : {profilesPreviewer(authors)}
      <br />
      Scénariste(s) : {profilesPreviewer(scriptwriters)}
    </Text>
  )
}

const profilesPreviewer = (profiles) => {
  return profiles.map((p) => <ProfilePreview {...p} showAvatar={false} />)
}

/*
const profileLinkReducer = (profile) => {
  return profile
    .map((p) => <Link to={`/${p.slug.current}`}>{p.title}</Link>)
    .reduce((acc, el) => {
      return acc === null ? [el] : [...acc, " / ", el]
    }, null)
}
*/
