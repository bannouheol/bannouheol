import React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/Layout"
import { useTranslation } from "react-i18next"
import { mapEdgesToNodes } from "../lib/helpers"
import { GraphQLErrorList } from "../components/GraphQLErrorList"
import { Posts } from "../components/Blog/Posts"

const IndexPage = (props) => {
  const { t } = useTranslation("common")
  const { data, errors } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)
  return (
    <Layout alternateLink={props.alternateLinks}>
      <h2>{t(`Derniers posts`)}</h2>
      {postNodes && postNodes.length > 0 && <Posts nodes={postNodes} />}
      <h2>{t(`Derniers produits`)}</h2>
    </Layout>
  )
}

export const query = graphql`
  query IndexPageQuery($language: String) {
    posts: allSanityBlogPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          slug {
            translate(language: $language)
          }
          title {
            translate(language: $language)
          }
          image {
            asset {
              fluid(maxWidth: 256) {
                ...GatsbySanityImageFluid
              }
            }
          }
          categories {
            slug {
              translate(language: $language)
            }
            title {
              translate(language: $language)
            }
          }
        }
      }
    }
  }
`

export default IndexPage
