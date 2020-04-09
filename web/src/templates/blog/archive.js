/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql } from "gatsby"
import { Layout } from "../../components/Layout"
//import { useTranslation } from "react-i18next"
import { mapEdgesToNodes } from "../../lib/helpers"
import { GraphQLErrorList } from "../../components/GraphQLErrorList"
import { Posts } from "../../components/Blog/Posts"

const ArchivePage = ({ data, errors, ...props }) => {
  //const { t } = useTranslation("common")
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)
  return (
    <Layout {...props}>
      <Styled.h1>{(props.pageContext.category && data.category.title.translate) || "Blog"}</Styled.h1>
      {postNodes && postNodes.length > 0 && <Posts nodes={postNodes} />}
    </Layout>
  )
}

export const query = graphql`
  fragment blogCategoryFields on SanityBlogCategory {
    title {
      translate(language: $language)
    }
  }
  query ArchivePageQuery($category: String, $language: String) {
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
