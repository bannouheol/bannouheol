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
      {illustrators && illustrators.length > 0 && (
        <Text>Illustrateur(s) : {profilesPreviewer(illustrators)}</Text>
      )}
      {authors && authors.length > 0 && (
        <Text>Auteur(s) : {profilesPreviewer(authors)}</Text>
      )}
      {scriptwriters && scriptwriters.length > 0 && (
        <Text>Scénariste(s) : {profilesPreviewer(scriptwriters)}</Text>
      )}
    </div>
  )
}

const profilesPreviewer = (profiles) =>
  profiles &&
  profiles
    .map((p) => <ProfilePreview key={p.id} {...p} showAvatar={false} />)
    .reduce((acc, el) => {
      return acc === null ? [el] : [...acc, ", ", el]
    }, null)

/*
const profileLinkReducer = (profile) => {
  return profile
    .map((p) => <Link to={`/${p.slug.current}`}>{p.title}</Link>)
    .reduce((acc, el) => {
      return acc === null ? [el] : [...acc, " / ", el]
    }, null)
}
*/
