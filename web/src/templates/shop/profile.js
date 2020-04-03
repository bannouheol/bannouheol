/** @jsx jsx */

import { jsx } from "theme-ui"
import { Layout } from "../../components/Layout"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { useTranslation } from "react-i18next"
import { Profile } from "../../components/Shop/Profile"
import { mapEdgesToNodes, toPlainText, translateRaw } from "../../lib/helpers"

import uniqBy from "lodash/uniqBy"

const ProfilePage = ({ data, errors, ...props }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const {
    profile,
    asTraductor,
    asAuthor,
    asIllustrator,
    asScriptwriter,
  } = translateRaw(data, language)

  const asTraductorProductNodes = mapEdgesToNodes(asTraductor)
  const asAuthorProductNodes = mapEdgesToNodes(asAuthor)
  const asIllustratorProductNodes = mapEdgesToNodes(asIllustrator)
  const asScriptwriterProductNodes = mapEdgesToNodes(asScriptwriter)
  const productNodes = uniqBy(
    [
      ...asTraductorProductNodes,
      ...asAuthorProductNodes,
      ...asIllustratorProductNodes,
      ...asScriptwriterProductNodes,
    ],
    "id"
  )

  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      <SEO
        title={profile.title || t("Titre inconnu")}
        description={profile.bio && toPlainText(profile.bio)}
        image={profile.avatar && profile.avatar.asset.fluid.src}
      />
      {errors && <GraphQLErrorList errors={errors} />}

      <Profile {...profile} products={productNodes} />
    </Layout>
  )
}

export const query = graphql`
  query Profile($profile: String) {
    profile: sanityProfile(id: { eq: $profile }) {
      ...profileFields
    }
    asTraductor: allSanityProduct(
      filter: { traductors: { elemMatch: { id: { eq: $profile } } } }
      sort: { order: DESC, fields: releaseDate }
    ) {
      edges {
        node {
          ...productPreviewFields
        }
      }
    }
    asAuthor: allSanityProduct(
      filter: {
        bookFeature: { authors: { elemMatch: { id: { eq: $profile } } } }
      }
      sort: { order: DESC, fields: releaseDate }
    ) {
      edges {
        node {
          ...productPreviewFields
        }
      }
    }
    asIllustrator: allSanityProduct(
      filter: {
        bookFeature: { illustrators: { elemMatch: { id: { eq: $profile } } } }
      }
      sort: { order: DESC, fields: releaseDate }
    ) {
      edges {
        node {
          ...productPreviewFields
        }
      }
    }
    asScriptwriter: allSanityProduct(
      filter: {
        bookFeature: { scriptwriters: { elemMatch: { id: { eq: $profile } } } }
      }
      sort: { order: DESC, fields: releaseDate }
    ) {
      edges {
        node {
          ...productPreviewFields
        }
      }
    }
  }
`

export default ProfilePage
