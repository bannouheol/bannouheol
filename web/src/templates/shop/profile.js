/** @jsx jsx */
import { jsx, Styled, Box } from "theme-ui"
import React from "react"
import { Layout } from "../../components/Layout"
import SEO from "../../components/SEO"
import { graphql } from "gatsby"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { useTranslation } from "react-i18next"
import { Profile } from "../../components/Shop/Profile"
import { mapEdgesToNodes, toPlainText, translateRaw } from "../../lib/helpers"
import { Posts } from "../../components/Blog/Posts"
import { Products } from "../../components/Shop/Products"

import uniqBy from "lodash/uniqBy"

const ProfilePage = ({ data, errors, ...props }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const { profile, asTraductor, asAuthor, asIllustrator, asScriptwriter, asBlogFeatured } = translateRaw(data, language)

  const asTraductorProductNodes = mapEdgesToNodes(asTraductor)
  const asAuthorProductNodes = mapEdgesToNodes(asAuthor)
  const asIllustratorProductNodes = mapEdgesToNodes(asIllustrator)
  const asScriptwriterProductNodes = mapEdgesToNodes(asScriptwriter)
  const products = uniqBy(
    [...asTraductorProductNodes, ...asAuthorProductNodes, ...asIllustratorProductNodes, ...asScriptwriterProductNodes],
    "id"
  )
  const blogPosts = mapEdgesToNodes(asBlogFeatured)

  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      <SEO
        title={profile.title || t("Titre inconnu")}
        description={profile.bio && toPlainText(profile.bio)}
        image={profile.avatar && profile.avatar.asset.fluid.src}
      />
      {errors && <GraphQLErrorList errors={errors} />}

      <Profile {...profile} />
      {products && products.length > 0 && (
        <React.Fragment>
          <Styled.h2>{t("shop:involvement")}</Styled.h2>
          <Products nodes={products} />
        </React.Fragment>
      )}
      {blogPosts && blogPosts.length > 0 && (
        <Box mt={3}>
          <Styled.h4>Sur le blog</Styled.h4>
          <Posts nodes={blogPosts} />
        </Box>
      )}
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
      filter: { bookFeature: { authors: { elemMatch: { id: { eq: $profile } } } } }
      sort: { order: DESC, fields: releaseDate }
    ) {
      edges {
        node {
          ...productPreviewFields
        }
      }
    }
    asIllustrator: allSanityProduct(
      filter: { bookFeature: { illustrators: { elemMatch: { id: { eq: $profile } } } } }
      sort: { order: DESC, fields: releaseDate }
    ) {
      edges {
        node {
          ...productPreviewFields
        }
      }
    }
    asScriptwriter: allSanityProduct(
      filter: { bookFeature: { scriptwriters: { elemMatch: { id: { eq: $profile } } } } }
      sort: { order: DESC, fields: releaseDate }
    ) {
      edges {
        node {
          ...productPreviewFields
        }
      }
    }
    asBlogFeatured: allSanityBlogPost(
      filter: { featuredProfiles: { elemMatch: { id: { eq: $profile } } } }
      sort: { order: DESC, fields: publishedAt }
    ) {
      edges {
        node {
          ...blogPostPreviewFields
        }
      }
    }
  }
`

export default ProfilePage
