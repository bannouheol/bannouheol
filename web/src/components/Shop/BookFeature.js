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
  graphql`
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
    <div>
      {numberOfPages && <Text>Nombre de pages : {numberOfPages}</Text>}
      {illustrators && (
        <Text>Illustrateur(s) : {profilesPreviewer(illustrators)}</Text>
      )}
      {authors && <Text>Auteur(s) : {profilesPreviewer(authors)}</Text>}
      {scriptwriters && (
        <Text>Scénariste(s) : {profilesPreviewer(scriptwriters)}</Text>
      )}
    </div>
  )
}

const profilesPreviewer = (profiles) =>
  profiles && profiles.map((p) => <ProfilePreview {...p} showAvatar={false} />)

/*
const profileLinkReducer = (profile) => {
  return profile
    .map((p) => <Link to={`/${p.slug.current}`}>{p.title}</Link>)
    .reduce((acc, el) => {
      return acc === null ? [el] : [...acc, " / ", el]
    }, null)
}
*/
