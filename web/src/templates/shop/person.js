/** @jsx jsx */

import { jsx } from "theme-ui"
import { Layout } from "../../components/Layout"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { toPlainText } from "../../lib/helpers"
import { useTranslation } from "react-i18next"
import { mapEdgesToNodes } from "../../lib/helpers"
import { Person } from "../../components/Shop/Person"

import uniqBy from "lodash/uniqBy"

const PersonPage = ({
  data: { person, asTraductor, asAuthor, asIllustrator, asScenario },
  errors,
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const asTraductorProductNodes = mapEdgesToNodes(asTraductor)
  const asAuthorProductNodes = mapEdgesToNodes(asAuthor)
  const asIllustratorProductNodes = mapEdgesToNodes(asIllustrator)
  const asScenarioProductNodes = mapEdgesToNodes(asScenario)
  const productNodes = uniqBy(
    [
      ...asTraductorProductNodes,
      ...asAuthorProductNodes,
      ...asIllustratorProductNodes,
      ...asScenarioProductNodes,
    ],
    "id"
  )

  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      <SEO
        title={person.title || t("Titre inconnu")}
        description={
          person._rawBio &&
          person._rawBio[language] &&
          toPlainText(person._rawBio[language])
        }
        image={person.avatar && person.avatar.asset.fluid.src}
      />
      {errors && <GraphQLErrorList errors={errors} />}

      <Person {...person} products={productNodes} />
    </Layout>
  )
}

export const query = graphql`
  fragment productFromPersonFields on SanityProduct {
    id
    title {
      translate(language: $language)
    }
    slug {
      translate(language: $language)
    }
    collection {
      title {
        translate(language: $language)
      }
      slug {
        translate(language: $language)
      }
    }
    defaultProductVariant {
      images {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
  query Person($person: String, $language: String) {
    person: sanityPerson(id: { eq: $person }) {
      ...personFields
    }
    asTraductor: allSanityProduct(
      filter: { traductor: { elemMatch: { id: { eq: $person } } } }
    ) {
      edges {
        node {
          ...productFromPersonFields
        }
      }
    }
    asAuthor: allSanityProduct(
      filter: {
        bookFeature: { author: { elemMatch: { id: { eq: $person } } } }
      }
    ) {
      edges {
        node {
          ...productFromPersonFields
        }
      }
    }
    asIllustrator: allSanityProduct(
      filter: {
        bookFeature: { illustrator: { elemMatch: { id: { eq: $person } } } }
      }
    ) {
      edges {
        node {
          ...productFromPersonFields
        }
      }
    }
    asScenario: allSanityProduct(
      filter: {
        bookFeature: { scenario: { elemMatch: { id: { eq: $person } } } }
      }
    ) {
      edges {
        node {
          ...productFromPersonFields
        }
      }
    }
  }
`

export default PersonPage
