import React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/Layout"
import { useTranslation } from "react-i18next"
import { mapEdgesToNodes } from "../lib/helpers"
import { GraphQLErrorList } from "../components/GraphQLErrorList"
import { Posts } from "../components/Blog/Posts"
import PortableText from "../components/PortableText"
import { translateRaw } from "../lib/helpers"

const IndexPage = ({ data, errors, ...props }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("common")
  if (errors) {
    return (
      <Layout {...props}>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const { homePage } = translateRaw(data, language)
  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)
  return (
    <Layout {...props}>
      {homePage.content && <PortableText blocks={homePage.content} />}
      <h2>{t(`Derniers posts`)}</h2>
      {postNodes && postNodes.length > 0 && <Posts nodes={postNodes} />}
      <h2>{t(`Derniers produits`)}</h2>
    </Layout>
  )
}

export const query = graphql`
  query IndexPageQuery($language: String) {
    homePage: sanityPage(id: { eq: "2d680e01-f5d6-5dbc-889b-fcc595cbe961" }) {
      _rawTitle
      _rawContent
    }
    posts: allSanityBlogPost(sort: { fields: [publishedAt], order: DESC }, filter: { publishedAt: { ne: null } }) {
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
            id
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
