/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql } from "gatsby"
import { Layout } from "../../components/Layout"
import { useTranslation } from "react-i18next"
import { mapEdgesToNodes, translateRaw } from "../../lib/helpers"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { Posts } from "../../components/Blog/Posts"

const ArchivePage = ({ data, errors, ...props }) => {
  const {
    //t,
    i18n: { language },
  } = useTranslation("common")
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)
  const { title } = translateRaw(data.category, language)
  return (
    <Layout {...props}>
      <Styled.h1>{(props.pageContext.category && title) || "Blog"}</Styled.h1>
      {postNodes && postNodes.length > 0 && <Posts nodes={postNodes} />}
    </Layout>
  )
}

export const query = graphql`
  query ArchivePageQuery($category: String) {
    category: sanityBlogCategory(id: { eq: $category }) {
      ...blogCategoryFields
    }
    posts: allSanityBlogPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { publishedAt: { ne: null }, categories: { elemMatch: { id: { eq: $category } } } }
    ) {
      edges {
        node {
          ...blogPostFields
        }
      }
    }
  }
`

export default ArchivePage
