/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { Layout } from '../../components/Layout'
import SEO from '../../components/SEO'
import { graphql } from 'gatsby'
import { GraphQLErrorList } from '../../components/GraphQLErrorList'
import { Post } from '../../components/Blog/Post'
import { Products } from '../../components/Shop/Products'
import { useTranslation } from 'react-i18next'
import { translateRaw } from '../../lib/helpers'

const PostPage = ({ data, errors, ...props }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('common')
  const { post } = translateRaw(data, language)
  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      {post && (
        <SEO
          title={post.title}
          description={post.excerpt && post.excerpt}
          image={post.image && post.image.asset && post.image.asset.fluid.src}
        />
      )}
      {errors && <GraphQLErrorList errors={errors} />}
      {post && <Post {...post} />}
      {post && post.products && post.products.length > 0 && (
        <Box
          sx={{
            maxWidth: 640,
            mx: 'auto',
          }}
        >
          <h3>{t('blog:linked_products')} :</h3>
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
