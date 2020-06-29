require('dotenv').config({
  path: `.env`,
})
const queries = require('./src/lib/algolia')

function toPlainText(blocks) {
  if (!blocks) {
    return ''
  }
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map((child) => child.text).join('')
    })
    .join('\n\n')
}

module.exports = {
  siteMetadata: {
    title: `Bannoù-heol`,
    url: `https://bannouheol.com`,
    siteUrl: `https://bannouheol.com`,
    description: `Bannoù-heol est une maison d'édition en langue bretonne qui publie des bandes dessinées et des ouvrages pour enfants.`,
    author: `@bannouheol`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-plugin-preact`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_TOKEN,
        watchMode: process.env.NODE_ENV === 'development' ? true : false,
        overlayDrafts: true,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
      },
    },
    {
      resolve: 'gatsby-plugin-snipcartv3',
      options: {
        apiKey: process.env.SNIPCART_APIKEY,
        js: `/snipcart.3.0.15.js`,
        styles: `/snipcart.3.0.15.css`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bannoù-heol`,
        short_name: `bannouheol`,
        start_url: `/`,
        background_color: `#3e92cc`,
        theme_color: `#3e92cc`,
        display: `minimal-ui`,
        icon: `src/assets/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        queries,
        //chunkSize: 1000, // default: 1000
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-nprogress`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-zeit-now`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS,
      },
    },
    {
      resolve: `gatsby-plugin-statickit`,
      options: {
        siteId: process.env.STATICKIT_SITEID,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://bannouheol.com',
        sitemap: 'https://bannouheol.com/sitemap.xml',
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          preview: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-csv-feed',
      options: {
        // Query to pass to all feed serializers (optional)
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
          }
        `,
        // Options to pass to `json2csv` parser for all feeds (optional)
        parserOptions: {},
        // Feeds
        feeds: [
          {
            query: `
            {
              allSanityProduct(sort: {order: [DESC], fields: [releaseDate]}, filter: {slug: {fr: {current: {ne: null}}, br: {current: {ne: null}}}}) {
                edges {
                  node {
                    id
                    slug {
                      fr {
                        current
                      }
                    }
                    title {
                      fr
                      br
                    }
                    _rawBody
                    vendor {
                      title
                    }
                    defaultProductVariant {
                      images {
                        asset {
                          fluid {
                            src
                          }
                        }
                      }
                      inStock
                      resupplyingDate
                      price {
                        value
                      }
                    }
                    collection {
                      id
                      slug {
                        fr {
                          current
                        }
                      }
                      title {
                        br
                        fr
                      }
                    }
                  }
                }
              }
            }                                   
            `,
            serialize: ({ query: { site, allSanityProduct } }) => {
              return allSanityProduct.edges.map((edge) => {
                const {
                  id,
                  slug: {
                    fr: { current: slug },
                  },
                  vendor: { title: brand },
                  title,
                  defaultProductVariant: {
                    images,
                    inStock,
                    resupplyingDate,
                    price: { value: priceValue },
                  },
                  collection: {
                    id: { item_group_id },
                    slug: {
                      fr: { current: collectionSlug },
                    },
                    title: collectionTitle,
                  },
                } = edge.node
                const image_link = images && images[0] && images[0].asset && images[0].asset.fluid.src
                const availability = inStock ? 'in stock' : resupplyingDate ? 'available for order' : 'discontinued'
                const link = `${site.siteMetadata.siteUrl}/fr/${collectionSlug}/${slug}`
                const collection =
                  collectionTitle.fr === collectionTitle.br
                    ? collectionTitle.fr
                    : `${collectionTitle.fr} / ${collectionTitle.br}`
                const description = `Titre en breton : ${title.br} - Collection : ${collection}`
                const price = priceValue + ' EUR'
                return {
                  id,
                  brand,
                  title: title.fr,
                  image_link,
                  price,
                  condition: 'new',
                  availability,
                  inventory: 5,
                  link,
                  description,
                  item_group_id,
                }
              })
            },
            output: '/facebook-product-feed.csv',
            // Options to pass to `json2csv` parser for this feed (optional)
            parserOptions: {},
          },
        ],
      },
    },
  ],
}
