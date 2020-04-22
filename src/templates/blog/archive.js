/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import { Layout } from '../../components/Layout'
import { useTranslation } from 'react-i18next'
import { mapEdgesToNodes, translateRaw } from '../../lib/helpers'
import { GraphQLErrorList } from '../../components/GraphQLErrorList'
import { Posts } from '../../components/Blog/Posts'
import { Link } from '../../components/Link'
import { Helmet } from 'react-helmet'

const ArchivePage = ({ data, errors, ...props }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('common')
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)

  const {
    title,
    slug: { current: slug },
  } = translateRaw(data.category, language)

  // Pagination
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const basePath = `/${t('blog:slug')}/${props.pageContext.category ? `${slug}/` : ''}`
  const prevPage = basePath + (currentPage - 1 === 1 ? '' : (currentPage - 1).toString())
  const nextPage = basePath + (currentPage + 1).toString()
  return (
    <Layout {...props}>
      <Helmet>
        {!isFirst && <link rel="prev" href={`/${language}${prevPage}`} />}
        {!isLast && <link rel="next" href={`/${language}${nextPage}`} />}
      </Helmet>
      <Styled.h1>{(props.pageContext.category && title) || 'Blog'}</Styled.h1>
      {postNodes && postNodes.length > 0 && <Posts nodes={postNodes} />}
      <ul
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          listStyle: 'none',
        }}
      >
        {!isFirst && (
          <Link to={prevPage} rel="prev" sx={{ pr: 3 }}>
            ← {t('blog:previous_page')}
          </Link>
        )}
        {numPages > 1 &&
          Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              style={{
                m: 3,
              }}
            >
              <Link
                to={`${basePath}${i === 0 ? `` : `/${i + 1}`}`}
                sx={{
                  textDecoration: 'none',
                  color: i + 1 === currentPage ? '#ffffff' : '',
                  background: i + 1 === currentPage ? '#007acc' : '',
                  p: 2,
                }}
              >
                {i + 1}
              </Link>
            </li>
          ))}
        {!isLast && (
          <Link to={nextPage} rel="next">
            {t('blog:next_page')} →
          </Link>
        )}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query ArchivePageQuery($category: String, $skip: Int!, $limit: Int!) {
    category: sanityBlogCategory(id: { eq: $category }) {
      ...blogCategoryFields
    }
    posts: allSanityBlogPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { publishedAt: { ne: null }, categories: { elemMatch: { id: { eq: $category } } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...blogPostPreviewFields
        }
      }
    }
  }
`

export default ArchivePage
