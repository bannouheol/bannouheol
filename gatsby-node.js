/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs')
const path = require('path')
const i18next = require('i18next')
const nodeFsBackend = require('i18next-node-fs-backend')
const currency = require('currency.js')

const allLanguages = ['br', 'fr']

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)
const srcPath = resolveApp('src')
const redirectInBrowser = false

/* TEMPLATES */
const templates = {
  baseDir: `src/templates`,
  home: `index.js`,
  page: `page.js`,
  error: `404.js`,
  blog: {
    post: `blog/post.js`,
    archive: `blog/archive.js`,
  },
  shop: {
    product: `shop/product.js`,
    category: `shop/category.js`,
    collection: `shop/collection.js`,
    profile: `shop/profile.js`,
  },
}

const postsPerPage = 14

const namespaces = ['common', 'blog', 'shop']

exports.createPages = async ({ graphql, actions: { createPage, createRedirect }, reporter }) => {
  const startupQuery = await graphql(
    `
      query startupQuery {
        pages: allSanityPage(filter: { createPage: { eq: true } }) {
          edges {
            node {
              id
              _rawSlug
            }
          }
        }
        blogPosts: allSanityBlogPost(
          sort: { fields: [publishedAt], order: DESC }
          filter: { publishedAt: { ne: null } }
        ) {
          edges {
            node {
              id
              _rawSlug
              postLanguage: language
              previousPath
            }
          }
        }
        blogCategories: allSanityBlogCategory {
          edges {
            node {
              id
              _rawSlug
            }
          }
        }
        products: allSanityProduct {
          edges {
            node {
              id
              _rawSlug
              previousPath
              collection {
                id
                _rawSlug
              }
            }
          }
        }
        categories: allSanityCategory {
          edges {
            node {
              id
              _rawSlug
              parent: parentCategory {
                id
                _rawSlug
              }
            }
          }
        }
        collections: allSanityCollection {
          edges {
            node {
              id
              _rawSlug
            }
          }
        }
        profiles: allSanityProfile {
          edges {
            node {
              id
              _rawSlug
            }
          }
        }
      }
    `
  )
  const { pages, blogCategories, blogPosts, products, categories, collections, profiles } = startupQuery.data

  /* HOME PAGE */
  await buildI18nPages(
    null,
    (_, language) => ({
      path: `/${language}`, // (1)
      component: path.resolve(path.join(templates.baseDir, templates.home)),
      context: {},
    }),
    namespaces,
    createPage,
    createRedirect
  )

  /* PAGES */
  await buildI18nPages(
    pages.edges,
    ({ node }, language, i18n) => ({
      path: `/${language}/${node._rawSlug[language].current}`,
      component: path.resolve(path.join(templates.baseDir, templates.page)),
      context: { page: node.id },
    }),
    namespaces,
    createPage,
    createRedirect
  )

  /* BLOG PAGES */
  const numPages = Math.ceil(blogPosts.edges.length / postsPerPage)
  Array.from({ length: numPages }).forEach(async (_, i) => {
    await buildI18nPages(
      null,
      (_, language, i18n) => {
        const blogPagePath = `/${language}/${i18n.t('blog:slug')}${i > 0 ? `/${i + 1}` : ``}`
        reporter.info(`Creating blog page: ${blogPagePath}`)
        return {
          path: blogPagePath, // (1)
          component: path.resolve(path.join(templates.baseDir, templates.blog.archive)),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
          },
        }
      },
      namespaces,
      createPage,
      createRedirect
    )
  })

  /* BLOG CATEGORIES */
  blogCategories.edges.map(async ({ node: { id, _rawSlug } }) => {
    categoryQuery = await graphql(`{
      blogCategoriesPosts: allSanityBlogPost(filter: {publishedAt: {ne: null} categories: {elemMatch: {id: {eq: "${id.toString()}"}}}}) {
        edges {
          node {
            id
          }
        }
      }
    }
    `)
    const { blogCategoriesPosts } = categoryQuery.data
    const numPages = Math.ceil(blogCategoriesPosts.edges.length / postsPerPage)
    Array.from({ length: numPages }).forEach(async (_, i) => {
      await buildI18nPages(
        null,
        (_, language, i18n) => {
          const blogCategoryPath = `/${language}/${i18n.t('blog:slug')}/${_rawSlug[language].current}${
            i > 0 ? `/${i + 1}` : ``
          }`
          reporter.info(`Creating blog page: ${blogCategoryPath}`)
          return {
            path: blogCategoryPath,
            component: path.resolve(path.join(templates.baseDir, templates.blog.archive)),
            context: {
              category: id,
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
            },
          }
        },
        namespaces,
        createPage,
        createRedirect
      )
    })
  })

  /* BLOG POSTS */
  await buildI18nPosts(
    blogPosts.edges,
    ({ node }, language, _) => {
      //const dateSegment = format(parseISO(node.publishedAt), "yyyy/MM/dd")
      //const postPath = `/${language}/${dateSegment}/${node._rawSlug[language].current}`
      const postPath = `/${language}/${node._rawSlug[language].current}`
      reporter.info(`Creating blog post page: ${postPath}`)
      return {
        path: postPath,
        previousPath: node.previousPath && `/${node.previousPath}`,
        component: path.resolve(path.join(templates.baseDir, templates.blog.post)),
        context: { post: node.id },
      }
    },
    namespaces,
    createPage,
    createRedirect
  )

  /* PRODUCTS */
  await buildI18nPages(
    products.edges,
    ({ node }, language, _) => {
      const productPath = `/${language}/${node.collection._rawSlug[language].current}/${node._rawSlug[language].current}`
      reporter.info(`Creating product page: ${productPath}`)
      return {
        path: productPath,
        previousPath: node.previousPath && `/${node.previousPath}`,
        component: path.resolve(path.join(templates.baseDir, templates.shop.product)),
        context: { product: node.id, collection: node.collection.id },
      }
    },
    namespaces,
    createPage,
    createRedirect
  )

  /* CATEGORIES */
  await buildI18nPages(
    categories.edges,
    ({ node }, language, _) => {
      const productCategoryPath = `/${language}/${path.join(
        node.parent === null ? `` : node.parent._rawSlug[language].current,
        node._rawSlug[language].current
      )}`
      reporter.info(`Creating product category page: ${productCategoryPath}`)
      return {
        path: productCategoryPath,
        component: path.resolve(path.join(templates.baseDir, templates.shop.category)),
        context: { category: node.id },
      }
    },
    namespaces,
    createPage,
    createRedirect
  )

  /* COLLECTIONS */
  await buildI18nPages(
    collections.edges,
    ({ node }, language, _) => ({
      path: `/${language}/${node._rawSlug[language].current}`,
      component: path.resolve(path.join(templates.baseDir, templates.shop.collection)),
      context: { collection: node.id },
    }),
    namespaces,
    createPage,
    createRedirect
  )

  /* PROFILES */
  await buildI18nPages(
    profiles.edges,
    ({ node }, language, i18n) => ({
      path: `/${language}/${i18n.t('shop:profile_slug')}/${node._rawSlug[language].current}`,
      component: path.resolve(path.join(templates.baseDir, templates.shop.profile)),
      context: { profile: node.id },
    }),
    namespaces,
    createPage,
    createRedirect
  )

  await build404Pages(createPage)

  createRedirect({
    fromPath: '/',
    toPath: '/fr/',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/catalogue/',
    toPath: '/fr/',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/presse/',
    toPath: '/fr/blog',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/Furchal',
    toPath: '/fr/kididoc',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/Olivu',
    toPath: '/fr/olivu',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/Arzhig+Du',
    toPath: '/fr/petit-ours-brun',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/arzhig-du-petit-ours-brun-c9',
    toPath: '/fr/petit-ours-brun',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/Thorgal',
    toPath: '/fr/thorgal',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/thorgal-c7',
    toPath: '/fr/thorgal',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/contacts',
    toPath: '/fr/contact',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/Leo+ha+Popi',
    toPath: '/fr/leo-et-popi',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/Boulig+&+Billig',
    toPath: '/fr/boule-et-bill',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/boulig-billig-boule-bill-c6',
    toPath: '/fr/boule-et-bill',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/Tom-Tom+ha+Nana',
    toPath: '/fr/tom-tom-ha-nana',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/Titeuf',
    toPath: '/fr/titeuf',
    isPermanent: true,
    redirectInBrowser,
  })

  createRedirect({
    fromPath: '/bannou-treset-bandes-dessinees-c1',
    toPath: '/fr/bandes-dessinees',
    isPermanent: true,
    redirectInBrowser,
  })

  allLanguages.forEach((language) =>
    createRedirect({
      fromPath: `/${language}/*`,
      toPath: `/${language}/404`,
      statusCode: 404,
    })
  )
  createRedirect({ fromPath: '/*', toPath: '/fr/404', statusCode: 404 })
}

const buildI18nPages = async (inputData, pageDefinitionCallback, namespaces, createPage, createRedirect) => {
  if (!Array.isArray(inputData)) inputData = [inputData]
  await Promise.all(
    inputData.map(async (ipt) => {
      const definitions = await Promise.all(
        allLanguages.map(async (language) => {
          const i18n = await createI18nextInstance(language, namespaces) // (1)
          const res = pageDefinitionCallback(ipt, language, i18n) // (2)
          res.context.language = language
          res.context.i18nResources = i18n.services.resourceStore.data // (3)
          return res
        })
      )

      definitions.map((d) => {
        d.previousPath &&
          d.context.language === 'fr' &&
          createRedirect({
            fromPath: d.previousPath,
            toPath: d.path,
            isPermanent: true,
            redirectInBrowser,
          })
      })

      const alternateLinks = definitions.map((d) => ({
        // (4)
        language: d.context.language,
        path: d.path,
      }))

      definitions.forEach((d) => {
        d.context.alternateLinks = alternateLinks
        d.context.canonicalUrl = d.path
        createPage(d) // (5)
      })
    })
  )
}

const buildI18nPosts = async (inputData, pageDefinitionCallback, namespaces, createPage, createRedirect) => {
  if (!Array.isArray(inputData)) inputData = [inputData]
  await Promise.all(
    inputData.map(async (ipt) => {
      const definitions = await Promise.all(
        allLanguages.map(async (lang) => {
          const i18n = await createI18nextInstance(lang, namespaces) // (1)
          const res = pageDefinitionCallback(ipt, lang, i18n) // (2)
          res.context.language = lang
          res.context.i18nResources = i18n.services.resourceStore.data // (3)
          res.context.availableLanguages = ipt.node.postLanguage
          return res
        })
      )

      definitions.map((d) => {
        if (d.previousPath && d.context.availableLanguages) {
          if (d.context.availableLanguages.length > 1 && d.context.language === 'fr') {
            // If both BR and FR posts exits, create only 1 redirection for the FR post.
            createRedirect({
              fromPath: d.previousPath,
              toPath: d.path,
              isPermanent: true,
              redirectInBrowser,
            })
          } else if (d.context.availableLanguages[0] == d.context.language) {
            // Only 1 language available, create the redirection for whatever lang it is
            createRedirect({
              fromPath: d.previousPath,
              toPath: d.path,
              isPermanent: true,
              redirectInBrowser,
            })
          }
        }
      })

      const alternateLinks = definitions.map((d) => ({
        // (4)
        language: d.context.language,
        path: d.path,
      }))

      // CANONICAL
      definitions.forEach((d) => {
        d.context.alternateLinks = alternateLinks
        if (d.context.availableLanguages.length == 1 && d.context.language !== d.context.availableLanguages[0]) {
          // Only available in 1 language, but the context language is not the only available language
          // let's make a canonical to the only available language
          const canonicalUrl = '/' + d.context.availableLanguages[0] + d.path.substring(3)
          console.info(`Only 1 language available for ${d.path}, making a canonical URL to ${canonicalUrl}`)
          d.context.canonicalUrl = canonicalUrl
        } else {
          d.context.canonicalUrl = d.path
        }
        createPage(d) // (5)
      })
    })
  )
}

const build404Pages = async (createPage) => {
  await Promise.all(
    allLanguages.map(async (language, index) => {
      const i18n = await createI18nextInstance(language, ['common', 404])
      const res = {
        path: '/' + language + '/404',
        component: path.resolve(path.join(templates.baseDir, templates.error)),
        context: {},
      }
      res.context.language = language
      res.context.i18nResources = i18n.services.resourceStore.data
      createPage(res)
      if (index === 0) {
        res.path = '/404'
        createPage(res)
      }
    })
  )
}

const createI18nextInstance = async (language, namespaces) => {
  const i18n = i18next.createInstance()
  i18n.use(nodeFsBackend)
  await new Promise((resolve) =>
    i18n.init(
      {
        lng: language,
        fallbackLng: language,
        ns: namespaces,
        defaultNS: 'common',
        interpolation: { escapeValue: false },
        backend: { loadPath: `${srcPath}/locales/{{lng}}/{{ns}}.json` },
        debug: false,
      },
      resolve
    )
  )
  return i18n
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    SanityLocaleString: {
      translate: {
        type: `String!`,
        args: { language: { type: 'String' } },
        resolve: (source, args) => {
          return source[args.language] || source['br']
        },
      },
    },
    SanityLocaleSlug: {
      translate: {
        type: `String!`,
        args: { language: { type: 'String' } },
        resolve: (source, args) => {
          return (source[args.language].current && source[args.language].current) || source.br.current
        },
      },
    },
    SanityPrice: {
      formatted: {
        type: `String!`,
        resolve: (source) => {
          return currency(source.value, { decimal: ',' }).format() + ' €'
        },
      },
    },
  })
}
