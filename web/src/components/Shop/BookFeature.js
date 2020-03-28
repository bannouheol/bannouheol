/** @jsx jsx */

import { jsx, Text } from "theme-ui"
import { graphql } from "gatsby"
import { Link } from "../Link"
import { PersonPreview } from "./PersonPreview"

export const BookFeature = ({
  numberOfPages,
  illustrator,
  author,
  scenario,
}) => {
  const _ = graphql`
    fragment bookFeatureFields on SanityBookFeature {
      numberOfPages
      illustrator {
        ...personPreviewFields
      }
      author {
        ...personPreviewFields
      }
      scenario {
        ...personPreviewFields
      }
    }
  `
  return (
    <Text>
      Nombre de pages : {numberOfPages}
      <br />
      Illustrateur(s) : {personsPreviewer(illustrator)}
      <br />
      Auteur(s) : {personsPreviewer(author)}
      <br />
      Scenario : {personsPreviewer(scenario)}
    </Text>
  )
}

const personsPreviewer = (persons) => {
  return persons.map((p) => <PersonPreview {...p} showAvatar={false} />)
}

/*
const personsLinkReducer = (person) => {
  return person
    .map((p) => <Link to={`/${p.slug.current}`}>{p.title}</Link>)
    .reduce((acc, el) => {
      return acc === null ? [el] : [...acc, " / ", el]
    }, null)
}
*/
