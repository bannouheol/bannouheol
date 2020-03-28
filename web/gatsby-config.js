require("dotenv").config()

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
        path: `${__dirname}/src/images`,
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
      resolve: "gatsby-plugin-snipcartv3",
      options: {
        apiKey: process.env.SNIPCART_APIKEY,
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
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-nprogress`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
