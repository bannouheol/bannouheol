import React from "react"
import { Layout } from "../../components/Layout"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { Post } from "../../components/Blog/Post"
//import { useTranslation } from "react-i18next"
import { toPlainText } from "../../lib/helpers"

const PostPage = ({ data: { post }, errors, ...props }) => {
  /*const {
    t,
    i18n: { language },
  } = useTranslation()*/
  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      {post && <SEO title={post.title} description={toPlainText(post.body)} image={post.image.asset.fluid.src} />}
      {errors && <GraphQLErrorList errors={errors} />}

      {post && <Post {...post} />}
    </Layout>
  )
}

export const query = graphql`
  query Post($post: String) {
    post: sanityBlogPost(id: { eq: $post }) {
      ...blogPostFields
    }
  }
`

export default PostPage
