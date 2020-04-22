const productQuery = `
{
    products: allSanityProduct {
      edges {
        node {
          objectID: id
          _rawTitle
          _rawSlug
          reference: ref
          collection {
            _rawTitle
            _rawSlug
          }
          defaultProductVariant {
            images {
              asset {
                fixed(width: 120) {
                  width
                  height
                  aspectRatio
                  base64
                  src
                  srcWebp
                  srcSet
                  srcSetWebp
                }
              }
            }
            price {
              formatted
              value
            }
          }
        }
      }
    }
  }  
`
const blogPostQuery = `
{
    blogPosts: allSanityBlogPost {
      edges {
        node {
          objectID: id
          publishedAt
          _rawSlug
          _rawTitle
          _rawExcerpt
          _rawBody
          postLanguages: language
          image {
            asset {
              fluid(maxWidth: 240) {
                sizes
                aspectRatio
                base64
                src
                srcWebp
                srcSet
                srcSetWebp
              }
            }
          }
          categories {
            id
            _rawTitle
            _rawSlug
          }
        }
      }
    }
}`

const profileQuery = `
{
    profiles: allSanityProfile {
      edges {
        node {
          objectID: id
          _rawTitle
          _rawSlug
          avatar {
            asset {
              fluid(maxWidth: 240) {
                sizes
                aspectRatio
                base64
                src
                srcWebp
                srcSet
                srcSetWebp
              }
            }
          }
        }
      }
    }
  }
  
`
const flatten = (arr) =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }
const queries = [
  {
    query: productQuery,
    transformer: ({ data }) => flatten(data.products.edges),
    indexName: `Products`,
    settings,
  },
  {
    query: blogPostQuery,
    transformer: ({ data }) => flatten(data.blogPosts.edges),
    indexName: `BlogPosts`,
    settings,
  },
  {
    query: profileQuery,
    transformer: ({ data }) => flatten(data.profiles.edges),
    indexName: `Profiles`,
    settings,
  },
]
module.exports = queries
