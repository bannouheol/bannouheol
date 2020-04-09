/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require("fs")
const path = require("path")
const i18next = require("i18next")
const nodeFsBackend = require("i18next-node-fs-backend")
const currency = require("currency.js")

const allLanguages = ["br", "fr"]

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)
const srcPath = resolveApp("src")
const redirectInBrowser = true

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

const namespaces = ["common", "blog", "shop"]

exports.createPages = async ({ graphql, actions: { createPage, createRedirect } }) => {
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
        blogPosts: allSanityBlogPost {
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

  /* BLOG PAGE */
  await buildI18nPages(
    null,
    (_, language, i18n) => ({
      path: `/${language}/${i18n.t("blog:slug")}`, // (1)
      component: path.resolve(path.join(templates.baseDir, templates.blog.archive)),
      context: {},
    }),
    namespaces,
    createPage,
    createRedirect
  )

  /* BLOG CATEGORIES */
  await buildI18nPages(
    blogCategories.edges,
    ({ node }, language, i18n) => ({
      path: `/${language}/${i18n.t("blog:slug")}/${i18n.t("blog:category_slug")}/${node._rawSlug[language].current}`,
      component: path.resolve(path.join(templates.baseDir, templates.blog.archive)),
      context: { category: node.id },
    }),
    namespaces,
    createPage,
    createRedirect
  )

  /* BLOG POSTS */
  await buildI18nPosts(
    blogPosts.edges,
    ({ node }, postLanguage, i18n) => {
      return {
        path: `/${postLanguage}/${i18n.t("blog:slug")}/${node._rawSlug[postLanguage].current}`,
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
    ({ node }, language, _) => ({
      path: `/${language}/${node.collection._rawSlug[language].current}/${node._rawSlug[language].current}`,
      previousPath: node.previousPath && `/${node.previousPath}`,
      component: path.resolve(path.join(templates.baseDir, templates.shop.product)),
      context: { product: node.id, collection: node.collection.id },
    }),
    namespaces,
    createPage,
    createRedirect
  )

  /* CATEGORIES */
  await buildI18nPages(
    categories.edges,
    ({ node }, language, _) => ({
      path: `/${language}/${path.join(
        node.parent === null ? `` : node.parent._rawSlug[language].current,
        node._rawSlug[language].current
      )}`,
      component: path.resolve(path.join(templates.baseDir, templates.shop.category)),
      context: { category: node.id },
    }),
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
      path: `/${language}/${i18n.t("shop:profile_slug")}/${node._rawSlug[language].current}`,
      component: path.resolve(path.join(templates.baseDir, templates.shop.profile)),
      context: { profile: node.id },
    }),
    namespaces,
    createPage,
    createRedirect
  )

  await build404Pages(createPage)

  createRedirect({
    fromPath: "/",
    toPath: "/fr/",
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
  createRedirect({ fromPath: "/*", toPath: "/404", statusCode: 404 })
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
          d.context.language === "fr" &&
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
        ipt.node.postLanguage.map(async (postLanguage) => {
          const i18n = await createI18nextInstance(postLanguage, namespaces) // (1)
          const res = pageDefinitionCallback(ipt, postLanguage, i18n) // (2)
          res.context.language = postLanguage
          res.context.i18nResources = i18n.services.resourceStore.data // (3)
          res.context.availableLanguages = ipt.node.postLanguage
          return res
        })
      )

      definitions.map((d) => {
        if (d.previousPath && d.context.availableLanguages) {
          if (d.context.availableLanguages > 1 && d.context.language === "fr") {
            // If both BR and FR posts exits, create only 1 redirection for the FR post.
            createRedirect({
              fromPath: d.previousPath,
              toPath: d.path,
              isPermanent: true,
              redirectInBrowser,
            })
          } else {
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

      definitions.forEach((d) => {
        d.context.alternateLinks = alternateLinks
        d.context.canonicalUrl = d.path
        createPage(d) // (5)
      })
    })
  )
}

const build404Pages = async (createPage) => {
  await Promise.all(
    allLanguages.map(async (language, index) => {
      const i18n = await createI18nextInstance(language, ["common", 404])
      const res = {
        path: "/" + language + "/404",
        component: path.resolve(path.join(templates.baseDir, templates.error)),
        context: {},
      }
      res.context.language = language
      res.context.i18nResources = i18n.services.resourceStore.data
      createPage(res)
      if (index === 0) {
        res.path = "/404"
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
        defaultNS: "common",
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
        args: { language: { type: "String" } },
        resolve: (source, args) => {
          return source[args.language] || source["br"]
        },
      },
    },
    SanityLocaleSlug: {
      translate: {
        type: `String!`,
        args: { language: { type: "String" } },
        resolve: (source, args) => {
          return (source[args.language].current && source[args.language].current) || source.br.current
        },
      },
    },
    SanityPrice: {
      formatted: {
        type: `String!`,
        resolve: (source) => {
          return currency(source.value, { decimal: "," }).format() + " €"
        },
      },
    },
  })
}

//////////////////////////////////////
/*
const {isFuture} = require('date-fns')
const {format} = require('date-fns')

async function createPostPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityPost(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            _createdAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []

  postEdges
    .filter(edge => !isFuture(edge.node._createdAt))
    .forEach((edge, index) => {
      const {id, slug = {}, _createdAt} = edge.node
      const dateSegment = format(_createdAt, 'YYYY/MM')
      const path = `/${dateSegment}/${slug.current}/`

      createPage({
        path,
        component: require.resolve('./src/templates/blog-post.js'),
        context: {id}
      })
    })
}

exports.createPages = async ({graphql, actions}) => {
  await createBlogPostPages(graphql, actions)
}
*/
