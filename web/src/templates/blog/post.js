/** @jsx jsx */
import { jsx, Box } from "theme-ui"
import { Layout } from "../../components/Layout"
import SEO from "../../components/seo"
import { graphql } from "gatsby"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { Post } from "../../components/Blog/Post"
import { Products } from "../../components/Shop/Products"
import { useTranslation } from "react-i18next"
import { toPlainText, translateRaw } from "../../lib/helpers"

const PostPage = ({ data, errors, ...props }) => {
  const {
    //t,
    i18n: { language },
  } = useTranslation()
  const { post } = translateRaw(data, language)
  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      {post && <SEO title={post.title} description={toPlainText(post.body)} image={post.image.asset.fluid.src} />}
      {errors && <GraphQLErrorList errors={errors} />}
      {post && <Post {...post} />}
      {post && post.products && (
        <Box
          sx={{
            maxWidth: 640,
            mx: "auto",
          }}
        >
          <h3>Articles en lien avec cet article :</h3>
          <Products nodes={post.products} />
        </Box>
      )}
    </Layout>
  )
}

export const query = graphql`
  query Post($post: String) {
    post: sanityBlogPost(id: { eq: $post }) {
      ...blogPostFields
      products {
        ...productPreviewFields
      }
    }
  }
`

export default PostPage
