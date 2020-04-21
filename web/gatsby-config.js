require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const queries = require("./src/lib/algolia")

module.exports = {
  siteMetadata: {
    title: `Bannoù-heol`,
    url: `https://bannouheol.com`,
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
      resolve: "gatsby-source-sanity",
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_TOKEN,
        watchMode: true,
        overlayDrafts: true,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
      },
    },
    {
      resolve: "gatsby-plugin-snipcartv3",
      options: {
        apiKey: process.env.SNIPCART_APIKEY,
        js: `/snipcart.3.0.11.js`,
        styles: `/snipcart.3.0.11.css`,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
