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
      {numberOfPages && `Nombre de pages : ${numberOfPages}<br />`}
      {illustrators &&
        `Illustrateur(s) : ${profilesPreviewer(illustrators)}<br />`}
      {authors && `Auteur(s) : ${profilesPreviewer(authors)}<br />`}
      {scriptwriters && `Scénariste(s) : ${profilesPreviewer(scriptwriters)}`}
    </Text>
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
