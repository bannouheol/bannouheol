import React from "react"
import { Layout } from "../../components/Layout"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { Post } from "../../components/Blog/Post"
import { useTranslation } from "react-i18next"
import { toPlainText } from "../../lib/helpers"

const PostPage = ({ data: { post }, errors, ...props }) => {
  const {
    //t,
    i18n: { language },
  } = useTranslation()
  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      {post && (
        <SEO
          title={post.title.translate}
          description={toPlainText(post._rawBody[language])}
          image={post.image.asset.fluid.src}
        />
      )}
      {errors && <GraphQLErrorList errors={errors} />}

      {post && <Post {...post} />}
    </Layout>
  )
}

export const query = graphql`
  fragment postFields on SanityBlogPost {
    id
    publishedAt
    title {
      translate(language: $language)
    }
    image {
      asset {
        fluid(maxWidth: 700) {
          ...GatsbySanityImageFluid
        }
      }
    }
    _rawBody
    categories {
      title {
        translate(language: $language)
      }
      slug {
        translate(language: $language)
      }
    }
  }
  query Post($post: String, $language: String) {
    post: sanityBlogPost(id: { eq: $post }) {
      ...postFields
    }
  }
`

export default PostPage
