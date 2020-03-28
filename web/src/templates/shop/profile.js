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

const ProfilePage = ({
  data: { profile, asTraductor, asAuthor, asIllustrator, asScriptwriter },
  errors,
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()

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
  const { _rawTitle, _rawBio } = profile
  const [title, bio] = translateRaw([_rawTitle, _rawBio], language)

  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      <SEO
        title={title || t("Titre inconnu")}
        description={bio && toPlainText(bio)}
        image={profile.avatar && profile.avatar.asset.fluid.src}
      />
      {errors && <GraphQLErrorList errors={errors} />}

      <Profile {...profile} products={productNodes} />
    </Layout>
  )
}

export const query = graphql`
  fragment productFromProfileFields on SanityProduct {
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
      inStock
      price {
        formatted
      }
    }
  }
  query Profile($profile: String, $language: String) {
    profile: sanityProfile(id: { eq: $profile }) {
      ...profileFields
    }
    asTraductor: allSanityProduct(
      filter: { traductors: { elemMatch: { id: { eq: $profile } } } }
      sort: { order: DESC, fields: releaseDate }
    ) {
      edges {
        node {
          ...productFromProfileFields
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
          ...productFromProfileFields
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
          ...productFromProfileFields
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
          ...productFromProfileFields
        }
      }
    }
  }
`

export default ProfilePage
